import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Todo = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const editing = location.state?.isEditing || false;
  const editId = location.state?.editId || null;

  // Replace with actual user ID or fetch from token
  const userId = '6653114cb159b0c1d3183264'; // Replace with a valid ObjectId from your User collection

  useEffect(() => {
    if (editing && location.state) {
      setTask(location.state.task || '');
      setDescription(location.state.description || '');
    }
  }, [editing, location]);

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:5000/api/todos/add', {
        task,
        description,
        userId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTask('');
      setDescription('');
      navigate('/');
    } catch (err) {
      console.error('Add todo error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error adding todo');
    }
  };

  const updateTodo = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/update`, {
        id: editId,
        task,
        description
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTask('');
      setDescription('');
      navigate('/');
    } catch (err) {
      console.error('Update todo error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error updating todo');
    }
  };

  const handleSubmit = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Please log in to add a Todo.");
    navigate('/login'); // or any login route
    return;
  }

  if (editing) {
    updateTodo();
  } else {
    addTodo();
  }
};

  return (
    <div className="todo-container">
      <h2>{editing ? 'Edit Todo' : 'Add Todo'}</h2>
      <div className="todo-input">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          rows={4}
        />
        <button onClick={handleSubmit}>
          {editing ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default Todo;
