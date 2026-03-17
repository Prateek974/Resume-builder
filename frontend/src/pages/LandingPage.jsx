import React, { useState } from 'react';
import heroVideo from '../assets/ai-background2.mp4'; 

// ==========================================
// 1. TEMPLATE SELECTOR COMPONENT
// ==========================================
const TemplateSelector = () => {
  const [selectedId, setSelectedId] = useState(null);

  const templates = [
    { id: 'modern-minimal', name: 'Modern Minimalist', description: 'Clean lines and ample whitespace. Perfect for most industries.', accent: 'bg-slate-800', layout: 'single' },
    { id: 'executive-pro', name: 'Executive Pro', description: 'Traditional two-column layout tailored for senior roles.', accent: 'bg-[#009245]', layout: 'sidebar-left' },
    { id: 'creative-studio', name: 'Creative Studio', description: 'Bold headers and vibrant accents to stand out from the pile.', accent: 'bg-violet-600', layout: 'sidebar-right' },
    { id: 'tech-focused', name: 'Tech & Engineering', description: 'Dense, skill-focused layout optimized for ATS systems.', accent: 'bg-emerald-700', layout: 'single-dense' },
    { id: 'academic-cv', name: 'Academic CV', description: 'Classic serif typography, ideal for research and education.', accent: 'bg-gray-900', layout: 'centered' },
    { id: 'startup-agile', name: 'Startup Agile', description: 'Modern, punchy, and dynamic layout for fast-paced roles.', accent: 'bg-rose-600', layout: 'split-header' },
  ];

  const ResumePreview = ({ layout, accent }) => (
    <div className="w-full h-48 bg-gray-50 border-b border-gray-100 p-3 overflow-hidden flex flex-col gap-2 relative">
      {layout === 'single' && (
        <><div className={`h-4 w-1/3 rounded-sm ${accent} mx-auto mb-2`} /><div className="h-1.5 w-full bg-gray-200 rounded-sm" /><div className="h-1.5 w-5/6 bg-gray-200 rounded-sm" /><div className="h-1.5 w-4/6 bg-gray-200 rounded-sm" /><div className="mt-2 h-2 w-1/4 bg-gray-300 rounded-sm" /><div className="h-1.5 w-full bg-gray-200 rounded-sm" /><div className="h-1.5 w-full bg-gray-200 rounded-sm" /></>
      )}
      {layout === 'sidebar-left' && (
        <div className="flex gap-2 h-full">
          <div className={`w-1/3 h-full rounded-sm opacity-20 ${accent}`} />
          <div className="w-2/3 flex flex-col gap-1.5"><div className={`h-3 w-1/2 rounded-sm ${accent}`} /><div className="h-1 w-full bg-gray-200 rounded-sm mt-1" /><div className="h-1 w-5/6 bg-gray-200 rounded-sm" /><div className="h-1 w-4/6 bg-gray-200 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm mt-2" /><div className="h-1 w-full bg-gray-200 rounded-sm" /></div>
        </div>
      )}
      {layout === 'sidebar-right' && (
        <div className="flex gap-2 h-full">
          <div className="w-2/3 flex flex-col gap-1.5 pt-2"><div className="h-3 w-3/4 rounded-sm bg-gray-800" /><div className="h-1 w-full bg-gray-200 rounded-sm mt-2" /><div className="h-1 w-5/6 bg-gray-200 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm mt-2" /><div className="h-1 w-4/6 bg-gray-200 rounded-sm" /></div>
          <div className={`w-1/3 h-full rounded-sm opacity-80 ${accent} p-1 flex flex-col gap-1`}><div className="w-4 h-4 rounded-full bg-white/50 mx-auto mt-1 mb-2" /><div className="h-1 w-full bg-white/40 rounded-sm" /><div className="h-1 w-5/6 bg-white/40 rounded-sm" /></div>
        </div>
      )}
      {layout === 'single-dense' && (
        <><div className="flex justify-between items-end border-b-2 border-gray-300 pb-1 mb-1"><div className={`h-3 w-1/3 rounded-sm ${accent}`} /><div className="h-1.5 w-1/4 bg-gray-300 rounded-sm" /></div><div className="grid grid-cols-2 gap-2 mt-1"><div className="h-1 w-full bg-gray-200 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm" /><div className="h-1 w-4/5 bg-gray-200 rounded-sm" /><div className="h-1 w-5/6 bg-gray-200 rounded-sm" /></div><div className="mt-2 h-1.5 w-1/4 bg-gray-300 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm" /></>
      )}
      {layout === 'centered' && (
        <div className="flex flex-col items-center text-center gap-1.5"><div className={`h-3 w-1/2 rounded-sm ${accent}`} /><div className="h-1 w-1/3 bg-gray-300 rounded-sm mb-2" /><div className="h-1.5 w-1/6 bg-gray-400 rounded-sm mt-1" /><div className="h-1 w-full bg-gray-200 rounded-sm" /><div className="h-1 w-5/6 bg-gray-200 rounded-sm" /><div className="h-1.5 w-1/6 bg-gray-400 rounded-sm mt-1" /><div className="h-1 w-full bg-gray-200 rounded-sm" /></div>
      )}
      {layout === 'split-header' && (
        <><div className={`w-full h-8 ${accent} rounded-sm mb-2 flex items-center px-2`}><div className="h-2 w-1/3 bg-white/80 rounded-sm" /></div><div className="flex gap-2"><div className="w-1/2 flex flex-col gap-1"><div className="h-1.5 w-1/2 bg-gray-300 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm" /><div className="h-1 w-5/6 bg-gray-200 rounded-sm" /></div><div className="w-1/2 flex flex-col gap-1"><div className="h-1.5 w-1/2 bg-gray-300 rounded-sm" /><div className="h-1 w-full bg-gray-200 rounded-sm" /><div className="h-1 w-4/5 bg-gray-200 rounded-sm" /></div></div></>
      )}
    </div>
  );

  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Choose Your Resume Template</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Select a professional design to get started. Our AI will automatically format your content to perfectly fit your chosen layout.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const isSelected = selectedId === template.id;
            return (
              <div key={template.id} onClick={() => setSelectedId(template.id)} className={`group relative bg-white rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${isSelected ? 'ring-4 ring-[#009245] shadow-xl scale-[1.02]' : 'border border-gray-200 hover:shadow-xl hover:-translate-y-1'}`}>
                <ResumePreview layout={template.layout} accent={template.accent} />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                    {isSelected && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#009245]">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{template.description}</p>
                  <button className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${isSelected ? 'bg-[#009245] text-white' : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'}`}>
                    {isSelected ? 'Selected' : 'Use This Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <button disabled={!selectedId} className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all ${selectedId ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
            Continue with Selected Template
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN LANDING PAGE COMPONENT
// ==========================================
const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "What is an AI Resume Builder?",
    "How does AI improve my resume?",
    "Can I customize my resume?",
    "Is this resume builder free?",
    "Can I download my resume?",
    "Is my data safe?",
    "How does AI generate resumes?",
    "What makes this resume ATS-friendly?"
  ];

  const answers = [
    "It uses AI to generate professional resumes based on your input.",
    "AI enhances wording, structure, and ATS optimization.",
    "Yes, you can fully customize every section.",
    "Yes, basic features are free.",
    "You can download in PDF format instantly.",
    "Yes, your data is secure and protected.",
    "AI analyzes your input and builds structured content.",
    "It follows industry standards to pass ATS filters."
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* 🔥 HERO */}
      <div className="relative w-full h-screen overflow-hidden font-sans">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Craft Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009245] to-green-400">
              Resume with AI
            </span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl mb-10">
            Build ATS-friendly resumes in seconds using AI.
          </p>
          <button className="bg-[#009245] hover:bg-[#007a3a] transition-colors text-white px-8 py-4 rounded-lg font-bold">
            Build My Resume
          </button>
        </div>
      </div>

      {/* 📝 TEMPLATE SELECTOR (Inserted here) */}
      <TemplateSelector />

      {/* ✅ FAQ */}
      <div className="bg-[#f7f7f7] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center md:text-left">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-gray-300">
            {faqs.map((q, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left text-lg text-gray-800 font-medium"
                >
                  {q}
                  <span className="text-xl text-[#009245]">
                    {openIndex === index ? "⌃" : "⌄"}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm">
                    {answers[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 text-gray-600">
            Still have questions? Reach out to support.
          </div>
        </div>
      </div>

      {/* 🔥 CTA SECTION */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto bg-gray-100 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10 shadow-sm border border-gray-200">
          {/* LEFT SIDE */}
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Build your resume <br /> with AI today
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Create professional, ATS-friendly resumes in minutes. 
              Let AI handle formatting, wording, and optimization.
            </p>
            <button className="bg-[#009245] hover:bg-[#007a3a] transition-colors text-white px-8 py-4 rounded-lg font-semibold text-lg">
              Get started
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="max-w-xl text-gray-800 text-lg leading-relaxed bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="mb-4 italic">
              "This AI resume builder completely changed how I apply for jobs. 
              It made my resume stronger, cleaner, and more professional in minutes."
            </p>
            <p className="text-[#009245] font-semibold text-sm">
              — A satisfied user
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;