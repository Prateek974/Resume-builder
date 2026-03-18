import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ResumeBuilder = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true); // Separate state for initial fetch

    // 1. Initial State
    const [resumeData, setResumeData] = useState({
        resumeTitle: "My Professional Resume",
        personalInfo: {
            fullName: user?.name || '',
            email: user?.email || '',
            phone: '',
            github: '',
            linkedin: '',
            address: ''
        },
        education: [{ school: '', degree: '', startYear: '', endYear: '' }],
        experience: [{ company: '', role: '', startDate: '', endDate: '', summary: '' }],
        skills: "" 
    });

    // 2. useEffect: Fetch saved resume from MongoDB on load
    useEffect(() => {
        const fetchResume = async () => {
            if (!user?.token) {
                setFetching(false);
                return;
            }
            
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/resumes/me', config);

                if (data) {
                    setResumeData({
                        ...data,
                        // Ensure we don't lose the Auth name/email if they are blank in DB
                        personalInfo: {
                            ...data.personalInfo,
                            fullName: data.personalInfo?.fullName || user.name,
                            email: data.personalInfo?.email || user.email
                        },
                        // Convert Array from DB to String for the input field
                        skills: Array.isArray(data.skills) ? data.skills.join(', ') : ""
                    });
                }
            } catch (err) {
                console.log("error found",err);
                console.log("Starting fresh: No existing resume found.");
            } finally {
                setFetching(false);
            }
        };

        fetchResume();
    }, [user]);

    // 3. Form Handlers
    const handlePersonalChange = (e) => {
        const { id, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [id]: value }
        }));
    };

    const handleArrayChange = (index, field, value, section) => {
        const newArray = [...resumeData[section]];
        newArray[index][field] = value;
        setResumeData(prev => ({ ...prev, [section]: newArray }));
    };

    const addField = (section, template) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], template]
        }));
    };

    const removeField = (index, section) => {
        const newArray = [...resumeData[section]];
        newArray.splice(index, 1);
        setResumeData(prev => ({ ...prev, [section]: newArray }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Convert comma-separated string back to array for Mongoose
            const formattedData = {
                ...resumeData,
                skills: typeof resumeData.skills === 'string' 
                    ? resumeData.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
                    : resumeData.skills
            };

            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/resumes/save', formattedData, config);
            alert("Resume Saved Successfully!");
        } catch (err) {
            console.error(err);
            alert("Error saving resume.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009245]"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)] bg-zinc-50 font-sans">
            
            {/* LEFT: FORM SECTION */}
            <div className="w-full lg:w-[60%] p-6 md:p-12 overflow-y-auto bg-white shadow-inner">
                
                {/* Stepper Navigation */}
                <div className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <button onClick={() => setStep(1)} className={step === 1 ? "text-[#009245]" : "hover:text-zinc-600"}>01 INFO</button>
                    <div className="h-[1px] w-8 bg-zinc-200"></div>
                    <button onClick={() => setStep(2)} className={step === 2 ? "text-[#009245]" : "hover:text-zinc-600"}>02 EDUCATION</button>
                    <div className="h-[1px] w-8 bg-zinc-200"></div>
                    <button onClick={() => setStep(3)} className={step === 3 ? "text-[#009245]" : "hover:text-zinc-600"}>03 EXPERIENCE</button>
                </div>

                {/* STEP 1: PERSONAL INFO */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black text-zinc-900 mb-6">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Full Name" id="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalChange} />
                            <InputField label="Email" id="email" value={resumeData.personalInfo.email} onChange={handlePersonalChange} />
                            <InputField label="Phone" id="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalChange} />
                            <InputField label="GitHub" id="github" value={resumeData.personalInfo.github} onChange={handlePersonalChange} />
                        </div>
                        <button onClick={() => setStep(2)} className="mt-8 bg-zinc-900 text-white px-8 py-3 font-bold hover:bg-black transition-all">Next: Education</button>
                    </div>
                )}

                {/* STEP 2: EDUCATION */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black text-zinc-900 mb-6">Academic Background</h2>
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="p-4 border border-zinc-200 rounded-lg mb-4 relative group">
                                <button onClick={() => removeField(index, 'education')} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="School/University" value={edu.school} onChange={(e) => handleArrayChange(index, 'school', e.target.value, 'education')} />
                                    <InputField label="Degree" value={edu.degree} onChange={(e) => handleArrayChange(index, 'degree', e.target.value, 'education')} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addField('education', { school: '', degree: '', startYear: '', endYear: '' })} className="text-[#009245] font-bold text-sm flex items-center gap-2 mb-6 hover:underline">+ Add Education</button>
                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="bg-zinc-100 text-zinc-600 px-8 py-3 font-bold">Back</button>
                            <button onClick={() => setStep(3)} className="bg-zinc-900 text-white px-8 py-3 font-bold">Next: Experience</button>
                        </div>
                    </div>
                )}

                {/* STEP 3: EXPERIENCE & SKILLS */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black text-zinc-900 mb-6">Work Experience</h2>
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="p-4 border border-zinc-200 rounded-lg mb-4">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <InputField label="Company" value={exp.company} onChange={(e) => handleArrayChange(index, 'company', e.target.value, 'experience')} />
                                    <InputField label="Role" value={exp.role} onChange={(e) => handleArrayChange(index, 'role', e.target.value, 'experience')} />
                                </div>
                                <label className="text-xs font-bold text-zinc-500 uppercase italic">Work Summary</label>
                                <textarea 
                                    className="w-full border border-zinc-200 p-3 mt-1 text-sm h-24 focus:border-[#009245] outline-none"
                                    value={exp.summary}
                                    onChange={(e) => handleArrayChange(index, 'summary', e.target.value, 'experience')}
                                    placeholder="Describe your achievements..."
                                />
                            </div>
                        ))}
                        <button onClick={() => addField('experience', { company: '', role: '', startDate: '', endDate: '', summary: '' })} className="text-[#009245] font-bold text-sm flex items-center gap-2 mb-6 hover:underline">+ Add Experience</button>
                        
                        <div className="mb-10">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Skills (Comma separated)</label>
                            <input 
                                className="w-full border border-zinc-200 p-3 mt-1 text-sm focus:border-[#009245] outline-none"
                                value={resumeData.skills}
                                onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
                                placeholder="React, Node.js, Python, Data Science..."
                            />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setStep(2)} className="bg-zinc-100 text-zinc-600 px-8 py-3 font-bold">Back</button>
                            <button onClick={handleSave} disabled={loading} className="bg-[#009245] text-white px-8 py-3 font-bold shadow-lg shadow-green-900/20 disabled:opacity-50">
                                {loading ? "Saving..." : "Save Resume"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT: LIVE PREVIEW */}
            <div className="hidden lg:flex w-[40%] bg-zinc-200 p-12 overflow-y-auto items-start justify-center">
                <div className="w-full max-w-[500px] aspect-[1/1.414] bg-white shadow-2xl p-10 flex flex-col sticky top-0">
                    <div className="text-center border-b-2 border-zinc-900 pb-4 mb-6">
                        <h1 className="text-2xl font-black uppercase tracking-tighter">{resumeData.personalInfo.fullName || "Your Name"}</h1>
                        <p className="text-[10px] font-medium text-zinc-500">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h3 className="text-[10px] font-black uppercase border-b border-zinc-200 mb-2">Experience</h3>
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between font-bold text-[10px]"><span>{exp.role}</span> <span className="italic">{exp.company}</span></div>
                                    <p className="text-[9px] text-zinc-600 mt-1 leading-relaxed">{exp.summary}</p>
                                </div>
                            ))}
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black uppercase border-b border-zinc-200 mb-2">Education</h3>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} className="flex justify-between text-[10px] mb-1">
                                    <span className="font-bold">{edu.school}</span>
                                    <span className="text-zinc-500">{edu.degree}</span>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, id, value, onChange }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-xs font-bold text-zinc-500 uppercase tracking-tight">{label}</label>
        <input 
            type="text" id={id} value={value} onChange={onChange}
            className="w-full border border-zinc-200 p-2.5 text-sm focus:border-[#009245] focus:ring-1 focus:ring-[#009245] outline-none transition-all"
        />
    </div>
);

export default ResumeBuilder;