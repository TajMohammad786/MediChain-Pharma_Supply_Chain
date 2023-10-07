// import React, { useEffect, useState } from 'react';
// import { Web3Context } from '../../Context/Web3Context';
// import { useContext } from 'react';

// const ViewRawMaterial = () => {
//   const { webData } = useContext(Web3Context);
//   const { account, supplyChain, web3 } = webData;
//   const [rawMaterialAddresses, setRawMaterialAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const handleOnClick = async () => {
//     const addresses = await supplyChain.methods.getAllPackages().call({ from: account });
//     setRawMaterialAddresses(addresses);
//   };

//   const handleAddressClick = (address) => {
//     setSelectedAddress(address);
//   };

//   return (
//     <div>
//       <button className="bg-green-700" onClick={handleOnClick}>
//         View Raw Material
//       </button>
//       <ul>
//         {rawMaterialAddresses.map((address, index) => (
//           <li key={index} onClick={() => handleAddressClick(address)}>
//             {address}
//           </li>
//         ))}
//       </ul>
//       {selectedAddress && (
//         <div>
//           <h2>Selected Address Details:</h2>
//           <p>Address: {selectedAddress}</p>
//           {/* Add code to display more details for the selected address here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewRawMaterial;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Web3Context } from '../../Context/Web3Context';
import { useContext } from 'react';

const ViewRawMaterials = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  async function fetchRawMaterialAddresses() {
    try {
        const rawMaterialAddresses = await supplyChain.methods.getAllPackages().call({ from: account });
        setAddresses(rawMaterialAddresses);
        setLoading(false);
      
    } catch (error) {
      console.error('Error fetching raw material addresses:', error);
    }
  }
  

  useEffect(() => {
    fetchRawMaterialAddresses();
  }, [account, supplyChain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading raw material addresses...</p>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Raw Material Addresses</h1>
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className="mb-2">
              <Link to={`/supplier/view-raw-material/${address}`} className="text-blue-500 hover:underline">
                {address}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ViewRawMaterials;

