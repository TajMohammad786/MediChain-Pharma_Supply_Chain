import Web3, { net } from "web3";
import SupplyChain from "../contracts/SupplyChain.json";
// import { useState } from "react";
// import { useContext } from "react";

const initWeb3 = async () => {
  // const { webData, setWebData} = useContext(Web3Context);
  const provider = new Web3.providers.HttpProvider("http://localhost:8545");
  const web3 = new Web3(provider);
  
  //   console.log(web3)
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SupplyChain.networks[networkId];
  //   console.log(networkId, deployedNetwork)
  const supplyChain = new web3.eth.Contract(
    SupplyChain.abi,
    deployedNetwork && deployedNetwork.address,
  );
  //   console.log(supplyChain)
  const deployerTransaction = await web3.eth.getTransaction(
    deployedNetwork.transactionHash,
  );
  //   console.log(deployerTransaction)
  const deployerAccount = deployerTransaction.from;
  // console.log(web3)
  // console.log(supplyChain)
  return {
    web3: web3,
    supplyChain: supplyChain,
    account: deployerAccount,
  };
};
export default initWeb3;
