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

    
    
    mapping (address => address[]) public manufacturerRawMaterials;
    mapping (address => address[]) public manufacturerMedicines;
    
    
    function manufacturerReceivedPackage(
        address _addr,
        address _manufacturerAddress,
        address _sellerAddr,
        bytes memory signature
        ) public {
            
        RawMaterial(_addr).receivedPackage(_manufacturerAddress);
        manufacturerRawMaterials[_manufacturerAddress].push(_addr);
        emit receivedEvent(msg.sender, _sellerAddr, _addr, signature, block.timestamp);
    }
    
    function getAllRawMaterials() public view returns(address[] memory) {
        uint len = manufacturerRawMaterials[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = manufacturerRawMaterials[msg.sender][i];
        }
        return ret;
    }

    function manufacturerCreatesMedicine(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr
        ) public {
            
        Medicine _medicine = new Medicine(
            _manufacturerAddr,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr
        );
        
        manufacturerMedicines[_manufacturerAddr].push(address(_medicine));
        
    }
    
    function getAllCreatedMedicines() public view returns(address[] memory) {
        uint len = manufacturerMedicines[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = manufacturerMedicines[msg.sender][i];
        }
        return ret;
    }
    

    ///////////////  Wholesaler  ///////////////

    mapping(address => address[]) public MedicinesAtWholesaler;
    mapping(address => address[]) public MedicineWtoD;
    mapping(address => address) public MedicineWtoDTxContract;
    
    function wholesalerReceivedMedicine(
        address _address,
        address _sellerAddr,
        bytes memory signature
        ) public {
        require(
            userInfo[msg.sender].role == roles.wholesaler,
            "Only Wholesaler can call this function"
        );
        
        Medicine(_address).receivedMedicine(msg.sender);
        MedicinesAtWholesaler[msg.sender].push(_address);
        emit receivedEvent(msg.sender, _sellerAddr, _address, signature, block.timestamp);
    }
    
    function transferMedicineWtoD(
            address _address,
            address transporter,
            address receiver
        ) public {
            
        MedicineW_D wd = new MedicineW_D(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        MedicineWtoD[msg.sender].push(address(wd));
        MedicineWtoDTxContract[_address] = address(wd);
    }

    
    function getBatchIdByIndexWD(uint index) public view returns(address packageID) {
        require(
            userInfo[msg.sender].role == roles.wholesaler,
            "Only Wholesaler Can call this function."
        );
        return MedicineWtoD[msg.sender][index];
    }

    function getSubContractWD(address _address) public view returns (address SubContractWD) {
        return MedicineWtoDTxContract[_address];
    }
    
    function getAllMedicinesAtWholesaler() public view returns(address[] memory) {
        uint len = MedicinesAtWholesaler[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = MedicinesAtWholesaler[msg.sender][i];
        }
        return ret;
    }


//     ///////////////  Distributor  ///////////////

    mapping(address => address[]) public MedicinesAtDistributor;
    mapping(address => address[]) public MedicineDtoC;
    mapping(address => address) public MedicineDtoCTxContract;


    function distributorReceivedMedicine(
      address _address,
      address cid,
      address _sellerAddr,
      bytes memory signature
    ) public {

        ///////////////######################## Work on this in future done for reducing size
        // require(
        //     userInfo[msg.sender].role == roles.distributor &&
        //     msg.sender == Medicine(_address).getWDC()[1],
        //     "Only Distributor or current owner of package can call this function"  
        // );
        
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        if(rtype == 2){
            MedicinesAtDistributor[msg.sender].push(_address);
            if(Medicine(_address).getWDC()[0] != address(0)){
                MedicineW_D(cid).receiveWD(_address, msg.sender);
            }
        }
        emit receivedEvent(msg.sender, _sellerAddr, _address, signature, block.timestamp);
    }

    function distributorTransferMedicinetoCustomer(
        address _address,
        address transporter,
        address receiver
    ) public {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only Distributor or current owner of package can call this function"
        );
        MedicineD_C dp = new MedicineD_C(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        MedicineDtoC[msg.sender].push(address(dp));
        MedicineDtoCTxContract[_address] = address(dp);
    }
    
    function getBatchesCountDC() public view returns (uint count){
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only Distributor Can call this function."
        );
        return MedicineDtoC[msg.sender].length;
    }

    function getBatchIdByIndexDC(uint index) public view returns(address packageID) {
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only Distributor Can call this function."
        );
        return MedicineDtoC[msg.sender][index];
    }

    function getSubContractDC(address _address) public view returns (address SubContractDP) {
        return MedicineDtoCTxContract[_address];
    }
    
    function getAllMedicinesAtDistributor() public view returns(address[] memory) {
        uint len = MedicinesAtDistributor[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = MedicinesAtDistributor[msg.sender][i];
        }
        return ret;
    }
}