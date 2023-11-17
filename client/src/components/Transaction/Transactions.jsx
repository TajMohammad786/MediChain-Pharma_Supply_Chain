import React, { useEffect, useState } from 'react';
import Transactions from '../../contracts/Transactions.json';
import { Web3Context } from '../../Context/Web3Context';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewTransactions = () => {
  const { address } = useParams();
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTxnData() {
    const transaction = new web3.eth.Contract(Transactions.abi, address);
    let txns = await transaction.methods.getAllTransactions().call({ from: account });
    const txnsList = txns.map((data, index) => (
      <tr key={index} className="border-b bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
          <div className="max-w-sm overflow-hidden overflow-ellipsis">
            <span title={data[0]}>{data[0]}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
          <div className="max-w-xs">
            <span title={data[1]}>{data[1]}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
          <div className="max-w-xs">
            <span title={data[2]}>{data[2]}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
          <div className="max-w-xs">
            <span title={data[3]}>{data[3]}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
          <div className="max-w-xs">
            <span title={data[4]}>{data[4]}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
          <div className="max-w-xs">
            <span title={data[5]}>{data[5]}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="max-w-xs">
            <span title={new Date(Number(data[6]) * 1000).toString()}>
              {new Date(Number(data[6]) * 1000).toString()}
            </span>
          </div>
        </td>
      </tr>
    ));
    setDetails(txnsList);
    setLoading(false);
  }

  useEffect(() => {
    getTxnData();
  }, [account, address]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <h1 className="m-2 text-2xl font-bold">Transactions List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full bg-white text-left text-sm text-gray-500">
            <thead className="dark:bg-gray-200 bg-gray-50 text-xs uppercase text-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>
                  TxnHash
                </th>
                <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>
                  From
                </th>
                <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>
                  To
                </th>
                <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>
                  Previous TxnHash
                </th>
                <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>
                  Lat
                </th>
                <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>
                  Lng
                </th>
                <th scope="col" className="px-6 py-3" >
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>{details}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTransactions;
