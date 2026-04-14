import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TemplateThumbnail from '../components/templates/TemplateThumbnail'; 
import { availableThemes } from '../components/templates/TemplateRegistry'; 

const Dashboard = () => {
    const { user } = useAuth();
    
    // State to hold the user's actual saved resume from the database
    const [savedResume, setSavedResume] = useState(null);
    const [loadingResume, setLoadingResume] = useState(true);

    // Fetch the resume when the dashboard loads
    useEffect(() => {
        const fetchSavedResume = async () => {
            if (!user?.token) {
                setSavedResume(null);
                return;
            }

            // STEP 1: Clear old data immediately so Account A doesn't see Account B's work
            setSavedResume(null);
            setLoadingResume(true);

            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/resumes/me', config);
                
                console.log("BACKEND RESPONSE:", data); 

                const actualResumeData = Array.isArray(data) ? data[0] : data;

                // STEP 2: Explicitly check for data. If missing, keep state as null.
                if (actualResumeData && actualResumeData.personalInfo) {
                    setSavedResume(actualResumeData);
                } else {
                    setSavedResume(null); // No resume found for THIS user
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setSavedResume(null);
            } finally {
                setLoadingResume(false);
            }
        };

        fetchSavedResume();
    }, [user]);

    return (
        <div className="min-h-screen bg-[#fcfcfc] font-sans pt-8 px-4 md:px-8 scroll-smooth">
            <div className="max-w-6xl mx-auto">
                
                {/* 1. WELCOME HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-zinc-200 pb-8">
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

                {/* 2. DYNAMIC RECENT DOCUMENTS SECTION */}
                <div className="mb-16">
                    <h3 className="text-lg font-bold text-zinc-900 mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-zinc-400">history</span>
                        Your Workspace
                    </h3>
                    
                    <div className="space-y-4">
                        {loadingResume ? (
                            // Loading State
                            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009245]"></div>
                            </div>
                        ) : savedResume ? (
                            // Render Actual Saved Resume
                            <div className="group bg-white border border-zinc-200 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between hover:border-[#009245] transition-all shadow-sm gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-14 bg-green-50 border border-green-100 rounded flex items-center justify-center text-[#009245] shrink-0">
                                        <span className="material-symbols-outlined text-2xl">description</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-800 text-base">
                                            {savedResume.personalInfo?.firstName || 'My'}_Resume.pdf
                                        </h4>
                                        <p className="text-[12px] text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
                                            Theme: <span className="uppercase tracking-wider font-bold text-zinc-700">{savedResume.theme || 'Professional'}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link 
                                        to={`/template/${savedResume.theme || 'professional'}`}
                                        className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded font-bold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        Continue Editing
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            // Empty State (No Resume Found)
                            <div className="border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-5xl text-zinc-300 mb-3">post_add</span>
                                <h4 className="text-zinc-600 font-bold text-base">No resumes found</h4>
                                <p className="text-zinc-400 text-sm mt-1 mb-4">You haven't built a resume yet. Let's change that.</p>
                                <Link to="/builder" className="text-white bg-zinc-900 px-6 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors shadow-md">
                                    Start Building Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. TEMPLATE SHOWCASE SECTION */}
                <div id="templates" className="scroll-mt-24 pb-20">
                    <div className="border-t border-zinc-200 pt-12 mb-8 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-black text-zinc-900">Premium Templates</h2>
                            <p className="text-sm text-zinc-500 mt-1">Start your next resume with a professionally designed layout.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableThemes.map((theme) => (
                            <TemplateThumbnail 
                                key={theme.id} 
                                templateId={theme.id} 
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;