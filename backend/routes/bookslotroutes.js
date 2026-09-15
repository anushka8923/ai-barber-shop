const express = require("express");
const {
  createSlots,
  getAvailableSlots,
  bookSlot,
  confirmBooking,
  freeSlot,
} = require("../controllers/bookslot");

const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();
router.post("/create", verifyAdmin, createSlots);
router.get("/available", getAvailableSlots);
router.post("/book", bookSlot);
router.post("/confirm", verifyAdmin, confirmBooking);
router.post("/free", verifyAdmin, freeSlot);

module.exports = router;