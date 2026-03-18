const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // 1. Must protect the route
const Resume = require('../models/Resume'); // 2. Must import your model

// Your Route Logic
router.post('/save', protect, async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { user: req.user._id }, 
            { ...req.body, user: req.user._id }, 
            { new: true, upsert: true } 
        );
        res.status(200).json(resume);
    } catch (error) {
        // Log the actual error for debugging
        console.error("Save Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// 3. IMPORTANT: Export the router so server/index.js can use it
module.exports = router;