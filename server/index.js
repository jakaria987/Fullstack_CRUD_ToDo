const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const Todo = require("./model/todoSchema");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

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

// add task
app.post("/addTodo", async (req, res) => {
  try {
    let { name, age } = req.body;
    let todo = new Todo({
      name,
      age,
    });
    await todo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// get all task
app.get("/getAllTodo", async (req, res) => {
  try {
    let allTodo = await Todo.find({});
    res.status(200).json({
      success: true,
      message: "Todo fetch successfully",
      data: allTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// get single task
app.get("/getATask/:name", async (req, res) => {
  try {
    let { name } = req.params;
    let singleTask = await Todo.findOne({ age: name });

    res.status(200).json({
      success: true,
      message: "A single task fetched",
      data: singleTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// update task
app.patch("/updateTask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age } = req.body;
    let updateTask = await Todo.findOneAndUpdate(
      { _id: id },
      { name, age },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task Updated",
      data: updateTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// delete task
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedTask = await Todo.findOneAndDelete({ _id: id }, { new: true });
    res.status(200).json({
      success: true,
      message: "Task Deleted",
      data: deletedTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
