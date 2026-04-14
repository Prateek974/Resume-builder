// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
// Ensure you have a video file at this path, or replace with an image/color if not.
import heroVideo from '../assets/ai-background2.mp4'; 

// ==========================================
// 1. DATA & MOCKUPS
// ==========================================
const templates = [
  { id: 'modern-minimal', name: 'Modern Minimalist', description: 'Clean lines and ample whitespace. Perfect for most industries.', accent: 'bg-zinc-300', layout: 'single' },
  { id: 'executive-pro', name: 'Executive Pro', description: 'Traditional two-column layout tailored for senior roles.', accent: 'bg-[#009245]', layout: 'sidebar-left' },
  { id: 'creative-studio', name: 'Creative Studio', description: 'Bold headers and vibrant accents to stand out from the pile.', accent: 'bg-violet-500', layout: 'sidebar-right' },
  { id: 'tech-focused', name: 'Tech & Engineering', description: 'Dense, skill-focused layout optimized for ATS systems.', accent: 'bg-emerald-500', layout: 'single-dense' },
  { id: 'academic-cv', name: 'Academic CV', description: 'Classic serif typography, ideal for research and education.', accent: 'bg-blue-500', layout: 'centered' },
  { id: 'startup-agile', name: 'Startup Agile', description: 'Modern, punchy, and dynamic layout for fast-paced roles.', accent: 'bg-rose-500', layout: 'split-header' },
];

const faqs = [
  { question: "What is an AI Resume Builder?", answer: "It uses AI to generate professional resumes based on your input, analyzing industry trends to make you stand out." },
  { question: "How does AI improve my resume?", answer: "AI enhances wording, structures your bullet points for impact, and ensures optimal ATS keyword density." },
  { question: "Can I customize my resume?", answer: "Absolutely. You can fully customize every section, change layouts, and adjust colors after the AI generates the first draft." },
  { question: "Is this resume builder free?", answer: "Yes, we offer a generous free tier that lets you build, preview, and download your resume without hidden paywalls." },
  { question: "Is my data safe?", answer: "We take privacy seriously. Your data is encrypted and never sold to third-party advertisers." },
  { question: "What makes this resume ATS-friendly?", answer: "Our templates are structurally designed to be parsed easily by Applicant Tracking Systems, ensuring your resume reaches human eyes." }
];

