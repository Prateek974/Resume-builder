import React from 'react';

const TheTerminal = ({ data }) => {
    return (
        <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl p-10 flex flex-col text-left font-sans text-zinc-800 border-t-8 border-cyan-500">
            
            {/* Header (Grid Split) */}
            <header className="border-b-4 border-zinc-900 pb-5 mb-5 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tighter uppercase leading-none">
                        {data.personalInfo.firstName} <br/>
                        {data.personalInfo.lastName}
                    </h1>
                    <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-widest mt-2">
                        &gt;_ {data.personalInfo.profession}
                    </p>
                </div>
                
                <div className="text-[9px] text-right space-y-1 font-bold text-zinc-500 uppercase tracking-wider">
                    {data.personalInfo.email && <p>{data.personalInfo.email} // EMAIL</p>}
                    {data.personalInfo.phone && <p>{data.personalInfo.phone} // PHONE</p>}
                    {data.personalInfo.city && <p>{data.personalInfo.city} // LOC</p>}
                    {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin} // LINK</p>}
                </div>
            </header>

            {/* Summary */}
            {data.summary && (
                <section className="mb-6 bg-zinc-50 border border-zinc-200 p-3 rounded-sm">
                    <p className="text-[10px] leading-relaxed text-zinc-700 font-medium font-mono">
                        {data.summary}
                    </p>
                </section>
            )}

            {/* Experience (Dense Grid Layout) */}
            {data.experience?.[0]?.company && (
                <section className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-4 w-4 bg-zinc-900 flex items-center justify-center text-white text-[9px] font-black">01</div>
                        <h2 className="text-[12px] font-black uppercase tracking-widest text-zinc-900">Experience Map</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="border-l-2 border-cyan-500 pl-3">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[12px] font-black text-zinc-900 uppercase tracking-wide">{exp.role}</h3>
                                    <span className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 uppercase tracking-wider">
                                        {exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'PRESENT' : `${exp.endMonth} ${exp.endYear}`}
                                    </span>
                                </div>
                                <h4 className="text-[10px] font-bold text-cyan-600 mb-1.5 uppercase">
                                    {exp.company} {exp.location && `[${exp.location}]`}
                                </h4>
                                <p className="text-[10px] leading-relaxed text-zinc-600 font-medium">
                                    {exp.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Bottom Grid: Education & Skills */}
            <div className="grid grid-cols-2 gap-6 mt-auto pt-5 border-t-2 border-zinc-200">
                
                {/* Skills */}
                {data.skills && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-4 w-4 bg-zinc-900 flex items-center justify-center text-white text-[9px] font-black">02</div>
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Tech Stack</h2>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {data.skills.split(',').map((skill, i) => skill.trim() && (
                                <span key={i} className="px-2 py-1 border border-zinc-300 text-zinc-800 text-[8.5px] font-bold uppercase tracking-wider bg-white">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education?.[0]?.school && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-4 w-4 bg-zinc-900 flex items-center justify-center text-white text-[9px] font-black">03</div>
                            <h2 className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Education</h2>
                        </div>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i} className="border border-zinc-100 p-2 bg-zinc-50">
                                    <h3 className="text-[10px] font-black text-zinc-900 uppercase">
                                        {edu.degree} {edu.fieldOfStudy && `// ${edu.fieldOfStudy}`}
                                    </h3>
                                    <p className="text-[9px] font-bold text-zinc-500 mt-0.5 uppercase">{edu.school}</p>
                                    <p className="text-[8.5px] font-bold text-cyan-600 mt-1 uppercase">
                                        Class of {edu.endYear} {edu.cgpa && `| CGPA: ${edu.cgpa}`}
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

export default TheTerminal;