import React, { useContext, useState } from "react";
import { Web3Context } from "../../../Context/Web3Context";
import { userRoles } from "../../../utils/constants";
import toast from "react-hot-toast";

const ChangeRole = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;

  const [formData, setFormData] = useState({
    role: 0,
    address: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleUserChange = (e) => {
    e.preventDefault();

    supplyChain.methods
      .changeUserRole(formData.role, formData.address[0])
      .send({ from: account, gas: 3000000 })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
    toast.success("User role updated successfully");
  };
  // console.log(userRoles.findIndex(formData.role))
  return (
    <div>
      <h1 className="text-center font-head text-xl font-bold">Update User</h1>

      <div className="relative my-2 mb-4">
        <label htmlFor="address" className="text-sm leading-7 text-gray-600">
          Address
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
      <div className="relative mb-4">
        <label htmlFor="role" className="text-sm leading-7 text-gray-600">
          Role
        </label>
        <select
          className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight hover:border-gray-500 focus:outline-none"
          onChange={handleOnChange}
          defaultValue={formData[0]}
        >
          {/* no role */}
          {userRoles.map((role, index) => (
            <option key={index} value={index}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <button
        className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        onClick={handleUserChange}
      >
        Submit
      </button>
    </div>
  );
};

export default ChangeRole;
