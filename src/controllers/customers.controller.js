const db = require("../config/firebase");

exports.createCustomer = async (req, res) => {
  try {
    const customer = req.body;

    const docRef = await db.collection("customers").add(customer);

    res.status(200).json({
      id: docRef.id,
      message: "Customer created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const snapshot = await db.collection("customers").get();

    const customers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const doc = await db.collection("customers").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
