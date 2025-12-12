const express = require("express");
const router = express.Router();
const db = require("../config/firestore");

// POST → Create a product
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("products").add(data);

    res.status(201).json({
      id: docRef.id,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET → Get all products
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET → Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("products").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
