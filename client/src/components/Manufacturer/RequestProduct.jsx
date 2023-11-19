import React, { useState } from "react";
import { Web3Context } from "../../Context/Web3Context";
import { useContext } from "react";
import GenerateSignature from "../../utils/GenerateSignature";

const RequestProduct = () => {
  const { webData } = useContext(Web3Context);
  const { account, supplyChain, web3 } = webData;

  return (
    <div>
      <GenerateSignature header ={'Request Raw Material Package '} package ={'Package'} User = {'Supplier'}/>
    </div>
  );
};

export default RequestProduct;
