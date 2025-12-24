const express = require("express");
const {
  createService,
  getAllServices,
} = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// All service routes require authentication
router.use(authMiddleware);

// POST /services/create - Admin only
router.post("/create", roleMiddleware("admin"), createService);

// GET /services - All logged-in users
router.get("/", getAllServices);

module.exports = router;
