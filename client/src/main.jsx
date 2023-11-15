import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import SupplierDashboard from "./components/Supplier/Dashboard.jsx";
import ManufacturerDashboard from "./components/Manufacturer/Dashboard.jsx";
import TransporterDashboard from "./components/Transporter/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";
import Owner from "./components/Admin/User/Owner.jsx";
import AddUser from "./components/Admin/User/AddUser.jsx";
import ChangeRole from "./components/Admin/User/ChangeRole.jsx";
import ViewUser from "./components/Admin/User/ViewUser.jsx";
import { Web3Provider } from "./Context/Web3Context.jsx";
import Supplier from "./pages/Supplier.jsx";
import Manufacturer from "./pages/Manufacturer.jsx";
import Transporter from "./pages/Transporter.jsx";
import HandlePackage from "./components/Transporter/HandlePackage.jsx";
import AddMaterial from "./components/Supplier/AddMaterial.jsx";
import ViewRawMaterial from "./components/Supplier/ViewRawMaterial.jsx";
import RawMaterialInfo from "./components/Supplier/RawMaterialInfo.jsx";
import ViewRequest from "./components/Events/ViewRequest.jsx";
import ViewResponse from "./components/Events/ViewResponse.jsx";

import RequestProduct from "./components/Manufacturer/RequestProduct.jsx";
import { SidebarContextProvider } from "./Context/SidebarContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />

      {/* admin */}
      <Route path="owner" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<Owner />}>
          <Route path="add" element={<AddUser />} />
          <Route path="change" element={<ChangeRole />} />
          <Route path="view" element={<ViewUser />} />
        </Route>
      </Route>

      {/* transporter */}
      <Route path="transporter" element={<Transporter />}>
        <Route path="dashboard" element={<TransporterDashboard/>} />
        <Route path="handle-package" element={<HandlePackage />} />
      </Route>

      {/* supplier */}
      <Route path="supplier" element={<Supplier />}>
        <Route path="dashboard" element={<SupplierDashboard />} />
        <Route path="add-material" element={<AddMaterial />} />
        <Route path="view-material" element={<ViewRawMaterial />} />
        <Route path="view-raw-material/:address" element={<RawMaterialInfo />}>
          <Route path=":id" element={<RawMaterialInfo />} />
        </Route>
        <Route path="view-request/:address" element={<ViewRequest />} />
      </Route>

      {/*Manufacturer*/}
      <Route path="manufacturer" element={<Manufacturer />}>
        <Route path="dashboard" element={<ManufacturerDashboard />} />
        <Route path="request-product" element={<RequestProduct />} />
        <Route path="view-response" element={<ViewResponse />} />
      </Route>

      <Route path="*" element={<div>404 Page Not Found!</div>} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3Provider>
      <SidebarContextProvider>
        <RouterProvider router={router} />
      </SidebarContextProvider>
    </Web3Provider>
  </React.StrictMode>,
);
