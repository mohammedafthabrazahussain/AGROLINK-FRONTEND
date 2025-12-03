import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '3rem 0',
            marginTop: 'auto'
        }}>
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} AgroLink. Connecting Farmers and Customers.</p>
            </div>
        </footer>
    );
};

export default Footer;
