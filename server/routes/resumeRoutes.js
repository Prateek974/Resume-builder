const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const Resume = require('../models/Resume');


router.get('/me', protect, async (req, res) => {
    try {
        
        const resume = await Resume.findOne({ user: req.user._id });
        
        if (resume) {
            res.status(200).json(resume);
        } else {
    
            res.status(200).json({}); 
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.post('/save', protect, async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { user: req.user._id }, 
            { ...req.body, user: req.user._id }, 
            { new: true, upsert: true } 
        );
        res.status(200).json(resume);
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;