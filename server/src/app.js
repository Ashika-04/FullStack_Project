// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const todoRouter = require('./routes/todo.route');
// const userRouter = require('./routes/user.route');

// const app = express();
// mongoose.connect('mongodb://localhost:27017/todoapp')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// app.use('/api/todos', todoRouter);
// app.use('/api/users', userRouter);

// module.exports = app;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./routes/user.route');
const todoRouter = require('./routes/todo.route');

const app = express();

mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route mounts
app.use('/api', userRouter); // 👈 This is the one your frontend is calling
app.use('/api/todos', todoRouter);

module.exports = app;
