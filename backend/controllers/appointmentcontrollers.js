const Appointment = require("../models/appointment");

// Fetch all appointments for a user
exports.getAppointments = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find({ userId }).populate("slotId");
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// Create a new appointment
exports.createAppointment = async (req, res, next) => {
  try {
    const { userId, slotId, service } = req.body;
    const appointment = new Appointment({ userId, slotId, service, status: "pending" });
    await appointment.save();

    res.json({ message: "Appointment created", appointment });
  } catch (error) {
    next(error);
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    res.json({ message: "Appointment status updated", appointment });
  } catch (error) {
    next(error);
  }
};
