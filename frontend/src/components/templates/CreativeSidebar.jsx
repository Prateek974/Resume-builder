import React from 'react';

const CreativeSidebar = ({ data }) => {
    return (
        <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl flex text-left font-sans overflow-hidden">
            
            {/* Left Column (Dark) */}
            <div className="w-[35%] bg-zinc-900 text-zinc-300 p-6 flex flex-col">
                <h1 className="text-3xl font-bold text-white leading-none mb-1 break-words">
                    {data.personalInfo.firstName} <br />
                    <span className="font-light">{data.personalInfo.lastName}</span>
                </h1>
                <p className="text-[10px] text-[#009245] uppercase tracking-widest font-bold mb-6">
                    {data.personalInfo.profession}
                </p>

                {/* Contact */}
                <div className="mb-8 space-y-2 text-[10px]">
                    <h2 className="text-[11px] text-white font-bold uppercase tracking-wider mb-3 border-b border-zinc-700 pb-1">Contact</h2>
                    {data.personalInfo.email && <p className="break-all">{data.personalInfo.email}</p>}
                    {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                    {data.personalInfo.city && <p>{data.personalInfo.city}</p>}
                    {data.personalInfo.linkedin && <p className="truncate">{data.personalInfo.linkedin}</p>}
                </div>

                {/* Education */}
                {data.education?.[0]?.school && (
                    <div className="mb-8">
                        <h2 className="text-[11px] text-white font-bold uppercase tracking-wider mb-3 border-b border-zinc-700 pb-1">Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <p className="text-[11px] font-bold text-white">{edu.degree}</p>
                                <p className="text-[10px]">{edu.school}</p>
                                <p className="text-[9px] text-zinc-500 mt-0.5">{edu.endYear}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {data.skills && (
                    <div>
                        <h2 className="text-[11px] text-white font-bold uppercase tracking-wider mb-3 border-b border-zinc-700 pb-1">Skills</h2>
                        <p className="text-[10px] leading-relaxed">{data.skills}</p>
                    </div>
                )}
            </div>

            {/* Right Column (Light) */}
            <div className="w-[65%] p-8 bg-white text-zinc-800 flex flex-col">
                
                {/* Summary */}
                {data.summary && (
                    <section className="mb-6">
                        <h2 className="text-[14px] font-black uppercase tracking-widest text-zinc-900 mb-2">Profile</h2>
                        <p className="text-[10px] leading-relaxed text-zinc-600">{data.summary}</p>
                    </section>
                )}

                {/* Experience with Timeline UI */}
                {data.experience?.[0]?.company && (
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest text-zinc-900 mb-4">Experience</h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-4 border-l-2 border-zinc-200">
                                    <div className="absolute w-2 h-2 bg-[#009245] rounded-full -left-[5px] top-1"></div>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[12px] font-bold text-zinc-900">{exp.role}</h3>
                                        <span className="text-[9px] font-bold text-[#009245] bg-green-50 px-2 py-0.5 rounded-full">
                                            {exp.startYear} - {exp.isCurrent ? 'Present' : exp.endYear}
                                        </span>
                                    </div>
                                    <h4 className="text-[10px] font-medium text-zinc-500 mb-1.5">{exp.company} {exp.location && `| ${exp.location}`}</h4>
                                    <p className="text-[10px] leading-relaxed text-zinc-600">{exp.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

        </div>
    );
};

export default CreativeSidebar;