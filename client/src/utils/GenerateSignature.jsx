import React, { useState, useContext } from "react";
import { Web3Context } from "../Context/Web3Context";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GenerateSignature = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  // console.log(supplyChain)
  const [signed, setsigned] = useState(false);
  const [formData, setFormData] = useState({
    packageAddr: "",
    privateKey: "",
    supplierAddr: "",
    signature: "",
  });
  const [sign, setSign] = useState("");

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSignature = async () => {
    // console.log(formData.packageAddr, formData.privateKey);
    try {
      const signature = await web3.eth.accounts.sign(
        formData.packageAddr,
        formData.privateKey,
      );
      // const signature = await web3.eth.accounts.sign("0x6940eFD52E56D3cd7Fa80E67f41bA77544A010Cb",
      //  "0x9ab5d53f5bd0cf5dbbae8159c46eba97adc33680394eca8e633c52128f7d5715");
      setSign(signature.signature);

      await navigator.clipboard.writeText(signature.signature);
      toast.success("copied to clipboard");
      setsigned(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onRequest = async (e) => {
    e.preventDefault();
    // isLoading(true);
    supplyChain.methods
      .requestProduct(
        account,
        formData.supplierAddr,
        formData.packageAddr,
        formData.signature,
      )
      .send({ from: account })
      .once("receipt", async (receipt) => {
        toast.success("Request Made to Supplier!");
        console.log(receipt);
        // isLoading(false);
      });
  };

  return (
    <div>
      {signed ? (
        <>
          <div>
            <h1 className="text-center font-head text-xl font-bold">
              Request Raw Material
            </h1>

            <div className="relative my-2 mb-4">
              <label
                htmlFor="description"
                className="text-sm leading-7 text-gray-600"
              >
                Package Address
              </label>
              <input
                type="text"
                id="packageAddr"
                name="packageAddr"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                // value={formData.description}
                onChange={handleOnChange}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="quantity"
                className="text-sm leading-7 text-gray-600"
              >
                Supplier Address
              </label>
              <input
                type="text"
                id="supplierAddr"
                name="supplierAddr"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={formData.supplierAddr}
                onChange={handleOnChange}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="quantity"
                className="text-sm leading-7 text-gray-600"
              >
                Signature
              </label>
              <input
                type="text"
                id="signature"
                name="signature"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={formData.signature}
                onChange={handleOnChange}
              />
            </div>
            <button
              className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              onClick={onRequest}
            >
              Request
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-center font-head text-xl font-bold">
            Generate Signature
          </h1>

          <div className="relative my-2 mb-4">
            <label
              htmlFor="description"
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
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="quantity"
              className="text-sm leading-7 text-gray-600"
            >
              Private key
            </label>
            <input
              type="text"
              id="privateKey"
              name="privateKey"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={formData.privateKey}
              onChange={handleOnChange}
              placeholder="Enter Your Private Key"
            />
          </div>
          <button
            className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
            onClick={generateSignature}
          >
            Generate Signature
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateSignature;
