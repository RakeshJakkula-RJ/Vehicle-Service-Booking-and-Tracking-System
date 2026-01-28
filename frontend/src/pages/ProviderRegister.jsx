import React, { useState, useEffect } from 'react';
import { registerUser, generateOtp, getServiceCenters } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProviderRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        passwordHash: '',
        otp: '',
        role: 'PROVIDER',
        serviceCenterId: ''
    });
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [serviceCenters, setServiceCenters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServiceCenters();
    }, []);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const fetchServiceCenters = async () => {
        try {
            const res = await getServiceCenters();
            // Remove duplicates based on service center name and location
            const uniqueCenters = res.data.filter((center, index, self) =>
                index === self.findIndex((c) =>
                    c.name === center.name && c.location === center.location
                )
            );
            setServiceCenters(uniqueCenters);
        } catch (error) {
            console.error(error);
        }
    };

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
        if (!formData.serviceCenterId) {
            alert('Please select a service center');
            return;
        }
        try {
            const response = await registerUser(formData);
            alert('Service Provider Registration Successful!');
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('serviceCenterId', response.data.serviceCenterId);
            navigate('/provider');
        } catch (error) {
            console.error(error);
            alert(error.response?.data || 'Provider Registration failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '4rem' }}>
            <div className="card" style={{ borderTop: '4px solid #10b981' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔧</div>
                    <h2 style={{ margin: 0 }}>Register as Service Provider</h2>
                    <p style={{ opacity: 0.7 }}>Join our network of trusted service providers</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Provider Full Name" onChange={handleChange} required />

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" name="email" placeholder="Provider Email" onChange={handleChange} required style={{ flex: 1 }} />
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

                    <input type="tel" name="phone" placeholder="Contact Number" onChange={handleChange} required />

                    <label>Select Service Center</label>
                    <select name="serviceCenterId" onChange={handleChange} required>
                        <option value="">-- Choose Service Center --</option>
                        {serviceCenters.map(center => (
                            <option key={center.id} value={center.id}>
                                {center.name} - {center.location}
                            </option>
                        ))}
                    </select>

                    <input type="text" name="address" placeholder="Location/Address" onChange={handleChange} required />
                    <input type="password" name="passwordHash" placeholder="Password" onChange={handleChange} required />

                    <button type="submit" disabled={!otpSent} style={{ width: '100%', marginTop: '1rem', opacity: !otpSent ? 0.5 : 1, backgroundColor: '#10b981' }}>
                        Register as Provider
                    </button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have a provider account? <a href="/provider/login" style={{ color: '#10b981' }}>Login here</a>
                </p>
            </div>
        </div>
    );
};

export default ProviderRegister;
