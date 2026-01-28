import React, { useState, useEffect } from 'react';
import { getVehiclesByUser, addVehicle } from '../../services/api';

const MyVehicles = () => {
    const userId = localStorage.getItem('userId');
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({ make: '', model: '', year: '', registrationNumber: '' });
    const [loading, setLoading] = useState(true);
    const [showCustomMake, setShowCustomMake] = useState(false);
    const [showCustomModel, setShowCustomModel] = useState(false);

    // Popular car makes and their models
    const carData = {
        'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire', 'Alto', 'WagonR', 'Vitara Brezza', 'Ertiga', 'Other'],
        'Hyundai': ['i20', 'Creta', 'Venue', 'Verna', 'Grand i10', 'Elantra', 'Tucson', 'Other'],
        'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Tiago', 'Punch', 'Tigor', 'Other'],
        'Mahindra': ['Scorpio', 'XUV700', 'Thar', 'Bolero', 'XUV300', 'Scorpio N', 'Other'],
        'Honda': ['City', 'Amaze', 'Jazz', 'WR-V', 'Civic', 'CR-V', 'Other'],
        'Toyota': ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Camry', 'Other'],
        'Kia': ['Seltos', 'Sonet', 'Carens', 'Carnival', 'EV6', 'Other'],
        'Renault': ['Kwid', 'Triber', 'Kiger', 'Duster', 'Other'],
        'Nissan': ['Magnite', 'Kicks', 'GT-R', 'Other'],
        'Volkswagen': ['Polo', 'Vento', 'Taigun', 'Tiguan', 'Other'],
        'Skoda': ['Rapid', 'Kushaq', 'Octavia', 'Superb', 'Other'],
        'MG': ['Hector', 'Astor', 'ZS EV', 'Gloster', 'Other'],
        'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire', 'Other'],
        'Other': []
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const res = await getVehiclesByUser(userId);
            setVehicles(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleMakeChange = (e) => {
        const selectedMake = e.target.value;
        if (selectedMake === 'Other') {
            setShowCustomMake(true);
            setNewVehicle({ ...newVehicle, make: '', model: '' });
        } else {
            setShowCustomMake(false);
            setShowCustomModel(false);
            setNewVehicle({ ...newVehicle, make: selectedMake, model: '' });
        }
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        if (selectedModel === 'Other') {
            setShowCustomModel(true);
            setNewVehicle({ ...newVehicle, model: '' });
        } else {
            setShowCustomModel(false);
            setNewVehicle({ ...newVehicle, model: selectedModel });
        }
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        try {
            await addVehicle({ ...newVehicle, user: { id: userId } });
            setNewVehicle({ make: '', model: '', year: '', registrationNumber: '' });
            setShowCustomMake(false);
            setShowCustomModel(false);
            fetchVehicles();
            alert('Vehicle added successfully!');
        } catch (error) {
            alert('Failed to add vehicle');
        }
    };

    return (
        <div>
            <h2>My Vehicles</h2>
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>Add New Vehicle</h3>
                <form onSubmit={handleAddVehicle} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {!showCustomMake ? (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                    Select Car Make/Brand
                                </label>
                                <select
                                    onChange={handleMakeChange}
                                    value={newVehicle.make}
                                    required
                                    style={{ width: '100%' }}
                                >
                                    <option value="">-- Choose Brand --</option>
                                    {Object.keys(carData).map(make => (
                                        <option key={make} value={make}>{make}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                Enter Custom Make
                            </label>
                            <input
                                placeholder="e.g. Tesla, BMW, Mercedes"
                                value={newVehicle.make}
                                onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCustomMake(false);
                                    setNewVehicle({ ...newVehicle, make: '', model: '' });
                                }}
                                style={{ marginTop: '0.5rem', padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: '#64748b' }}
                            >
                                ← Back to List
                            </button>
                        </div>
                    )}

                    {newVehicle.make && !showCustomMake && carData[newVehicle.make] && !showCustomModel ? (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                Select Model
                            </label>
                            <select
                                onChange={handleModelChange}
                                value={newVehicle.model}
                                required
                                style={{ width: '100%' }}
                            >
                                <option value="">-- Choose Model --</option>
                                {carData[newVehicle.make].map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                        </div>
                    ) : newVehicle.make && (showCustomMake || showCustomModel) ? (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                Enter Custom Model
                            </label>
                            <input
                                placeholder="e.g. Model S, X5, C-Class"
                                value={newVehicle.model}
                                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                                required
                            />
                            {showCustomModel && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCustomModel(false);
                                        setNewVehicle({ ...newVehicle, model: '' });
                                    }}
                                    style={{ marginTop: '0.5rem', padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: '#64748b' }}
                                >
                                    ← Back to List
                                </button>
                            )}
                        </div>
                    ) : null}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                            Year
                        </label>
                        <input
                            placeholder="e.g. 2023"
                            type="number"
                            min="1980"
                            max="2025"
                            value={newVehicle.year}
                            onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                            Registration Number
                        </label>
                        <input
                            placeholder="e.g. MH01AB1234"
                            value={newVehicle.registrationNumber}
                            onChange={(e) => setNewVehicle({ ...newVehicle, registrationNumber: e.target.value.toUpperCase() })}
                            required
                            style={{ textTransform: 'uppercase' }}
                        />
                    </div>

                    <button type="submit" style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                        🚗 Add Vehicle
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {loading ? <p>Loading...</p> : vehicles.map(v => (
                    <div key={v.id} className="card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>🚗 {v.make} {v.model}</h4>
                        <p style={{ margin: '0', color: '#94a3b8' }}>Year: {v.year}</p>
                        <p style={{ margin: '0', color: 'var(--secondary-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>{v.registrationNumber}</p>
                    </div>
                ))}
            </div>
            {!loading && vehicles.length === 0 && <p>No vehicles added yet.</p>}
        </div>
    );
};

export default MyVehicles;
