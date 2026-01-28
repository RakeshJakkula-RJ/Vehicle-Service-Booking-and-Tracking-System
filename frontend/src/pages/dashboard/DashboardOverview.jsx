import React, { useEffect, useState } from 'react';
import { getVehiclesByUser, getBookingsByUser } from '../../services/api';

const DashboardOverview = () => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const [stats, setStats] = useState({ vehicles: 0, bookings: 0, completed: 0 });

    useEffect(() => {
        if (userId) {
            fetchStats();
        }
    }, [userId]);

    const fetchStats = async () => {
        try {
            const vRes = await getVehiclesByUser(userId);
            const bRes = await getBookingsByUser(userId);

            setStats({
                vehicles: vRes.data.length,
                bookings: bRes.data.length,
                completed: bRes.data.filter(b => b.status === 'COMPLETED').length
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Welcome back, {userName}!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Here's an overview of your vehicle service status.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>{stats.vehicles}</h3>
                    <p>Vehicles Registered</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>{stats.bookings}</h3>
                    <p>Total Bookings</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', color: '#10b981' }}>{stats.completed}</h3>
                    <p>Services Completed</p>
                </div>
            </div>

            <div className="card" style={{ marginTop: '2rem' }}>
                <h3>Recent Activity</h3>
                <p style={{ color: 'var(--text-muted)' }}>No recent activity to show.</p>
            </div>
        </div>
    );
};

export default DashboardOverview;
