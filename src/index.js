const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URI } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors
const allowedOrigins = [
  "http://localhost:19006",
  "http://localhost:3001",
  "http://192.168.0.108:8081",
];
app.use(cors(allowedOrigins));

app.get("", (req, res) => {
  res.send("Hello from medichain api");
});
app.use("/api/transactions", require("./routes/transactions.route"));
app.use("/api/medicines", require("./routes/medicines.route"));

app.listen(5000, async () => {
  console.log(`server running on http://localhost:5000 🚀🚀`);
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`connected to mongodb ${connection.connection.host}`);
  } catch (error) {
    console.log("failed to connect");
  }
});
