import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer" style={{ marginTop: '4rem', padding: '3rem 0', background: 'var(--card-bg)', borderTop: '1px solid #334155' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <Link to="/" className="logo-container" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                            <span className="logo-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VehicleService</span>
                            <span className="logo-dot" style={{ width: '8px', height: '8px', background: 'var(--secondary-color)', borderRadius: '50%', boxShadow: '0 0 10px var(--secondary-color)' }}></span>
                        </Link>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                            Your one-stop solution for automotive care. Professional services, certified mechanics, and hassle-free booking.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/track" style={{ color: '#94a3b8', textDecoration: 'none' }}>Track Status</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/book" style={{ color: '#94a3b8', textDecoration: 'none' }}>Book Service</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>My Dashboard</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/support" style={{ color: '#94a3b8', textDecoration: 'none' }}>Help Center</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/support" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Us</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="/support" style={{ color: '#94a3b8', textDecoration: 'none' }}>FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact</h4>
                        <p style={{ color: '#94a3b8', marginBottom: '0.8rem' }}>Email: support@vehicleservice.com</p>
                        <p style={{ color: '#94a3b8', marginBottom: '0.8rem' }}>Phone: +91 98765 43210</p>
                        <p style={{ color: '#94a3b8' }}>Address: 123 Tech Park, Electronic City, Bangalore</p>
                    </div>
                </div>
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #334155', textAlign: 'center', color: '#64748b' }}>
                    <p>&copy; {new Date().getFullYear()} VehicleService. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
