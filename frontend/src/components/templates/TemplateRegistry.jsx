import ProfessionalTemplate from './ProfessionalTemplate';
import ModernMinimal from './ModernMinimal';
import CreativeSidebar from './CreativeSidebar';
import TheVisionary from './TheVisionary';
import TheSpecialist from './TheSpecialist';
import TheTerminal from './TheTerminal';

// 1. Component Mapping
export const templates = {
    'professional': ProfessionalTemplate,
    'modern-minimal': ModernMinimal,
    'creative-sidebar': CreativeSidebar,
    'visionary': TheVisionary,
    'specialist': TheSpecialist,
    'terminal': TheTerminal, // <--- ADD THIS
};

// 2. Metadata for UI (The Dashboard loops over this to draw the cards)
export const availableThemes = [
    { id: 'professional', name: 'Professional Green', type: 'Classic • ATS Friendly', thumbnailZoom: 0.31 },
    { id: 'modern-minimal', name: 'Modern Minimal', type: 'Clean • Spacious', thumbnailZoom: 0.31 },
    { id: 'creative-sidebar', name: 'Dark Sidebar', type: 'Bold • Two-Column', thumbnailZoom: 0.31 },
    { id: 'visionary', name: 'The Visionary', type: 'Impactful • Leadership', thumbnailZoom: 0.31 },
    { id: 'specialist', name: 'The Specialist', type: 'Milestones • Progression', thumbnailZoom: 0.31 },
    { id: 'terminal', name: 'The Terminal', type: 'Data-Heavy • Grid', thumbnailZoom: 0.31 } // <--- ADD THIS
];

// 3. Helper Functions (CRITICAL: This prevents the white screen crash!)
export const defaultTemplateId = 'professional';

export const getTemplateMeta = (id) => {
    return availableThemes.find(t => t.id === id) || availableThemes[0];
};

// 4. Mock Data (CRITICAL: This feeds the tiny thumbnails so they have text)
export const previewResumeData = {
    personalInfo: {
        firstName: "Alex",
        lastName: "Rivera",
        profession: "Senior Software Engineer",
        email: "alex.rivera@example.com",
        phone: "+1 (555) 123-4567",
        city: "San Francisco, CA",
        linkedin: "linkedin.com/in/arivera"
    },
    summary: "Forward-thinking software engineer with 6+ years of experience building scalable backend systems and high-performance web applications.",
    experience: [
        {
            role: "Lead Backend Developer",
            company: "TechNova Solutions",
            location: "Remote",
            startMonth: "Jan",
            startYear: "2021",
            isCurrent: true,
            summary: "Architected microservices using Node.js and Docker, improving system uptime by 99.9%."
        }
    ],
    education: [
        {
            degree: "B.S.",
            fieldOfStudy: "Computer Science",
            school: "University of Texas",
            endYear: "2018",
            cgpa: "3.8"
        }
    ],
    skills: "JavaScript, React, Node.js, Python, MongoDB"
};