const db = require("../config/firebase");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = req.body;

    const docRef = await db.collection("appointments").add(appointment);

    res.status(200).json({
      id: docRef.id,
      message: "Appointment created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const snapshot = await db.collection("appointments").get();

    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const doc = await db.collection("appointments").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
