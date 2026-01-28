import React, { useState, useEffect } from 'react';
import DashboardOverview from './dashboard/DashboardOverview';
import MyVehicles from './dashboard/MyVehicles';
import ServiceHistory from './dashboard/ServiceHistory';
import ProfileSettings from './dashboard/Profile';
import Notifications from './dashboard/Notifications';
import Support from './dashboard/Support';
import { getNotificationsByUser } from '../services/api';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            const checkNotifications = async () => {
                try {
                    const res = await getNotificationsByUser(userId);
                    const unread = res.data.some(n => !n.read);
                    setHasNewNotifications(unread);
                } catch (err) {
                    console.error(err);
                }
            };
            checkNotifications();
            const interval = setInterval(checkNotifications, 30000); // Check every 30s
            return () => clearInterval(interval);
        }
    }, [userId]);

    if (!userId) {
        return (
            <div className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
                <div className="card">
                    <h2>Access Denied</h2>
                    <p>Please <a href="/login" style={{ fontWeight: 'bold' }}>Login</a> or <a href="/register" style={{ fontWeight: 'bold' }}>Register</a> to view your dashboard.</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'OVERVIEW': return <DashboardOverview />;
            case 'VEHICLES': return <MyVehicles />;
            case 'HISTORY': return <ServiceHistory />;
            case 'PROFILE': return <ProfileSettings />;
            case 'NOTIFICATIONS': return <Notifications />;
            case 'SUPPORT': return <Support />;
            default: return <DashboardOverview />;
        }
    };

    const sidebarItems = [
        { id: 'OVERVIEW', label: 'Overview', icon: '📊' },
        { id: 'VEHICLES', label: 'My Vehicles', icon: '🚗' },
        { id: 'HISTORY', label: 'Service History', icon: '📅' },
        { id: 'PROFILE', label: 'Profile Settings', icon: '👤' },
        { id: 'NOTIFICATIONS', label: 'Notifications', icon: '🔔', badge: hasNewNotifications },
        { id: 'SUPPORT', label: 'Support & Help', icon: '❓' },
    ];

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                    <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Menu</h4>
                </div>
                {sidebarItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (item.id === 'NOTIFICATIONS') setHasNewNotifications(false);
                        }}
                        className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            background: activeTab === item.id ? 'var(--primary-color)' : 'transparent',
                            boxShadow: 'none',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px' }}>{item.icon}</span>
                            {item.label}
                        </div>
                        {item.badge && (
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: '#ef4444',
                                borderRadius: '50%',
                                boxShadow: '0 0 8px #ef4444'
                            }}></span>
                        )}
                    </button>
                ))}
            </aside>
            <main className="dashboard-content">
                <div className="container" style={{ padding: '0', maxWidth: '1000px' }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
