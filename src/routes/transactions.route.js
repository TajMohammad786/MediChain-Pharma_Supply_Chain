const express = require("express");
const Transaction = require("../models/transaction");

const transactionRouter = express.Router();

// Get All Transactions
transactionRouter.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(400).json({ success: false, message: "something went's wrong" });
  }
});
// Get Particular transaction
transactionRouter.get("/:transactionId", async (req, res) => {
  const transactionId = req.params.transactionId;
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      res.status(200).json({
        success: false,
        message: "No transaction found with the provided transaction id",
      });

      return;
    }
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: "something went's wrong" });
  }
});

// create new Transaction
transactionRouter.post("/", async (req, res) => {
  // const {
  //   transaction_hash,
  //   from,
  //   to,
  //   prev_transaction_hash,
  //   latitude,
  //   longitude,
  //   timestamps,
  // } = req.body;
  const { transactions } = req.body;
  const remainingTransactions = [];
  for (let i = 0; i < transactions.length; i++) {
    const isExists = await Transaction.findOne({
      transaction_hash: transactions[i].transaction_hash,
    });
    if (!isExists) {
      remainingTransactions.push(transactions[i]);
    }
  }
  try {
    const allTransactions = await Transaction.insertMany(remainingTransactions);
    res.status(200).json({ success: true, transactions: allTransactions });
  } catch (error) {
    res.status(400).json({ success: false, message: "something went's wrong" });
  }
});

module.exports = transactionRouter;
