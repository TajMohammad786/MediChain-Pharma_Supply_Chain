import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Web3Context } from "../Context/Web3Context";

const Header = ({ setOpenSideBar }) => {
  const handleHamClick = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col flex-wrap items-center py-5 md:flex-row">
        <GiHamburgerMenu
          className="cursor-pointer text-xl"
          onClick={handleHamClick}
        />
        <Link
          className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
          to={"/"}
        >
          <span className="ml-3 font-head text-xl font-[600] ">MediChain</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto ">
          <Link className="mr-5 hover:text-gray-900" to={"/"}>
            Home
          </Link>
        </nav>
        <button className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="ml-1 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
