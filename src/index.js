const express = require("express");
require("dotenv").config(); // ✅ Load .env variables
require("./config/firebase"); // 🔥 Initialize Firebase

const customersRoutes = require("./routes/customers.routes");
const appointmentsRoutes = require("./routes/appointments.routes");

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Use env PORT

app.use(express.json());

app.use("/customers", customersRoutes);
app.use("/appointments", appointmentsRoutes);

app.get("/", (req, res) => res.send("Appointment Manager API running"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
