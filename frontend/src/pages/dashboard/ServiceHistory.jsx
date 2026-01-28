import React, { useState, useEffect } from 'react';
import api, { getBookingsByUser } from '../../services/api';

const ServiceHistory = () => {
    const userId = localStorage.getItem('userId');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await getBookingsByUser(userId);
            setBookings(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchInvoice = async (bookingId) => {
        try {
            const res = await api.get(`/invoices/booking/${bookingId}`);
            setSelectedInvoice(res.data);
        } catch (error) {
            alert('Invoice not found or generated yet.');
        }
    };

    return (
        <div>
            <h2>Service History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? <p>Loading...</p> : bookings.map(b => (
                    <div key={b.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0 }}>Booking #{b.id} - {b.serviceType?.description}</h4>
                            <p style={{ margin: '0.2rem 0', color: '#94a3b8' }}>{b.date} | {b.serviceCenter?.name}</p>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Vehicle: {b.vehicle?.make} {b.vehicle?.model}</p>
                            {b.expectedCompletionDate && (
                                <p style={{ margin: '0.3rem 0', fontSize: '0.85rem', color: '#10b981', fontWeight: 'bold' }}>
                                    📅 Expected Completion: {b.expectedCompletionDate}
                                </p>
                            )}
                            {(b.status === 'CONFIRMED' || b.status === 'COMPLETED') && b.user?.phone && (
                                <p style={{ margin: '0.3rem 0', fontSize: '0.85rem', color: '#3b82f6' }}>
                                    📞 Provider Contact: {b.user?.phone || 'Contact service center'}
                                </p>
                            )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{
                                padding: '0.2rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                background: b.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                color: b.status === 'COMPLETED' ? '#10b981' : '#f59e0b',
                                fontWeight: 'bold'
                            }}>
                                {b.status}
                            </span>
                            <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>₹{b.serviceType?.price}</p>
                            {b.status === 'COMPLETED' && (
                                <button onClick={() => fetchInvoice(b.id)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', marginTop: '0.5rem', background: 'var(--secondary-color)' }}>
                                    View Invoice
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {!loading && bookings.length === 0 && <p>No service history found.</p>}

            {selectedInvoice && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
                }}>
                    <div className="card" style={{ maxWidth: '400px', width: '90%', position: 'relative' }}>
                        <button onClick={() => setSelectedInvoice(null)} style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', color: 'white', cursor: 'pointer' }}>&times;</button>
                        <h2 style={{ textAlign: 'center', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>INVOICE</h2>
                        <div style={{ marginTop: '1.5rem' }}>
                            <p><strong>Invoice ID:</strong> #{selectedInvoice.id}</p>
                            <p><strong>Service:</strong> {selectedInvoice.serviceType?.description}</p>
                            <p><strong>Amount:</strong> ₹{selectedInvoice.totalAmount}</p>
                            <p><strong>Status:</strong> {selectedInvoice.paymentStatus}</p>
                            <button style={{ width: '100%', marginTop: '1rem' }} onClick={() => alert('Payment feature coming soon!')}>Pay Now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceHistory;
