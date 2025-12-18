// MUST BE AT THE TOP - Before any other requires
require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Salon Management System - Authentication API",
    version: "1.0.0",
    endpoints: {
      register: "POST /auth/register",
      login: "POST /auth/login",
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    details: "Endpoint does not exist",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Salon Management System API running on port ${PORT}`);
});
