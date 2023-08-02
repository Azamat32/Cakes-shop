// middleware/isAuthenticated.js
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated (you can customize this based on your authentication setup)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user has the role of "admin"
    if (decodedToken.role !== "user") {
      return res.status(403).json({
        error: "Access forbidden. Only users can perform this action.",
      });
    }

    // If the token is valid and the user is an admin, allow them to proceed
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = isAuthenticated;
