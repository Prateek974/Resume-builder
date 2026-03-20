/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ResumeBuilder = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // FIX 1: Added missing state for Step 1 Optional Fields
    const [optionalFields, setOptionalFields] = useState({
        linkedin: false,
        github: false,
        portfolio: false
    });

    const toggleField = (field) => {
        setOptionalFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    // FIX 2: Normalized firstName/lastName in Initial State
    const [resumeData, setResumeData] = useState({
        resumeTitle: "My Professional Resume",
        personalInfo: {
            firstName: user?.name?.split(' ')[0] || '',
            lastName: user?.name?.split(' ').slice(1).join(' ') || '',
            profession: '',
            city: '',
            country: '',
            pinCode: '',
            email: user?.email || '',
            phone: '',
            github: '',
            linkedin: '',
            portfolio: ''
        },
        education: [{ school: '', location: '', degree: '', fieldOfStudy: '', endYear: '', cgpa: '' }],
        experience: [{ company: '', role: '', location: '', isRemote: false, startMonth: '', startYear: '', endMonth: '', endYear: '', isCurrent: false, summary: '' }],
        skills: "",
        summary: ""
    });

    useEffect(() => {
        const fetchResume = async () => {
            if (!user?.token) { setFetching(false); return; }
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/resumes/me', config);
                if (data) {
                    setResumeData({
                        ...data,
                        personalInfo: {
                            ...data.personalInfo,
                            firstName: data.personalInfo?.firstName || data.personalInfo?.fullName?.split(' ')[0] || user.name.split(' ')[0],
                            lastName: data.personalInfo?.lastName || data.personalInfo?.fullName?.split(' ').slice(1).join(' ') || user.name.split(' ').slice(1).join(' '),
                            email: data.personalInfo?.email || user.email
                        }
                    });
                }
            } catch (err) {
                console.log("Starting fresh.");
            } finally { setFetching(false); }
        };
        fetchResume();
    }, [user]);

    const handleAddSkill = (skill) => {
        const currentSkills = resumeData.skills || '';
        const newSkills = currentSkills ? `${currentSkills}, ${skill}` : skill;
        setResumeData(prev => ({ ...prev, skills: newSkills }));
    };
    const handleAddSummary = (text) => {
        const currentSummary = resumeData.summary || '';
        const newSummary = currentSummary ? `${currentSummary} ${text}` : text;
        setResumeData(prev => ({ ...prev, summary: newSummary }));
    };

    // --- UNIVERSAL HANDLERS ---
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
        setResumeData(prev => ({ ...prev, [section]: [...prev[section], template] }));
    };

    const removeField = (index, section) => {
        const newArray = [...resumeData[section]];
        newArray.splice(index, 1);
        setResumeData(prev => ({ ...prev, [section]: newArray }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/resumes/save', resumeData, config);
            alert("Progress Saved!");
        } catch (err) {
            alert("Error saving progress.");
        } finally { setLoading(false); }
    };

    if (fetching) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009245]"></div></div>;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)] bg-zinc-50 font-sans">
            
            {/* FIX 4: LEFT/MAIN SECTION (Expands to 100% width on Step 6) */}
            <div className={`w-full overflow-y-auto bg-white shadow-inner transition-all duration-500 ${step === 6 ? 'lg:w-full flex flex-col items-center p-6 md:p-12' : 'lg:w-[60%] p-6 md:p-12'}`}>
                
                {/* 6-STEP NAVIGATION BAR */}
                <div className={`flex flex-wrap items-center gap-3 mb-10 text-[10px] font-bold uppercase tracking-tighter text-zinc-400 ${step === 6 ? 'justify-center w-full max-w-4xl' : ''}`}>
                    {['Heading', 'Education', 'Work', 'Skills', 'Summary', 'Finalize'].map((label, i) => (
                        <React.Fragment key={i}>
                            <button 
                                onClick={() => setStep(i + 1)}
                                className={`${step === i + 1 ? "text-[#009245] border-b-2 border-[#009245]" : "hover:text-zinc-600"}`}
                            >
                                0{i + 1} {label}
                            </button>
                            {i < 5 && <div className="h-[1px] w-4 bg-zinc-200"></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* --- STEP CONTENT RENDERER --- */}
                
                {/* STEP 1: HEADING */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <p className="text-sm text-zinc-500 mb-8">We suggest including an email and phone number.</p>

                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            <div className="flex flex-col items-center gap-3 w-[120px] shrink-0">
                                <div className="w-24 h-24 bg-zinc-200 flex items-center justify-center text-zinc-400">
                                    <span className="material-symbols-outlined text-5xl">person</span>
                                </div>
                                <button className="text-blue-600 text-xs font-bold hover:underline">Upload Photo</button>
                            </div>

                            <div className="flex-1 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="First Name" id="firstName" value={resumeData.personalInfo.firstName} onChange={handlePersonalChange} />
                                    <InputField label="Surname" id="lastName" value={resumeData.personalInfo.lastName} onChange={handlePersonalChange} />
                                </div>

                                <InputField label="Profession" id="profession" value={resumeData.personalInfo.profession} onChange={handlePersonalChange} placeholder="e.g. Data Science Student" />

                                <div className="grid grid-cols-3 gap-5">
                                    <InputField label="City" id="city" value={resumeData.personalInfo.city} onChange={handlePersonalChange} placeholder="e.g. Jaipur" />
                                    <InputField label="Country" id="country" value={resumeData.personalInfo.country} onChange={handlePersonalChange} placeholder="e.g. India" />
                                    <InputField label="Pin Code" id="pinCode" value={resumeData.personalInfo.pinCode} onChange={handlePersonalChange} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="Phone" id="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalChange} />
                                    <InputField label="Email *" id="email" value={resumeData.personalInfo.email} onChange={handlePersonalChange} />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-zinc-200 pt-6">
                            <p className="text-xs font-bold text-zinc-800 mb-4 flex items-center gap-1">
                                Add additional information to your resume (optional)
                                <span className="material-symbols-outlined text-[14px] text-zinc-400 cursor-help" title="These links help technical recruiters verify your projects.">info</span>
                            </p>
                            
                            <div className="flex flex-wrap gap-3 mb-6">
                                <button onClick={() => toggleField('linkedin')} className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${optionalFields.linkedin ? 'bg-zinc-100 border-zinc-300 text-zinc-400' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}>
                                    LinkedIn {optionalFields.linkedin ? '✓' : '+'}
                                </button>
                                <button onClick={() => toggleField('github')} className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${optionalFields.github ? 'bg-zinc-100 border-zinc-300 text-zinc-400' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}>
                                    GitHub {optionalFields.github ? '✓' : '+'}
                                </button>
                                <button onClick={() => toggleField('portfolio')} className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1 ${optionalFields.portfolio ? 'bg-zinc-100 border-zinc-300 text-zinc-400' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}>
                                    Website {optionalFields.portfolio ? '✓' : '+'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {optionalFields.linkedin && (
                                    <div className="animate-in zoom-in-95 duration-200"><InputField label="LinkedIn URL" id="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalChange} /></div>
                                )}
                                {optionalFields.github && (
                                    <div className="animate-in zoom-in-95 duration-200"><InputField label="GitHub URL" id="github" value={resumeData.personalInfo.github} onChange={handlePersonalChange} /></div>
                                )}
                                {optionalFields.portfolio && (
                                    <div className="animate-in zoom-in-95 duration-200"><InputField label="Portfolio Website" id="portfolio" value={resumeData.personalInfo.portfolio} onChange={handlePersonalChange} /></div>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 flex justify-between items-center">
                            <button className="text-blue-600 text-sm font-bold hover:underline">Optional: Personal details</button>
                            <button onClick={() => setStep(2)} className="bg-[#facc15] text-zinc-900 px-8 py-3 font-bold rounded shadow-sm hover:bg-yellow-500 transition-all">
                                Next: Education
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: EDUCATION */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <h2 className="text-2xl font-black text-zinc-900 mb-2">Tell us about your education</h2>
                        <p className="text-sm text-zinc-500 mb-8">Enter your education experience so far, even if you are a current student or did not graduate.</p>

                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="mb-8 relative group border-b border-zinc-200 pb-8 last:border-0">
                                {resumeData.education.length > 1 && (
                                    <button onClick={() => removeField(index, 'education')} className="absolute top-0 right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">delete</span> Remove
                                    </button>
                                )}

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="School Name *" value={edu.school} onChange={(e) => handleArrayChange(index, 'school', e.target.value, 'education')} placeholder="e.g. Rajasthan Technical University" />
                                        <InputField label="School Location" value={edu.location || ''} onChange={(e) => handleArrayChange(index, 'location', e.target.value, 'education')} placeholder="e.g. Kota, India" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <SelectField 
                                            label="Degree" 
                                            value={edu.degree} 
                                            onChange={(e) => handleArrayChange(index, 'degree', e.target.value, 'education')} 
                                            options={['Select', 'High School Diploma', 'B.Tech', 'B.Sc', 'B.C.A.', 'M.Tech', 'Other']} 
                                        />
                                        <InputField label="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleArrayChange(index, 'fieldOfStudy', e.target.value, 'education')} placeholder="e.g. Data Science" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Graduation Date (or expected)" value={edu.endYear} onChange={(e) => handleArrayChange(index, 'endYear', e.target.value, 'education')} placeholder="e.g. May 2028" />
                                        <InputField label="CGPA / Score" value={edu.cgpa} onChange={(e) => handleArrayChange(index, 'cgpa', e.target.value, 'education')} placeholder="e.g. 8.5" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bg-[#f0f4f8] border border-[#d9e2ec] rounded-lg p-4 flex gap-3 mb-6">
                            <span className="material-symbols-outlined text-blue-600 text-xl">lightbulb</span>
                            <p className="text-xs text-zinc-700 leading-relaxed">
                                <strong>Pro Tip:</strong> Still new to the employment scene? Make this section look impressive! If you are focusing on campus placements, adding an above-average rank or CGPA (8.0 or higher) is a strong signal to technical recruiters.
                            </p>
                        </div>

                        <button onClick={() => addField('education', { school: '', location: '', degree: '', fieldOfStudy: '', endYear: '', cgpa: '' })} className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
                            + Add another degree
                        </button>

                        <div className="mt-10 flex justify-between items-center border-t border-zinc-200 pt-6">
                            <button onClick={() => setStep(1)} className="text-blue-600 text-sm font-bold hover:underline">Back</button>
                            <button onClick={() => setStep(3)} className="bg-[#facc15] text-zinc-900 px-8 py-3 font-bold rounded shadow-sm hover:bg-yellow-500 transition-all">
                                Next: Work History
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: WORK HISTORY */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <h2 className="text-2xl font-black text-zinc-900 mb-2">Tell us about your most recent job</h2>
                        <p className="text-sm text-zinc-500 mb-8">We'll start there and work backward.</p>

                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="mb-8 relative group border-b border-zinc-200 pb-8 last:border-0">
                                {resumeData.experience.length > 1 && (
                                    <button onClick={() => removeField(index, 'experience')} className="absolute top-0 right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">delete</span> Remove
                                    </button>
                                )}

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Job Title *" value={exp.role || ''} onChange={(e) => handleArrayChange(index, 'role', e.target.value, 'experience')} placeholder="e.g. Data Science Intern" />
                                        <InputField label="Employer *" value={exp.company || ''} onChange={(e) => handleArrayChange(index, 'company', e.target.value, 'experience')} placeholder="e.g. Tata Group" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                                        <InputField label="Location" value={exp.location || ''} onChange={(e) => handleArrayChange(index, 'location', e.target.value, 'experience')} placeholder="e.g. New Delhi, India" />
                                        <div className="flex items-center mt-4 md:mt-6">
                                            <input 
                                                type="checkbox" id={`remote-${index}`} checked={exp.isRemote || false} 
                                                onChange={(e) => handleArrayChange(index, 'isRemote', e.target.checked, 'experience')}
                                                className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                            <label htmlFor={`remote-${index}`} className="ml-2 text-sm font-bold text-zinc-700 cursor-pointer">Remote</label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase">Start Date</label>
                                            <div className="flex gap-2">
                                                <div className="w-1/2">
                                                    <SelectField 
                                                        value={exp.startMonth || ''} 
                                                        onChange={(e) => handleArrayChange(index, 'startMonth', e.target.value, 'experience')} 
                                                        options={['Month', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} 
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <InputField value={exp.startYear || ''} onChange={(e) => handleArrayChange(index, 'startYear', e.target.value, 'experience')} placeholder="Year" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase">End Date</label>
                                            <div className="flex gap-2">
                                                <div className="w-1/2">
                                                    <div className={`transition-opacity ${exp.isCurrent ? 'opacity-50 pointer-events-none' : ''}`}>
                                                        <SelectField 
                                                            value={exp.endMonth || ''} 
                                                            onChange={(e) => handleArrayChange(index, 'endMonth', e.target.value, 'experience')} 
                                                            options={['Month', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputField value={exp.endYear || ''} onChange={(e) => handleArrayChange(index, 'endYear', e.target.value, 'experience')} placeholder="Year" disabled={exp.isCurrent} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" id={`current-${index}`} checked={exp.isCurrent || false} 
                                            onChange={(e) => {
                                                handleArrayChange(index, 'isCurrent', e.target.checked, 'experience');
                                                if(e.target.checked) {
                                                    handleArrayChange(index, 'endMonth', '', 'experience');
                                                    handleArrayChange(index, 'endYear', '', 'experience');
                                                }
                                            }}
                                            className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <label htmlFor={`current-${index}`} className="ml-2 text-sm font-bold text-zinc-700 cursor-pointer">I currently work here</label>
                                    </div>

                                    <div className="pt-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase flex justify-between">
                                            <span>Job Description</span>
                                            <span className="text-blue-600 normal-case italic font-medium">✨ AI Polish available in final step</span>
                                        </label>
                                        <textarea 
                                            className="w-full border border-zinc-200 p-3 mt-1 text-sm h-24 focus:border-blue-600 outline-none transition-all"
                                            value={exp.summary || ''}
                                            onChange={(e) => handleArrayChange(index, 'summary', e.target.value, 'experience')}
                                            placeholder="What did you do at this company? (e.g., Developed a REST API using Node.js...)"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => addField('experience', { company: '', role: '', location: '', isRemote: false, startMonth: '', startYear: '', endMonth: '', endYear: '', isCurrent: false, summary: '' })} className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline mb-4">
                            + Add another position
                        </button>

                        <div className="mt-10 flex justify-between items-center border-t border-zinc-200 pt-6">
                            <button onClick={() => setStep(2)} className="text-blue-600 text-sm font-bold hover:underline">Back</button>
                            <button onClick={() => setStep(4)} className="bg-[#facc15] text-zinc-900 px-8 py-3 font-bold rounded shadow-sm hover:bg-yellow-500 transition-all">
                                Next: Skills
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: SKILLS */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <h2 className="text-2xl font-black text-zinc-900 mb-2">What skills would you like to highlight?</h2>
                        <p className="text-sm text-zinc-500 mb-8">Choose from our pre-written examples below or write your own.</p>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-1/2 bg-[#f8f9fa] p-6 border border-zinc-200 rounded-lg h-[400px] overflow-y-auto">
                                <InputField placeholder="Title, industry, keyword..." id="skillSearch" />
                                
                                <div className="flex justify-between items-center mt-6 mb-3">
                                    <p className="text-xs font-bold text-zinc-500">Popular Job Titles</p>
                                    <p className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">More v</p>
                                </div>

                                <div className="space-y-3">
                                    {['Python', 'React.js', 'Machine Learning', 'Node.js', 'MongoDB', 'Data Analysis', 'SQL'].map((skill, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white p-3 border border-zinc-200 rounded shadow-sm hover:border-blue-400 transition-colors">
                                            <button 
                                                onClick={() => handleAddSkill(skill)} 
                                                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl hover:bg-blue-700 transition-colors shrink-0"
                                            >
                                                +
                                            </button>
                                            <div>
                                                <p className="text-[10px] font-bold text-[#b91c1c] flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[12px]">star</span> Expert Recommended
                                                </p>
                                                <p className="text-sm font-bold text-zinc-800">{skill}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 flex flex-col">
                                <div className="flex border-b border-zinc-200 mb-4">
                                    <button className="px-6 py-2 text-sm font-bold text-blue-600 border-b-2 border-blue-600">Text Editor</button>
                                    <button className="px-6 py-2 text-sm font-bold text-zinc-400 hover:text-zinc-600">Skills Rating</button>
                                </div>
                                
                                <div className="border border-zinc-200 rounded-lg bg-white relative flex-1 flex flex-col min-h-[300px]">
                                    <div className="flex gap-4 p-3 border-b border-zinc-200 text-zinc-400 bg-zinc-50 rounded-t-lg">
                                        <span className="material-symbols-outlined text-[18px]">format_bold</span>
                                        <span className="material-symbols-outlined text-[18px]">format_italic</span>
                                        <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                                        <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                                        <div className="w-[1px] h-5 bg-zinc-300"></div>
                                        <span className="material-symbols-outlined text-[18px]">undo</span>
                                        <span className="material-symbols-outlined text-[18px]">redo</span>
                                    </div>
                                    
                                    <textarea
                                        className="w-full flex-1 p-4 outline-none resize-none text-sm text-zinc-800"
                                        placeholder="Add your skills here. Separate them with commas."
                                        value={resumeData.skills || ''}
                                        onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
                                    />
                                    
                                    <div className="absolute bottom-4 right-4">
                                        <button 
                                            onClick={() => alert("We will hook this up to the Gemini API soon!")} 
                                            className="bg-[#fef9c3] border border-[#fde047] text-yellow-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-yellow-200 transition-colors shadow-sm"
                                        >
                                            ✨ Enhance with AI
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-between items-center border-t border-zinc-200 pt-6">
                            <button onClick={() => setStep(3)} className="text-blue-600 text-sm font-bold hover:underline">Back</button>
                            <button onClick={() => setStep(5)} className="bg-[#facc15] text-zinc-900 px-8 py-3 font-bold rounded shadow-sm hover:bg-yellow-500 transition-all">
                                Next: Summary
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 5: SUMMARY */}
                {step === 5 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <h2 className="text-2xl font-black text-zinc-900 mb-2">Briefly tell us about your background</h2>
                        <p className="text-sm text-zinc-500 mb-8">Choose from our pre-written examples below or write your own.</p>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-1/2 bg-[#f8f9fa] p-6 border border-zinc-200 rounded-lg h-[400px] overflow-y-auto">
                                <InputField placeholder="Search by job title (e.g., Data Scientist)" id="summarySearch" />
                                
                                <div className="flex justify-between items-center mt-6 mb-3">
                                    <p className="text-xs font-bold text-zinc-500">Popular Job Titles</p>
                                    <p className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">More v</p>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        "Results-driven Data Science student with a strong foundation in Python, machine learning, and statistical analysis. Eager to apply academic knowledge to real-world data challenges.",
                                        "Detail-oriented software developer specializing in the MERN stack. Proven ability to architect responsive web applications and optimize backend database performance.",
                                        "Analytical thinker and engineering undergraduate with a passion for transforming raw data into actionable business insights. Highly organized and collaborative team player.",
                                        "Motivated and dependable candidate successful at managing multiple priorities with a positive attitude. Willingness to take on added responsibilities to meet team goals."
                                    ].map((text, i) => (
                                        <div key={i} className="flex gap-4 bg-white p-4 border border-zinc-200 rounded shadow-sm hover:border-blue-400 transition-colors items-start">
                                            <button 
                                                onClick={() => handleAddSummary(text)} 
                                                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl hover:bg-blue-700 transition-colors shrink-0 mt-1"
                                            >
                                                +
                                            </button>
                                            <div>
                                                <p className="text-[10px] font-bold text-[#b91c1c] flex items-center gap-1 mb-1">
                                                    <span className="material-symbols-outlined text-[12px]">star</span> Expert Recommended
                                                </p>
                                                <p className="text-xs font-medium text-zinc-700 leading-relaxed">{text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 flex flex-col">
                                <div className="border border-zinc-200 rounded-lg bg-white relative flex-1 flex flex-col min-h-[400px]">
                                    <div className="flex gap-4 p-3 border-b border-zinc-200 text-zinc-400 bg-zinc-50 rounded-t-lg">
                                        <span className="material-symbols-outlined text-[18px]">format_bold</span>
                                        <span className="material-symbols-outlined text-[18px]">format_italic</span>
                                        <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                                        <div className="w-[1px] h-5 bg-zinc-300"></div>
                                        <span className="material-symbols-outlined text-[18px]">spellcheck</span>
                                        <div className="w-[1px] h-5 bg-zinc-300"></div>
                                        <span className="material-symbols-outlined text-[18px]">undo</span>
                                        <span className="material-symbols-outlined text-[18px]">redo</span>
                                    </div>
                                    
                                    <textarea
                                        className="w-full flex-1 p-5 outline-none resize-none text-sm text-zinc-800 leading-relaxed"
                                        placeholder="Write your summary here."
                                        value={resumeData.summary || ''}
                                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                                    />
                                    
                                    <div className="absolute bottom-4 right-4">
                                        <button 
                                            onClick={() => alert("AI generation will be hooked up here!")} 
                                            className="bg-[#fef9c3] border border-[#fde047] text-yellow-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-yellow-200 transition-colors shadow-sm"
                                        >
                                            ✨ Enhance with AI
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-between items-center border-t border-zinc-200 pt-6">
                            <button onClick={() => setStep(4)} className="text-blue-600 text-sm font-bold hover:underline">Back</button>
                            <button onClick={() => setStep(6)} className="bg-[#facc15] text-zinc-900 px-8 py-3 font-bold rounded shadow-sm hover:bg-yellow-500 transition-all">
                                Next: Finalize
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 6: FINALIZE */}
                {step === 6 && (
                    <div className="animate-in zoom-in-95 duration-500 w-full max-w-4xl flex flex-col items-center">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-zinc-900 mb-2">Review & Finalize</h2>
                            <p className="text-sm text-zinc-500">Make sure everything looks perfect. You can always go back to edit.</p>
                        </div>

                        {/* Centered Preview rendering the new component */}
                        <div className="mb-10 w-full flex justify-center border-[8px] border-zinc-100 rounded-lg">
                            <ResumePreview data={resumeData} />
                        </div>

                        {/* Final Actions */}
                        <div className="flex flex-wrap justify-center gap-4 w-full border-t border-zinc-200 pt-8">
                            <button onClick={() => setStep(5)} className="text-blue-600 font-bold hover:underline px-6 py-3">Back to Edit</button>
                            
                            <button onClick={handleSave} disabled={loading} className="bg-[#009245] text-white px-10 py-3 font-bold rounded shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined">{loading ? 'sync' : 'save'}</span>
                                {loading ? "Saving..." : "Save to Dashboard"}
                            </button>
                            
                            <button onClick={() => alert("We will integrate react-to-print for PDF downloads next!")} className="bg-zinc-900 text-white px-10 py-3 font-bold rounded shadow-lg hover:bg-black transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined">download</span>
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* FIX 3 & 4: RIGHT SECTION: SIDEBAR PREVIEW (Hidden on Step 6) */}
            <div className={`bg-zinc-200 p-12 overflow-y-auto items-start justify-center transition-all duration-500 ${step === 6 ? 'hidden' : 'hidden lg:flex w-[40%]'}`}>
                <div className="sticky top-0 w-full flex justify-center">
                    <ResumePreview data={resumeData} />
                </div>
            </div>
            
        </div>
    );
};

// Reusable Input
const InputField = ({ label, id, value, onChange, placeholder, disabled }) => (
    <div className="space-y-1">
        {label && <label htmlFor={id} className="text-[10px] font-black text-zinc-500 uppercase">{label}</label>}
        <input 
            type="text" id={id} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
            className={`w-full border border-zinc-200 p-2.5 text-sm outline-none transition-all ${disabled ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-white focus:border-blue-600'}`}
        />
    </div>
);

// Reusable Select Sub-component
const SelectField = ({ label, id, value, onChange, options }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-[10px] font-black text-zinc-500 uppercase">{label}</label>
        <select
            id={id} value={value} onChange={onChange}
            className="w-full border border-zinc-200 p-2.5 text-sm focus:border-blue-600 outline-none transition-all bg-white appearance-none"
        >
            {options.map((opt, i) => (
                <option key={i} value={opt === 'Select' ? '' : opt}>{opt}</option>
            ))}
        </select>
    </div>
);

// FIX 3: Reusable Preview Component
const ResumePreview = ({ data }) => (
    <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl p-10 flex flex-col text-left text-zinc-900">
        {/* Header */}
        <div className="text-center border-b-2 border-zinc-900 pb-4 mb-5">
            <h1 className="text-3xl font-black uppercase tracking-tighter">
                {data.personalInfo.firstName} {data.personalInfo.lastName || "Your Name"}
            </h1>
            <p className="text-[10px] font-medium text-zinc-600 mt-1 uppercase tracking-widest">
                {data.personalInfo.email} {data.personalInfo.phone && `| ${data.personalInfo.phone}`} {data.personalInfo.city && `| ${data.personalInfo.city}`}
            </p>
            <p className="text-[10px] text-blue-600 font-bold mt-1">
                {data.personalInfo.linkedin && `${data.personalInfo.linkedin} `}
                {data.personalInfo.github && `| ${data.personalInfo.github}`}
            </p>
        </div>

        {/* Summary */}
        {data.summary && (
            <div className="mb-5">
                <p className="text-[10px] leading-relaxed font-medium">{data.summary}</p>
            </div>
        )}

        {/* Experience */}
        {data.experience[0]?.company && (
            <div className="mb-5">
                <h3 className="text-[11px] font-black uppercase border-b border-zinc-200 mb-2 pb-1 tracking-widest text-[#009245]">Experience</h3>
                {data.experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold text-[12px]">{exp.role}</span>
                            <span className="text-[9px] text-zinc-500 font-bold uppercase">
                                {exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                            </span>
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-[10px] italic font-medium">{exp.company}</span>
                            <span className="text-[9px] text-zinc-500">{exp.location}</span>
                        </div>
                        <p className="text-[10px] leading-relaxed">{exp.summary}</p>
                    </div>
                ))}
            </div>
        )}

        {/* Education */}
        {data.education[0]?.school && (
            <div className="mb-5">
                <h3 className="text-[11px] font-black uppercase border-b border-zinc-200 mb-2 pb-1 tracking-widest text-[#009245]">Education</h3>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold text-[11px]">{edu.school}</span>
                            <span className="text-[9px] text-zinc-500 font-bold">{edu.endYear}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-[10px]">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                            {edu.cgpa && <span className="text-[10px] font-bold text-zinc-700">CGPA: {edu.cgpa}</span>}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Skills */}
        {data.skills && (
            <div>
                <h3 className="text-[11px] font-black uppercase border-b border-zinc-200 mb-2 pb-1 tracking-widest text-[#009245]">Skills</h3>
                <p className="text-[10px] leading-relaxed font-medium">{data.skills}</p>
            </div>
        )}
    </div>
);

export default ResumeBuilder;