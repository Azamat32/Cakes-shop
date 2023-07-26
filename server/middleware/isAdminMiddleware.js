const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAdmin = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user has the role of "admin"
    if (decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({
          error: "Access forbidden. Only admins can perform this action.",
        });
    }

    // If the token is valid and the user is an admin, allow them to proceed
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = isAdmin;
