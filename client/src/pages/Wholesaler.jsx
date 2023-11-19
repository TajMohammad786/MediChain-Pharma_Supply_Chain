import React, { useContext, useEffect } from "react";
import { Web3Context } from "../Context/Web3Context";
import { wholesalerRoutes } from "../utils/sidebarContent";
import { Outlet } from "react-router-dom";

const Wholesaler = () => {
  const { setSidebarRoutes } = useContext(Web3Context);

  useEffect(() => {
    setSidebarRoutes(wholesalerRoutes);
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Wholesaler
