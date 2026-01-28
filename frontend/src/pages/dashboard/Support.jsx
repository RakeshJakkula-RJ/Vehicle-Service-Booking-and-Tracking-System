import React, { useState, useEffect } from 'react';
import { sendSupportMessage, getSupportMessagesByUser } from '../../services/api';

const Support = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const res = await getSupportMessagesByUser(userId);
                setHistory(res.data);
            } catch (err) {
                console.error('Error fetching history:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('userName');

            await sendSupportMessage({
                ...formData,
                userId: userId,
                userName: userName,
                // In a real app, we might fetch user email from backend or store it in localStorage too
                userEmail: localStorage.getItem('userEmail') || 'N/A'
            });

            alert('Your message has been sent successfully! Our team will get back to you soon.');
            setFormData({ subject: '', message: '' });
            fetchHistory();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <h2>Support & Help Center</h2>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card">
                    <h3>Contact Us</h3>
                    <p style={{ color: '#94a3b8' }}>Have questions? Send us a message and we'll get back to you within 24 hours.</p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="How can we help?"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            style={{ width: '100%', height: '100px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', padding: '0.8rem' }}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <div className="card">
                    <h3>Common FAQs</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <details style={{ cursor: 'pointer' }}>
                            <summary style={{ fontWeight: 'bold' }}>How to book a service?</summary>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Go to the "Book Service" page, select your vehicle, center, and date to confirm.</p>
                        </details>
                        <hr style={{ border: '0', borderTop: '1px solid #334155' }} />
                        <details style={{ cursor: 'pointer' }}>
                            <summary style={{ fontWeight: 'bold' }}>Can I cancel a booking?</summary>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Yes, bookings can be cancelled up to 24 hours before the scheduled time.</p>
                        </details>
                        <hr style={{ border: '0', borderTop: '1px solid #334155' }} />
                        <details style={{ cursor: 'pointer' }}>
                            <summary style={{ fontWeight: 'bold' }}>Where can I find my invoice?</summary>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>After a service is marked COMPLETED, invoices appear in your Service History.</p>
                        </details>
                    </div>
                </div>
            </div>

            {history.length > 0 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3>My Support History</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                        {history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(msg => (
                            <div key={msg.id} style={{ borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{msg.subject}</span>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{msg.message}</p>

                                {msg.adminReply ? (
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.3rem' }}>ADMIN RESPONSE:</div>
                                        <p style={{ fontSize: '0.9rem', margin: 0 }}>{msg.adminReply}</p>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontStyle: 'italic' }}>Pending response from support team...</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.1))' }}>
                <h3>Emergency Assistance</h3>
                <p>Stranded on the road? Call our 24/7 roadside assistance hotline.</p>
                <h2 style={{ color: 'var(--secondary-color)', fontSize: '2rem' }}>1800-V-SERVICE</h2>
            </div>
        </div>
    );
};

export default Support;
