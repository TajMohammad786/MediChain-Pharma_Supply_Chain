import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import initWeb3 from "./utils/initWeb3";
import { Web3Context } from "./Context/Web3Context";
function App() {
  const [progress, setProgress] = useState(0);
  // const [accounts, setAccounts] = useState(null);

  const { webData, setWebData, sidebarRoutes, setSidebarRoutes } =
    useContext(Web3Context);
  

  // initialize web3
  useEffect(() => { 
    async function getWeb3() {
      setProgress(50);
      const { web3, supplyChain, account } = await initWeb3();
      setWebData({
        web3: web3,
        supplyChain: supplyChain,
        account: account,
      })
      setProgress(100);
    }
    getWeb3();
    
  }, []);
 
  return (
    <div className="flex min-h-screen flex-col font-para">
      <Toast />
      <LoadingBar color="#f11946" progress={progress} />
      <Header />
      <div
        className={`flex-grow-1 container mx-auto grid flex-1 grid-cols-[auto,1fr] overflow-auto`}
      >
        <Sidebar />
        <div className="container mx-auto flex-1 overflow-x-hidden px-8 py-5">
          <Outlet context={[setProgress]} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
