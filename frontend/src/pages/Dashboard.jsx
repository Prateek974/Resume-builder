import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjusted for your folder structure

const Dashboard = () => {
    const { user } = useAuth();

    // Mock data for current UI development
    const stats = [
        { label: "Total Resumes", value: "2", icon: "description", bg: "bg-blue-50", color: "text-blue-600" },
        { label: "AI Refinements", value: "8", icon: "auto_awesome", bg: "bg-green-50", color: "text-[#009245]" },
        { label: "Avg ATS Score", value: "78%", icon: "analytics", bg: "bg-purple-50", color: "text-purple-600" },
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfc] font-sans pt-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* 1. WELCOME HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                            Welcome, <span className="text-[#009245]">{user?.name?.split(' ')[0] || 'User'}</span>
                        </h1>
                        <p className="text-zinc-500 font-medium mt-1">Ready to land that next big role?</p>
                    </div>
                    <Link 
                        to="/builder" 
                        className="bg-[#009245] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#006837] transition-all shadow-lg shadow-green-900/10 flex items-center gap-2 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        Create New Resume
                    </Link>
                </div>

                {/* 2. STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white border border-zinc-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm">
                            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-zinc-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. RECENT DOCUMENTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Documents List (Left) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-zinc-900 mb-5 flex items-center gap-2">
                            <span className="material-symbols-outlined text-zinc-400">history</span>
                            Recent Resumes
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Example Resume Item */}
                            <div className="group bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between hover:border-[#009245] transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-12 bg-zinc-50 border border-zinc-100 rounded flex items-center justify-center text-zinc-300 group-hover:text-[#009245]">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-800 text-sm">Fullstack_Developer_2026.pdf</h4>
                                        <p className="text-[12px] text-zinc-400 font-medium">Edited 2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden sm:block text-right">
                                        <p className="text-[10px] font-bold text-zinc-300 uppercase">ATS Score</p>
                                        <p className="text-sm font-black text-[#009245]">82%</p>
                                    </div>
                                    <button className="text-zinc-300 hover:text-zinc-900 transition-colors">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                </div>
                            </div>

                            {/* Empty State Call to Action */}
                            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-zinc-200 mb-3">post_add</span>
                                <h4 className="text-zinc-400 font-medium text-sm">No other resumes found.</h4>
                                <button className="text-[#009245] text-xs font-bold mt-2 hover:underline">Import existing PDF</button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tools (Right) */}
                    <div className="space-y-6">
                        <div className="bg-[#004d26] rounded-2xl p-6 text-white shadow-xl shadow-green-900/10">
                            <h4 className="font-bold flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-green-400">auto_awesome</span>
                                AI Quick Polish
                            </h4>
                            <p className="text-green-100/70 text-xs leading-relaxed mb-6">
                                Paste a job description to see how well your resume matches the requirements.
                            </p>
                            <button className="w-full bg-[#009245] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#007a3a] transition-colors">
                                Start AI Analysis
                            </button>
                        </div>

                        <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                            <h4 className="text-zinc-900 font-bold text-sm mb-4">Resume Checklist</h4>
                            <div className="space-y-3">
                                <CheckItem label="Contact Info Complete" done={true} />
                                <CheckItem label="GitHub/LinkedIn Linked" done={true} />
                                <CheckItem label="Projects Quantified" done={false} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Simple helper component for the checklist
const CheckItem = ({ label, done }) => (
    <div className="flex items-center gap-3">
        <span className={`material-symbols-outlined text-[18px] ${done ? 'text-[#009245]' : 'text-zinc-200'}`}>
            {done ? 'check_circle' : 'radio_button_unchecked'}
        </span>
        <span className={`text-xs font-medium ${done ? 'text-zinc-500' : 'text-zinc-400 italic'}`}>{label}</span>
    </div>
);

export default Dashboard;