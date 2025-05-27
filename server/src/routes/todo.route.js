const express = require('express');
const {
  getData,
  addData,
  updateData,
  deleteData
} = require('../controller/todo.controller');

const todoRouter = express.Router();

todoRouter.get('/get/:userId', getData);
todoRouter.post('/add', addData);
todoRouter.put('/update', updateData);
todoRouter.delete('/delete/:id', deleteData);

module.exports = todoRouter;
