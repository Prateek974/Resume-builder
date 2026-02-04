import React from 'react';


import heroVideo from '../assets/ai-background2.mp4'; 

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      

      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
       
        Your browser does not support the video tag.
      </video>

    
      <div className="absolute inset-0 bg-black/60 z-10"></div>

    
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
        
      
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 backdrop-blur-sm mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#009245] animate-pulse"></span>
            <span className="text-xs font-bold text-zinc-300 tracking-wide uppercase">AI V1.0 Now Live</span>
        </div>

    
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Craft Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009245] to-green-400">
            Resume with AI
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
          Stop struggling with formatting. Our AI analyzes your skills and builds 
          a job-winning resume in seconds. ATS-friendly and designed for impact.
        </p>

     
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="bg-[#009245] hover:bg-[#007a3a] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-green-900/20 active:scale-95 flex items-center justify-center gap-2">
            Build My Resume
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">play_circle</span>
            Watch Demo
          </button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;