import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidUserCircle, BiSolidMessageSquareAdd } from "react-icons/bi";

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
    icon: MdSpaceDashboard,
    childrenRoutes: [],
  },
  {
    heading: "Transporter",
    path: "/transporter",
    icon: MdSpaceDashboard,
    childrenRoutes: [],
  },
  {
    heading: "Manufacturer",
    path: "/manufacturer",
    icon: MdSpaceDashboard,
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
    icon: BiSolidMessageSquareAdd,
    childrenRoutes: [],
  },
];
