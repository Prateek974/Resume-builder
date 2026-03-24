const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Groq = require('groq-sdk');

// Initialize Groq with your environment variable
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/enhance', protect, async (req, res) => {
    try {
        const { text, type } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Please provide some rough text to enhance." });
        }

        // Determine how the AI should behave based on the section
        let systemPrompt = "";
        if (type === 'summary') {
            systemPrompt = "You are an expert technical recruiter. Rewrite the user's input into a professional, high-impact 3-sentence resume summary for a Data Science / Software Engineering student. Do not include any introductory remarks like 'Here is your summary'. Just output the final polished text.";
        } else if (type === 'experience') {
            systemPrompt = "You are an expert technical recruiter. Rewrite the user's input into a single, high-impact resume bullet point using the XYZ format (Accomplished [X] as measured by [Y], by doing [Z]). Make it sound highly professional. Output ONLY the polished bullet point text.";
        } else if (type === 'skills') {
            systemPrompt = "You are a technical recruiter. Extract the core skills from the user's input and return them as a clean, comma-separated list of professional keywords (e.g., Python, React.js, Machine Learning). Output ONLY the comma-separated list.";
        }

        // Call the Groq Llama 3 model
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ],
            model: "llama-3.1-8b-instant", // Groq's ultra-fast model
            temperature: 0.7,
            max_tokens: 250,
        });

        // Extract the AI's response and send it back to React
        const enhancedText = chatCompletion.choices[0]?.message?.content || "";
        res.json({ enhancedText: enhancedText.trim() });

    } catch (error) {
        console.error("Groq AI Error:", error);
        res.status(500).json({ message: "Failed to enhance text with AI." });
    }
});

module.exports = router;