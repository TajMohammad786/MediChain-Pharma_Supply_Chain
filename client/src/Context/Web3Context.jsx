import { createContext, useState } from "react";
import { mainRoutes } from "../utils/sidebarContent";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [webData, setWebData] = useState({
    web3: null,
    account: null,
    supplyChain: null,
  });
  const [sidebarRoutes, setSidebarRoutes] = useState(mainRoutes);

  return (
    <Web3Context.Provider
      value={{ webData, setWebData, sidebarRoutes, setSidebarRoutes }}
    >
      {children}
    </Web3Context.Provider>
  );
};
