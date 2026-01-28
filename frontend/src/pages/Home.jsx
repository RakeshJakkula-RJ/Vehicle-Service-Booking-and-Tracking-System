import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="container">
                <div className="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4rem 0', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ flex: 1, textAlign: 'left' }}
                    >
                        <div className="badge-gold" style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary-color)', borderRadius: '20px', fontWeight: 'bold' }}>
                            ✨ Premium Service
                        </div>
                        <h1 style={{ marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Your Journey, Our Care. <br />
                            <span style={{ color: 'var(--primary-color)' }}>Exclusive Service</span> for the Discerning.
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                            Experience automotive care redefined. Certified experts, transparent tracking, and a commitment to excellence.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/book">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '0.8rem 2.5rem',
                                        fontSize: '1rem',
                                        backgroundColor: 'var(--secondary-color)',
                                        color: '#030b17',
                                        border: 'none'
                                    }}
                                >
                                    Book Service
                                </motion.button>
                            </Link>
                            <Link to="/track">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--primary-color)',
                                        color: 'var(--primary-color)',
                                        padding: '0.8rem 2.5rem',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Track Status
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ flex: 1 }}
                    >
                        <img
                            src="/hero_car.png"
                            alt="Luxury Car"
                            style={{
                                width: '100%',
                                maxWidth: '650px',
                                height: 'auto',
                                dropShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                            }}
                        />
                    </motion.div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                    <FeatureCard icon="👨‍🔧" title="Certified Mechanics" desc="Every service center is vetted and staffed by certified professionals with years of experience." delay={0.2} />
                    <FeatureCard icon="📈" title="Smart Monitoring" desc="Track your service progress in real-time. Get notified when your vehicle is ready for pickup." delay={0.4} />
                    <FeatureCard icon="💳" title="Digital Invoicing" desc="Transparent pricing with digital invoices. Pay securely through our platform with multiple options." delay={0.6} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card"
                    style={{ marginTop: '6rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '4rem', textAlign: 'center' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to give your car the best care?</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Join thousands of happy car owners who trust VehicleService.</p>
                    <Link to="/register">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: 'white', color: 'black' }}>Create Free Account</motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        className="card"
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -5 }}
    >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
        <h3>{title}</h3>
        <p className="text-muted">{desc}</p>
    </motion.div>
);

export default Home;
