const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin } = require('../controllers/authController');

// Standard Email/Password Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- NEW: Google OAuth Route ---
router.post('/google', googleLogin);

module.exports = router;