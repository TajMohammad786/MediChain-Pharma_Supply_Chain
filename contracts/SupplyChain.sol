//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Supplier.sol';
import './Transporter.sol';
// import './Manufacturer.sol';
//// New supply chain : supplier -> transporter -> manufacturer -> transporter -> whole-saler -> transporter -> distributor -> transporter -> customer/hospital/pharmacy


// contract SupplyChain is Supplier, Transporter, Manufacturer, Wholesaler, Distributor, Customer {
contract SupplyChain is Supplier, Transporter {
    
    address public Owner;
    
    constructor()  {
        Owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(Owner == msg.sender);
        _;
    }
    
    modifier checkUser(address addr) {
        require(addr == msg.sender);
        _;
    }
    
    enum roles {
        noRole,
        supplier,
        transporter,
        manufacturer,
        wholesaler,
        distributor,
        customer
    }
    
    
    //////////////// Events ////////////////////
    
    event UserRegister(address indexed _address, bytes32 name);
    event buyEvent(address buyer, address indexed seller, address packageAddr, bytes signature, uint indexed timestamp);
    event respondEvent(address indexed buyer, address seller, address packageAddr, bytes signature, uint indexed timestamp);
    event sendEvent(address seller, address buyer, address indexed packageAddr, bytes signature, uint indexed timestamp);
    event receivedEvent(address indexed buyer, address seller, address packageAddr, bytes signature, uint indexed timestamp);
    
    
    //////////////// Event functions (All entities) ////////////////////

    
    function requestProduct(address buyer, address seller, address packageAddr, bytes memory signature) public {
        emit buyEvent(buyer, seller, packageAddr, signature, block.timestamp);
    }
    
    function respondToEntity(address buyer, address seller, address packageAddr, bytes memory signature) public {
        emit respondEvent(buyer, seller, packageAddr, signature, block.timestamp);
    }
    
    function sendPackageToEntity(address buyer, address seller, address packageAddr, bytes memory signature) public {
        emit sendEvent(seller, buyer, packageAddr, signature, block.timestamp);
    }

    /////////////// Users (Only Owner Executable) //////////////////////
    
    struct userData {
        bytes32 name;
        string[] userLoc;
        roles role;
        address userAddr;
    }
    
    mapping (address => userData) public userInfo;
    
    function registerUser(bytes32 _name,string[] memory loc, uint _role, address _addr) external onlyOwner returns(string memory) {
        userInfo[_addr].name = _name;
        userInfo[_addr].userLoc = loc;
        userInfo[_addr].role = roles(_role);
        userInfo[_addr].userAddr = _addr;
        emit UserRegister(_addr, _name);
        return "User Registered!";
    }
    
    function changeUserRole(uint _role, address _addr) external onlyOwner returns(string memory) {
        userInfo[_addr].role = roles(_role);
       return "Role Updated!";
    }

    function getUser(address _addr) external view returns (bytes32, string[] memory, uint, address) {
        require(userInfo[_addr].userAddr != address(0), "User does not exist");
        userData memory user = userInfo[_addr];
        return (user.name, user.userLoc, uint(user.role), user.userAddr);
    }
    /////////////// Supplier //////////////////////
    
    
    function supplierCreatesRawPackage(
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
        ) external {
            require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
            createRawMaterialPackage(_description, _quantity, _transporterAddr,_manufacturerAddr);
    }
    
    function supplierGetPackageCount() external view returns(uint) {
        require(userInfo[msg.sender].role == roles.supplier, "Role=>Supplier can use this function");
        
        return getNoOfPackagesOfSupplier();
    }
    
    function supplierGetRawMaterialAddresses() external view returns(address[] memory) {
        address[] memory ret = getAllPackages();
        return ret;
    }
    

    function verify(address p, bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns(bool) {
        return ecrecover(hash, v, r, s) == p;
    }  


    ///////////////  Transporter ///////////////
    
    
    function transporterHandlePackage(
        address _address,
        uint transporterType,
        address cid
        ) external {
            
        require(
            userInfo[msg.sender].role == roles.transporter,
            "Only Transporter can call this function"
        );
        require(
            transporterType > 0,
            "Transporter Type is incorrect"
        );
        
        handlePackage(_address, transporterType, cid);
    }

    ///////////////////////      Manufacturer           //////////////////////////////

    
}