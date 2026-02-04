import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-zinc-100 text-zinc-600 font-sans pt-16 pb-8 px-6 lg:px-20 border-t border-zinc-200">
            {/* 1. TOP SECTION: 4-Column Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                
                {/* Column 1: About Company */}
                <div className="space-y-4">
                    <h3 className="text-zinc-900 font-bold text-lg relative after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2.5px] after:bg-[#009245]">
                        About Company
                    </h3>
                    <p className="text-sm leading-relaxed pt-2">
                        Build professional, AI-powered resumes in minutes. Our SmartResume Builder helps you land your dream job with precision and style.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-zinc-900 font-bold text-lg relative after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2.5px] after:bg-[#009245]">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 pt-2 text-sm font-medium">
                        <li><a href="#" className="hover:text-[#009245] transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-[#009245] transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-[#009245] transition-colors">Features</a></li>
                          <li><a href="#" className="hover:text-[#009245] transition-colors">Pricing</a></li>
                        
                    </ul>
                </div>

                {/* Column 3: Features */}
                <div className="space-y-4">
                    <h3 className="text-zinc-900 font-bold text-lg relative after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2.5px] after:bg-[#009245]">
                        Features
                    </h3>
                    <ul className="space-y-2 pt-2 text-sm font-medium">
                        <li><a href="#" className="hover:text-[#009245] transition-colors">AI Analysis</a></li>
                        <li><a href="#" className="hover:text-[#009245] transition-colors">Template Gallery</a></li>
                        <li><a href="#" className="hover:text-[#009245] transition-colors">PDF Export</a></li>
                       
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-zinc-900 font-bold text-lg relative after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2.5px] after:bg-[#009245]">
                        Contact Info
                    </h3>
                    <ul className="space-y-3 pt-2 text-sm font-medium">
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-[#009245]">location_on</span>
                            Jaipur, Rajasthan
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-[#009245]">mail</span>
                            prateeksharmakt@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-[#009245]">call</span>
                            +91 7742xxxxxx
                        </li>
                    </ul>
                </div>
            </div>

            {/* 2. MIDDLE SECTION: Newsletter */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-10 border-t border-zinc-200 gap-6">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900">Subscribe to the latest Newsletters</h2>
                <div className="flex w-full md:w-auto">
                    <input 
                        type="email" 
                        placeholder="Your email" 
                        className="bg-white px-4 py-2.5 border border-zinc-300 rounded-l-md outline-none focus:border-[#009245] w-full md:w-72 transition-all"
                    />
                    <button className="bg-[#009245] text-white px-6 py-2.5 rounded-r-md font-bold hover:bg-[#006837] transition-all active:scale-95 shadow-sm">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* 3. BOTTOM SECTION: Copyright & Socials */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <p>© Copyright 2026. All Rights Reserved</p>
               <div className="flex gap-8 items-center">
    {/* Facebook SVG */}
    <a href="#" className="flex items-center gap-2 text-zinc-500 hover:text-[#009245] transition-colors group">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
    </a>

    
    <a href="#" className="flex items-center gap-2 text-zinc-500 hover:text-[#009245] transition-colors group">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"/>
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest">X</span>
    </a>

    
    <a href="#" className="flex items-center gap-2 text-zinc-500 hover:text-[#009245] transition-colors group">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
    </a>
</div>
            </div>
        </footer>
    );
};

export default Footer;