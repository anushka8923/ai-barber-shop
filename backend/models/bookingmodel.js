const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  userId: { type: String, required: true }, // Add userId field
});

module.exports = mongoose.model("Booking", BookingSchema);
