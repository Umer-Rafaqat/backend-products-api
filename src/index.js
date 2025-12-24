require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/services", serviceRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Salon Management System - Authentication & Authorization API",
    version: "2.0.0",
    endpoints: {
      auth: {
        register: "POST /auth/register",
        login: "POST /auth/login",
      },
      customers: {
        create: "POST /customers/create (protected)",
        getAll: "GET /customers (protected)",
        getById: "GET /customers/:id (protected)",
      },
      services: {
        create: "POST /services/create (admin only)",
        getAll: "GET /services (protected)",
      },
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
