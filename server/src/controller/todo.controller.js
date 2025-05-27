const Todo = require('../model/todo.model');

async function getData(req, res) {
  try {
    const userId = req.decoded.user.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }
    const data = await Todo.find({userId: userId});
    res.json({
      success: true,
      message: "Data received successfully",
      data: data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

async function addData(req, res) {
  try {
    const { task, description, userId } = req.body;
    const todo = await Todo.create({ task, description, userId });
    res.json({
      success: true,
      message: "Data added successfully",
      data: todo
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

async function updateData(req, res) {
  try {
    const { id, task, description } = req.body;
    const update = await Todo.findById(id);
    if (!update) throw new Error("Data not found");
    if (task) update.task = task;
    if (description) update.description = description;
    await update.save();
    res.json({
      success: true,
      message: "Data updated successfully",
      data: update
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

async function deleteData(req, res) {
  try {
    const { id } = req.params;
    const data = await Todo.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Data deleted successfully",
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  getData,
  addData,
  updateData,
  deleteData
};
