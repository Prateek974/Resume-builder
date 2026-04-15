// src/template.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Template = () => {
  
  const { templateId } = useParams(); 
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      
     
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-zinc-500 hover:text-zinc-900 font-medium transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Templates
          </button>
          <h1 className="text-xl font-bold text-zinc-900 border-l border-zinc-200 pl-4 ml-2">
            Builder Workspace
          </h1>
        </div>
        <button className="bg-[#009245] hover:bg-[#007a3a] text-white px-6 py-2 rounded-lg font-bold transition-colors">
          Download PDF
        </button>
      </header>

      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-8">
        
       
        <div className="w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 h-[calc(100vh-120px)] overflow-y-auto">
          <h2 className="text-lg font-bold text-zinc-900 mb-6">Edit Information</h2>
          <p className="text-sm text-zinc-500 mb-4">You are currently editing the <strong>{templateId}</strong> layout.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
              <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-3 outline-none focus:border-[#009245]" placeholder="Jane Doe" />
            </div>
          </div>
        </div>

        
        <div className="w-2/3 flex justify-center overflow-y-auto pb-20">
          
          
          <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-12 relative transition-all duration-300">
            
            
            {templateId === 'modern-minimal' && (
              <div className="text-center">
                <h1 className="text-4xl font-light tracking-widest text-zinc-900 uppercase">Modern Minimal</h1>
                <div className="h-0.5 w-16 bg-zinc-300 mx-auto mt-4 mb-8"></div>
                <p className="text-zinc-500">This is the specific layout for the minimalist design.</p>
              </div>
            )}

            {templateId === 'executive-pro' && (
              <div className="flex gap-8 h-full border-t-8 border-[#009245] pt-8">
                <div className="w-full">
                  <h1 className="text-4xl font-bold text-zinc-900">Executive Pro</h1>
                  <p className="text-zinc-500 mt-2">Traditional layout loaded here.</p>
                </div>
              </div>
            )}

            
            {templateId !== 'modern-minimal' && templateId !== 'executive-pro' && (
               <div className="flex items-center justify-center h-full text-zinc-400 border-2 border-dashed border-zinc-200 rounded-xl m-12 py-32">
                 <p className="text-lg">Design layout for <strong>{templateId}</strong> will appear here.</p>
               </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Template;