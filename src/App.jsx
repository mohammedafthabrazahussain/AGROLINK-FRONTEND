import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AgroProvider } from './context/AgroContext';
import LandingPage from './pages/LandingPage';
import UserSelection from './pages/UserSelection';
import Registration from './pages/Registration';
import FarmerDashboard from './pages/FarmerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Cart from './pages/Cart';

function App() {
  return (
    <AgroProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-user" element={<UserSelection />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/cart" element={<Cart />} />
          {/* Placeholder routes */}
          <Route path="/about" element={<LandingPage />} />
          <Route path="/contact" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
        </Routes>
      </Router>
    </AgroProvider>
  );
}

export default App;
