const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token (Remove "Bearer " from the string)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your Secret Key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in the database and attach it to the Request object
      // We use .select('-password') so we don't accidentally send passwords around
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Move to the next piece of logic (like fetching or saving the resume)
      next();
    } catch (error) {
      console.error("Token Verification Failed:", error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token was provided at all
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token found' });
  }
};

module.exports = { protect };