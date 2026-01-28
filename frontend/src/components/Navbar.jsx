import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            <div className="logo">
                <Link to="/" className="logo-container">
                    <motion.span
                        className="logo-text"
                        whileHover={{ scale: 1.05 }}
                    >
                        VehicleService
                    </motion.span>
                    <motion.span
                        className="logo-dot"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.span>
                </Link>
            </div>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/track">Track Service</NavLink>
                {userId && <NavLink to="/dashboard">Dashboard</NavLink>}
                {userId && <NavLink to="/book">Book Service</NavLink>}
                {userRole === 'ADMIN' && <NavLink to="/admin" style={{ color: 'var(--secondary-color)' }}>Admin Dashboard</NavLink>}
                {userRole === 'PROVIDER' && <NavLink to="/provider" style={{ color: '#10b981' }}>Provider Dashboard</NavLink>}
                {!userId && <NavLink to="/provider/portal" style={{ color: '#10b981', fontWeight: 'bold' }}>Provider Portal</NavLink>}
                {!userId && <NavLink to="/admin/portal" style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Admin Dashboard</NavLink>}
                {!userId && <NavLink to="/portal" style={{ fontWeight: 'bold' }}>User Registration</NavLink>}
                {userId && <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Logout</motion.button>}
            </div>
        </motion.nav>
    );
};

const NavLink = ({ children, style, ...props }) => (
    <motion.div style={{ display: 'inline-block' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link style={style} {...props}>{children}</Link>
    </motion.div>
);

export default Navbar;
