import React from 'react';
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import Medicine from "../../contracts/Medicine.json";
import Transactions from "../../contracts/Transactions.json";
// import SupplyChain from "../../contracts/SupplyChain.json";
import { toast } from "react-hot-toast";
import { useState } from 'react';


const CreateMedicine = () => {
    const { webData } = useContext(Web3Context);
    const { account, supplyChain, web3 } = webData;
    const [formData, setFormData] = useState({
        description: "",
        quantity: "",
      });
      const [rawMaterialAddress, setRawMaterialAddress] = useState("");
      const [manufacturerAddress, setManufacturerAddress] = useState("");
      const [transporterAddress, setTransporterAddress] = useState("");
    
      const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: [e.target.value] });
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        // isLoading(true);
        const d = web3.utils.padRight(
            web3.utils.fromAscii(formData.description[0]),
            64,
          );
        console.log(d, formData.quantity[0], [transporterAddress], [manufacturerAddress])
        supplyChain.methods.manufacturerCreatesMedicine(manufacturerAddress, d, [rawMaterialAddress], Number(formData.quantity), [transporterAddress]).send({ from: account, gas: 3000000 })
        .once('receipt', async (receipt) => {
            console.log(receipt);
            const medicineAddresses = await supplyChain.methods.getAllCreatedMedicines().call({ from: account, gas: 3000000 });
            let medicineAddress = medicineAddresses[medicineAddresses.length - 1];
            const medicine = new web3.eth.Contract(Medicine.abi, medicineAddress);
            let data = await medicine.methods.getMedicineInfo().call({ from: account });
            let txnContractAddress = data[7];
            let txnHash = receipt.transactionHash;
            const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
            transactions.methods.createTxnEntry(txnHash, account, medicineAddress, txnHash, '10', '10').send({ from: account, gas: 3000000 }); //TODO: get user location -> (latitude, longitude)
            // isLoading(false);
        })
        toast.success("Medicine Created Successfully!!");
    }
    return (
    <div>
        <h1 className="text-center font-head text-xl font-bold">
            Create New Medicine
        </h1>

        <div className="relative my-2 mb-4">
            <label
            htmlFor="description"
            className="text-sm leading-7 text-gray-600"
            >
            Medicine Description
            </label>
            <input
            type="text"
            id="description"
            name="description"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={formData.description}
            onChange={handleOnChange}
            />
        </div>
        <div className="relative mb-4">
            <label htmlFor="quantity" className="text-sm leading-7 text-gray-600">
            Medicine Quantity
            </label>
            <input
            type="text"
            id="quantity"
            name="quantity"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={formData.quantity}
            onChange={handleOnChange}
            placeholder="Only integer values are supported"
            />
        </div>

        <div className="relative mb-4">
            <label
            htmlFor="rawMaterialAddress"
            className="text-sm leading-7 text-gray-600"
            >
            Raw Material Address
            </label>
            <input
            type="text"
            id="rawMaterialAddress"
            name="rawMaterialAddress"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={rawMaterialAddress}
            onChange={(e) => setRawMaterialAddress(e.target.value)}
            />
        </div>
        <div className="relative mb-4">
            <label
            htmlFor="manufacturer"
            className="text-sm leading-7 text-gray-600"
            >
            Manufacturer Address
            </label>
            <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={manufacturerAddress}
            onChange={(e) => setManufacturerAddress(e.target.value)}
            />
        </div>
        <div className="relative mb-4">
            <label
            htmlFor="manufacturer"
            className="text-sm leading-7 text-gray-600"
            >
            Transporter Address
            </label>
            <input
            type="text"
            id="transporter"
            name="transporter"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={transporterAddress}
            onChange={(e) => setTransporterAddress(e.target.value)}
            />
        </div>

        <button
            className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
            onClick={handleSubmit}
        >
            Submit
        </button>
    </div>
    )
}

export default CreateMedicine
