import { createContext, useState } from "react";
import { mainRoutes } from "../utils/sidebarContent";
import toast from "react-hot-toast";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [webData, setWebData] = useState({
    web3: null,
    account: null,
    supplyChain: null,
  });
  const [balance, setBalance] = useState();

  // console.log(webData.account);
  const [sidebarRoutes, setSidebarRoutes] = useState(mainRoutes);
  // const getMetamaskBalance = (address) => {
  //   window.ethereum
  //     .request({
  //       method: "eth_getBalance",
  //       params: [address, "latest"],
  //     })
  //     .then((balance) => {
  //       setBalance(balance);
  //     })
  //     .catch((err) => {
  //       toast.error("Unable to get Balance");
  //     });
  // };
  const getMetamaskBalance = (address) => {
    if (!address) {
      console.error("No Ethereum address provided.");
      return;
    }
  
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // console.log("Balance:", balance);
        setBalance(balance);
      })
      .catch((err) => {
        console.error("Error getting balance:", err);
        toast.error("Unable to get Balance");
      });
  };
  // console.log(balance);
  return (
    <Web3Context.Provider
      value={{
        webData,
        setWebData,
        sidebarRoutes,
        setSidebarRoutes,
        balance,
        getMetamaskBalance,
        setBalance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
