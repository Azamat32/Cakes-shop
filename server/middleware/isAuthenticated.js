// middleware/isAuthenticated.js
const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated (you can customize this based on your authentication setup)
  if (req.user) {
    // If the user is authenticated, allow them to proceed to the next middleware/controller function
    next();
  } else {
    // If the user is not authenticated, return an error response
    res.status(401).json({ error: "Unauthorized. Please log in to continue." });
  }
};

module.exports = isAuthenticated;
