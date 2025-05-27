import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // const handleSignup = async (e) => {
    //     e.preventDefault();
    //     if (password !== confirmPassword) {
    //         alert('Passwords do not match');
    //         return;
    //     }
    //     try {
    //         await axios.post('http://localhost:5000/api/signup', { name, email, password });
    //         alert('Signup successful');
    //         navigate('/login');
    //     } catch {
    //         alert('Signup failed');
    //     }
    // };

    function handleSignup() {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        axios.post('http://localhost:5000/api/signup', { name, email, password })
            .then(() => {
                alert('Signup successful');
                navigate('/login');
            })
            .catch(() => {
                alert('Signup failed');
            });
    }
    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form >
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                />
            </form>
                <button onClick={handleSignup}>Signup</button>
        </div>
    )
};

export default Signup;
