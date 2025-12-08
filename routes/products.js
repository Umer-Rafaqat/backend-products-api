// routes/products.js
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// In-memory product store (for assignment)
let products = [
  {
    id: uuidv4(),
    name: "Example Product A",
    price: 19.99,
    description: "A sample product",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Example Product B",
    price: 49.5,
    description: "Another sample product",
    inStock: false,
    createdAt: new Date().toISOString(),
  },
];

// GET /api/products
router.get("/", (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const n = parseInt(limit, 10);
    return res.json(products.slice(0, n));
  }
  res.json(products);
});

// POST /api/products
router.post("/", (req, res) => {
  // 🔍 Debug: Log the incoming body
  console.log("BODY RECEIVED:", req.body);

  let { name, price, description, inStock } = req.body;

  // Convert price to number safely
  price = Number(price);

  // Validation
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Product 'name' is required and must be a string",
    });
  }

  if (isNaN(price)) {
    return res.status(400).json({
      message: "Product 'price' is required and must be a number",
    });
  }

  const newProduct = {
    id: uuidv4(),
    name: name.trim(),
    price,
    description: description ? String(description) : "",
    inStock: Boolean(inStock),
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

module.exports = router;
