// server/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json()); 

// --- ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// ADD THIS LINE BELOW:
// This tells the server: "Any request starting with /api/resumes should go to resumeRoutes"
app.use('/api/resumes', require('./routes/resumeRoutes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));