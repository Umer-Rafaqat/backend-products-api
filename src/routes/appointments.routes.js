const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointments.controller");
const { validateAppointment } = require("../validators/appointments.validator");

router.post("/create", validateAppointment, controller.createAppointment);
router.get("/", controller.getAllAppointments);
router.get("/:id", controller.getAppointmentById);

module.exports = router;
