import toast from "react-hot-toast";

export default async function saveMedicines(input) {
  //   console.log(
  //     JSON.stringify({
  //       productId: input.productId,
  //       description: input.description,
  //       quantity: input.quantity + "",
  //       rawMaterialAddress: input.rawMaterialAddress[0],
  //       transactionContractAddress: input.transactionContractAddress,
  //       wholesaler: input.wholesaler,
  //       transporter: input.transporter[0],
  //       manufacturer: input.manufacturer,
  //       distributer: input.distributer,
  //     }),
  //   );
  try {
    const res = await fetch("http://localhost:5000/api/medicines", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: input.productId,
        description: input.description,
        quantity: input.quantity + "",
        rawMaterialAddress: input.rawMaterialAddress[0],
        transactionContractAddress: input.transactionContractAddress,
        wholesaler: input.wholesaler,
        transporter: input.transporter[0],
        manufacturer: input.manufacturer,
        distributer: input.distributer,
      }),
    });
    const { medicine, success } = await res.json();
    if (success) {
      toast.success("All transactions are stored in the database");
    }
  } catch (error) {
    console.log(error);
  }
}
