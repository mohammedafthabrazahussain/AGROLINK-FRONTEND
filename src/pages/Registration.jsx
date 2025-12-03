import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAgro } from '../context/AgroContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Registration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { registerOrLogin } = useAgro();

    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get('type') || 'customer';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        email: '',
        farmName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            ...formData,
            type: userType
            // id is now handled in registerOrLogin
        };

        registerOrLogin(userData);

        if (userType === 'farmer') {
            navigate('/farmer-dashboard');
        } else {
            navigate('/customer-dashboard');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)' }}>
            <Navbar />

            <main style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8rem 0 4rem',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
            }}>
                <div className="container">
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', borderTop: '4px solid var(--color-accent)' }}>
                        <h2 className="text-center" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>
                            Join as <span style={{ color: 'var(--color-primary)' }}>{userType === 'farmer' ? 'Farmer' : 'Customer'}</span>
                        </h2>



                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Location (City/Village)</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="form-input"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Nashik, Pune"
                                />
                            </div>

                            {userType === 'farmer' && (
                                <div className="form-group">
                                    <label className="form-label">Farm Name (Optional)</label>
                                    <input
                                        type="text"
                                        name="farmName"
                                        className="form-input"
                                        value={formData.farmName}
                                        onChange={handleChange}
                                        placeholder="e.g. Green Valley Farms"
                                    />
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1.5rem', padding: '1rem' }}>
                                Register & Continue
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Registration;
