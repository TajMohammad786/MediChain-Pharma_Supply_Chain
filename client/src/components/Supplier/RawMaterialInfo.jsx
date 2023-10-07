import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Web3Context } from '../../Context/Web3Context';
import { useContext } from 'react';
import RawMaterial from '../../contracts/RawMaterial.json';
import { getTrimmedString } from '../../utils/getTrimmedString';

const RawMaterialInfo = () => {
  const { address } = useParams();
//   console.log(address);
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [details, setDetails] = useState({
    productid: "",
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
  }

  async function fetchRawMaterialData() {
    try {
        let rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
        let data = await rawMaterial.methods.getSuppliedRawMaterials().call({ from: address });
        const {
            0: productid,
            1: description,
            2: quantity,
            3: supplier,
            4: transporter,
            5: manufacturer,
            6: txnContractAddress, 
        } = data;
        setDetails({ productid, description, quantity, supplier, transporter, manufacturer, txnContractAddress }); 
        setLoading(false);

    } catch (error) {
      console.error('Error fetching raw material data:', error);
    }
  }

  useEffect(() => {
    fetchRawMaterialData();
  }, [address]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading raw material details...</p>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 p-3">
        <h1 className="text-3xl font-bold mb-4">Raw Material Details</h1>
        <div className="mb-4">
          <p className="font-semibold mb-2">Generated Product ID: &nbsp; <span className='font-medium' >{details.productid}</span></p>
          <p className="font-semibold mb-2">Raw Material Address: &nbsp;
          <span className='font-medium'>{details.supplier}</span></p>
          <p className="font-semibold mb-2">Raw Material Description: &nbsp; 
          <span className='font-medium'>{getStringName(details.description)}</span></p>
          <p className="font-semibold mb-2">Raw Material Quantity: &nbsp; 
          <span className='font-medium'>{Number(details.quantity)}</span></p>
          <p className="font-semibold mb-2">Raw Material Manufacturer: &nbsp;
          <span className='font-medium'>{details.manufacturer}</span></p>
          <p className="font-semibold mb-2">Raw Material Transporter: &nbsp;
          <span className='font-medium'>{details.transporter}</span></p>
           <p className="font-semibold mb-2">Transaction Contract Address: &nbsp;
          <span className='font-medium'>{details.txnContractAddress}</span></p>
        </div>
        {/* <Link to={`/supplier/view-request/${address}`} className="text-blue-500 hover:underline">
          View Requests
        </Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4" onClick={sendPackage}>
          Send Package
        </button> */}
      </div>
    );
  }
};

export default RawMaterialInfo;
