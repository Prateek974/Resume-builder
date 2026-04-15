import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const AtsScorer = ({ resumeData }) => {
    const { user } = useAuth();
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) return alert("Please paste a job description first.");
        
        setLoading(true);
        try {
          
            const flatResumeText = `
                ${resumeData.personalInfo.profession} 
                ${resumeData.summary} 
                ${resumeData.experience.map(e => `${e.role} ${e.summary}`).join(" ")}
                ${resumeData.skills}
            `;

       
            const response = await fetch('https://resume-builder-api-rdkz.onrender.com/api/ai/ats-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}` 
                },
                body: JSON.stringify({
                    resumeText: flatResumeText,
                    jobDescription: jobDescription
                })
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Failed to fetch score", error);
            alert("Something went wrong calculating your score.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm font-sans max-w-2xl mx-auto mt-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-[#009245] text-3xl">radar</span>
                <h2 className="text-xl font-bold text-zinc-900">ATS Match Scorer</h2>
            </div>
            
            <p className="text-sm text-zinc-500 mb-4">
                Paste the job description you are applying for. Our AI will analyze your current resume against the requirements.
            </p>

            <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description here..."
                className="w-full h-32 p-3 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245]/50 mb-4 bg-zinc-50"
            />

            <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-zinc-900 text-white font-bold py-3 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
                {loading ? (
                    <><span className="material-symbols-outlined animate-spin text-[20px]">sync</span> Analyzing Match...</>
                ) : (
                    <><span className="material-symbols-outlined text-[20px]">troubleshoot</span> Scan Resume</>
                )}
            </button>

            {result && (
                <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500 border-t border-zinc-100 pt-6">
                    <div className="flex items-center gap-6 mb-6">
                     
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-zinc-100">
                            
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                <circle cx="44" cy="44" r="44" className={`stroke-current ${result.score > 75 ? 'text-[#009245]' : result.score > 50 ? 'text-yellow-500' : 'text-red-500'}`} strokeWidth="8" fill="transparent" strokeDasharray="276" strokeDashoffset={276 - (276 * result.score) / 100} style={{ transition: "stroke-dashoffset 1s ease-in-out", strokeLinecap: "round" }} />
                            </svg>
                            <span className="text-2xl font-black text-zinc-900">{result.score}%</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-zinc-900">
                                {result.score > 75 ? "Great Match! 🎉" : result.score > 50 ? "Needs Tweaking 🤔" : "Major Revisions Needed ⚠️"}
                            </h3>
                            <p className="text-sm text-zinc-600 mt-1">{result.feedback}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       
                        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">cancel</span> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.missingKeywords?.length > 0 ? result.missingKeywords.map((kw, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-red-100 text-red-800 text-[11px] font-semibold rounded-md">{kw}</span>
                                )) : <span className="text-xs text-red-600">None! You hit them all.</span>}
                            </div>
                        </div>

                   
                        <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#009245] mb-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">check_circle</span> Matched Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {result.matchingKeywords?.map((kw, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-[#009245]/10 text-[#009245] text-[11px] font-semibold rounded-md">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AtsScorer;