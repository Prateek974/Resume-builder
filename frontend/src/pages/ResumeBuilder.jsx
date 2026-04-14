/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import AtsScorer from '../components/AtsScorer';
import { templates, availableThemes } from '../components/templates/TemplateRegistry';

const ResumeBuilder = () => {
    const { user } = useAuth();
    const { templateId } = useParams();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [isAILoading, setIsAILoading] = useState(false);

    const [optionalFields, setOptionalFields] = useState({
        linkedin: false,
        github: false,
        portfolio: false
    });

    const toggleField = (field) => {
        setOptionalFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const [resumeData, setResumeData] = useState({
        theme: templateId || 'professional',
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

    const resumeRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        const element = resumeRef.current;
        if (!element) return;

        setIsDownloading(true);
        try {
            const dataUrl = await htmlToImage.toPng(element, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#ffffff'
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${resumeData.personalInfo.firstName || 'My'}_Resume.pdf`);
            
        } catch (error) {
            console.error("Failed to generate PDF", error);
            alert("Oops! Something went wrong generating the PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        const fetchResume = async () => {
            if (!user?.token) { setFetching(false); return; }
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('https://resume-builder-api-rdkz.onrender.com/api/resumes/me', config);
                if (data) {
                    setResumeData(prev => ({
                        ...data,
                        // FIX: Ensure arrays are never overwritten with undefined
                        education: data.education?.length ? data.education : prev.education,
                        experience: data.experience?.length ? data.experience : prev.experience,
                        skills: data.skills || prev.skills,
                        summary: data.summary || prev.summary,
                        theme: templateId || data.theme || 'professional', 
                        personalInfo: {
                            ...data.personalInfo,
                            firstName: data.personalInfo?.firstName || data.personalInfo?.fullName?.split(' ')[0] || user.name.split(' ')[0],
                            lastName: data.personalInfo?.lastName || data.personalInfo?.fullName?.split(' ').slice(1).join(' ') || user.name.split(' ').slice(1).join(' '),
                            email: data.personalInfo?.email || user.email
                        }
                    }));
                }
            } catch (err) {
                console.log("Starting fresh.");
            } finally { setFetching(false); }
        };
        fetchResume();
    }, [user, templateId]);

    const handleAIEnhance = async (index, currentText, type) => {
        if (!currentText) return alert("Please type some rough notes first!");
        
        setIsAILoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('https://resume-builder-api-rdkz.onrender.com/api/ai/enhance', { text: currentText, type }, config);

            if (type === 'experience') {
                handleArrayChange(index, 'summary', data.enhancedText, 'experience');
            } else if (type === 'summary') {
                setResumeData(prev => ({ ...prev, summary: data.enhancedText }));
            } else if (type === 'skills') {
                setResumeData(prev => ({ ...prev, skills: data.enhancedText }));
            }
        } catch (error) {
            console.error(error);
            alert("AI generation failed. Check your backend console.");
        } finally {
            setIsAILoading(false);
        }
    };

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

    const handlePersonalChange = (e) => {
        const { id, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [id]: value }
        }));
    };

    const handleArrayChange = (index, field, value, section) => {
        // FIX: Ensure we have an array to copy from
        const currentArray = resumeData[section] || [];
        const newArray = [...currentArray];
        if (newArray[index]) {
            newArray[index][field] = value;
            setResumeData(prev => ({ ...prev, [section]: newArray }));
        }
    };

    const addField = (section, template) => {
        // FIX: Ensure we are spreading an array
        const currentArray = resumeData[section] || [];
        setResumeData(prev => ({ ...prev, [section]: [...currentArray, template] }));
    };

    const removeField = (index, section) => {
        const currentArray = resumeData[section] || [];
        const newArray = [...currentArray];
        newArray.splice(index, 1);
        setResumeData(prev => ({ ...prev, [section]: newArray }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('https://resume-builder-api-rdkz.onrender.com/api/resumes/save', resumeData, config);
            alert("Progress Saved!");
        } catch (err) {
            alert("Error saving progress.");
        } finally { setLoading(false); }
    };

    if (fetching) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009245]"></div></div>;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)] bg-zinc-50 font-sans">
            
            <div className={`w-full overflow-y-auto bg-white shadow-inner transition-all duration-500 ${step === 6 ? 'lg:w-full flex flex-col items-center p-6 md:p-12' : 'lg:w-[60%] p-6 md:p-12'}`}>
                
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
                
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <p className="text-sm text-zinc-500 mb-8">We suggest including an email and phone number.</p>

                        <div className="space-y-5 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField label="First Name" id="firstName" value={resumeData.personalInfo?.firstName || ''} onChange={handlePersonalChange} />
                                <InputField label="Surname" id="lastName" value={resumeData.personalInfo?.lastName || ''} onChange={handlePersonalChange} />
                            </div>

                            <InputField label="Profession" id="profession" value={resumeData.personalInfo?.profession || ''} onChange={handlePersonalChange} placeholder="e.g. Data Science Student" />

                            <div className="grid grid-cols-3 gap-5">
                                <InputField label="City" id="city" value={resumeData.personalInfo?.city || ''} onChange={handlePersonalChange} placeholder="e.g. Jaipur" />
                                <InputField label="Country" id="country" value={resumeData.personalInfo?.country || ''} onChange={handlePersonalChange} placeholder="e.g. India" />
                                <InputField label="Pin Code" id="pinCode" value={resumeData.personalInfo?.pinCode || ''} onChange={handlePersonalChange} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField label="Phone" id="phone" value={resumeData.personalInfo?.phone || ''} onChange={handlePersonalChange} />
                                <InputField label="Email *" id="email" value={resumeData.personalInfo?.email || ''} onChange={handlePersonalChange} />
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
                                    <div className="animate-in zoom-in-95 duration-200"><InputField label="LinkedIn URL" id="linkedin" value={resumeData.personalInfo?.linkedin || ''} onChange={handlePersonalChange} /></div>
                                )}
                                {optionalFields.github && (
                                    <div className="animate-in zoom-in-95 duration-200"><InputField label="GitHub URL" id="github" value={resumeData.personalInfo?.github || ''} onChange={handlePersonalChange} /></div>
                                )}
                                {optionalFields.portfolio && (
                                    <div className="animate-in zoom-in-95 duration-200"><InputField label="Portfolio Website" id="portfolio" value={resumeData.personalInfo?.portfolio || ''} onChange={handlePersonalChange} /></div>
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

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <h2 className="text-2xl font-black text-zinc-900 mb-2">Tell us about your education</h2>
                        <p className="text-sm text-zinc-500 mb-8">Enter your education experience so far, even if you are a current student or did not graduate.</p>

                        {/* FIX: Safe Fallback for map */}
                        {(resumeData.education || []).map((edu, index) => (
                            <div key={index} className="mb-8 relative group border-b border-zinc-200 pb-8 last:border-0">
                                {(resumeData.education || []).length > 1 && (
                                    <button onClick={() => removeField(index, 'education')} className="absolute top-0 right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">delete</span> Remove
                                    </button>
                                )}

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="School Name *" value={edu.school || ''} onChange={(e) => handleArrayChange(index, 'school', e.target.value, 'education')} placeholder="e.g. Rajasthan Technical University" />
                                        <InputField label="School Location" value={edu.location || ''} onChange={(e) => handleArrayChange(index, 'location', e.target.value, 'education')} placeholder="e.g. Kota, India" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <SelectField 
                                            label="Degree" 
                                            value={edu.degree || ''} 
                                            onChange={(e) => handleArrayChange(index, 'degree', e.target.value, 'education')} 
                                            options={['Select', 'High School Diploma', 'B.Tech', 'B.Sc', 'B.C.A.', 'M.Tech', 'Other']} 
                                        />
                                        <InputField label="Field of Study" value={edu.fieldOfStudy || ''} onChange={(e) => handleArrayChange(index, 'fieldOfStudy', e.target.value, 'education')} placeholder="e.g. Data Science" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Graduation Date (or expected)" value={edu.endYear || ''} onChange={(e) => handleArrayChange(index, 'endYear', e.target.value, 'education')} placeholder="e.g. May 2028" />
                                        <InputField label="CGPA / Score" value={edu.cgpa || ''} onChange={(e) => handleArrayChange(index, 'cgpa', e.target.value, 'education')} placeholder="e.g. 8.5" />
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

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl">
                        <h2 className="text-2xl font-black text-zinc-900 mb-2">Tell us about your most recent job</h2>
                        <p className="text-sm text-zinc-500 mb-8">We'll start there and work backward.</p>

                        {/* FIX: Safe Fallback for map */}
                        {(resumeData.experience || []).map((exp, index) => (
                            <div key={index} className="mb-8 relative group border-b border-zinc-200 pb-8 last:border-0">
                                {(resumeData.experience || []).length > 1 && (
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
                                        <label className="text-[10px] font-black text-zinc-500 uppercase">Job Description</label>
                                        <div className="relative mt-1">
                                            <textarea 
                                                className="w-full border border-zinc-200 p-3 text-sm h-32 focus:border-blue-600 outline-none transition-all pb-12"
                                                value={exp.summary || ''}
                                                onChange={(e) => handleArrayChange(index, 'summary', e.target.value, 'experience')}
                                                placeholder="What did you do at this company? (e.g., Developed a REST API using Node.js...)"
                                            />
                                            <button 
                                                onClick={() => handleAIEnhance(index, exp.summary, 'experience')} 
                                                disabled={isAILoading}
                                                className="absolute bottom-3 right-3 bg-[#fef9c3] border border-[#fde047] text-yellow-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-yellow-200 transition-colors shadow-sm disabled:opacity-50"
                                            >
                                                ✨ {isAILoading ? "Enhancing..." : "Enhance with AI"}
                                            </button>
                                        </div>
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
                                        className="w-full flex-1 p-4 outline-none resize-none text-sm text-zinc-800 pb-16"
                                        placeholder="Add your skills here. Separate them with commas."
                                        value={resumeData.skills || ''}
                                        onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
                                    />
                                    
                                    <div className="absolute bottom-4 right-4">
                                        <button 
                                            onClick={() => handleAIEnhance(null, resumeData.skills, 'skills')} 
                                            disabled={isAILoading}
                                            className="bg-[#fef9c3] border border-[#fde047] text-yellow-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-yellow-200 transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            ✨ {isAILoading ? "Enhancing..." : "Enhance with AI"}
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
                                        className="w-full flex-1 p-5 outline-none resize-none text-sm text-zinc-800 leading-relaxed pb-16"
                                        placeholder="Write your summary here."
                                        value={resumeData.summary || ''}
                                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                                    />
                                    
                                    <div className="absolute bottom-4 right-4">
                                        <button 
                                            onClick={() => handleAIEnhance(null, resumeData.summary, 'summary')} 
                                            disabled={isAILoading}
                                            className="bg-[#fef9c3] border border-[#fde047] text-yellow-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-yellow-200 transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            ✨ {isAILoading ? "Enhancing..." : "Enhance with AI"}
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

                {step === 6 && (
                    <div className="animate-in zoom-in-95 duration-500 w-full max-w-4xl flex flex-col items-center">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-zinc-900 mb-2">Review & Finalize</h2>
                            <p className="text-sm text-zinc-500">Make sure everything looks perfect. You can always go back to edit.</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mb-8 bg-white p-2 rounded-lg shadow-sm border border-zinc-200">
                            {availableThemes.map((themeOption) => (
                                <button 
                                    key={themeOption.id}
                                    onClick={() => setResumeData({...resumeData, theme: themeOption.id})}
                                    className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${resumeData.theme === themeOption.id ? 'bg-[#009245] text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
                                >
                                    {themeOption.name}
                                </button>
                            ))}
                        </div>
                        <AtsScorer resumeData={resumeData} />

                        <div className="mb-10 w-full flex justify-center border-[8px] border-zinc-100 rounded-lg overflow-x-auto bg-zinc-200 p-4">
                            <div ref={resumeRef} className="bg-white shadow-xl">
                                <ResumePreview data={resumeData} />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 w-full border-t border-zinc-200 pt-8">
                            <button onClick={() => setStep(5)} className="text-blue-600 font-bold hover:underline px-6 py-3">Back to Edit</button>
                            
                            <button onClick={handleSave} disabled={loading} className="bg-[#009245] text-white px-10 py-3 font-bold rounded shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined">{loading ? 'sync' : 'save'}</span>
                                {loading ? "Saving..." : "Save to Dashboard"}
                            </button>
                            
                          <button onClick={handleDownloadPDF} className="bg-zinc-900 text-white px-10 py-3 font-bold rounded shadow-lg hover:bg-black transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">download</span>
                            Download PDF
                          </button>
                        </div>
                    </div>
                )}

            </div>

            <div className={`bg-zinc-200 p-12 overflow-y-auto items-start justify-center transition-all duration-500 ${step === 6 ? 'hidden' : 'hidden lg:flex w-[40%]'}`}>
                <div className="sticky top-0 w-full flex justify-center">
                    <ResumePreview data={resumeData} />
                </div>
            </div>
            
        </div>
    );
};

const InputField = ({ label, id, value, onChange, placeholder, disabled }) => (
    <div className="space-y-1">
        {label && <label htmlFor={id} className="text-[10px] font-black text-zinc-500 uppercase">{label}</label>}
        <input 
            type="text" id={id} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
            className={`w-full border border-zinc-200 p-2.5 text-sm outline-none transition-all ${disabled ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-white focus:border-blue-600'}`}
        />
    </div>
);

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

const ResumePreview = ({ data }) => {
    const SelectedTemplate = templates[data?.theme] || templates['professional'];

    return (
        <div className="w-full flex justify-center transition-all duration-300">
            <SelectedTemplate data={data} />
        </div>
    );
};

export default ResumeBuilder;