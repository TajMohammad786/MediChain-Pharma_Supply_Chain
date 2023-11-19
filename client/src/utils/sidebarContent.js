import {
  MdAddTask,
  MdChangeCircle,
  MdSpaceDashboard,
  MdViewKanban,
} from "react-icons/md";
import { BiSolidUserCircle, BiSolidMessageSquareAdd } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { FaTruckMedical, FaIndustry } from "react-icons/fa6";
import { HiMiniViewfinderCircle } from "react-icons/hi2";

export const mainRoutes = [
  {
    heading: "Owner",
    path: "/owner",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Supplier",
    path: "/supplier",
    icon: MdPlaylistAdd,
  },
  {
    heading: "Transporter",
    path: "/transporter",
    icon: FaTruckMedical,
  },
  {
    heading: "Manufacturer",
    path: "/manufacturer",
    icon: FaIndustry,
  },
  {
    heading: "Wholesaler",
    path: "/wholesaler",
    icon: FaTruckMedical,
  },
  {
    heading: "Distributor",
    path: "/distributor",
    icon: MdPlaylistAdd,
  },
];

export const adminRoutes = [
  {
    heading: "Dashboard",
    path: "/owner/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Add User",
    path: "/owner/user/add",
    icon: MdAddTask,
  },
  {
    heading: "View User",
    path: "/owner/user/view",
    icon: MdViewKanban,
  },
  {
    heading: "Change Role",
    path: "/owner/user/change",
    icon: MdChangeCircle,
  },
];

export const supplierRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/supplier/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Generate Signature",
    heading: "Generate Signature",
    path: "/supplier/generate-signature",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Add Material",
    heading: "Add Material",
    path: "/supplier/add-material",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Material",
    heading: "View Material",
    path: "/supplier/view-material",
    icon: HiMiniViewfinderCircle,
  },
 
];

export const manufacturerRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/manufacturer/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Generate Signature",
    heading: "Generate Signature",
    path: "/supplier/generate-signature",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Request Product",
    heading: "Request Product",
    path: "/manufacturer/request-product",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Response",
    heading: "View Response",
    path: "/manufacturer/view-response",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Receive Product",
    heading: "Receive Product",
    path: "/manufacturer/receive-product",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Material",
    heading: "View Material",
    path: "/manufacturer/view-material",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Create Medicine",
    heading: "Create Medicine",
    path: "/manufacturer/create-medicine",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "View Medicine",
    heading: "View Medicine",
    path: "/manufacturer/view-medicine",
    icon: BiSolidMessageSquareAdd,
  },
];


export const transporterRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/transporter/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Handle Package",
    heading: "Handle Package",
    path: "/transporter/handle-package",
    icon: BiSolidMessageSquareAdd,
  },


  
];
export const wholesalerRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/wholesaler/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Generate Signature",
    heading: "Generate Signature",
    path: "/supplier/generate-signature",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Request Product",
    heading: "Request Product",
    path: "/wholesaler/request-product",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Response",
    heading: "View Response",
    path: "/wholesaler/view-response",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Receive Product",
    heading: "Receive Product",
    path: "/wholesaler/receive-product",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Medicine",
    heading: "View Medicine",
    path: "/wholesaler/view-medicine",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Transfer Medicine",
    heading: "Transfer Medicine",
    path: "/wholesaler/transfer-medicine",
    icon: BiSolidMessageSquareAdd,
  },
];

export const distributorRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/distributor/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    heading: "Generate Signature",
    heading: "Generate Signature",
    path: "/supplier/generate-signature",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Request Product",
    heading: "Request Product",
    path: "/distributor/request-product",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Response",
    heading: "View Response",
    path: "/distributor/view-response",
    icon: HiMiniViewfinderCircle,
  },
  {
    heading: "Receive Medicine",
    heading: "Receive Medicine",
    path: "/distributor/receive-product",
    icon: BiSolidMessageSquareAdd,
  },
  {
    heading: "View Medicine",
    heading: "View Medicine",
    path: "/distributor/view-medicine",
    icon: HiMiniViewfinderCircle,
  },
];