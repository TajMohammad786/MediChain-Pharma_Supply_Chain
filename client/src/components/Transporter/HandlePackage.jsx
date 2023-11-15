import React, { useState, useContext } from "react";
import { Web3Context } from "../../Context/Web3Context";

const HandlePackage = () => {
   
  const [isLoading, setIsLoading] = useState(false);
  const { webData, setWebData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [formData, setFormData] = useState({
    packageAddr: "",
    transporterType: "",
    cid: "",
  });
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(formData.packageAddr)
    // console.log(Number(formData.transporterType))
    supplyChain.methods.transporterHandlePackage(formData.packageAddr, Number(formData.transporterType), formData.cid)
    .send({from: account, gas: 3000000})
    .once('receipt', async (receipt) => {
      console.log(receipt);
      setIsLoading(false);
    })
  }
  
  return (
    <>
      <div>
        <h1 className="text-center font-head text-xl font-bold">
          Handle Package
        </h1>

        <div className="relative my-2 mb-4">
          <label
            htmlFor="packageAddress"
            className="text-sm leading-7 text-gray-600"
          >
            Package Address
          </label>
          <input
            type="text"
            id="packageAddr"
            name="packageAddr"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={formData.packageAddr}
            onChange={handleOnChange}
            placeholder="Enter Package Address"
          />
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="quantity"
            className="text-sm leading-7 text-gray-600"
          >
            Transporter Type
          </label>
          <input
            type="text"
            id="transporterType"
            name="transporterType"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={formData.transporterType}
            onChange={handleOnChange}
            placeholder="Enter Transporter Type"
          />
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="cid"
            className="text-sm leading-7 text-gray-600"
          >
            Cid
          </label>
          <input
            type="text"
            id="cid"
            name="cid"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={formData.cid}
            onChange={handleOnChange}
            placeholder="Enter Cid"
          />
        </div>
        <button
          className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          onClick={handleSubmit}
        >
          Request
        </button>
      </div>
    </>
  )
}

export default HandlePackage
