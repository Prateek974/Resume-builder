const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    resumeTitle: { 
        type: String, 
        default: "My Professional Resume" 
    },
    
 
    personalInfo: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        profession: { type: String, default: '' },
        city: { type: String, default: '' },
        country: { type: String, default: '' },
        pinCode: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        portfolio: { type: String, default: '' }
    },

    
    education: [{
        school: { type: String, default: '' },
        location: { type: String, default: '' },
        degree: { type: String, default: '' },
        fieldOfStudy: { type: String, default: '' },
        endYear: { type: String, default: '' },
        cgpa: { type: String, default: '' }
    }],

  
    experience: [{
        company: { type: String, default: '' },
        role: { type: String, default: '' },
        location: { type: String, default: '' },
        isRemote: { type: Boolean, default: false }, 
        startMonth: { type: String, default: '' },
        startYear: { type: String, default: '' },
        endMonth: { type: String, default: '' },
        endYear: { type: String, default: '' },
        isCurrent: { type: Boolean, default: false }, 
        summary: { type: String, default: '' }
    }],

    
    skills: { 
        type: String, 
        default: '' 
    },


    summary: { 
        type: String, 
        default: '' 
    }

}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);