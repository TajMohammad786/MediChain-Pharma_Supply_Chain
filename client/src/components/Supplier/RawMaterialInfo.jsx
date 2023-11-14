import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import RawMaterial from "../../contracts/RawMaterial.json";
import Transactions from "../../contracts/Transactions.json";
import { getTrimmedString } from "../../utils/getTrimmedString";

const RawMaterialInfo = () => {
  const { address } = useParams();
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
      let rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
      let data = await rawMaterial.methods
        .getSuppliedRawMaterials()
        .call({ from: address });
      let status = await rawMaterial.methods
        .getRawMaterialStatus()
        .call({ from: account });
      // console.log(Number(status));
      // let sign = await web3.eth.accounts.sign("0x6940eFD52E56D3cd7Fa80E67f41bA77544A010Cb", "0x9ab5d53f5bd0cf5dbbae8159c46eba97adc33680394eca8e633c52128f7d5715")

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

  function sendPackage() {
    let rawMaterial = new web3.eth.Contract(
      RawMaterial.abi,
      rawMaterialAddress,
    );
    let signature = prompt("Enter signature");
    supplyChain.methods
      .sendPackageToEntity(manufacturer, account, rawMaterialAddress, signature)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        let data = await rawMaterial.methods
          .getSuppliedRawMaterials()
          .call({ from: account });
        let txnContractAddress = data[6];
        let transporterAddress = data[4];
        let txnHash = receipt.transactionHash;
        // const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
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
          .send({ from: account });
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
      <div className="">
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
      </div>
    );
  }
};

export default RawMaterialInfo;
