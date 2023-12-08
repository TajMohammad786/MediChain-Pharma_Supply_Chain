import React from 'react';
import { Link } from "react-router-dom";
import { Web3Context } from "../../Context/Web3Context";
import { useContext, useState, useEffect } from "react";

const DistributorViewMedicine = () => {
    const { webData } = useContext(Web3Context);
    const { account, supplyChain, web3 } = webData;
    const [loading, isLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);

    
      
    
    const fetchMedicine = async()=> {
        var medicineAddresses = await supplyChain.methods.getAllMedicinesAtDistributor().call({from: account});
        setAddresses(medicineAddresses);
        // console.log(medicineAddresses);
        isLoading(false)
    }
    
   
    useEffect(() => {
        fetchMedicine();
        // console.log(account);
      }, [account, supplyChain]);
    
    if (loading) {
        return (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-2xl">Loading Medicine addresses...</p>
          </div>
        );
    } else {
    return (
        <div className="min-h-screen p-4">
        <h1 className="mb-4 font-head text-3xl font-bold">
          Medicines Received At Distributor
        </h1>
        <ul className="mt-2">
          {addresses.map((address, index) => (
            <li key={index} className="mb-2 text-fuchsia-500">
              <Link
                to={`/distributor/view-medicine-list/${address}`}
                className="capitalize hover:underline"
              >
                {address} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
    }
}

export default DistributorViewMedicine
