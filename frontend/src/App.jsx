import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/ui/PrivateRoute'; // 1. Import your Bouncer

import Pricing from './pages/Pricing';
import Footer from './components/ui/Footer';
import Navbar from './components/ui/Navbar';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        
        <Navbar />

        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* --- PROTECTED ROUTES --- */}
          {/* 2. Wrap all "Member Only" pages inside this PrivateRoute element */}
          <Route element={<PrivateRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             
             {/* Future protected routes will go here, like:
                 <Route path="/builder" element={<ResumeBuilder />} /> 
             */}
          </Route>
        </Routes>

        <Footer />
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;