import React from 'react'
import { useContext, useState } from 'react';
import { Web3Context } from '../../Context/Web3Context';
// import RawMaterial from '../../contracts/RawMaterial.json';
import Transactions from '../../contracts/Transactions.json';
import toast from 'react-hot-toast';
import Medicine from '../../contracts/Medicine.json';

const DistributorReceiveMedicine = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setAddress(e.target.value);
  }

  async function verifySignature(sellerAddress, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);
    let verificationOutput = await supplyChain.methods.verify(sellerAddress, messageHash, v, r, s).call({from: account});
    
    return verificationOutput;
  }

  async function handleSubmit() {
    let medicine = new web3.eth.Contract(Medicine.abi, address);
    let data = await medicine.methods.getMedicineInfo().call({from: account});
    let events = await supplyChain.getPastEvents('sendEvent', {filter: {packageAddr: address}, fromBlock: 0, toBlock: 'latest'});
    events = events.filter((event) => {
      return event.returnValues.packageAddr == address;
    });

    console.log(events);
    
    // I have to look on this in future ******* suuplier address needs to be there
    let wholesaler = data[0];
    console.log(wholesaler)
    // let supplier = events[0]['returnValues'][1];
    let signature = events[0]['returnValues'][3];
    // console.log(supplier, signature)
    let verificationOutput = await verifySignature(wholesaler, signature);
    // console.log(address, account,  supplier,  signature);
    // console.log(verificationOutput);
    if(verificationOutput) {
      toast.success('Signature Verified Successfully!!');
      let subcontractAddress = await supplyChain.methods.getSubContractWD(address).call({ from: account, gas: 3000000 });
      supplyChain.methods.distributorReceivedMedicine(address, subcontractAddress, wholesaler, signature).send({from: account, gas: 3000000})
        .once('receipt', async (receipt) => {
          let txnContractAddress = data[7];
          let transporterAddress = data[4][data[4].length - 1];
          let txnHash = receipt.transactionHash;
          const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
          let txns = await transactions.methods.getAllTransactions().call({from: account});
          let prevTxn = txns[txns.length - 1][0];
          transactions.methods.createTxnEntry(txnHash, transporterAddress, account, prevTxn, '10', '10').send({from: account, gas:3000000});
        });
    }
  }
  if (loading) { 
    return (
      <div>
        <p>Package with address <b>{address}</b> received!</p>
      </div>
    );
  }


  return (
    <div>
    <h1 className="text-center font-head text-xl font-bold">
        Receive Medicine
    </h1>

    <div className="relative my-2 mb-4">
        <label
            htmlFor="description"
            className="text-sm leading-7 text-gray-600"
        >
        Package Address
        </label>
        <input
            type="text"
            id="packageAddr"
            name="packageAddr"
            className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            // value={formData.description}
            onChange={handleOnChange}
            placeholder='Enter Package Address'
        />
    </div>
    <button className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        onClick={handleSubmit}
    >
        Submit
    </button>
    </div>
  )
}

export default DistributorReceiveMedicine
