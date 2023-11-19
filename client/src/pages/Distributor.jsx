import React, { useContext, useEffect } from "react";
import { Web3Context } from "../Context/Web3Context";
import { distributorRoutes } from "../utils/sidebarContent";
import { Outlet } from "react-router-dom";

const Distributor = () => {
  const { setSidebarRoutes } = useContext(Web3Context);

  useEffect(() => {
    setSidebarRoutes(distributorRoutes);
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Distributor;
