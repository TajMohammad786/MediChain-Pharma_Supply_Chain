import React, { useContext, useEffect } from "react";
import { Web3Context } from "../Context/Web3Context";
import { manufacturerRoutes } from "../utils/sidebarContent";
import { Outlet } from "react-router-dom";

const Manufacturer = () => {
  const { setSidebarRoutes } = useContext(Web3Context);

  useEffect(() => {
    setSidebarRoutes(manufacturerRoutes);
  }, []);
  return (
    <div>
      
      <Outlet />
    </div>
  );
};

export default Manufacturer;
