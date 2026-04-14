import React from 'react';

const TheSpecialist = ({ data }) => {
    return (
        <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl p-10 flex flex-col text-left font-sans text-zinc-800 relative overflow-hidden">
            
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 left-0 w-full h-3 bg-amber-500"></div>

            {/* Header section */}
            <header className="mb-6 pt-2">
                <h1 className="text-4xl font-black text-zinc-900 tracking-tight uppercase">
                    {data.personalInfo.firstName} <span className="text-amber-500">{data.personalInfo.lastName}</span>
                </h1>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1.5 mb-3">
                    {data.personalInfo.profession}
                </p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium text-zinc-500 bg-zinc-50 p-2.5 rounded-md border border-zinc-100">
                    {data.personalInfo.email && <span className="flex items-center gap-1">✉ {data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="flex items-center gap-1">☎ {data.personalInfo.phone}</span>}
                    {data.personalInfo.city && <span className="flex items-center gap-1">⚲ {data.personalInfo.city}{data.personalInfo.country ? `, ${data.personalInfo.country}` : ''}</span>}
                    {data.personalInfo.linkedin && <span className="flex items-center gap-1">🔗 {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.summary && (
                <section className="mb-8">
                    <p className="text-[11px] leading-relaxed text-zinc-600 font-medium">
                        {data.summary}
                    </p>
                </section>
            )}

            {/* Experience (The core Timeline UI) */}
            {data.experience?.[0]?.company && (
                <section className="mb-8">
                    <h2 className="text-[12px] font-black uppercase tracking-widest text-zinc-900 mb-5">Experience Timeline</h2>
                    
                    <div className="relative pl-5 border-l-2 border-amber-200 space-y-6">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[27px] top-1 ring-4 ring-white shadow-sm"></div>
                                
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[12px] font-bold text-zinc-900">{exp.role}</h3>
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md whitespace-nowrap border border-amber-100">
                                        {exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                                    </span>
                                </div>
                                <h4 className="text-[11px] font-bold text-zinc-600 mb-2">
                                    {exp.company} {exp.location && <span className="font-normal text-zinc-400">| {exp.location}</span>}
                                </h4>
                                <p className="text-[10.5px] leading-relaxed text-zinc-600">
                                    {exp.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Split Bottom Section */}
            <div className="flex gap-8 mt-auto pt-4 border-t border-zinc-100">
                
                {/* Skills */}
                {data.skills && (
                    <section className="flex-1">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-zinc-900 mb-3">Core Expertise</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.split(',').map((skill, i) => skill.trim() && (
                                <span key={i} className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-zinc-700 text-[9px] font-bold uppercase tracking-wider rounded-md">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education?.[0]?.school && (
                    <section className="flex-1">
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-zinc-900 mb-3">Education</h2>
                        <div className="relative pl-4 border-l-2 border-zinc-200 space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute w-2 h-2 bg-zinc-300 rounded-full -left-[21px] top-1.5 ring-2 ring-white"></div>
                                    <h3 className="text-[11px] font-bold text-zinc-800 leading-tight">
                                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                                    </h3>
                                    <p className="text-[10px] text-zinc-600 mt-0.5">{edu.school}</p>
                                    <p className="text-[9px] font-bold text-zinc-400 mt-0.5 uppercase tracking-wider">
                                        Class of {edu.endYear} {edu.cgpa && `• CGPA: ${edu.cgpa}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

        </div>
    );
};

export default TheSpecialist;