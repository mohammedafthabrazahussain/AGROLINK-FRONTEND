import React, { useState } from 'react';
import { ShoppingCart, MapPin, Search, User, LogOut, Edit } from 'lucide-react';
import { useAgro } from '../context/AgroContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CustomerDashboard = () => {
    const { products, addToCart, cart, user, updateUser, logout } = useAgro();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('products'); // 'products', 'profile'

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        location: user?.location || ''
    });
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        updateUser(profileForm);
        setIsEditingProfile(false);
        alert('Profile Updated Successfully!');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            <Navbar />

            {activeTab === 'products' && (
                <>
                    {/* Hero/Search Section */}
                    <div style={{
                        backgroundColor: 'var(--color-primary-dark)',
                        padding: '8rem 0 4rem',
                        color: 'white',
                        textAlign: 'center',
                        backgroundImage: 'linear-gradient(rgba(6, 78, 59, 0.9), rgba(6, 78, 59, 0.9)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <div className="container">
                            <h1 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '3rem' }}>Fresh from the Farm to Your Table</h1>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem' }}>
                                Discover the finest organic produce from local farmers.
                            </p>
                            <div style={{
                                maxWidth: '700px',
                                margin: '0 auto',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Search size={24} style={{ position: 'absolute', left: '1.5rem', color: 'var(--color-primary)' }} />
                                <input
                                    type="text"
                                    placeholder="Search for vegetables, fruits..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem 1.25rem 1.25rem 4rem',
                                        borderRadius: 'var(--radius-full)',
                                        border: 'none',
                                        fontSize: '1.1rem',
                                        outline: 'none',
                                        color: 'var(--color-text-main)',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <button onClick={() => setActiveTab('profile')} className="btn btn-secondary" style={{ color: 'white', borderColor: 'white' }}>
                                    <User size={18} /> My Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <main className="container" style={{ padding: '4rem 2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem' }}>Featured Products</h2>
                            <span style={{ color: 'var(--color-text-muted)' }}>Showing {filteredProducts.length} results</span>
                        </div>

                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                            {filteredProducts.map(product => (
                                <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            backgroundColor: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            fontWeight: 'bold',
                                            color: 'var(--color-primary)',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                        }}>
                                            ₹{product.price}/{product.unit}
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <User size={16} /> {product.farmer}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                            <MapPin size={16} /> {product.location}
                                        </div>

                                        <button
                                            className="btn btn-primary"
                                            style={{ marginTop: 'auto', width: '100%' }}
                                            onClick={() => {
                                                addToCart(product);
                                                alert(`${product.name} added to cart!`);
                                            }}
                                        >
                                            <ShoppingCart size={18} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
            )}

            {activeTab === 'profile' && (
                <main className="container" style={{ padding: '8rem 2rem 4rem' }}>
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button onClick={() => setActiveTab('products')} className="btn btn-secondary" style={{ padding: '0.5rem' }}>Back</button>
                                <h2 style={{ margin: 0 }}>My Profile</h2>
                            </div>
                            <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                                <Edit size={16} /> {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {isEditingProfile ? (
                            <form onSubmit={handleProfileUpdate}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-input" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-input" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-input" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                            </form>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--color-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    margin: '0 auto 1.5rem',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    <User size={64} />
                                </div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{user?.name}</h3>
                                <p style={{ color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Customer</p>

                                <div className="grid gap-4" style={{ textAlign: 'left' }}>
                                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user?.phone || 'Not provided'}</p>
                                    </div>
                                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</label>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user?.location || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            )}
        </div>
    );
};

export default CustomerDashboard;
