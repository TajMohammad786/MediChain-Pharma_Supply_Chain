import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Web3Context } from "../Context/Web3Context";
import { SidebarContext } from "../Context/SidebarContext";

function Sidebar() {
  const { sidebarRoutes } = useContext(Web3Context);
  const { isSmallOpen } = useContext(SidebarContext);

  return (
    <>
      {isSmallOpen ? (
        <aside
          className={`scrollbar-hidden sticky flex flex-col items-center overflow-y-auto pb-4 transition-all duration-500 ${isSmallOpen} : "" : "hidden"`}
        >
          {sidebarRoutes.map((route, index) => (
            <SmallSideBarIcon
              key={index}
              Icon={route.icon}
              title={route.heading}
              path={route.path}
            />
          ))}
        </aside>
      ) : (
        <aside
          className={`scrollbar-hidden w-56 flex-col gap-2 overflow-y-auto px-2 pb-4 transition-all duration-500  lg:sticky ${
            isSmallOpen ? "scale-0" : "scale-100"
          }`}
        >
          {sidebarRoutes.map((route, index) => (
            <LargeSidebarItem
              key={index}
              Icon={route.icon}
              title={route.heading}
              path={route.path}
            />
          ))}
        </aside>
      )}
    </>
  );
}

function LargeSidebarItem({ Icon, title, path }) {
  return (
    <button className="flex w-full appearance-none flex-col items-center justify-start rounded-xl px-1 py-2 hover:bg-slate-100">
      <Link className="flex w-full items-center justify-start gap-4" to={path}>
        <Icon className="text-xl " />
        <p className="py-2 text-gray-500">{title}</p>
      </Link>
    </button>
  );
}

function SmallSideBarIcon({ Icon, title, path }) {
  return (
    <button className="flex w-[90px] appearance-none flex-col items-center justify-center rounded-xl px-2 py-2 hover:bg-slate-100">
      <Link
        className="flex w-[90px] flex-col items-center justify-center"
        to={path}
      >
        <Icon className="text-xl " />
        <p className="py-2 text-xs text-gray-500">{title}</p>
      </Link>
    </button>
  );
}
export default Sidebar;
