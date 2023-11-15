import React, { useContext, useEffect } from "react";
import { Web3Context } from "../Context/Web3Context";
import { transporterRoutes } from "../utils/sidebarContent";
import { Outlet } from "react-router-dom";

const Transporter = () => {
  const { setSidebarRoutes } = useContext(Web3Context);

  useEffect(() => {
    setSidebarRoutes(transporterRoutes);
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Transporter;
