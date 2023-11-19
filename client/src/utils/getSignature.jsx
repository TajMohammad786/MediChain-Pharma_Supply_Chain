import React, { useContext, useState } from 'react';
import { Web3Context } from '../Context/Web3Context';
import toast from 'react-hot-toast';

const GetSignature = () => {
  const { webData } = useContext(Web3Context);
  const { web3 } = webData;
  const [sign, setSign] = useState("");
  const [packageAddr, setPackageAddr] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const generateSignature = async () => {
    try {
      const signature = await web3.eth.accounts.sign(
        packageAddr,
        privateKey,
      );
      setSign(signature.signature);

      await navigator.clipboard.writeText(signature.signature);
      toast.success("Copied to Clipboard!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="relative my-4 mb-4">
        <label htmlFor="description" className="text-sm leading-7 text-gray-600">
          Package Address
        </label>
        <input
          type="text"
          id="packageAddr"
          name="packageAddr"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={packageAddr}
          onChange={(e) => setPackageAddr(e.target.value)}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="quantity" className="text-sm leading-7 text-gray-600">
          Private key
        </label>
        <input
          type="text"
          id="privateKey"
          name="privateKey"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
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
  );
};

export default GetSignature;
