const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    time: {
      type: String, // Use String if only storing time like "10:00 AM"
      required: [true, "Time is required"],
    },
    status: {
      type: String,
      enum: ["available", "pending", "booked"],
      default: "available",
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: [true, "Barber is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Optional user field
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Add compound index for fast status and time queries
slotSchema.index({ status: 1, time: 1 });

// Prevent overwriting of models
module.exports = mongoose.models.Slot || mongoose.model("Slot", slotSchema);
