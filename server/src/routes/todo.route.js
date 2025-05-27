const express = require('express');
const {
  getData,
  addData,
  updateData,
  deleteData
} = require('../controller/todo.controller');

const todoRouter = express.Router();

const SECRET = '123bcrodsrerjwr3w3e3weewfc2';

const getTokenMiddleWare = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // You can access req.user in the next middleware or controller
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

todoRouter.get('/get', getTokenMiddleWare ,getData);
todoRouter.post('/add', addData);
todoRouter.put('/update', updateData);
todoRouter.delete('/delete/:id', deleteData);

module.exports = todoRouter;
