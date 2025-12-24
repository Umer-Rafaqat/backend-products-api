const { db } = require("../config/firebase");
const { validateServiceCreate } = require("../validators/serviceValidator");

const createService = async (req, res) => {
  try {
    const validation = validateServiceCreate(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
    }

    const { name, price, duration } = req.body;

    // Create service in Firestore
    const docRef = await db.collection("services").add({
      name,
      price,
      duration,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      id: docRef.id,
      name,
      price,
      duration,
      createdAt: new Date(),
      message: "Service created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create service",
      details: error.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const snapshot = await db.collection("services").get();
    const services = [];

    snapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve services",
      details: error.message,
    });
  }
};

module.exports = { createService, getAllServices };
