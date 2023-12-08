import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Medicine from "../../contracts/Medicine.json";
import CustomStepper from "../Supplier/Stepper";
import Transactions from "../../contracts/Transactions.json";
// import { Link, useParams } from "react-router-dom";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import toast from "react-hot-toast";
import saveMedicines from "../../utils/saveMedicines";
// import { getTrimmedString } from "../../utils/getTrimmedString";

const WholesalerMedicineInfo = () => {
  const [loading, isLoading] = useState(true);
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;

  const [activestep, setActivestep] = useState(0);
  const { address } = useParams();
  const [subContractWD, setSubContractWD] = useState(0);
  const [subContractDC, setSubContractDC] = useState(0);

  const [details, setDetails] = useState({
    productId: "",
    description: "",
    quantity: "",
    rawMatAddress: "",
    transporter: "",
    manufacturer: "",
    wholesaler: "", //
    distributor: "", //
    txnContractAddress: "",
  });

  const getMedicineData = async () => {
    let medicine = new web3.eth.Contract(Medicine.abi, address);
    // console.log(medicine);
    let data = await medicine.methods.getMedicineInfo().call({ from: account });
    let subcontractAddressWD = await supplyChain.methods
      .getSubContractWD(address)
      .call({ from: account });
    let subcontractAddressDC = await supplyChain.methods
      .getSubContractDC(address)
      .call({ from: account });
    setSubContractWD(subcontractAddressWD);
    setSubContractDC(subcontractAddressDC);
    // console.log(data)
    let status = Number(data[6]);
    // console.log(status)
    setActivestep(Number(status));

    if (status === 2) {
      setActivestep(3);
    } else if (status === 3) {
      setActivestep(2);
    }

    data[1] = web3.utils.hexToUtf8(data[1]);
    setDetails((prevDetails) => ({
      ...prevDetails,
      productId: address,
      description: data[1],
      quantity: data[3],
      transporter: data[4],
      manufacturer: data[0],
      distributor: data[5],
      wholesaler: data[8],
      txnContractAddress: data[7],
      rawMatAddress: data[2],
    }));
    // TODO: create one button to push medicine data to database
    const input = {
      productId: address,
      description: data[1],
      quantity: data[3],
      rawMaterialAddress: data[2],
      transactionContractAddress: data[7],
      wholesaler: data[8],
      transporter: data[4],
      manufacturer: data[0],
      distributer: data[5],
    };
    // console.log(input);
    saveMedicines(input);

    isLoading(false);
  };
  function getSupplyChainSteps() {
    return [
      "At Manufacturer",
      "Collected by Transporter1",
      "Delivered to Wholesaler",
      "Collected by Transporter2",
      "Delivered to Distributor",
      "Collected by Transporter3",
      "Medicine Delivered",
    ];
  }

  function getSupplyChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Medicine is at Manufacturing stage in the Supply Chain.";
      case 1:
        return "Medicine collected by  Transporter is on its way to the Wholesaler.";
      case 2:
        return "Wholesaler, the medicine is currently with you!!";
      case 3:
        return "Medicine is collected by the Transporter On its way to the Distributor.";
      case 4:
        return "Medicine is delivered to the Distributor";
      case 5:
        return "Medicine collected by  the Transporter is on its way to the Pharmacy/Customer.";
      case 6:
        return "Medicine Delivered Successfully!";
      default:
        return "Unknown stepIndex";
    }
  }

  function sendPackage() {
    let medicine = new web3.eth.Contract(Medicine.abi, address);
    let signature = prompt("Enter signature");
    supplyChain.methods
      .sendPackageToEntity(details.distributor, account, address, signature)
      .send({ from: account, gas: 3000000 })
      .once("receipt", async (receipt) => {
        let data = await medicine.methods
          .getMedicineInfo()
          .call({ from: account });
        let txnContractAddress = data[7];
        let transporterAddress = data[4][data[4].length - 1];
        let txnHash = receipt.transactionHash;
        const transactions = new web3.eth.Contract(
          Transactions.abi,
          txnContractAddress,
        );
        let txns = await transactions.methods
          .getAllTransactions()
          .call({ from: account });
        let prevTxn = txns[txns.length - 1][0];
        transactions.methods
          .createTxnEntry(
            txnHash,
            account,
            transporterAddress,
            prevTxn,
            "10",
            "10",
          )
          .send({ from: account, gas: 3000000 });
        toast.success("Package sent Successfully!!");
      });
  }
  // console.log(details);

  useEffect(() => {
    getMedicineData();
  }, []);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl">Loading Medicine details...</p>
      </div>
    );
  } else {
    return (
      <>
        <h1 className="mb-4 font-head text-3xl font-bold">Medicine Details</h1>
        <div className="mb-4">
          <p className="mb-2 font-head font-semibold">
            Generated Product ID: &nbsp;{" "}
            <span className="font-para font-medium">{details.productId}</span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Medicine Raw Material: &nbsp;
            <span className="font-para font-medium">
              {details.rawMatAddress}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Medicine Description: &nbsp;
            <span className="font-para font-medium">
              {/* {getStringName(details.description)} */}
              {details.description}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Medicine Quantity: &nbsp;
            <span className="font-para font-medium">
              {Number(details.quantity)}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Medicine Manufacturer: &nbsp;
            <span className="font-para font-medium">
              {details.manufacturer}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Medicine Wholesaler: &nbsp;
            <span className="font-para font-medium">{details.wholesaler}</span>
          </p>

          <p className="mb-2 font-head font-semibold">
            Medicine Distributor: &nbsp;
            <span className="font-para font-medium">{details.distributor}</span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Transaction Contract Address: &nbsp;
            <span className="font-para font-medium text-fuchsia-500">
              <Link
                to={`/wholesaler/view-transactions/${details.txnContractAddress}`}
                className="capitalize hover:underline"
              >
                {details.txnContractAddress}
              </Link>
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            SubContract Address Wholesaler-Distributor: &nbsp;
            <span className="font-para font-medium">{subContractWD}</span>
          </p>
          <p className="mb-2 font-head font-semibold">
            SubContract Address Distributor-Customer: &nbsp;
            <span className="font-para font-medium">{subContractDC}</span>
          </p>
        </div>
        <button className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
          <Link
            to={`/wholesaler/view-request/${address}`}
            className="text-white hover:underline"
          >
            View Requests
          </Link>
          {/* View Requests */}
        </button>
        <button
          className="ml-3 rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          onClick={sendPackage}
        >
          Send Package
        </button>
        <div className="ml-4 mr-4 mt-12">
          <CustomStepper
            activeStep={activestep}
            getSteps={getSupplyChainSteps}
            getStepContent={getSupplyChainStepContent}
          />
        </div>
      </>
    );
  }
};

export default WholesalerMedicineInfo;
