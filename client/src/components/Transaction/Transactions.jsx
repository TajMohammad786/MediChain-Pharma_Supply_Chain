import React, { useEffect, useState } from "react";
import Transactions from "../../contracts/Transactions.json";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import TransactionRow from "./TransactionRow";
import getTransactions from "../../utils/getTransactions";

const ViewTransactions = () => {
  const { address } = useParams();
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTxnData() {
    const transaction = new web3.eth.Contract(Transactions.abi, address);
    let txns = await transaction.methods
      .getAllTransactions()
      .call({ from: account });
    setTransactions(txns);

    const transactionsForDatabase = [];
    for (let t in txns) {
      let obj = {};
      obj["transaction_hash"] = txns[t][0];
      obj["from"] = txns[t][1];
      obj["to"] = txns[t][2];
      obj["prev_transaction_hash"] = txns[t][3];
      obj["latitude"] = txns[t][4];
      obj["longitude"] = txns[t][5];
      obj["timestamps"] = txns[t][6] + "";
      transactionsForDatabase.push(obj);
    }
    console.log(transactionsForDatabase);
    // TODO: first convert this transaction object as per the database model
    getTransactions(transactionsForDatabase);
    setLoading(false);
  }

  useEffect(() => {
    getTxnData();
  }, [account, address]);
  console.log(transactions);
  return (
    <div className="" id="table">
      <h1 className="m-2 text-2xl font-bold">Transactions List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-900 dark:bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="min-w-[120px] break-all px-3 py-2 text-center"
                >
                  TxnHash
                </th>
                <th
                  scope="col"
                  className="min-w-[120px] break-all px-3 py-2 text-center"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="min-w-[120px] break-all px-3 py-2 text-center"
                >
                  To
                </th>
                <th scope="col" className="min-w-[120px] break-all px-3 py-2">
                  Previous TxnHash
                </th>
                <th
                  scope="col"
                  className="min-w-[120px] break-all px-3 py-2 text-center"
                >
                  Lat
                </th>
                <th
                  scope="col"
                  className="min-w-[120px] break-all px-3 py-2 text-center"
                >
                  Lng
                </th>
                <th scope="col" className="min-w-[120px] break-all px-3 py-2">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((data, index) => (
                  <TransactionRow
                    key={index}
                    txn_hash={data[0]}
                    from={data[1]}
                    to={data[2]}
                    previous_txn_hash={data[3]}
                    latitude={data[4]}
                    longitude={data[5]}
                    timestamps={data[6]}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTransactions;
