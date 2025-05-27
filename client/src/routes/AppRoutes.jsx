import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Todo from '../pages/Todo';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/view-todo" element={<Todo />} />
  </Routes>
);

export default AppRoutes;
