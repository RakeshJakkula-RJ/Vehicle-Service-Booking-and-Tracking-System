import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ marginTop: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Admin Gateway</h1>
                <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Secure management portal for VehicleService administrators.</p>
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
                    borderTop: '5px solid var(--primary-color)'
                }}
                    onClick={() => navigate('/admin/login')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔐</div>
                    <h2 style={{ marginBottom: '1rem' }}>Admin Login</h2>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Access your dashboard to manage bookings, users, and service centers.</p>
                    <button style={{ width: '100%' }}>Sign In</button>
                </div>

                <div className="card" style={{
                    textAlign: 'center',
                    padding: '3rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    borderTop: '5px solid var(--secondary-color)'
                }}
                    onClick={() => navigate('/admin/register')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📝</div>
                    <h2 style={{ marginBottom: '1rem' }}>Register Admin</h2>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Create a new administrator account to join the management team.</p>
                    <button style={{ width: '100%', backgroundColor: 'var(--secondary-color)' }}>Register Now</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPortal;
