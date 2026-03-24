import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/ui/PrivateRoute'; 

// Pages & Components
import Pricing from './pages/Pricing';
import Footer from './components/ui/Footer';
import Navbar from './components/ui/Navbar';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// 1. Import your new Template file here
// (Make sure the path matches where you saved template.jsx)
import Template from './pages/template'; 

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
          <Route element={<PrivateRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             
             {/* 2. Add the dynamic template route here */}
             {/* The :templateId acts as a variable that changes based on what the user clicks */}
             <Route path="/template/:templateId" element={<Template />} />
             
          </Route>
        </Routes>

        <Footer />
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;