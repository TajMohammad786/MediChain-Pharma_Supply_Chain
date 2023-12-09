import { Web3Context } from "../../../Context/Web3Context";
import { useContext, useState } from "react";
import { userRoles } from "../../../utils/constants";

import { getTrimmedString } from "../../../utils/getTrimmedString";

const ViewUser = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;
  const [address, setAddress] = useState("");
  const [showData, setShowData] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    location: "",
    role: "",
    address: "",
  });
  const handleOnChange = (e) => {
    setAddress(e.target.value);
  };
  // console.log(web3)

  const getStringName = (name) => {
    return getTrimmedString(web3, name);
  };

  const handleViewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await supplyChain.methods
        .getUser(address)
        .call({ gas: 3000000 });
      // console.log(result);
      const { 0: name, 1: location, 2: role, 4: userAddress } = result;
      console.log(result);
      setUserDetails({ name, location, role, address });
      // console.log(userDetails.name);

      setShowData(true);
      setAddress("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1 className="text-center font-head text-xl font-bold">View User</h1>
      <div className="relative my-2 mb-4">
        <label htmlFor="name" className="text-sm leading-7 text-gray-600">
          Enter Account Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={address}
          onChange={handleOnChange}
        />
      </div>
      <button
        className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        onClick={handleViewUser}
      >
        Submit
      </button>
      {showData && (
        <div className="container my-4 flex flex-col">
          <div className="my-1 ">
            <p className="font-head font-semibold">
              Name :
              <span className="font-para font-normal">
                {getStringName(userDetails.name)}
              </span>
            </p>
          </div>
          <div className="my-1 ">
            <p className="font-head font-semibold">Location : </p>
            <p className="font-para font-normal">
              <span className="font-head text-sm font-semibold">
                Longitude :{" "}
              </span>
              {userDetails.location[0]}
            </p>
            <p className="font-para font-normal">
              <span className="font-head text-sm font-semibold">
                Latitude :{" "}
              </span>
              {userDetails.location[1]}
            </p>
          </div>
          <div className="my-1 ">
            <p className="font-head font-semibold">
              Address :
              <span className="font-para font-normal">
                {"     "}
                {userDetails.address}
              </span>
            </p>
          </div>
          <div className="my-1 ">
            <p className="font-head font-semibold">
              Role : {"     "}
              <span className="font-para font-normal">
                {userRoles[Number(userDetails.role)]}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
