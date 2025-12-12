// index.js
const express = require("express");
const productsRouter = require("./routes/products");
require("./config/firestore");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// mount router
app.use("/api/products", productsRouter);

// basic health route
app.get("/", (req, res) => res.send("API running"));

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
