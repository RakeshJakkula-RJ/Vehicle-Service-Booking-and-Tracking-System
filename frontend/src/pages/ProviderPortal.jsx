import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderPortal = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ marginTop: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Service Provider Portal</h1>
                <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Manage service requests and connect with customers.</p>
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
                    borderTop: '5px solid #10b981'
                }}
                    onClick={() => navigate('/provider/login')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔐</div>
                    <h2 style={{ marginBottom: '1rem' }}>Provider Login</h2>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Access your dashboard to manage service requests and bookings.</p>
                    <button style={{ width: '100%', backgroundColor: '#10b981' }}>Sign In</button>
                </div>

                <div className="card" style={{
                    textAlign: 'center',
                    padding: '3rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    borderTop: '5px solid #059669'
                }}
                    onClick={() => navigate('/provider/register')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📝</div>
                    <h2 style={{ marginBottom: '1rem' }}>Join as Provider</h2>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Register your service center and start receiving service requests.</p>
                    <button style={{ width: '100%', backgroundColor: '#059669' }}>Register Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProviderPortal;
