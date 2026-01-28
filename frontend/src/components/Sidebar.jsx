import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h3 style={{ padding: '0 1rem', marginBottom: '1.5rem', opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</h3>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                Dashboard Home
            </NavLink>
            <NavLink to="/dashboard/vehicles" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                My Vehicles
            </NavLink>
            <NavLink to="/dashboard/bookings" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                My Bookings
            </NavLink>
            <NavLink to="/dashboard/invoices" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                Invoices & Payments
            </NavLink>
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                Profile Settings
            </NavLink>
            <NavLink to="/dashboard/support" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                Help & Support
            </NavLink>
        </aside>
    );
};

export default Sidebar;
