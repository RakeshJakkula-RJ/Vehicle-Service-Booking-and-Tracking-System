import React, { useState, useEffect } from 'react';
import { registerUser, generateOtp } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        passwordHash: '',
        otp: '',
        role: 'ADMIN' // Explicitly set role to ADMIN
    });
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            alert('Please enter email first');
            return;
        }
        try {
            await generateOtp(formData.email);
            setOtpSent(true);
            setTimer(60);
            alert('OTP sent to ' + formData.email);
        } catch (error) {
            console.error(error);
            alert('Failed to send OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            alert('Admin Registration Successful!');
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userRole', response.data.role);
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert(error.response?.data || 'Admin Registration failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '4rem' }}>
            <div className="card" style={{ borderTop: '4px solid var(--primary-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📜</div>
                    <h2 style={{ margin: 0 }}>Register Admin</h2>
                    <p style={{ opacity: 0.7 }}>Create a new administrator account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Admin Full Name" onChange={handleChange} required />

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required style={{ flex: 1 }} />
                        {!otpSent ? (
                            <button type="button" onClick={handleSendOtp} style={{ height: '42px', width: '120px' }}>Send OTP</button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={timer > 0}
                                style={{ height: '42px', width: '140px', opacity: timer > 0 ? 0.6 : 1 }}
                            >
                                {timer > 0 ? `Resend (${timer}s)` : 'Resend OTP'}
                            </button>
                        )}
                    </div>

                    {otpSent && (
                        <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} required />
                    )}

                    <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Location/Address" onChange={handleChange} required />
                    <input type="password" name="passwordHash" placeholder="Password" onChange={handleChange} required />

                    <button type="submit" disabled={!otpSent} style={{ width: '100%', marginTop: '1rem', opacity: !otpSent ? 0.5 : 1 }}>
                        Create Admin Account
                    </button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an admin account? <a href="/admin/login" style={{ color: 'var(--primary-color)' }}>Login here</a>
                </p>
            </div>
        </div>
    );
};

export default AdminRegister;
