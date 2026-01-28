import React, { useEffect, useState } from 'react';
import { getNotificationsByUser, markNotificationAsRead } from '../../services/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const res = await getNotificationsByUser(userId);
                setNotifications(res.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    if (loading) return <div>Loading notifications...</div>;

    return (
        <div>
            <h2>Notifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notifications.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>No new notifications.</p>
                ) : (
                    notifications.map(n => (
                        <div
                            key={n.id}
                            className="card"
                            style={{
                                borderLeft: `4px solid ${n.type === 'warning' ? '#ef4444' : n.type === 'success' ? '#10b981' : '#3b82f6'}`,
                                opacity: n.read ? 0.6 : 1,
                                cursor: 'pointer'
                            }}
                            onClick={() => !n.read && handleMarkAsRead(n.id)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h4 style={{ margin: 0 }}>{n.title} {!n.read && <span style={{ color: 'var(--primary-color)', fontSize: '0.6rem' }}>● NEW</span>}</h4>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    {new Date(n.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>{n.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
