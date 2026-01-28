import React, { useState, useEffect } from 'react';
import { registerUser, generateOtp } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        passwordHash: '',
        otp: ''
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
            alert('Registration Successful!');
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userRole', response.data.role);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert(error.response?.data || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '4rem' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={{ flex: 1 }} />
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
                    <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                    <input type="password" name="passwordHash" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" disabled={!otpSent} style={{ width: '100%', marginTop: '1rem', opacity: !otpSent ? 0.5 : 1 }}>Register</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Register as an <a href="/admin/register" style={{ color: 'var(--secondary-color)' }}>Administrator</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
