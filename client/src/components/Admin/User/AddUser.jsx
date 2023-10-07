import { useState } from "react";
import { Web3Context } from "../../../Context/Web3Context";
import { useContext } from "react";
import { userRoles } from "../../../utils/constants";
import toast from "react-hot-toast";

const AddUser = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [role, setRole] = useState(0);
  // console.log(web3)
  const [formData, setFormData] = useState({
    name: "",
    locationX: "",
    locationY: "",
    role: 0,
    address: "",
  });

  // const handleOnChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: [e.target.value] });
  // };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
  
    // For the 'role' field, capture the value (role name) in the state
    // and also find its index in the userRoles array
    if (name === "role") {
      const roleIndex = userRoles.indexOf(value);
      setRole(roleIndex);
      setFormData({ ...formData, [name]: value, roleIndex });
      
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleAddUser = (e) => {
    e.preventDefault();
    // console.log(formData.name)
    const n = web3.utils.padRight(web3.utils.fromAscii(formData.name), 64);
    // console.log(n);
    const loc = [String(formData.locationX), String(formData.locationY)];
    // console.log(role, formData.address);
    supplyChain.methods
      .registerUser(n, loc, role, formData.address)
      .send({ from: account, gas: 3000000 })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
    toast.success("User added successfully");
    setFormData({
      name: "",
      locationX: "",
      locationY: "",
      role: 0,
      address: "",
    });
  };
  return (
    <div>
      <h1 className="text-center font-head text-xl font-bold">Add User</h1>

      <div className="relative my-2 mb-4">
        <label htmlFor="name" className="text-sm leading-7 text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={formData.name}
          onChange={handleOnChange}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="locationX" className="text-sm leading-7 text-gray-600">
          LocationX
        </label>
        <input
          type="text"
          id="locationX"
          name="locationX"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={formData.locationX}
          onChange={handleOnChange}
          placeholder="Only integer values are supported"
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="locationY" className="text-sm leading-7 text-gray-600">
          LocationY
        </label>
        <input
          type="text"
          id="locationY"
          name="locationY"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={formData.locationY}
          onChange={handleOnChange}
          placeholder="Only integer values are supported"
        />
      </div>
    
      <div className="relative mb-4">
        <label htmlFor="role" className="text-sm leading-7 text-gray-600">
          Role
        </label>
        <select
          className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight hover:border-gray-500 focus:outline-none"
          onChange={handleOnChange}
          value={formData.role} // Set the selected value
          name="role"
        >
          {userRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="relative mb-4">
        <label htmlFor="address" className="text-sm leading-7 text-gray-600">
          Account Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={formData.address}
          onChange={handleOnChange}
        />
      </div>
      <button
        className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        onClick={handleAddUser}
      >
        Submit
      </button>
    </div>
  );
};

export default AddUser;
