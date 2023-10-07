import { Web3Context } from "../Context/Web3Context";
import { useContext, useEffect } from "react";
import EntityComponent from "../components/EntityComponent";
import { mainRoutes } from "../utils/sidebarContent";
const Home = () => {
  const { webData, setSidebarRoutes } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;

  useEffect(()=>{
    setSidebarRoutes(mainRoutes)
  },[])
  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-20 flex w-full flex-col text-center">
          <h1 className="title-font mb-4 font-head text-2xl font-bold text-gray-900 sm:text-3xl">
            MediChain - Pharmaceutical Supply Chain using BlockChain.
          </h1>
        </div>

        {/* component */}
        <div className="-m-4 flex w-full flex-wrap">
          <EntityComponent
            name={"owner"}
            image={"https://dummyimage.com/601x361"}
          />
          <EntityComponent
            name={"supplier"}
            image={"https://dummyimage.com/601x361"}
          />
        </div>
        <div className="-m-4 flex w-full flex-wrap">
          <EntityComponent
            name={"transporter"}
            image={"https://dummyimage.com/601x361"}
          />
          <EntityComponent
            name={"manufacturer"}
            image={"https://dummyimage.com/601x361"}
          />
        </div>
        <div className="-m-4 flex w-full flex-wrap">
          <EntityComponent
            name={"customer"}
            image={"https://dummyimage.com/601x361"}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
