import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, ShoppingBasket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserSelection = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', backgroundColor: 'var(--color-background)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--color-primary)' }}>
                        Are you a Farmer or a Customer?
                    </h2>

                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                        {/* Farmer Card */}
                        <Link to="/farmer-dashboard" className="card text-center" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            <div style={{
                                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--color-primary)'
                            }}>
                                <Tractor size={64} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Farmer</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Sell your produce directly to customers.</p>
                        </Link>

                        {/* Customer Card */}
                        <Link to="/customer-dashboard" className="card text-center" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            <div style={{
                                backgroundColor: 'rgba(255, 213, 79, 0.2)',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#F57F17'
                            }}>
                                <ShoppingBasket size={64} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Customer</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Buy fresh, locally sourced food.</p>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserSelection;
