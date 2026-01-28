import React, { useState } from 'react';
import { getBookingById } from '../services/api';

const TrackService = () => {
    const [bookingId, setBookingId] = useState('');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!bookingId) return;

        setLoading(true);
        setError('');
        setBooking(null);

        try {
            const res = await getBookingById(bookingId);
            if (res.data) {
                setBooking(res.data);
            } else {
                setError('Service ID not found. Please check and try again.');
            }
        } catch (err) {
            setError('Could not find service details. Please ensure the Service ID is correct.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
            <div className="hero" style={{ padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Track Your Service</h1>
                <p style={{ color: 'var(--text-muted)' }}>Enter your Service ID to see real-time updates without logging in.</p>
            </div>

            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <form onSubmit={handleTrack}>
                    <label>Service ID (provided during booking)</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Enter Service ID (e.g. 101)"
                            value={bookingId}
                            onChange={(e) => setBookingId(e.target.value)}
                            required
                            style={{ marginBottom: 0 }}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'Track'}
                        </button>
                    </div>
                </form>
                {error && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
            </div>

            {booking && (
                <div className="card" style={{ marginTop: '2rem', borderLeft: `6px solid ${booking.status === 'COMPLETED' ? 'var(--success-color)' : 'var(--warning-color)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
                        <div>
                            <h2 style={{ margin: 0 }}>Service ID #{booking.id}</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{booking.serviceType?.description}</p>
                        </div>
                        <div style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            background: booking.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: booking.status === 'COMPLETED' ? 'var(--success-color)' : 'var(--warning-color)',
                            fontWeight: 'bold',
                            border: `1px solid ${booking.status === 'COMPLETED' ? 'var(--success-color)' : 'var(--warning-color)'}`
                        }}>
                            {booking.status}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem', borderTop: '1px solid #334155', paddingTop: '2rem' }}>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Vehicle</h4>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{booking.vehicle?.make} {booking.vehicle?.model}</p>
                            <p>{booking.vehicle?.registrationNumber}</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Appointment</h4>
                            <p style={{ fontWeight: 'bold' }}>{booking.date}</p>
                            <p>{booking.timeSlot}</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Service Center</h4>
                            <p style={{ fontWeight: 'bold' }}>{booking.serviceCenter?.name}</p>
                            <p>{booking.serviceCenter?.location}</p>
                        </div>
                    </div>

                    {booking.status === 'COMPLETED' && (
                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                            <p>This service has been completed. Log in to view and pay your invoice.</p>
                            <a href="/login"><button style={{ marginTop: '0.5rem' }}>Login to View Invoice</button></a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrackService;
