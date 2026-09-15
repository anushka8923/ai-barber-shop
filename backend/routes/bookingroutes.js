const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/bookingmodel");

const router = express.Router();

// Route to create a booking
router.post("/", async (req, res) => {
  const { serviceId, customerName, customerEmail, bookingDate } = req.body;

  const userId = new mongoose.Types.ObjectId().toString();

  const booking = new Booking({
    service: serviceId,
    customerName,
    customerEmail,
    bookingDate,
    userId,
  });

  try {
    const savedBooking = await booking.save();
    res.status(201).json({ success: true, message: "Booking created successfully", data: savedBooking, userId, ...savedBooking.toObject() });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to save booking", data: null, error: error.message });
  }
});

// Route to get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("service", "name price")
      .select("customerName customerEmail bookingDate service userId")
      .lean()
      .limit(100);
    res.status(200).json({ success: true, message: "Bookings fetched successfully", data: bookings, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings", data: null, error: error.message });
  }
});

module.exports = router;
