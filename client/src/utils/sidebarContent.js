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