import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { adminRoutes } from "./utils/sidebarContent";
import initWeb3 from "./utils/initWeb3";
import { Web3Context } from "./Context/Web3Context";
function App() {
  const { webData, setWebData, sidebarRoutes, setSidebarRoutes } =
    useContext(Web3Context);  
  const [openSideBar, setOpenSideBar] = useState(false);


  
  // initialize web3
  useEffect(() => {
    async function getWeb3() {
      const { web3, supplyChain, account } = await initWeb3();
      setWebData({
        web3: web3,
        supplyChain: supplyChain,
        account: account,
      });
    }
    getWeb3();
  }, []);
  // console.log(webData)
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col justify-between font-para">
      <Toast />
      <Header setOpenSideBar={setOpenSideBar} />
      <div
        className={`grid h-[calc(100vh-55px)] flex-1 ${
          openSideBar ? "grid-cols-[230px_1fr]" : "grid-cols-[100px_1fr]"
        } container mx-auto`}
      >
        <Sidebar openSideBar={openSideBar} />
        <div className="m-10 flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
