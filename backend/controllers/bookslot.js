let io; // Global Socket.IO instance

// Function to set the Socket.IO instance
const setSocketIO = (socketInstance) => {
  io = socketInstance; // Save the instance globally
};

const Slot = require("../models/slot"); // Import the Slot model

// Create slots
const createSlots = async (req, res) => {
  try {
    const { time, barberId } = req.body; // Data from the client

    // Check if the slot already exists
    const existingSlot = await Slot.findOne({ time, barber: barberId });
    if (existingSlot) {
      return res.status(400).json({ message: "Slot already exists" });
    }

    // Create a new slot
    const newSlot = new Slot({
      time,
      barber: barberId,
      status: "available",
    });

    await newSlot.save();

    // Emit a real-time event for the newly created slot
    if (io) {
      io.emit("slotCreated", { message: "New slot created", slot: newSlot });
    }

    res.status(201).json({ message: "Slot created successfully", slot: newSlot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get available slots
const getAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await Slot.find({ status: "available" }).populate("barber");

    res.status(200).json({ slots: availableSlots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book a slot
const bookSlot = async (req, res) => {
  try {
    const { slotId, userId } = req.body;

    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, status: "available" },
      { status: "pending", user: userId },
      { new: true }
    );

    if (!slot) {
      return res.status(400).json({ success: false, message: "Slot no longer available", data: null });
    }

    if (io) {
      io.emit("slotBooked", { message: "Slot booked", slot });
    }

    res.status(200).json({ success: true, message: "Slot booked, awaiting confirmation", data: slot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// Confirm booking
const confirmBooking = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.status !== "pending") {
      return res.status(400).json({ message: "Slot is not in a pending state" });
    }

    slot.status = "booked";
    await slot.save();

    if (io) {
      io.emit("slotConfirmed", { message: "Slot confirmed", slot });
    }

    res.status(200).json({ message: "Slot confirmed", slot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Free a slot
const freeSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    slot.status = "available";
    slot.user = null;
    await slot.save();

    if (io) {
      io.emit("slotFreed", { message: "Slot is now free", slot });
    }

    res.status(200).json({ message: "Slot is now free", slot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  setSocketIO,
  createSlots,
  getAvailableSlots,
  bookSlot,
  confirmBooking,
  freeSlot,
};