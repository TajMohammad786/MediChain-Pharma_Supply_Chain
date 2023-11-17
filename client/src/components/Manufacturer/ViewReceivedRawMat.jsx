import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import RawMaterial from "../../contracts/RawMaterial.json";
import { getTrimmedString } from "../../utils/getTrimmedString";

const ViewRawMaterials = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [rawMaterialDescription, setRawMaterialDescription] = useState([]);

  const getRawMaterialData = async (address) => {
    let rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
    let data = await rawMaterial.methods
      .getSuppliedRawMaterials()
      .call({ from: address });
    let status = await rawMaterial.methods
      .getRawMaterialStatus()
      .call({ from: account });
    setRawMaterialDescription([
      ...rawMaterialDescription,
      getTrimmedString(web3, data[1]),
    ]);
  };

  

  async function fetchRawMaterialAddresses() {
    try {
      const rawMaterialAddresses = await supplyChain.methods
        .getAllRawMaterials()
        .call({ from: account });
      setAddresses(rawMaterialAddresses);
      for (let address in rawMaterialAddresses) {
        getRawMaterialData(rawMaterialAddresses[address]);
      }
      setLoading(false);
      // console.log(rawMaterialAddresses);
    } catch (error) {
      console.error("Error fetching raw material addresses:", error);
    }
  }

  useEffect(() => {
    fetchRawMaterialAddresses();
    // console.log(account);
  }, [account, supplyChain]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl">Loading raw material addresses...</p>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen p-4">
        <h1 className="mb-4 font-head text-3xl font-bold">
          Received Raw Materials
        </h1>
        <ul className="mt-2">
          {addresses.map((address, index) => (
            <li key={index} className="mb-2 text-fuchsia-500">
              <Link
                to={`/manufacturer/view-raw-material/${address}`}
                className="capitalize hover:underline"
              >
                {rawMaterialDescription[index]} :-  &nbsp; {address} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ViewRawMaterials;
