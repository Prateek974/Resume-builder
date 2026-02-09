import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-zinc-50 flex items-center justify-center p-4 font-sans text-zinc-800">
      
      <div className="w-full max-w-[400px] bg-white border border-zinc-200 shadow-sm p-8 relative overflow-hidden">
        
        {/* Decorative Green Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#009245]"></div>

        {/* Header Section */}
        <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#009245]/10 mb-4">
                <span className="material-symbols-outlined text-[#009245] text-2xl">
                    person_add
                </span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Create an Account</h2>
            <p className="text-zinc-500 text-sm mt-2">Start building your resume today</p>
        </div>

        <form className="space-y-5" noValidate>
          
        
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                Full Name
            </label>
            <input 
              type="text" 
              id="fullName" 
              className="block w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#009245] focus:ring-1 focus:ring-[#009245] transition-all placeholder-zinc-400"
              placeholder="Enter your name"
              required 
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                Email
            </label>
            <input 
              type="email" 
              id="email" 
              className="block w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#009245] focus:ring-1 focus:ring-[#009245] transition-all placeholder-zinc-400"
              placeholder="name@example.com"
              required 
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                Password
            </label>
            
            <div className="relative">
                <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="block w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#009245] focus:ring-1 focus:ring-[#009245] transition-all placeholder-zinc-400"
                placeholder="Create a password"
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

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button 
                type="submit" 
                className="w-full bg-[#009245] hover:bg-[#006837] text-white font-semibold py-2.5 text-sm transition-all shadow-sm active:scale-[0.98]"
            >
                Create Account
            </button>
            
            {/* Divider */}
            <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200"></div>
                <span className="flex-shrink mx-4 text-xs text-zinc-400 font-medium">OR</span>
                <div className="flex-grow border-t border-zinc-200"></div>
            </div>

            {/* Google Button */}
            <button 
                type="button" 
                className="w-full bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 font-medium py-2.5 text-sm transition-all flex items-center justify-center gap-2"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Sign up with Google
            </button>
          </div>

        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            Already have an account? <Link to="/login" className="font-semibold text-[#004d26] hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;