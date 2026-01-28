import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPortal = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ marginTop: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Customer Portal</h1>
                <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Welcome to VehicleService. Manage your vehicles and book services with ease.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <div className="card" style={{
                    textAlign: 'center',
                    padding: '3rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    borderTop: '5px solid #3b82f6'
                }}
                    onClick={() => navigate('/login')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>👤</div>
                    <h2 style={{ marginBottom: '1rem' }}>User Login</h2>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Already have an account? Sign in to view your dashboard and service history.</p>
                    <button style={{ width: '100%', backgroundColor: '#3b82f6' }}>Log In</button>
                </div>

                <div className="card" style={{
                    textAlign: 'center',
                    padding: '3rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    borderTop: '5px solid #10b981'
                }}
                    onClick={() => navigate('/register')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚀</div>
                    <h2 style={{ marginBottom: '1rem' }}>New User</h2>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>New here? Create an account to start booking services and tracking your vehicle maintenance.</p>
                    <button style={{ width: '100%', backgroundColor: '#10b981' }}>Register Now</button>
                </div>
            </div>
        </div>
    );
};

export default UserPortal;
