import React from "react";

const TransactionRow = ({
  txn_hash,
  from,
  to,
  previous_txn_hash,
  latitude,
  longitude,
  timestamps,
}) => {
  return (
    <tr className="border-b bg-gray-100">
      <td className="min-w-[140px] break-all px-3 py-3">
        <div className="max-w-sm overflow-hidden overflow-ellipsis">
          <span title={txn_hash}>{txn_hash}</span>
        </div>
      </td>
      <td className="min-w-[140px] break-all px-3 py-3">
        <span title={from}>{from}</span>
      </td>
      <td className="min-w-[140px] break-all px-3 py-3">
        <span title={to}>{to}</span>
      </td>
      <td className="min-w-[140px] break-all px-3 py-3">
        <span title={previous_txn_hash}>{previous_txn_hash}</span>
      </td>
      <td className="min-w-[140px] break-all px-3 py-3 text-center">
        <span title={latitude}>{latitude}</span>
      </td>
      <td className="min-w-[140px] break-all px-3 py-3  text-center">
        <span title={longitude}>{longitude}</span>
      </td>
      <td className=" px-3 py-3">
        <span title={new Date(Number(timestamps) * 1000).toString()}>
          {new Date(Number(timestamps) * 1000).toString()}
        </span>
      </td>
    </tr>
  );
};

export default TransactionRow;