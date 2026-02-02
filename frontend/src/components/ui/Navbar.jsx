import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-grey-40/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50 w-full font-sans">
           
            <div className="max-w-7xl mx-auto h-14 flex justify-between items-center px-4">
                
             
                <div className="flex items-center gap-1.5 group cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-900 text-2xl">
                            description
                        </span>
                        <span className="material-symbols-outlined text-blue-600 text-[12px] absolute -top-1 -right-1 animate-pulse">
                            auto_awesome
                        </span>
                    </div>
                    <h1 className="text-lg font-bold tracking-tighter text-zinc-900">
                        SmartResume <span className="text-blue-600 font-extrabold">Builder</span>
                    </h1>
                </div>

               
                <div className="hidden md:flex gap-6 text-zinc-500 text-[14px] font-medium">
                    <a href="#" className="text-zinc-900 relative after:absolute after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600 transition-colors">
                        Templates
                    </a>
                    <a href="#" className="hover:text-zinc-900  transition-colors">Pricing</a>
                    <a href="#" className="hover:text-zinc-900 transition-colors">Analyse</a>
                    <a href="#" className="hover:text-zinc-900 transition-colors">Build</a>
                </div>

              
                <div className="flex items-center gap-2">
                     <button className="bg-blue-900 text-white px-3 py-1.5 text-[13px] font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95">
                        Login
                    </button>
                    <button className="bg-blue-400 text-white px-3 py-1.5 text-[13px] font-semibold hover:bg-[#007a3a]  transition-all shadow-sm active:scale-95">
                        Start Now
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;