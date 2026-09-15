const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ["available", "pending", "booked", "busy"], default: "available" },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

module.exports = mongoose.model("Slot", SlotSchema);
