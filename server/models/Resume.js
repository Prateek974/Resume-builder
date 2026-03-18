const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        github: String,
        linkedin: String
    },
    // Using Arrays of Objects for "Add More" functionality
    education: [{
        school: String,
        degree: String,
        startYear: String,
        endYear: String
    }],
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String // AI will refine this field
    }],
    skills: [String],
    summary: String
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);