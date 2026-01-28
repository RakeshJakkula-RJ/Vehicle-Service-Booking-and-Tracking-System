import React, { useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState({
        name: localStorage.getItem('userName') || 'User',
        email: 'user@example.com', // In a real app, fetch from backend
        phone: '+91 9876543210',
        address: '123 Main St, Bangalore'
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        alert('Profile updated successfully (Mock)');
    };

    return (
        <div style={{ maxWidth: '600px' }}>
            <h2>Profile Settings</h2>
            <div className="card">
                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Full Name</label>
                        <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Email Address</label>
                        <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Phone Number</label>
                        <input type="tel" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Resident Address</label>
                        <textarea
                            value={user.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                            style={{ width: '100%', height: '100px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', padding: '0.8rem' }}
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '1rem' }}>Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
