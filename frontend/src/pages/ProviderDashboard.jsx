import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ProviderDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [serviceCenterName, setServiceCenterName] = useState('');
    const navigate = useNavigate();

    const [showDateModal, setShowDateModal] = useState(false);
    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        const serviceCenterId = localStorage.getItem('serviceCenterId');

        if (userRole !== 'PROVIDER') {
            navigate('/provider/login');
            return;
        }

        if (serviceCenterId) {
            fetchBookings(serviceCenterId);
            fetchServiceCenterInfo(serviceCenterId);
        }
    }, [navigate]);

    const fetchBookings = async (serviceCenterId) => {
        try {
            const res = await api.get(`/bookings/service-center/${serviceCenterId}`);
            setBookings(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchServiceCenterInfo = async (serviceCenterId) => {
        try {
            const res = await api.get(`/service-centers/${serviceCenterId}`);
            setServiceCenterName(res.data.name);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAcceptClick = (bookingId) => {
        setCurrentBookingId(bookingId);
        setSelectedDate('');
        setShowDateModal(true);
    };

    const handleConfirmAccept = async (e) => {
        e.preventDefault();
        if (!selectedDate) {
            alert('Please select a date');
            return;
        }

        try {
            await api.put(`/bookings/${currentBookingId}/status?status=CONFIRMED&expectedCompletionDate=${selectedDate}`);
            alert('Booking accepted! Customer has been notified.');
            setShowDateModal(false);
            fetchBookings(localStorage.getItem('serviceCenterId'));
        } catch (error) {
            console.error(error);
            alert('Failed to accept booking');
        }
    };

    const handleCompleteBooking = async (bookingId) => {
        if (!window.confirm('Mark this booking as completed?')) return;

        try {
            await api.put(`/bookings/${bookingId}/status?status=COMPLETED`);
            alert('Booking marked as completed!');
            fetchBookings(localStorage.getItem('serviceCenterId'));
        } catch (error) {
            console.error(error);
            alert('Failed to complete booking');
        }
    };

    const providerPhone = localStorage.getItem('userEmail'); // Using email as contact for now

    return (
        <div className="container" style={{ marginTop: '2rem', position: 'relative' }}>
            {showDateModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="card" style={{ width: '400px', margin: 0, animation: 'fadeIn 0.2s' }}>
                        <h3>Confirm Acceptance</h3>
                        <p>When do you expect to complete this service?</p>
                        <form onSubmit={handleConfirmAccept}>
                            <label>Expected Completion Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                required
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowDateModal(false)} style={{ flex: 1, backgroundColor: '#64748b' }}>Cancel</button>
                                <button type="submit" style={{ flex: 1, backgroundColor: '#10b981' }}>Confirm & Accept</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Service Provider Dashboard</h1>
                    <p style={{ opacity: 0.7 }}>Service Center: {serviceCenterName}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Provider Contact</p>
                    <p style={{ fontWeight: 'bold' }}>{localStorage.getItem('userName')}</p>
                    <p style={{ fontSize: '0.9rem' }}>{providerPhone}</p>
                </div>
            </div>

            <div className="card">
                <h3>Service Requests</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #334155' }}>
                                <th style={{ padding: '1rem' }}>ID</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Service Type</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Expected Completion</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id} style={{ borderBottom: '1px solid #334155' }}>
                                    <td style={{ padding: '1rem' }}>{b.id}</td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{b.user?.name}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{b.user?.phone}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{b.user?.email}</div>
                                    </td>
                                    <td>{b.vehicle?.make} {b.vehicle?.model}</td>
                                    <td>{b.serviceType?.description}</td>
                                    <td>{b.date} ({b.timeSlot})</td>
                                    <td>
                                        <span style={{
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: b.status === 'COMPLETED' ? '#10b981' :
                                                b.status === 'CONFIRMED' ? '#3b82f6' :
                                                    b.status === 'CANCELLED' ? '#ef4444' : '#f59e0b',
                                            fontSize: '0.8rem',
                                            color: 'white'
                                        }}>{b.status}</span>
                                    </td>
                                    <td>
                                        {b.expectedCompletionDate ? (
                                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>{b.expectedCompletionDate}</span>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        {b.status === 'PENDING' && (
                                            <button
                                                onClick={() => handleAcceptClick(b.id)}
                                                style={{ backgroundColor: '#10b981', padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                                            >
                                                Accept
                                            </button>
                                        )}
                                        {b.status === 'CONFIRMED' && (
                                            <button
                                                onClick={() => handleCompleteBooking(b.id)}
                                                style={{ backgroundColor: '#3b82f6', padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No service requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
