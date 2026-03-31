import React from 'react';

const ProfessionalTemplate = ({ data }) => (
    <div className="w-full max-w-[650px] aspect-[1/1.414] bg-white shadow-2xl p-10 flex flex-col text-left text-zinc-900 font-sans">
        
        {/* Header */}
        <div className="text-center border-b-2 border-zinc-900 pb-4 mb-5">
            <h1 className="text-3xl font-black uppercase tracking-tighter">
                {data.personalInfo.firstName} {data.personalInfo.lastName || "Your Name"}
            </h1>
            <p className="text-[10px] font-medium text-zinc-600 mt-1 uppercase tracking-widest">
                {data.personalInfo.email} {data.personalInfo.phone && `| ${data.personalInfo.phone}`} {data.personalInfo.city && `| ${data.personalInfo.city}`}
            </p>
            <p className="text-[10px] text-[#009245] font-bold mt-1 uppercase">
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
        {data.experience?.[0]?.company && (
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
        {data.education?.[0]?.school && (
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

export default ProfessionalTemplate;