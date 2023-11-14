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
];
