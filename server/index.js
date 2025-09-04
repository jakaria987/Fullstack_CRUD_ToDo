const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message || err);
  });

// route define
app.post("/addTodo", (req, res) => {
  res.status(201).json({ success: true, message: "Todo created successfully" });
});
app.get("/getTodo", (req, res) => {
  res.status(200).json({ success: true, message: "Todo fetch successfully" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
