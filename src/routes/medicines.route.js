const express = require("express");
const Medicine = require("../models/medicine");

const medicineRouter = express.Router();

// get all medicines
medicineRouter.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(203).json({ success: true, medicines });
  } catch (err) {
    res.status(400).json({ success: false, message: "something went's wrong" });
  }
});

// create medicine
medicineRouter.post("/", async (req, res) => {
  try {
    const {
      productId,
      description,
      quantity,
      rawMaterialAddress,
      transactionContractAddress,
      wholesaler,
      transporter,
      manufacturer,
      distributer,
    } = req.body;
    // if (
    //   productId &&
    //   description &&
    //   quantity &&
    //   rawMaterialAddress &&
    //   transactionContractAddress &&
    //   wholesaler &&
    //   transporter &&
    //   manufacturer &&
    //   distributer
    // ) {
    //   res
    //     .status(400)
    //     .json({
    //       success: false,
    //       message: "All fields are required",
    //       body: req.body,
    //     });
    //   return;
    // }
    let medicine = await Medicine.findOne({ productId });
    if (medicine) {
      res
        .status(400)
        .json({ success: false, message: "The medicine already exist" });
      return;
    }
    medicine = await Medicine.create({
      productId,
      description,
      quantity,
      rawMaterialAddress,
      transactionContractAddress,
      wholesaler,
      transporter,
      manufacturer,
      distributer,
    });
    res.status(203).json({ success: true, medicine });
  } catch (err) {
    res.status(400).json({ success: false, message: "something went's wrong" });
  }
});

// get medicine with product id
medicineRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const medicines = await Medicine.findOne({ productId });
    if (!medicines) {
      res.status(400).json({ success: true, message: "no medicines found" });
      return;
    }
    res.status(203).json({ success: true, medicines });
  } catch (err) {
    res.status(400).json({ success: false, message: "something went's wrong" });
  }
});

module.exports = medicineRouter;
