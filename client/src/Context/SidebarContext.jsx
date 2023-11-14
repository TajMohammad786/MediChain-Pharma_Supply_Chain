import { createContext, useContext, useEffect, useState } from "react";

export const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  const toggle = () => {
    setIsSmallOpen((prev) => !prev);
  };

  useState(() => {
    const handler = () => {
      if (window.innerWidth < 1024) {
        // small screen
        setIsSmallOpen(true);
      } else {
        setIsSmallOpen(false);
      }
    };
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [window.onresize]);

  return (
    <SidebarContext.Provider value={{ isSmallOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContextProvider };
