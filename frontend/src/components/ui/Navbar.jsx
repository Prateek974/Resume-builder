import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the Auth Hook

const Navbar = () => {
    // 1. Get user data and logout function from Context
    const { user, logout } = useAuth();
    
    // 2. Local state for managing the dropdown menu
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // 3. Handle Logout Logic
    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50 w-full font-sans">
            
            <div className="max-w-7xl mx-auto h-14 flex justify-between items-center px-4">
                
                {/* 1. LOGO SECTION - (Kept exactly as you had it) */}
                <Link to="/" className="flex items-center gap-1.5 group cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-900 text-2xl">
                            description
                        </span>
                        <span className="material-symbols-outlined text-[#009245] text-[12px] absolute -top-1 -right-1 animate-pulse">
                            auto_awesome
                        </span>
                    </div>
                    <h1 className="text-lg font-bold tracking-tighter text-zinc-900">
                        SmartResume <span className="text-[#009245] font-extrabold">Builder</span>
                    </h1>
                </Link>

                {/* 2. NAVIGATION SECTION */}
                <div className="hidden md:flex gap-6 text-zinc-500 text-[14px] font-medium">
                    <Link to="/templates" className="text-zinc-900 relative after:absolute after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-[#009245] transition-colors">
                        Templates
                    </Link>
                    <Link to="/pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
                    <Link to="/dashboard" className="hover:text-zinc-900 transition-colors">Dashboard</Link>
                </div>

                {/* 3. SMART AUTH SECTION */}
                <div className="flex items-center gap-2">
                    
                    {user ? (
                        // === OPTION A: USER IS LOGGED IN ===
                        <div className="relative">
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 hover:bg-zinc-100 py-1 px-2 rounded-md transition-all border border-transparent hover:border-zinc-200"
                            >
                                {/* Green Circle with Initial */}
                                <div className="w-8 h-8 rounded-full bg-[#009245] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                                
                                {/* User Name */}
                                <span className="text-sm font-semibold text-zinc-700 hidden sm:block">
                                    {user.name.split(' ')[0]}
                                </span>
                                <span className="material-symbols-outlined text-zinc-400 text-[20px]">expand_more</span>
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-lg shadow-xl py-1 animate-in fade-in zoom-in-95 duration-200 z-50">
                                    <div className="px-4 py-2 border-b border-zinc-100 bg-zinc-50/50">
                                        <p className="text-xs text-zinc-500 font-medium">Signed in as</p>
                                        <p className="text-sm font-bold text-zinc-900 truncate">{user.email}</p>
                                    </div>
                                    
                                    <Link to="/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-[#009245] transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">dashboard</span>
                                        Dashboard
                                    </Link>

                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">logout</span>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // === OPTION B: USER IS LOGGED OUT (Your Original Buttons) ===
                        <>
                            <Link to="/login" className="bg-[#004d26] text-white px-3 py-1.5 text-[13px] font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95 rounded-sm">
                                Login
                            </Link>
                            <Link to="/register" className="bg-[#009245] text-white px-3 py-1.5 text-[13px] font-semibold hover:bg-[#006837] transition-all shadow-sm active:scale-95 rounded-sm">
                                Start Now
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;