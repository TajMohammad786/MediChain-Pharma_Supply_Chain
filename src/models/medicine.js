const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  productId: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  rawMaterialAddress: {
    type: String,
    require: true,
  },
  transactionContractAddress: {
    type: String,
    require: true,
  },
  wholesaler: {
    type: String,
    require: true,
  },
  transporter: {
    type: String,
    require: true,
  },
  manufacturer: {
    type: String,
    require: true,
  },
  distributer: {
    type: String,
    require: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
