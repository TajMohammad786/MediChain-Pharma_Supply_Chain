import React from 'react';
import { Web3Context } from '../../Context/Web3Context';
import { useContext, useState } from 'react';


const TransferMedicine = () => {
    const { webData, setWebData } = useContext(Web3Context);
    const { account, supplyChain, web3 } = webData;
    // console.log(supplyChain)
    const [signed, setsigned] = useState(false);
    const [medicineAddress, setMedicineAddress] = useState("");
    const [transporterAddress, setTransporterAddress] = useState("");
    const [distributorAddress, setDistributorAddress] = useState("");
  
    const handleOnChange = (e) => {
        if (e.target.id === 'medicineAddress') {
            setMedicineAddress(e.target.value);
        } else if (e.target.id === 'transporterAddress') {
            setTransporterAddress(e.target.value);
        } else if (e.target.id === 'distributorAddress') {
            setDistributorAddress(e.target.value);
        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // isLoading(true);
        console.log(medicineAddress, transporterAddress, distributorAddress)
        supplyChain.methods.transferMedicineWtoD(medicineAddress,transporterAddress, distributorAddress).send({ from: account, gas : 3000000 })
            .once('receipt', async (receipt) => {
                console.log(receipt);
                // isLoading(false);
            })
    }


    return (
        <div>
          <h1 className="text-center font-head text-xl font-bold">
            Transfer Medicine
          </h1>

          <div className="relative my-2 mb-4">
            <label
              htmlFor="description"
              className="text-sm leading-7 text-gray-600"
            >
              Medicine Address
            </label>
            <input
              type="text"
              id="medicineAddress"
              name="medicineAddress"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            //   value={formData.medicineAddress}
              onChange={handleOnChange}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="quantity"
              className="text-sm leading-7 text-gray-600"
            >
              Transporter Address
            </label>
            <input
              type="text"
              id="transporterAddress"
              name="transporterAddress"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            //   value={formData.transporterAddress}
              onChange={handleOnChange}
            //   placeholder="Enter Your Private Key"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="quantity"
              className="text-sm leading-7 text-gray-600"
            >
              Distributor Address
            </label>
            <input
              type="text"
              id="distributorAddress"
              name="distibutorAddress"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            //   value={formData.distributorAddress}
              onChange={handleOnChange}
            //   placeholder="Enter Your Private Key"
            />
          </div>
          <button
            className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Transfer
          </button>
        </div>
    )
}

export default TransferMedicine
