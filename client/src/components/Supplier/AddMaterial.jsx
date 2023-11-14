import { useState } from "react";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import RawMaterial from "../../contracts/RawMaterial.json";
import Transactions from "../../contracts/Transactions.json";
import { toast } from "react-hot-toast";

const AddMaterial = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  // console.log(account);
  //   console.log(web3);
  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
  });
  const [transporterAddress, setTransporterAddress] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const d = web3.utils.padRight(
      web3.utils.fromAscii(formData.description[0]),
      64,
    );
    // console.log(d);
    // console.log(d, formData.quantity, transporterAddress, manufacturerAddress);

    supplyChain.methods
      .createRawMaterialPackage(
        d,
        Number(formData.quantity),
        transporterAddress,
        manufacturerAddress,
      )
      .send({ from: account, gas: 3000000 })
      .once("receipt", async (receipt) => {
        console.log(receipt);
        let rawMaterialAddresses = await supplyChain.methods
          .getAllPackages()
          .call({ from: account });
        // console.log(rawMaterialAddresses);
        let rawMaterialAddress =
          rawMaterialAddresses[rawMaterialAddresses.length - 1];

        const rawMaterial = new web3.eth.Contract(
          RawMaterial.abi,
          rawMaterialAddress,
        );
        // console.log(rawMaterial);
        let data = await rawMaterial.methods
          .getSuppliedRawMaterials()
          .call({ from: account, gas: 3000000 });
        // console.log(data);
        let txnContractAddress = data[6];
        let txnHash = receipt.transactionHash;
        // console.log(txnHash);
        const transactions = new web3.eth.Contract(
          Transactions.abi,
          txnContractAddress,
        );
        // console.log(transactions);
        transactions.methods
          .createTxnEntry(
            txnHash,
            account,
            rawMaterialAddress,
            txnHash,
            "10",
            "10",
          )
          .send({ from: account, gas: 3000000 });
        toast.success("Raw material added Successfully!!");
        // console.log("success");
        // toast.success("Raw Material Added Successfully")
        //TODO: get user location -> (latitude, longitude)
        // isLoading(false);
      });
  };
  return (
    <div>
      <h1 className="text-center font-head text-xl font-bold">
        Add Raw Material
      </h1>

      <div className="relative my-2 mb-4">
        <label
          htmlFor="description"
          className="text-sm leading-7 text-gray-600"
        >
          Description
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
          Quantity
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
          htmlFor="transporter"
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

      <button
        className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        onClick={handleAddMaterial}
      >
        Submit
      </button>
    </div>
  );
};

export default AddMaterial;
