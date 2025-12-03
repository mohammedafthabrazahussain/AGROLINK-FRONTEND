import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, ShoppingBasket, ShieldCheck, Leaf, Heart, Users, Globe, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <section style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: 'var(--color-primary-dark)',
                    backgroundImage: 'linear-gradient(rgba(6, 78, 59, 0.7), rgba(6, 78, 59, 0.8)), url("https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    color: 'white',
                    paddingTop: '80px'
                }}>
                    <div className="container">
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '50px',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            Premium Agriculture Marketplace
                        </span>
                        <h1 style={{
                            fontSize: '5rem',
                            color: 'white',
                            marginBottom: '1.5rem',
                            fontWeight: 700,
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            lineHeight: 1.1
                        }}>
                            Cultivating Trust,<br />
                            <span style={{ color: 'var(--color-accent)' }}>Harvesting Quality.</span>
                        </h1>
                        <p style={{
                            fontSize: '1.35rem',
                            color: 'rgba(255,255,255,0.9)',
                            maxWidth: '750px',
                            margin: '0 auto 3.5rem',
                            lineHeight: 1.8,
                            fontWeight: 300
                        }}>
                            Experience the finest connection between dedicated farmers and discerning customers.
                            Pure, organic, and directly from the source.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                            <Link to="/register?type=farmer" className="btn btn-primary" style={{
                                fontSize: '1.1rem',
                                padding: '1.25rem 3rem',
                                backgroundColor: 'var(--color-accent)',
                                backgroundImage: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
                                border: 'none'
                            }}>
                                <Tractor size={24} />
                                Join as Farmer
                            </Link>
                            <Link to="/register?type=customer" className="btn" style={{
                                fontSize: '1.1rem',
                                padding: '1.25rem 3rem',
                                backgroundColor: 'transparent',
                                border: '2px solid white',
                                color: 'white'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.color = 'var(--color-primary-dark)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'white';
                                }}
                            >
                                <ShoppingBasket size={24} />
                                Join as Customer
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" style={{ padding: '8rem 0', backgroundColor: 'var(--color-background)' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About AgroLink</h2>
                            <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--color-accent)', margin: '0 auto 2rem' }}></div>
                            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
                                We are on a mission to revolutionize the agricultural supply chain by eliminating middlemen and ensuring fair prices for farmers while delivering the freshest organic produce to customers.
                            </p>
                        </div>

                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--color-primary)', minWidth: '60px' }}><Users size={48} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Community First</h3>
                                        <p style={{ color: 'var(--color-text-muted)' }}>Building a strong community of local farmers and conscious consumers who care about quality and sustainability.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--color-primary)', minWidth: '60px' }}><Globe size={48} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Sustainable Future</h3>
                                        <p style={{ color: 'var(--color-text-muted)' }}>Promoting eco-friendly farming practices that protect our soil and environment for future generations.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ color: 'var(--color-primary)', minWidth: '60px' }}><Award size={48} /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Quality Guaranteed</h3>
                                        <p style={{ color: 'var(--color-text-muted)' }}>Every product is vetted for quality. We ensure that only the best, freshest produce reaches your table.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    alt="Farming"
                                    style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section style={{ padding: '8rem 0', backgroundColor: 'white' }}>
                    <div className="container">
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
                                <div style={{
                                    color: 'var(--color-primary)',
                                    marginBottom: '2rem',
                                    backgroundColor: 'rgba(6, 78, 59, 0.05)',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem'
                                }}>
                                    <Leaf size={48} />
                                </div>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>100% Organic</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                                    Certified organic produce grown with care and without harmful chemicals.
                                </p>
                            </div>

                            <div className="card text-center" style={{ padding: '3rem 2rem', transform: 'translateY(-20px)' }}>
                                <div style={{
                                    color: 'var(--color-accent)',
                                    marginBottom: '2rem',
                                    backgroundColor: 'rgba(217, 119, 6, 0.05)',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem'
                                }}>
                                    <ShieldCheck size={48} />
                                </div>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Fair Trade</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                                    We ensure farmers get the best price for their hard work, eliminating middlemen.
                                </p>
                            </div>

                            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
                                <div style={{
                                    color: 'var(--color-primary)',
                                    marginBottom: '2rem',
                                    backgroundColor: 'rgba(6, 78, 59, 0.05)',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem'
                                }}>
                                    <Heart size={48} />
                                </div>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Fresh Delivery</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                                    From the farm to your doorstep in record time, maintaining maximum freshness.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
