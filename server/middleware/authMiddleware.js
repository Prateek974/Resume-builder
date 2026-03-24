const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  // ⚠️ TEMPORARY COLLABORATOR BYPASS: Remove before deployment
  req.user = { _id: "000000000000000000000000" };
  return next(); // This immediately exits the function and moves to the next step

  // --- THE REAL LOGIC (Currently skipped by the return statement above) ---
  let token;

  // 1. Check if the token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token (Remove "Bearer " from the string)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your Secret Key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in the database and attach it to the Request object
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Move to the next piece of logic
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token found' });
  }
};

module.exports = { protect };