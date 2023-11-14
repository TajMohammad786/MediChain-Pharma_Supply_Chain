import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Web3Context } from "../Context/Web3Context";
import { toast } from "react-hot-toast";
import { FaEthereum, FaEthernet } from "react-icons/fa6";
import { SidebarContext } from "../Context/SidebarContext";

const Header = () => {
  const { webData,setWebData,balance, getMetamaskBalance } = useContext(Web3Context);
  const { toggle } = useContext(SidebarContext);
  
  const handleHamClick = () => {
    toggle();
  };
  const handleOnConnectWallet = () => {
    if (window.ethereum) {
      // toast.success("wallet connected successfully");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          // console.log(res[0]);
          getMetamaskBalance(res[0]);
          setWebData({
            ...webData,
            account: res[0],
          })
          console.log("The changed account is ", webData.account)
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please add metamask extension");
    }
  };

  return (
    <header className="container mx-auto">
      <div className="flex flex-col flex-wrap items-center py-5 md:flex-row">
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
        <button
          className="mt-4 inline-flex items-center rounded-md border-0 bg-gray-100 px-3 py-2 text-base hover:bg-gray-200 focus:outline-none md:mt-0"
          onClick={handleOnConnectWallet}
        >
          {balance !== undefined ? balance : "Connect Wallet"}
          <FaEthereum className="mx-1 text-base" />
        </button>
      </div>
    </header>
  );
};

export default Header;
