import React from 'react';
import GenerateSignature from '../../utils/GenerateSignature';  

const RequestProduct = () => {


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     isLoading(true);
    //     supplyChain.methods.requestProduct(account, manufacturerAddress, medicineAddress, signature).send({ from: account })
    //       .once('receipt', async (receipt) => {
    //         alert('Request Made to Manufacturer!');
    //         console.log(receipt);
    //         isLoading(false);
    //       })
    //   }

    return (
        <div>
         <GenerateSignature header ={'Request Medicine Package'} package = {'Medicine'} User = {'Wholesaler'} />
        </div>
    )
}

export default RequestProduct

