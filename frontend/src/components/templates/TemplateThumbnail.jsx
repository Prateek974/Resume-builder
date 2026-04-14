import React from 'react';
import { Link } from 'react-router-dom';
import {
    defaultTemplateId,
    getTemplateMeta,
    previewResumeData,
    templates,
} from './TemplateRegistry';

const TemplateThumbnail = ({ templateId, className = '' }) => {
    const templateMeta = getTemplateMeta(templateId) || getTemplateMeta(defaultTemplateId);
    const selectedTemplateId = templateMeta?.id || defaultTemplateId;
    const SelectedTemplate = templates[selectedTemplateId];
    const zoom = templateMeta?.thumbnailZoom || 0.31;

    // Safety check: If the component didn't load, don't crash the app
    if (!SelectedTemplate) {
        return <div className="h-72 w-full bg-red-100 flex items-center justify-center text-red-500 font-bold rounded-2xl">Template Component Missing</div>;
    }

    return (
        <div className={`group cursor-pointer flex flex-col ${className}`}>
            
            {/* Thumbnail Wrapper */}
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-zinc-950 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-[#009245] hover:ring-offset-2">
                
                {/* The scaled-down React Component */}
                <div
                    className="pointer-events-none origin-top-left bg-white"
                    style={{
                        transform: `scale(${zoom})`,
                        width: `${100 / zoom}%`,
                    }}
                >
                    <SelectedTemplate
                        data={{
                            ...previewResumeData,
                            theme: selectedTemplateId,
                        }}
                    />
                </div>
                
                {/* Bottom Fade Gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-transparent" />

                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 z-10">
                    <Link 
                        to={`/template/${selectedTemplateId}`} 
                        className="transform rounded-full bg-[#009245] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:bg-[#007a3a]"
                    >
                        Use Template
                    </Link>
                </div>
            </div>

            {/* Dynamic Text Labels */}
            <div className="mt-4 text-center">
                <h4 className="font-bold text-zinc-900">
                    {templateMeta?.name || 'Resume Template'}
                </h4>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                    {templateMeta?.description || templateMeta?.type || 'Professional Layout'}
                </p>
            </div>
            
        </div>
    );
};

export default TemplateThumbnail;