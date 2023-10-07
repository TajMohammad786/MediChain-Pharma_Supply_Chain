import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { Web3Context } from "../../../Context/Web3Context";

const Owner = () => {
  // TODO:  Check wether the user is owner and if not return from the page
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  // console.log({ account, supplyChain, web3 })
  return (
    <div>
      {/* <h1>This is user block</h1> */}
      <div className="right-side overflow-x-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Owner;
