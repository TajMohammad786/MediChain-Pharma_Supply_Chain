import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import RawMaterial from "../../contracts/RawMaterial.json";
import Transactions from "../../contracts/Transactions.json";
import { getTrimmedString } from "../../utils/getTrimmedString";
import toast from "react-hot-toast";
import CustomStepper from "./Stepper";

const RawMaterialInfo = () => {
  const { address } = useParams();
  const [activestep, setActivestep] = useState(0);
  //   console.log(address);
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [details, setDetails] = useState({
    productId: "",
    description: "",
    quantity: "",
    supplier: "",
    transporter: "",
    manufacturer: "",
    txnContractAddress: "",
  });
  const [loading, setLoading] = useState(true);

  const getStringName = (name) => {
    return getTrimmedString(web3, name);
  };

  async function fetchRawMaterialData() {
    try {
      // console.log(rawMaterial)
      let rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
      
      let data = await rawMaterial.methods
        .getSuppliedRawMaterials()
        .call({ from: address });
      let status = await rawMaterial.methods
        .getRawMaterialStatus()
        .call({ from: account });
      console.log(Number(status));
      // let sign = await web3.eth.accounts.sign("0x6940eFD52E56D3cd7Fa80E67f41bA77544A010Cb", "0x9ab5d53f5bd0cf5dbbae8159c46eba97adc33680394eca8e633c52128f7d5715")
      setActivestep(Number(status));

      if (status === 2) {
         setActivestep(3)
      } else if (status === 3) {
         setActivestep(2)
     }
      const {
        0: productId,
        1: description,
        2: quantity,
        3: supplier,
        4: transporter,
        5: manufacturer,
        6: txnContractAddress,
      } = data;
      setDetails({
        productId,
        description,
        quantity,
        supplier,
        transporter,
        manufacturer,
        txnContractAddress,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching raw material data:", error);
    }
  }

  function getSupplyChainSteps() {
    return ['At Supplier', 'Collected by Transporter', 'Delivered to Manufacturer'];
  }

  function getSupplyChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Raw Material is at supplier stage in the supply chain.';
      case 1:
        return 'Raw Material collected by the Transporter is on its way to the Manufacturer.';
      case 2:
        return 'Raw Material currently with the Manufacturer';
      default:
        return 'Unknown stepIndex';
    }
  }

  function sendPackage() {
    let rawMaterial = new web3.eth.Contract(
      RawMaterial.abi,
      address,
    );
    let signature = prompt("Enter signature");
    supplyChain.methods
      .sendPackageToEntity(details.manufacturer, account, address, signature)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        let data = await rawMaterial.methods
          .getSuppliedRawMaterials()
          .call({ from: account });
        let txnContractAddress = details.txnContractAddress;
        let transporterAddress = details.transporter;
        let txnHash = receipt.transactionHash;
        // console.log(txnContractAddress, transporterAddress, txnHash);
        // const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
        const transactions = new web3.eth.Contract(
          Transactions.abi,
          txnContractAddress,
        );
        let txns = await transactions.methods
          .getAllTransactions()
          .call({ from: account });
        // console.log(txns);

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
          .send({ from: account, gas: 2000000 })
          toast.success("Package sent successfully")
      });
     
  }

  useEffect(() => {
    fetchRawMaterialData();
  }, [address]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl">Loading raw material details...</p>
      </div>
    );
  } else {
    return (
      <>
      
        <h1 className="mb-4 font-head text-3xl font-bold">
          Raw Material Details
        </h1>
        <div className="mb-4">
          <p className="mb-2 font-head font-semibold">
            Generated Product ID: &nbsp;{" "}
            <span className="font-para font-medium">{details.productId}</span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Raw Material Address: &nbsp;
            <span className="font-para font-medium">{details.supplier}</span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Raw Material Description: &nbsp;
            <span className="font-para font-medium">
              {getStringName(details.description)}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Raw Material Quantity: &nbsp;
            <span className="font-para font-medium">
              {Number(details.quantity)}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Raw Material Manufacturer: &nbsp;
            <span className="font-para font-medium">
              {details.manufacturer}
            </span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Raw Material Transporter: &nbsp;
            <span className="font-para font-medium">{details.transporter}</span>
          </p>
          <p className="mb-2 font-head font-semibold">
            Transaction Contract Address: &nbsp;
            <span className="font-para font-medium">
              {details.txnContractAddress}
            </span>
          </p>
        </div>
        <button className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
          <Link
            to={`/supplier/view-request/${address}`}
            className="text-white hover:underline"
          >
            View Requests
          </Link>
        </button>
        <button
          className="ml-3 rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          onClick={sendPackage}
        >
          Send Package
        </button>
        <div className="mt-12 ml-4 mr-4">

        <CustomStepper activeStep={activestep} getSteps={getSupplyChainSteps} getStepContent={getSupplyChainStepContent} />
        </div>

      </>
      );
  }
};

export default RawMaterialInfo;