// ==========================================
// 2. TEMPLATE SELECTOR COMPONENTS
// ==========================================
const ResumePreview = ({ layout, accent }) => (
  <div className="w-full h-48 bg-zinc-900 border-b border-zinc-800 p-3 overflow-hidden flex flex-col gap-2 relative">
    {layout === 'single' && (
      <><div className={`h-4 w-1/3 rounded-sm ${accent} mx-auto mb-2 opacity-90`} /><div className="h-1.5 w-full bg-zinc-700 rounded-sm" /><div className="h-1.5 w-5/6 bg-zinc-700 rounded-sm" /><div className="h-1.5 w-4/6 bg-zinc-700 rounded-sm" /><div className="mt-2 h-2 w-1/4 bg-zinc-600 rounded-sm" /><div className="h-1.5 w-full bg-zinc-700 rounded-sm" /><div className="h-1.5 w-full bg-zinc-700 rounded-sm" /></>
    )}
    {layout === 'sidebar-left' && (
      <div className="flex gap-2 h-full">
        <div className={`w-1/3 h-full rounded-sm opacity-20 ${accent}`} />
        <div className="w-2/3 flex flex-col gap-1.5"><div className={`h-3 w-1/2 rounded-sm ${accent} opacity-90`} /><div className="h-1 w-full bg-zinc-700 rounded-sm mt-1" /><div className="h-1 w-5/6 bg-zinc-700 rounded-sm" /><div className="h-1 w-4/6 bg-zinc-700 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm mt-2" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /></div>
      </div>
    )}
    {layout === 'sidebar-right' && (
      <div className="flex gap-2 h-full">
        <div className="w-2/3 flex flex-col gap-1.5 pt-2"><div className="h-3 w-3/4 rounded-sm bg-zinc-500" /><div className="h-1 w-full bg-zinc-700 rounded-sm mt-2" /><div className="h-1 w-5/6 bg-zinc-700 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm mt-2" /><div className="h-1 w-4/6 bg-zinc-700 rounded-sm" /></div>
        <div className={`w-1/3 h-full rounded-sm opacity-80 ${accent} p-1 flex flex-col gap-1`}><div className="w-4 h-4 rounded-full bg-white/20 mx-auto mt-1 mb-2" /><div className="h-1 w-full bg-white/30 rounded-sm" /><div className="h-1 w-5/6 bg-white/30 rounded-sm" /></div>
      </div>
    )}
    {layout === 'single-dense' && (
      <><div className="flex justify-between items-end border-b-2 border-zinc-700 pb-1 mb-1"><div className={`h-3 w-1/3 rounded-sm ${accent} opacity-90`} /><div className="h-1.5 w-1/4 bg-zinc-600 rounded-sm" /></div><div className="grid grid-cols-2 gap-2 mt-1"><div className="h-1 w-full bg-zinc-700 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /><div className="h-1 w-4/5 bg-zinc-700 rounded-sm" /><div className="h-1 w-5/6 bg-zinc-700 rounded-sm" /></div><div className="mt-2 h-1.5 w-1/4 bg-zinc-600 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /></>
    )}
    {layout === 'centered' && (
      <div className="flex flex-col items-center text-center gap-1.5"><div className={`h-3 w-1/2 rounded-sm ${accent} opacity-90`} /><div className="h-1 w-1/3 bg-zinc-600 rounded-sm mb-2" /><div className="h-1.5 w-1/6 bg-zinc-500 rounded-sm mt-1" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /><div className="h-1 w-5/6 bg-zinc-700 rounded-sm" /><div className="h-1.5 w-1/6 bg-zinc-500 rounded-sm mt-1" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /></div>
    )}
    {layout === 'split-header' && (
      <><div className={`w-full h-8 ${accent} opacity-90 rounded-sm mb-2 flex items-center px-2`}><div className="h-2 w-1/3 bg-black/30 rounded-sm" /></div><div className="flex gap-2"><div className="w-1/2 flex flex-col gap-1"><div className="h-1.5 w-1/2 bg-zinc-600 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /><div className="h-1 w-5/6 bg-zinc-700 rounded-sm" /></div><div className="w-1/2 flex flex-col gap-1"><div className="h-1.5 w-1/2 bg-zinc-600 rounded-sm" /><div className="h-1 w-full bg-zinc-700 rounded-sm" /><div className="h-1 w-4/5 bg-zinc-700 rounded-sm" /></div></div></>
    )}
  </div>
);

