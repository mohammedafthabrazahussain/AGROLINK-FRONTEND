import React, { useState } from 'react';
import { Trash2, ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useAgro } from '../context/AgroContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useAgro();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setOrderPlaced(true);
            clearCart();
        }, 2000);
    };

    if (orderPlaced) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)' }}>
                <Navbar />
                <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div className="card text-center" style={{ maxWidth: '500px', padding: '4rem 2rem', borderTop: '4px solid var(--color-primary)' }}>
                        <div style={{ color: 'var(--color-primary)', marginBottom: '2rem' }}>
                            <CheckCircle size={80} />
                        </div>
                        <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Order Placed!</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                            Thank you for supporting local farmers. Your fresh produce will be delivered soon.
                        </p>
                        <button onClick={() => navigate('/customer-dashboard')} className="btn btn-primary">
                            Continue Shopping
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            <Navbar />

            <main className="container" style={{ padding: '8rem 2rem 4rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/customer-dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                </div>

                <h1 style={{ marginBottom: '3rem', fontSize: '3rem', color: 'var(--color-primary-dark)' }}>Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="card text-center" style={{ padding: '6rem 2rem' }}>
                        <h2 style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.5rem' }}>Your cart is empty</h2>
                        <Link to="/customer-dashboard" className="btn btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
                        {/* Cart Items */}
                        <div className="card" style={{ padding: '0' }}>
                            {cart.map((item, index) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    padding: '2rem',
                                    borderBottom: index !== cart.length - 1 ? '1px solid var(--color-border)' : 'none'
                                }}>
                                    <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.5rem' }}>{item.name}</h3>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>₹{item.price * item.quantity}</span>
                                        </div>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                                            ₹{item.price} / {item.unit}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-alt)' }}
                                                >-</button>
                                                <span style={{ padding: '0.5rem 1rem', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-alt)' }}
                                                >+</button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ color: '#ef4444', background: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
                                            >
                                                <Trash2 size={18} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="card" style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Order Summary</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                                <span style={{ fontWeight: 600 }}>₹{getCartTotal()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                <span style={{ color: 'var(--color-text-muted)' }}>Delivery Fee</span>
                                <span style={{ fontWeight: 600 }}>₹40</span>
                            </div>
                            <div style={{ borderTop: '2px dashed var(--color-border)', margin: '1.5rem 0' }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>
                                <span>Total</span>
                                <span>₹{getCartTotal() + 40}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="btn btn-primary w-full"
                                disabled={isCheckingOut}
                                style={{ padding: '1rem' }}
                            >
                                {isCheckingOut ? 'Processing...' : (
                                    <>
                                        <CreditCard size={20} /> Proceed to Pay
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
