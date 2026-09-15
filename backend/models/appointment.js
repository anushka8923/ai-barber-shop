const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  service: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
