import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const token = localStorage.getItem('token');

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodos(); // Fetch only if logged in
    }
  }, [token]);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
    }
  };

  const handleEdit = (todo) => {
    // Navigation logic to edit page
  };

  const onCheckboxChange = (id) => {
    setTodoToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (todoToDelete) {
      await deleteTodo(todoToDelete);
      setTodoToDelete(null);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => {
    setTodoToDelete(null);
    setShowConfirm(false);
  };

  return (
    <div className="todo-container">
      <h2>My Todo List</h2>

      {/* Show message if not logged in */}
      {!token ? (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'gray' }}>
          Please log in to view your tasks.
        </p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo._id} className="todo-item">
              <div className="left">
                <input type="checkbox" onChange={() => onCheckboxChange(todo._id)} />
                <div className="todo-details">
                  <strong>{todo.task}</strong>
                  <p>{todo.description}</p>
                </div>
              </div>
              <div className="right">
                <button onClick={() => handleEdit(todo)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTodo(todo._id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-btn">Yes</button>
              <button onClick={cancelDelete} className="cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
