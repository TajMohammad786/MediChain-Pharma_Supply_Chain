import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidUserCircle, BiSolidMessageSquareAdd } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { FaTruckMedical, FaIndustry } from "react-icons/fa6";
import { HiMiniViewfinderCircle } from "react-icons/hi2";

export const mainRoutes = [
  {
    heading: "Owner",
    path: "/owner",
    icon: MdSpaceDashboard,
    childrenRoutes: [],
  },
  {
    heading: "Supplier",
    path: "/supplier",
    icon: MdPlaylistAdd,
    childrenRoutes: [],
  },
  {
    heading: "Transporter",
    path: "/transporter",
    icon: FaTruckMedical,
    childrenRoutes: [],
  },
  {
    heading: "Manufacturer",
    path: "/manufacturer",
    icon: FaIndustry,
    childrenRoutes: [],
  },
];

export const adminRoutes = [
  {
    heading: "Dashboard",
    path: "/owner/dashboard",
    icon: MdSpaceDashboard,
    childrenRoutes: [],
  },
  {
    heading: "User",
    path: "/owner/user",
    icon: BiSolidUserCircle,
    childrenRoutes: ["add", "view", "change"],
  },
];

export const supplierRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/supplier/dashboard",
    icon: MdSpaceDashboard,
    childrenRoutes: [],
  },
  {
    heading: "Add Material",
    heading: "Add Material",
    path: "/supplier/add-material",
    icon: BiSolidMessageSquareAdd,
    childrenRoutes: [],
  },
  {
    heading: "View Material",
    heading: "View Material",
    path: "/supplier/view-material",
    icon: HiMiniViewfinderCircle,
    childrenRoutes: [],
  },
];

export const manufacturerRoutes = [
  {
    heading: "Dashboard",
    heading: "Dashboard",
    path: "/manufacturer/dashboard",
    icon: MdSpaceDashboard,
    childrenRoutes: [],
  },
  {
    heading: "Request Product",
    heading: "Request Product",
    path: "/manufacturer/request-product",
    icon: BiSolidMessageSquareAdd,
    childrenRoutes: [],
  },
];
