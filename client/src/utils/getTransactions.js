import toast from "react-hot-toast";

export default async function getTransactions(input) {
  try {
    const res = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ transactions: input }),
    });
    const { transactions, success } = await res.json();
    if (success) {
      toast.success("All transactions are stored in the database");
    }
  } catch (error) {
    console.log(error);
  }
}
