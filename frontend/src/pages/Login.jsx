import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userEmail', response.data.email);
            alert('Login Successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Don't have an account? <a href="/register">Register</a>
                </p>
                <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <a href="/admin/login" style={{ color: 'var(--secondary-color)' }}>Admin Login</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
