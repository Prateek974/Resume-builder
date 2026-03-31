import React from 'react';

const ModernMinial = ({ data }) => {
    return (
        <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl p-10 flex flex-col text-left font-sans text-zinc-800">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-4xl font-light tracking-wide text-zinc-900">
                    <span className="font-bold">{data.personalInfo.firstName}</span> {data.personalInfo.lastName}
                </h1>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mt-1">
                    {data.personalInfo.profession}
                </p>
                <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-zinc-500">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.city && <span>• {data.personalInfo.city}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.summary && (
                <section className="mb-6">
                    <p className="text-[11px] leading-relaxed text-zinc-600">{data.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.[0]?.company && (
                <section className="mb-6">
                    <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Experience</h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-[12px] font-bold text-zinc-800">{exp.role}</h3>
                                    <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                                        {exp.startMonth} {exp.startYear} - {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                                    </span>
                                </div>
                                <p className="text-[11px] font-medium text-zinc-600 mb-1">{exp.company} {exp.location && `| ${exp.location}`}</p>
                                <p className="text-[10px] leading-relaxed text-zinc-600">{exp.summary}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Split bottom section for Education and Skills */}
            <div className="flex gap-6 mt-auto">
                {/* Education */}
                {data.education?.[0]?.school && (
                    <section className="flex-1">
                        <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <h3 className="text-[11px] font-bold text-zinc-800">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                                <p className="text-[10px] text-zinc-600">{edu.school}</p>
                                <p className="text-[10px] text-zinc-500">Class of {edu.endYear} {edu.cgpa && `• CGPA: ${edu.cgpa}`}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills && (
                    <section className="flex-1">
                        <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.split(',').map((skill, i) => skill.trim() && (
                                <span key={i} className="px-2 py-1 bg-zinc-100 text-zinc-700 text-[9px] rounded-sm font-medium">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernMinial;