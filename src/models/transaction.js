const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_hash: {
    type: String,
    require: true,
    unique: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  prev_transaction_hash: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  timestamps: {
    type: String,
    require: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
