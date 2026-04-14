import React from 'react';

const TheVisionary = ({ data }) => {
    return (
        <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl flex flex-col text-left font-sans text-zinc-800 overflow-hidden relative">
            
            {/* Massive Block Header */}
            <header className="bg-indigo-600 px-10 pt-12 pb-10 text-white">
                <h1 className="text-4xl font-black uppercase tracking-tighter">
                    {data.personalInfo.firstName} <span className="text-indigo-200">{data.personalInfo.lastName}</span>
                </h1>
                <p className="text-sm font-bold tracking-widest mt-1 uppercase text-white/90">
                    {data.personalInfo.profession}
                </p>
                <div className="flex flex-wrap gap-3 mt-5 text-[10px] text-indigo-100 font-medium">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.city && <span>• {data.personalInfo.city}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Main Content Body */}
            <div className="p-10 flex flex-col flex-grow">
                
                {/* Summary (Highlighted with a left border) */}
                {data.summary && (
                    <section className="mb-7 pl-4 border-l-4 border-indigo-600 bg-indigo-50/50 py-2 pr-2">
                        <p className="text-[11px] leading-relaxed text-zinc-700 italic font-medium">
                            "{data.summary}"
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.[0]?.company && (
                    <section className="mb-6">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-100 pb-1 mb-4">
                            Professional Experience
                        </h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative">
                                    {/* Small visual bullet for the timeline feel */}
                                    <div className="absolute -left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-[12px] font-bold text-zinc-900">{exp.role}</h3>
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm whitespace-nowrap">
                                            {exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">
                                        {exp.company} {exp.location && `// ${exp.location}`}
                                    </p>
                                    <p className="text-[10.5px] leading-relaxed text-zinc-600">{exp.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Split: Education & Skills */}
                <div className="flex gap-8 mt-auto pt-4">
                    {/* Education */}
                    {data.education?.[0]?.school && (
                        <section className="flex-1">
                            <h2 className="text-[12px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-100 pb-1 mb-4">
                                Education
                            </h2>
                            {data.education.map((edu, i) => (
                                <div key={i} className="mb-3">
                                    <h3 className="text-[11px] font-bold text-zinc-900 leading-tight">
                                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                                    </h3>
                                    <p className="text-[10px] font-medium text-zinc-600 mt-0.5">{edu.school}</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                                        Class of {edu.endYear} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && (
                        <section className="flex-1">
                            <h2 className="text-[12px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-100 pb-1 mb-4">
                                Technical Skills
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.split(',').map((skill, i) => skill.trim() && (
                                    <span key={i} className="px-2 py-1 bg-zinc-900 text-white text-[9px] rounded font-bold tracking-wide">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
                
            </div>
        </div>
    );
};

export default TheVisionary;