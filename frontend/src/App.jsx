import Footer from './components/ui/Footer';
import Navbar from './components/ui/Navbar';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>

      <Navbar />

  
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    
      <Footer />
    </BrowserRouter>
  );
}

export default App;