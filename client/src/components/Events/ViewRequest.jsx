// import React, { useEffect, useState } from 'react';
// import { Web3Context } from '../../Context/Web3Context';
// import { useContext } from 'react';
// import { useParams } from 'react-router-dom';

// const ViewRequest = () => {
//   const { address } = useParams();
//   //   console.log(address);
//   const { webData } = useContext(Web3Context);
//   const { account, supplyChain, web3 } = webData;
//   const [data, setData] = useState({})
//   // console.log(supplyChain);

//   async function getEvents() {
//     const events = await supplyChain.getPastEvents('buyEvent', {
//       filter: { packageAddr: address },
//       fromBlock: 0,
//       toBlock: 'latest'
//     });
//     setData(events);
//     console.log(data[0].returnValues);
//   }

//   // useEffect(() => {
//   //   getEvents();
//   // }, []);

//   return (
//     <div>
//       <h1 className="m-2">View Request</h1>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 bg-white">
//           <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-400 ">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Buyer Address
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Seller Address
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Package Address
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Signature
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Timestamp
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="bg-gray-100 border-b">
//               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//               {/* {data[0].returnValues[0]} */}
//               </th>
//               <td className="px-6 py-4">
//               {/* {data[0].returnValues[ 1 ]} */}
//               </td>
//               <td className="px-6 py-4">
//               {/* {data[0].returnValues[ 2 ]} */}
//               </td>
//               <td className="px-6 py-4">
//                 {/* ${data[0].returnValues[ 3 ]} */}
//               </td>
//               <td className="px-6 py-4">
//                 <a href="#" className="font-medium">{new Date(Number(data[0].returnValues[ 4 ])  * 1000).toString()}</a>
//               </td>
//               <td className="px-6 py-4">
//                 <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
//               </td>
//             </tr>
//             <tr className="bg-gray-100 border-b">
//               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                 Microsoft Surface Pro
//               </th>
//               <td className="px-6 py-4">
//                 White
//               </td>
//               <td className="px-6 py-4">
//                 Laptop PC
//               </td>
//               <td className="px-6 py-4">
//                 $1999
//               </td>
//               <td className="px-6 py-4">
//                 <a href="#" className="font-medium">timestamp</a>
//               </td>
//               <td className="px-6 py-4">
//                 <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
//               </td>
//             </tr>
//             <tr className="bg-gray-100">
//               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                 Magic Mouse 2
//               </th>
//               <td className="px-6 py-4">
//                 Black
//               </td>
//               <td className="px-6 py-4">
//                 Accessories
//               </td>
//               <td className="px-6 py-4">
//                 $99
//               </td>
//               <td className="px-6 py-4">
//                 <a href="#" className="font-medium">timestamp</a>
//               </td>
//               <td className="px-6 py-4">
//                 <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <button className="rounded border-0 mt-2 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none" onClick={getEvents}>Refresh</button>
//     </div>
//   )
// }

// export default ViewRequest

import React, { useEffect, useState } from "react";
import RawMaterial from "../../contracts/RawMaterial.json";
import Medicine from "../../contracts/Medicine.json";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewRequest = () => {
  const { address } = useParams();
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getEvents() {
    // try {
    const events = await supplyChain.getPastEvents("buyEvent", {
      filter: { packageAddr: address },
      fromBlock: 0,
      toBlock: "latest",
    });
    setData(events);

    setLoading(false);
    // console.log(data);
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
  }

  async function verifySignature(buyerAddress, signature) {
    // console.log(signature);
    const v = "0x" + signature.slice(130, 132); // uint8
    const r = signature.slice(0, 66); // bytes32
    const s = "0x" + signature.slice(66, 130); // bytes32
    let messageHash = web3.eth.accounts.hashMessage(address);
    let verificationOutput = await supplyChain.methods
      .verify(buyerAddress, messageHash, v, r, s)
      .call({ from: account });
    // console.log(verificationOutput);
    if (verificationOutput) {
      toast.success("Buyer is verified successfully!");
      // signature = prompt('Enter signature');

      supplyChain.methods
        .respondToEntity(buyerAddress, account, address, signature)
        .send({ from: account });
      console.log(account);
      const data = await supplyChain.methods
        .getUser(account)
        .call({ gas: 3000000 });
      // console.log(data);
      const role = Number(data[2]);
      // console.log(role);
      // const role = 3;
      if (role === 3) {
        const rawMaterial = new web3.eth.Contract(RawMaterial.abi, address);
        rawMaterial.methods
          .updateManufacturerAddress(buyerAddress)
          .send({ from: account });
        toast.success("Response sent to manufacturer");
      } else if (role === 4) {
        const medicine = new web3.eth.Contract(Medicine.abi, address);
        medicine.methods
          .updateWholesalerAddress(buyerAddress)
          .send({ from: account });
        toast.success("Response sent to wholesaler");
      } else if (role === 5) {
        const medicine = new web3.eth.Contract(Medicine.abi, address);
        medicine.methods
          .updateDistributorAddress(buyerAddress)
          .send({ from: account });
        toast.success("Response sent to distributor");
      } else {
        console.log("error");
      }
    } else {
      alert("Buyer is not verified!");
    }
  }

  useEffect(() => {
    if (supplyChain) {
      getEvents();
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1 className="m-2">View Request</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full bg-white text-left text-sm text-gray-500">
            <thead className="dark-bg-gray-400 bg-gray-50 text-xs uppercase text-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Buyer Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Seller Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Package Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Signature
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((event, index) => (
                <tr key={index} className="border-b bg-gray-100">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                  >
                    <div
                      className="overflow-hidden"
                      style={{ maxWidth: "150px" }}
                    >
                      <span title={event.returnValues.buyer}>
                        {event.returnValues.buyer}
                      </span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div
                      className="overflow-hidden"
                      style={{ maxWidth: "150px" }}
                    >
                      <span title={event.returnValues.seller}>
                        {event.returnValues.seller}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="overflow-hidden"
                      style={{ maxWidth: "150px" }}
                    >
                      <span title={event.returnValues.packageAddr}>
                        {event.returnValues.packageAddr}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="overflow-hidden"
                      style={{ maxWidth: "150px" }}
                    >
                      <span title={event.returnValues.signature}>
                        {event.returnValues.signature}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">
                      {new Date(
                        Number(event.returnValues.timestamp) * 1000,
                      ).toString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-md rounded border-0 bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600 focus:outline-none"
                      onClick={() =>
                        verifySignature(
                          event.returnValues.buyer,
                          event.returnValues.signature,
                        )
                      }
                    >
                      Verify Signature
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewRequest;
