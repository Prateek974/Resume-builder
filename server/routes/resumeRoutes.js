const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // 1. Must protect the route
const Resume = require('../models/Resume'); // 2. Must import your model

// --- NEW ROUTE: Fetch the user's saved resume ---
router.get('/me', protect, async (req, res) => {
    try {
        // Search the DB for a resume tied to the logged-in user's ID
        const resume = await Resume.findOne({ user: req.user._id });
        
        if (resume) {
            res.status(200).json(resume);
        } else {
            // If they haven't saved one yet, send an empty object
            // This tells the Dashboard to show the "Start Building" empty state!
            res.status(200).json({}); 
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- EXISTING ROUTE: Save or update the resume ---
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

// 3. IMPORTANT: Export the router so server/index.js can use it
module.exports = router;