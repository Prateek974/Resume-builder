import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/ui/PrivateRoute'; 
import Pricing from './pages/Pricing';
import Footer from './components/ui/Footer';
import Navbar from './components/ui/Navbar';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen flex-grow">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId="816895392084-ula7j0bgeer5p4pp6coh4jsespfq7d3b.apps.googleusercontent.com">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
         
          <Route element={<MainLayout />}>
            
           
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<Pricing />} />

         
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

          </Route>


       
          <Route element={<PrivateRoute />}>
            <Route path="/builder" element={<ResumeBuilder />} />
            
            
            <Route path="/template/:templateId" element={<ResumeBuilder />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;