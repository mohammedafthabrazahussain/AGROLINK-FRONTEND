import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, ShoppingCart, LogOut, User } from 'lucide-react';
import { useAgro } from '../context/AgroContext';

const Navbar = () => {
    const { user, cart, logout } = useAgro();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToAbout = (e) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            window.location.href = '/#about';
        } else {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav style={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
            padding: '1.25rem 0',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: scrolled ? 'var(--color-primary)' : 'var(--color-primary-dark)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em'
                }}>
                    <div style={{
                        backgroundColor: 'var(--color-accent)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        color: 'white',
                        display: 'flex'
                    }}>
                        <Sprout size={24} />
                    </div>
                    <span>AgroLink</span>
                </Link>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <a href="#about" onClick={scrollToAbout} style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>About</a>
                    <Link to="/contact" style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</Link>

                    {user && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{user.name}</span>
                            {user.type === 'customer' && (
                                <Link to="/cart" style={{ position: 'relative', color: 'var(--color-text-main)' }}>
                                    <ShoppingCart size={24} />
                                    {cart.length > 0 && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-8px',
                                            right: '-8px',
                                            backgroundColor: 'var(--color-accent)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}>
                                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                        </span>
                                    )}
                                </Link>
                            )}
                            <button onClick={logout} style={{ background: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
