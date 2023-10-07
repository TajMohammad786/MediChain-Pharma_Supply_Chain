import React, { useContext, useEffect } from "react";
import { Web3Context } from "../Context/Web3Context";
import { supplierRoutes } from "../utils/sidebarContent";
import { Outlet } from "react-router-dom";

const Supplier = () => {
  const { setSidebarRoutes } = useContext(Web3Context);

  useEffect(() => {
    setSidebarRoutes(supplierRoutes);
  }, []);
  return (
    <div>
      
      <Outlet />
    </div>
  );
};

export default Supplier;
