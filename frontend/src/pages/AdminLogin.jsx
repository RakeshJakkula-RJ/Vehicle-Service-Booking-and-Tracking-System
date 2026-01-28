import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
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
            if (response.data.role !== 'ADMIN') {
                alert('Access Denied: You are not an Admin');
                return;
            }
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userEmail', response.data.email);
            alert('Admin Login Successful!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
            <div className="card" style={{ borderTop: '4px solid var(--primary-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
                    <h2 style={{ margin: 0 }}>Admin Login</h2>
                    <p style={{ opacity: 0.7 }}>Secure access for administrators</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Login as Admin</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Don't have an admin account? <a href="/admin/register" style={{ color: 'var(--primary-color)' }}>Register here</a>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
