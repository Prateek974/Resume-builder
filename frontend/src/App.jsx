import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Import the AuthProvider
import { AuthProvider } from './context/AuthContext'; 

import Footer from './components/ui/Footer';
import Navbar from './components/ui/Navbar';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    // 2. Wrap the entire application in AuthProvider
    <AuthProvider>
      <BrowserRouter>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;