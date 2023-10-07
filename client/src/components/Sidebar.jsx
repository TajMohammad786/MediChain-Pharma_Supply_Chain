import { useContext, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { Web3Context } from "../Context/Web3Context";

function Sidebar({ openSideBar }) {
  const { sidebarRoutes, setSidebarRoutes } = useContext(Web3Context);
  const navigate = useNavigate();
  const handleNavigate = (to) => {
    navigate(to);
  };
  return (
    <div
      className={`relative inset-y-0 left-0 z-50 ${
        openSideBar ? "" : ""
      } transform rounded-sm border-r-2 transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar content */}
      <div className="p-4">
        <ul className="mt-4">
          {sidebarRoutes.map((element, index) => (
            <div key={index}>
              <div
                className="flex cursor-pointer items-center gap-2 px-5 py-4"
                to={element.path}
                key={index}
              >
                <element.icon className="text-2xl" />
                {openSideBar && (
                  <>
                    <span
                      className="px-3"
                      onClick={() => handleNavigate(element.path)}
                    >
                      {element.heading}
                    </span>
                  </>
                )}
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-2">
                {openSideBar &&
                  element.childrenRoutes &&
                  element.childrenRoutes.map((route) => (
                    <Link
                      to={`${element.path}/${route}`}
                      className="flex w-40 justify-start gap-2 px-5 py-1 capitalize"
                    >
                      <GrFormNextLink className="text-xl" />
                      {route}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
