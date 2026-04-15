import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- Email/Password Login ---
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('https://resume-builder-api-rdkz.onrender.com/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      login(response.data);
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

 
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      
      const { data } = await axios.post('https://resume-builder-api-rdkz.onrender.com/api/auth/google', {
        token: credentialResponse.credential
      });

      
      login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert("Google Login failed. Please check if your backend is running.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-zinc-50 flex items-center justify-center p-4 font-sans text-zinc-800">
      <div className="w-full max-w-[400px] bg-white border border-zinc-200 shadow-sm p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#009245]"></div>

        <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#009245]/10 mb-4">
                <span className="material-symbols-outlined text-[#009245] text-2xl">
                    lock
                </span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Welcome Back</h2>
            <p className="text-zinc-500 text-sm mt-2">Sign in to continue building</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin} noValidate>
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                Email
            </label>
            <input 
              type="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange}   
              className="block w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#009245] focus:ring-1 focus:ring-[#009245] transition-all placeholder-zinc-400"
              placeholder="name@example.com"
              required 
            />
          </div>

          <div className="space-y-1.5">
             <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                    Password
                </label>
            </div>
            
            <div className="relative">
                <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={formData.password} 
                onChange={handleChange}  
                className="block w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#009245] focus:ring-1 focus:ring-[#009245] transition-all placeholder-zinc-400"
                placeholder="••••••••"
                required 
                />
                <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                </span>
                </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
             <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#009245] focus:ring-[#009245] cursor-pointer accent-[#009245]" />
                <span className="text-zinc-600 group-hover:text-zinc-900 transition-colors">Remember me</span>
             </label>
             <a href="#" className="font-medium text-[#009245] hover:text-[#006837] hover:underline transition-all">
                Forgot password?
             </a>
          </div>

          <div className="pt-2 space-y-3">
            <button 
                type="submit" 
                className="w-full bg-[#009245] hover:bg-[#006837] text-white font-semibold py-2.5 text-sm transition-all shadow-sm active:scale-[0.98]"
            >
                Sign In
            </button>
            
            <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-4 text-xs text-zinc-400 font-medium">OR</span>
                <div className="flex-grow border-t border-zinc-200"></div>
            </div>

            {/* --- Updated Google Login Button --- */}
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                theme="outline"
                size="large"
                width="100%"
              />
            </div>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            Don't have an account? <Link to="/register" className="font-semibold text-[#004d26] hover:underline">Start Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;