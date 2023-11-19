import React, { useEffect, useState } from "react";
import RawMaterial from "../../contracts/RawMaterial.json";
import Medicine from "../../contracts/Medicine.json";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewResponse = (props) => {
  
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getEvents() {
    // console.log(props.account)
    // try {
    const events = await supplyChain.getPastEvents("respondEvent", {

      //Work on this later
      filter: { buyer: account },
      fromBlock: 0,
      toBlock: "latest",
    });
    setData(events);

    // console.log(data);

    setLoading(false);
    // console.log(data);
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
  }

  async function verifySignature(sellerAddress, signature) {
    // console.log(signature);
    const v = "0x" + signature.slice(130, 132); // uint8
    const r = signature.slice(0, 66); // bytes32
    const s = "0x" + signature.slice(66, 130); // bytes32
    const pkgAddress = data[0].returnValues.packageAddr;
    let messageHash = web3.eth.accounts.hashMessage(pkgAddress);

    let verificationOutput = await supplyChain.methods
      .verify(sellerAddress, messageHash, v, r, s)
      .call({ from: account });
    // console.log(verificationOutput);
    if (verificationOutput) {
      toast.success("Seller is verified successfully!");
    } else {
      toast.error("Buyer is not verified!");
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
      <h1 className="m-2">View Response</h1>

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
                          event.returnValues.seller,
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

export default ViewResponse;
