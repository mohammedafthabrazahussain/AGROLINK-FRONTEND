import React, { useState, useRef } from 'react';
import { Plus, MapPin, Phone, Package, User, Home, LogOut, X, Edit, Trash2, Upload } from 'lucide-react';
import { useAgro } from '../context/AgroContext';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
    const { user, products, addProduct, updateProduct, deleteProduct, updateUser, logout } = useAgro();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const fileInputRef = useRef(null);

    // Product Form State
    const [productForm, setProductForm] = useState({
        id: null,
        name: '',
        price: '',
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    });
    const [isEditingProduct, setIsEditingProduct] = useState(false);

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        location: user?.location || '',
        farmName: user?.farmName || ''
    });
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Image Upload Handler
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductForm({ ...productForm, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (isEditingProduct) {
            updateProduct(productForm.id, productForm);
            alert('Product Updated Successfully!');
            setIsEditingProduct(false);
        } else {
            addProduct({
                ...productForm,
                farmer: user?.name || 'Unknown Farmer',
                farmerId: user?.id,
                location: user?.location || 'Unknown Location'
            });
            alert('Product Added Successfully!');
        }
        setProductForm({ id: null, name: '', price: '', unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' });
        setActiveTab('products');
    };

    const handleEditProduct = (product) => {
        setProductForm(product);
        setIsEditingProduct(true);
        setActiveTab('add');
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        updateUser(profileForm);
        setIsEditingProfile(false);
        alert('Profile Updated Successfully!');
    };

    // Filter products: Show only products created by this user (or all if no ID match for demo purposes, but let's try to filter)
    // For demo, if user.id exists, filter. If not (initial mock data), show all or specific ones.
    // Let's show all for now but add the logic.
    const myProducts = products.filter(p => p.farmerId === user?.id || !p.farmerId);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: 'var(--color-primary-dark)',
                color: 'white',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                left: 0,
                top: 0,
                zIndex: 10,
                boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 'bold', textAlign: 'center', fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>AgroLink</h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button onClick={() => { setActiveTab('products'); setIsEditingProduct(false); }} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                        backgroundColor: activeTab === 'products' ? 'var(--color-primary)' : 'transparent',
                        color: 'white', width: '100%', textAlign: 'left',
                        transition: 'all 0.2s ease',
                        border: '1px solid',
                        borderColor: activeTab === 'products' ? 'var(--color-accent)' : 'transparent'
                    }}>
                        <Home size={20} /> My Products
                    </button>
                    <button onClick={() => { setActiveTab('add'); setIsEditingProduct(false); setProductForm({ id: null, name: '', price: '', unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' }); }} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                        backgroundColor: activeTab === 'add' ? 'var(--color-primary)' : 'transparent',
                        color: 'white', width: '100%', textAlign: 'left',
                        transition: 'all 0.2s ease',
                        border: '1px solid',
                        borderColor: activeTab === 'add' ? 'var(--color-accent)' : 'transparent'
                    }}>
                        <Plus size={20} /> Add Product
                    </button>
                    <button onClick={() => setActiveTab('profile')} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                        backgroundColor: activeTab === 'profile' ? 'var(--color-primary)' : 'transparent',
                        color: 'white', width: '100%', textAlign: 'left',
                        transition: 'all 0.2s ease',
                        border: '1px solid',
                        borderColor: activeTab === 'profile' ? 'var(--color-accent)' : 'transparent'
                    }}>
                        <User size={20} /> Profile
                    </button>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', opacity: 0.8, color: 'white', background: 'none', width: '100%', textAlign: 'left' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '280px', flex: 1, padding: '3rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Welcome, {user?.name || 'Farmer'}</h1>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            <MapPin size={18} /> {user?.location || 'Location Not Set'}
                        </p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setActiveTab('add')}>
                        <Plus size={20} /> Add New Product
                    </button>
                </header>

                {activeTab === 'products' && (
                    <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Products</h2>
                        {myProducts.length === 0 ? (
                            <div className="card text-center" style={{ padding: '4rem' }}>
                                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>You haven't added any products yet.</p>
                                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActiveTab('add')}>Add Your First Product</button>
                            </div>
                        ) : (
                            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                                {myProducts.map(product => (
                                    <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                        <div style={{ position: 'relative', height: '220px' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                                padding: '1rem',
                                                color: 'white'
                                            }}>
                                                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>₹{product.price}/{product.unit}</span>
                                            </div>
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                                <MapPin size={16} /> {product.location}
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => handleEditProduct(product)} className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }}>
                                                    <Edit size={16} /> Edit
                                                </button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="btn" style={{ flex: 1, padding: '0.5rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'add' && (
                    <div className="card" style={{ maxWidth: '700px', margin: '0 auto', borderTop: '4px solid var(--color-accent)' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{isEditingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleProductSubmit}>
                            <div className="form-group">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-input" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
                            </div>
                            <div className="flex gap-4">
                                <div className="form-group w-full">
                                    <label className="form-label">Price (₹)</label>
                                    <input type="number" className="form-input" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
                                </div>
                                <div className="form-group w-full">
                                    <label className="form-label">Unit</label>
                                    <select className="form-input" value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}>
                                        <option value="kg">Per kg</option>
                                        <option value="pc">Per piece</option>
                                        <option value="bunch">Per bunch</option>
                                        <option value="dozen">Per dozen</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Product Image</label>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <img src={productForm.image} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={() => fileInputRef.current.click()}>
                                        <Upload size={16} /> Upload Image
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem' }}>
                                {isEditingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0 }}>My Profile</h2>
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
                                <div className="form-group">
                                    <label className="form-label">Farm Name</label>
                                    <input type="text" className="form-input" value={profileForm.farmName} onChange={(e) => setProfileForm({ ...profileForm, farmName: e.target.value })} />
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
                                <p style={{ color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Farmer</p>

                                <div className="grid gap-4" style={{ textAlign: 'left' }}>
                                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user?.phone || 'Not provided'}</p>
                                    </div>
                                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</label>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user?.location || 'Not provided'}</p>
                                    </div>
                                    {user?.farmName && (
                                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Farm Name</label>
                                            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user.farmName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default FarmerDashboard;
