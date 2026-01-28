import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api, { getServiceCenters, addServiceCenter, deleteServiceCenter, getAllSupportMessages, replyToSupportMessage, markSupportMessageAsRead } from '../services/api';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [centers, setCenters] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [hasNewMessages, setHasNewMessages] = useState(false);
    const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'stores', 'messages', 'users', 'providers'

    // Form state for new store
    const [newStore, setNewStore] = useState({ name: '', location: '', contact: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'ADMIN') {
            navigate('/admin/login');
            return;
        }

        fetchAllBookings();
        fetchCenters();
        fetchMessages();
        fetchAllUsers();

        const interval = setInterval(() => {
            fetchMessages();
        }, 30000); // Poll for new messages
        return () => clearInterval(interval);
    }, []);

    const fetchAllBookings = async () => {
        try {
            const res = await api.get('/bookings');
            setBookings(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCenters = async () => {
        try {
            const res = await getServiceCenters();
            setCenters(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await getAllSupportMessages();
            setMessages(res.data);
            const unread = res.data.some(m => !m.read && !m.adminReply);
            setHasNewMessages(unread);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTabChange = async (tab) => {
        setActiveTab(tab);
        if (tab === 'messages' && hasNewMessages) {
            setHasNewMessages(false);
            // Mark all unread/unreplied messages as read
            const unreadIds = messages.filter(m => !m.read).map(m => m.id);
            for (const id of unreadIds) {
                try {
                    await markSupportMessageAsRead(id);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}/status?status=${status}`);
            alert('Status updated to ' + status);
            fetchAllBookings();
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    const handleAddStore = async (e) => {
        e.preventDefault();
        try {
            await addServiceCenter(newStore);
            alert('Store added successfully!');
            setNewStore({ name: '', location: '', contact: '' });
            fetchCenters();
        } catch (error) {
            console.error(error);
            alert('Failed to add store');
        }
    };

    const handleDeleteStore = async (id) => {
        if (window.confirm('Are you sure you want to delete this store?')) {
            try {
                await deleteServiceCenter(id);
                fetchCenters();
            } catch (error) {
                console.error(error);
                alert('Failed to delete store (check if it has linked bookings or mechanics)');
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Control Panel</h1>

            <div className="tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                <button
                    onClick={() => handleTabChange('bookings')}
                    style={{
                        backgroundColor: activeTab === 'bookings' ? 'var(--primary-color)' : 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: activeTab === 'bookings' ? 'white' : 'var(--primary-color)'
                    }}
                >
                    Manage Bookings
                </button>
                <button
                    onClick={() => handleTabChange('stores')}
                    style={{
                        backgroundColor: activeTab === 'stores' ? 'var(--primary-color)' : 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: activeTab === 'stores' ? 'white' : 'var(--primary-color)'
                    }}
                >
                    Manage Stores
                </button>
                <button
                    onClick={() => handleTabChange('messages')}
                    style={{
                        backgroundColor: activeTab === 'messages' ? 'var(--primary-color)' : 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: activeTab === 'messages' ? 'white' : 'var(--primary-color)',
                        position: 'relative'
                    }}
                >
                    User Messages
                    {hasNewMessages && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '10px',
                            height: '10px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            boxShadow: '0 0 8px #ef4444'
                        }}></span>
                    )}
                </button>
                <button
                    onClick={() => handleTabChange('users')}
                    style={{
                        backgroundColor: activeTab === 'users' ? 'var(--primary-color)' : 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: activeTab === 'users' ? 'white' : 'var(--primary-color)'
                    }}
                >
                    Manage Users
                </button>
                <button
                    onClick={() => handleTabChange('providers')}
                    style={{
                        backgroundColor: activeTab === 'providers' ? 'var(--primary-color)' : 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: activeTab === 'providers' ? 'white' : 'var(--primary-color)'
                    }}
                >
                    Service Providers
                </button>
            </div>

            {activeTab === 'bookings' && (
                <div className="card">
                    <h3>Recent Bookings</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #334155' }}>
                                    <th style={{ padding: '1rem' }}>ID</th>
                                    <th>Customer</th>
                                    <th>Vehicle</th>
                                    <th>Service Center</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, i) => (
                                    <motion.tr
                                        key={b.id}
                                        style={{ borderBottom: '1px solid #334155' }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                                    >
                                        <td style={{ padding: '1rem' }}>{b.id}</td>
                                        <td>
                                            <div style={{ fontWeight: 'bold' }}>{b.user?.name}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{b.user?.phone}</div>
                                        </td>
                                        <td>{b.vehicle?.make} {b.vehicle?.model}</td>
                                        <td>
                                            <div style={{ fontWeight: 'bold', color: '#10b981' }}>{b.serviceCenter?.name || 'N/A'}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{b.serviceCenter?.location}</div>
                                            <div style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#94a3b8' }}>
                                                📞 {users.find(u => u.serviceCenterId === b.serviceCenter?.id && u.role === 'PROVIDER')?.phone || 'No Provider'}
                                            </div>
                                        </td>
                                        <td>{b.serviceType?.description}</td>
                                        <td>{b.date} ({b.timeSlot})</td>
                                        <td>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: b.status === 'COMPLETED' ? '#10b981' :
                                                    b.status === 'CANCELLED' ? '#ef4444' : '#f59e0b',
                                                fontSize: '0.8rem',
                                                color: 'white'
                                            }}>{b.status}</span>
                                        </td>
                                        <td>
                                            <select
                                                defaultValue={b.status}
                                                onChange={(e) => updateStatus(b.id, e.target.value)}
                                                style={{ width: 'auto', marginBottom: 0, padding: '0.3rem', fontSize: '0.8rem' }}
                                            >
                                                <option value="PENDING">Pending</option>
                                                <option value="CONFIRMED">Confirm</option>
                                                <option value="COMPLETED">Complete</option>
                                                <option value="CANCELLED">Cancel</option>
                                            </select>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'stores' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    <div className="card">
                        <h3>Add New Store</h3>
                        <form onSubmit={handleAddStore}>
                            <label>Store Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Premium Auto Works"
                                value={newStore.name}
                                onChange={e => setNewStore({ ...newStore, name: e.target.value })}
                                required
                            />
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="e.g. Midtown Manhattan"
                                value={newStore.location}
                                onChange={e => setNewStore({ ...newStore, location: e.target.value })}
                                required
                            />
                            <label>Contact Number</label>
                            <input
                                type="text"
                                placeholder="e.g. 555-0199"
                                value={newStore.contact}
                                onChange={e => setNewStore({ ...newStore, contact: e.target.value })}
                                required
                            />
                            <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Add Service Center</button>
                        </form>
                    </div>

                    <div className="card">
                        <h3>Existing Service Centers</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #334155' }}>
                                    <th style={{ padding: '1rem' }}>ID</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {centers.map(c => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                                        <td style={{ padding: '1rem' }}>{c.id}</td>
                                        <td style={{ fontWeight: 'bold' }}>{c.name}</td>
                                        <td>{c.location}</td>
                                        <td>{c.contact}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteStore(c.id)}
                                                style={{
                                                    backgroundColor: '#ef4444',
                                                    padding: '0.3rem 0.6rem',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'messages' && (
                <div className="card">
                    <h3>User Support Messages</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #334155' }}>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                    <th>User</th>
                                    <th>Query</th>
                                    <th>Admin Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(m => (
                                    <tr key={m.id} style={{ borderBottom: '1px solid #334155' }}>
                                        <td style={{ padding: '1rem', fontSize: '0.8rem' }}>
                                            {new Date(m.createdAt).toLocaleString()}
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 'bold' }}>{m.userName}</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>ID: {m.userId}</div>
                                        </td>
                                        <td style={{ maxWidth: '300px', padding: '1rem' }}>
                                            <div style={{ fontWeight: 'bold' }}>{m.subject}</div>
                                            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{m.message}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {m.adminReply ? (
                                                <div style={{ background: '#0f172a', padding: '0.8rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#10b981', marginBottom: '0.3rem' }}>REPLIED</div>
                                                    {m.adminReply}
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <textarea
                                                        id={`reply-${m.id}`}
                                                        placeholder="Type your response..."
                                                        style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', color: 'white', padding: '0.5rem', minHeight: '60px' }}
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            const replyText = document.getElementById(`reply-${m.id}`).value;
                                                            if (!replyText) return alert('Please enter a reply');
                                                            try {
                                                                await replyToSupportMessage(m.id, replyText);
                                                                alert('Reply sent!');
                                                                fetchMessages();
                                                            } catch (err) {
                                                                console.error(err);
                                                                alert('Failed to send reply');
                                                            }
                                                        }}
                                                        style={{ alignSelf: 'flex-start', padding: '0.3rem 1rem' }}
                                                    >
                                                        Send Reply
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No messages found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="card">
                    <h3>Registered Users & Active Services</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #334155' }}>
                                    <th style={{ padding: '1rem' }}>User Info</th>
                                    <th>Role</th>
                                    <th>Active/Latest Service</th>
                                    <th>Service Provider</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => {
                                    // Find latest booking for this user
                                    const userBookings = bookings.filter(b => b.user?.id === u.id);
                                    const latestBooking = userBookings.length > 0 ? userBookings[userBookings.length - 1] : null;

                                    return (
                                        <tr key={u.id} style={{ borderBottom: '1px solid #334155' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 'bold' }}>{u.name}</div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{u.email}</div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{u.phone}</div>
                                            </td>
                                            <td>
                                                <span style={{
                                                    padding: '0.2rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.7rem',
                                                    backgroundColor: u.role === 'ADMIN' ? '#6366f1' : '#475569',
                                                    color: 'white'
                                                }}>
                                                    {u.role || 'CUSTOMER'}
                                                </span>
                                            </td>
                                            <td>
                                                {latestBooking ? (
                                                    <div>
                                                        <div style={{ fontSize: '0.9rem' }}>{latestBooking.serviceType?.name || latestBooking.serviceType?.description}</div>
                                                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{latestBooking.date}</div>
                                                    </div>
                                                ) : (
                                                    <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>No bookings found</span>
                                                )}
                                            </td>
                                            <td>
                                                {latestBooking ? (
                                                    <div style={{ fontSize: '0.9rem' }}>{latestBooking.serviceCenter?.name || 'Assigned Mechanic'}</div>
                                                ) : '-'}
                                            </td>
                                            <td>
                                                {latestBooking ? (
                                                    <span style={{
                                                        padding: '0.2rem 0.5rem',
                                                        borderRadius: '4px',
                                                        backgroundColor: latestBooking.status === 'COMPLETED' ? '#10b981' :
                                                            latestBooking.status === 'CANCELLED' ? '#ef4444' : '#f59e0b',
                                                        fontSize: '0.7rem',
                                                        color: 'white'
                                                    }}>{latestBooking.status}</span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'providers' && (
                <div className="card">
                    <h3>Registered Service Providers</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #334155' }}>
                                    <th style={{ padding: '1rem' }}>Provider Info</th>
                                    <th>Login Email</th>
                                    <th>Contact</th>
                                    <th>Assigned Service Center</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.filter(u => u.role === 'PROVIDER').map(provider => {
                                    const assignedCenter = centers.find(c => c.id === provider.serviceCenterId);

                                    return (
                                        <tr key={provider.id} style={{ borderBottom: '1px solid #334155' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{provider.name}</div>
                                                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '0.2rem' }}>ID: {provider.id}</div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '0.9rem', color: '#3b82f6' }}>{provider.email}</div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '0.9rem' }}>{provider.phone}</div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{provider.address}</div>
                                            </td>
                                            <td>
                                                {assignedCenter ? (
                                                    <div>
                                                        <div style={{ fontWeight: 'bold', color: '#10b981' }}>{assignedCenter.name}</div>
                                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{assignedCenter.location}</div>
                                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>📞 {assignedCenter.contact}</div>
                                                    </div>
                                                ) : (
                                                    <span style={{ opacity: 0.4 }}>Not assigned</span>
                                                )}
                                            </td>
                                            <td>
                                                <span style={{
                                                    padding: '0.3rem 0.6rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    backgroundColor: '#10b981',
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}>
                                                    ACTIVE
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {users.filter(u => u.role === 'PROVIDER').length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
                                            No service providers registered yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
