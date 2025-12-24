const { db } = require("../config/firebase");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Verify user object exists (authMiddleware should have set it)
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          error: "Unauthorized",
          details: "User information is missing",
        });
      }

      // Fetch user from Firestore to get current role
      const userDoc = await db.collection("users").doc(req.user.userId).get();

      if (!userDoc.exists) {
        return res.status(404).json({
          error: "User not found",
          details: "User does not exist in database",
        });
      }

      const userData = userDoc.data();
      const userRole = userData.role;

      // Check if user has required role
      if (userRole !== requiredRole) {
        return res.status(403).json({
          error: "Forbidden",
          details: `Only ${requiredRole}s can access this resource`,
        });
      }

      // Attach user data to request
      req.user.role = userRole;

      next();
    } catch (error) {
      return res.status(500).json({
        error: "Authorization check failed",
        details: error.message,
      });
    }
  };
};

module.exports = roleMiddleware;
