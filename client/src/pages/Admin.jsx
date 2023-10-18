import { Outlet } from "react-router-dom";
import { Web3Context } from "../Context/Web3Context";
import { useContext, useEffect } from "react";
import { adminRoutes } from "../utils/sidebarContent";

const user = "admin";
const Admin = () => {
  const { webData, setSidebarRoutes } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  // console.log({ account, supplyChain, web3 })

  useEffect(() => {
    setSidebarRoutes(adminRoutes);
  }, []);
  if (user !== "admin") return;
  return (
    <>
      <Outlet />
    </>
  );
};

export default Admin;
