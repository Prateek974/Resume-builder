import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

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
import ResumeBuilder from './pages/ResumeBuilder';

// 1. Import your dynamic Template workspace
import Template from './pages/template'; 

// ==========================================
// LAYOUT COMPONENT
// Wraps standard pages with the global Navbar & Footer
// ==========================================
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <Outlet /> is where the specific page content will be injected */}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* ========================================== */}
          {/* GROUP 1: PAGES WITH NAVBAR & FOOTER        */}
          {/* ========================================== */}
          <Route element={<MainLayout />}>
            
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Protected Routes (Require Login, but still have standard layout) */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder" element={<ResumeBuilder />} />
            </Route>

          </Route>

          {/* ========================================== */}
          {/* GROUP 2: FULL-SCREEN WORKSPACES            */}
          {/* No Navbar, No Footer                       */}
          {/* ========================================== */}
          <Route element={<PrivateRoute />}>
            <Route path="/template/:templateId" element={<Template />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;