const TemplateSelector = () => {
  const [selectedId, setSelectedId] = useState(null);
<<<<<<< HEAD
  const navigate = useNavigate(); 
=======
  const navigate = useNavigate();
>>>>>>> 4a2bf5d019fe4bb75c13a0a5d0dd5cfbb5a7628e

  // ADDED: id="templates" and scroll-mt-14 on the div below
  return (
<<<<<<< HEAD
    <div id="templates" className="bg-white py-24 px-6 scroll-mt-14">
=======
    <div className="bg-white py-24 px-6" id="templates">
>>>>>>> 4a2bf5d019fe4bb75c13a0a5d0dd5cfbb5a7628e
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-zinc-900 mb-4 tracking-tight">Choose Your Layout</h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Select a professional design to get started. Our AI will automatically format your content to perfectly fit your chosen layout.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const isSelected = selectedId === template.id;
            return (
              <div 
                key={template.id} 
                onClick={() => setSelectedId(template.id)} 
                className={`group relative bg-white rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden border ${isSelected ? 'border-[#009245] ring-1 ring-[#009245] shadow-2xl scale-[1.02]' : 'border-zinc-200 hover:shadow-xl hover:-translate-y-1'}`}
              >
                <ResumePreview layout={template.layout} accent={template.accent} />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-zinc-900">{template.name}</h3>
                    {isSelected && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#009245]">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 mb-6">{template.description}</p>
                  <button className={`w-full py-2.5 px-4 rounded-lg font-bold transition-colors ${isSelected ? 'bg-[#009245] text-white shadow-md' : 'bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200'}`}>
                    {isSelected ? 'Template Selected' : 'Select Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <button 
            disabled={!selectedId} 
            onClick={() => navigate(`/template/${selectedId}`)} 
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${selectedId ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl hover:-translate-y-0.5' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
          >
            Continue with Selected Template
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. PRICING COMPONENT
// ==========================================
const Pricing = () => {
<<<<<<< HEAD
    const { user } = useAuth();
  
    const tiers = [
        {
            name: "Free",
            price: "₹0",
            description: "Perfect for students starting their first internship.",
            features: ["1 Resume Template", "Basic AI Polish (3/mo)", "Export to PDF", "ATS Keyword Scan"],
            buttonText: user ? "Current Plan" : "Get Started",
            highlight: false
        },
        {
            name: "Pro",
            price: "₹499",
            period: "/mo",
            description: "For active job seekers targeting top-tier companies.",
            features: ["Unlimited Templates", "Unlimited AI Polish", "Cover Letter Builder", "Advanced ATS Analytics", "Custom Brand Colors"],
            buttonText: "Go Pro",
            highlight: true
        },
        {
            name: "Elite",
            price: "₹999",
            period: "/mo",
            description: "High-end data insights for senior roles.",
            features: ["Everything in Pro", "1-on-1 AI Interview Prep", "LinkedIn Profile Optimizer", "Priority Support", "Ghost Mode (Hidden from recruiters)"],
            buttonText: "Go Elite",
            highlight: false
        }
    ];
  
    // ADDED: id="pricing" and scroll-mt-14 on the div below
    return (
        <div id="pricing" className="bg-white font-sans border-t border-zinc-100 scroll-mt-14">
            <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 text-center">
                <h2 className="text-[#009245] font-bold tracking-widest text-sm uppercase mb-3">Pricing</h2>
                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
                    Invest in your <span className="text-[#009245]">Career.</span>
                </h1>
                <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                    Choose the plan that fits your career goals. Whether you're a student or a senior engineer, we have the tools to get you hired.
                </p>
=======
  // Safe fallback just in case useAuth is not fully set up yet
  const auth = useAuth();
  const user = auth ? auth.user : null;

  const tiers = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for students starting their first internship.",
      features: ["1 Resume Template", "Basic AI Polish (3/mo)", "Export to PDF", "ATS Keyword Scan"],
      buttonText: user ? "Current Plan" : "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/mo",
      description: "For active job seekers targeting top-tier companies.",
      features: ["Unlimited Templates", "Unlimited AI Polish", "Cover Letter Builder", "Advanced ATS Analytics", "Custom Brand Colors"],
      buttonText: "Go Pro",
      highlight: true
    },
    {
      name: "Elite",
      price: "₹999",
      period: "/mo",
      description: "High-end data insights for senior roles.",
      features: ["Everything in Pro", "1-on-1 AI Interview Prep", "LinkedIn Profile Optimizer", "Priority Support", "Ghost Mode (Hidden from recruiters)"],
      buttonText: "Go Elite",
      highlight: false
    }
  ];

  return (
    <div className="bg-white font-sans border-t border-zinc-100" id="pricing">
      <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 text-center">
        <h2 className="text-[#009245] font-bold tracking-widest text-sm uppercase mb-3">Pricing</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
          Invest in your <span className="text-[#009245]">Career.</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your career goals. Whether you're a student or a senior engineer, we have the tools to get you hired.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
        {tiers.map((tier, index) => (
          <div key={index} className={`relative p-8 rounded-3xl border ${tier.highlight ? 'border-[#009245] shadow-2xl scale-105 z-10 bg-white' : 'border-zinc-200 bg-white'} flex flex-col transition-all duration-300 hover:shadow-xl`}>
            {tier.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#009245] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                Most Popular
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-zinc-900">{tier.price}</span>
                <span className="text-zinc-500 font-medium">{tier.period}</span>
              </div>
              <p className="text-zinc-500 text-sm mt-4 leading-relaxed">{tier.description}</p>
>>>>>>> 4a2bf5d019fe4bb75c13a0a5d0dd5cfbb5a7628e
            </div>
            <div className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#009245] font-bold">✓</span>
                  <span className="text-sm text-zinc-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <Link 
              to={user ? "/checkout" : "/login"}
              className={`w-full py-3.5 rounded-xl font-bold text-center transition-all ${tier.highlight ? 'bg-[#009245] text-white hover:bg-[#007a3a] shadow-lg hover:shadow-xl' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}
            >
              {tier.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN LANDING PAGE COMPONENT
// ==========================================
const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
<<<<<<< HEAD
    <div className="scroll-smooth">
      {/* 🔥 HERO */}
      <div className="relative w-full h-screen overflow-hidden font-sans">
=======
    <div className="bg-white min-h-screen font-sans">
      
      {/* 🔥 HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Make sure heroVideo path is correct or replace with a static background color/image for testing */}
>>>>>>> 4a2bf5d019fe4bb75c13a0a5d0dd5cfbb5a7628e
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-zinc-950/80 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto pt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight">
            Craft Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009245] to-emerald-400">
              Resume with AI
            </span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mb-10 font-medium">
            Build ATS-friendly, professionally designed resumes in seconds using the power of Artificial Intelligence.
          </p>
          <button 
            onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#009245] hover:bg-[#007a3a] hover:scale-105 transition-all duration-300 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,146,69,0.4)]"
          >
            Build My Resume Now
          </button>
        </div>
      </div>

      {/* 📝 TEMPLATE SELECTOR */}
      <TemplateSelector />

      {/* ✅ FAQ SECTION */}
      <div className="bg-zinc-50 py-24 px-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#009245] font-bold tracking-widest text-sm uppercase mb-3">Support</h2>
            <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#009245]/50 hover:shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 text-lg text-zinc-900 font-bold"
                >
                  {faq.question}
                  <span className={`text-[#009245] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                    ▼ {/* Replaced SVG with standard character for cleaner code, you can use your SVG here */}
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out bg-zinc-50 ${openIndex === index ? "max-h-40 border-t border-zinc-100" : "max-h-0 overflow-hidden"}`}>
                  <p className="text-zinc-600 px-6 py-5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 CTA SECTION */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto relative bg-zinc-950 rounded-[2.5rem] p-10 md:p-16 lg:p-20 overflow-hidden shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-12">
          
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#009245] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>

<<<<<<< HEAD
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
            {/* LEFT SIDE */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                Your dream job <br className="hidden md:block" /> 
                is just a <span className="text-[#009245]">click away.</span>
              </h2>
              <p className="text-zinc-400 mb-10 text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0">
                Stop struggling with formatting and writer's block. Let our AI handle the heavy lifting while you focus on the interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#009245] hover:bg-[#007a3a] transition-colors text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
                  Start Building for Free
                </button>
                <a href="#templates" className="bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/10 inline-block text-center">
                  View Templates
                </a>
              </div>
=======
          <div className="max-w-xl text-center lg:text-left relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Your dream job <br className="hidden md:block" /> 
              is just a <span className="text-[#009245]">click away.</span>
            </h2>
            <p className="text-zinc-400 mb-10 text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0">
              Stop struggling with formatting and writer's block. Let our AI handle the heavy lifting while you focus on the interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#009245] hover:bg-[#007a3a] transition-colors text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                Start Building for Free
              </button>
>>>>>>> 4a2bf5d019fe4bb75c13a0a5d0dd5cfbb5a7628e
            </div>
          </div>

          <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10">
            <p className="mb-6 text-zinc-300 text-lg leading-relaxed">
              "This AI resume builder is incredible. It completely overhauled my bullet points and I got 3 callbacks in my first week of applying. Worth every second."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white font-bold border border-zinc-700">SJ</div>
              <div>
                <p className="text-white font-bold">Sarah Jenkins</p>
                <p className="text-[#009245] text-sm font-semibold">Senior Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💰 PRICING SECTION */}
      <Pricing />

    </div>
  );
};

export default LandingPage;