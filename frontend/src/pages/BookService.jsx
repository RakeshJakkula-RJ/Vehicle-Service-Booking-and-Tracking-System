import React, { useEffect, useState } from 'react';
import { getVehiclesByUser, getServiceCenters, createBooking, getServiceTypes } from '../services/api';
import { useNavigate } from 'react-router-dom';

const BookService = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState([]);
    const [centers, setCenters] = useState([]);

    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedCenter, setSelectedCenter] = useState('');
    const [serviceTypes, setServiceTypes] = useState([]);
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

    useEffect(() => {
        if (userId) {
            getVehiclesByUser(userId).then(res => setVehicles(res.data));
            getServiceCenters().then(res => {
                // Remove duplicates based on name and location
                const uniqueCenters = [];
                const seen = new Set();

                res.data.forEach(center => {
                    const key = `${center.name}|${center.location}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        uniqueCenters.push(center);
                    }
                });

                setCenters(uniqueCenters);
            });
            getServiceTypes().then(res => setServiceTypes(res.data));
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBooking({
                user: { id: userId },
                vehicle: { id: selectedVehicle },
                serviceCenter: { id: selectedCenter },
                serviceType: { id: selectedServiceType },
                date: date,
                timeSlot: timeSlot
            });
            alert('Booking Requested Successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Booking failed');
        }
    };

    if (!userId) return <div className="container" style={{ marginTop: '2rem' }}>Please <a href="/login" style={{ fontWeight: 'bold' }}>Login</a> or <a href="/register" style={{ fontWeight: 'bold' }}>Register</a> to book a service.</div>;

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Book a Service</h2>
                <form onSubmit={handleSubmit}>
                    <label>Select Vehicle</label>
                    <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} required>
                        <option value="">-- Choose Vehicle --</option>
                        {vehicles.map(v => (
                            <option key={v.id} value={v.id}>{v.make} {v.model} - {v.registrationNumber}</option>
                        ))}
                    </select>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Select Service Center</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>(Multiple locations available)</span>
                    </label>
                    <select value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)} required>
                        <option value="">-- Choose Center --</option>
                        {centers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name} - {c.location} 📍
                            </option>
                        ))}
                    </select>

                    <label>Select Service Type</label>
                    <select value={selectedServiceType} onChange={e => setSelectedServiceType(e.target.value)} required>
                        <option value="">-- Choose Service --</option>
                        {serviceTypes
                            .filter((service, index, self) =>
                                index === self.findIndex((t) => (
                                    t.description === service.description
                                ))
                            )
                            .map(s => (
                                <option key={s.id} value={s.id}>{s.description} - ₹{s.price}</option>
                            ))}
                    </select>

                    <label>Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

                    <label>Time Slot</label>
                    <input
                        type="time"
                        value={timeSlot}
                        onChange={e => setTimeSlot(e.target.value)}
                        required
                        style={{ cursor: 'pointer' }}
                    />

                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookService;
