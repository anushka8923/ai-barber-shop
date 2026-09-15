const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentcontrollers");

// Routes
router.get("/:userId", appointmentController.getAppointments);
router.post("/", appointmentController.createAppointment);
router.patch("/update-status", appointmentController.updateAppointmentStatus);

module.exports = router;
