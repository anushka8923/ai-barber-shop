const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotcontrollers");

// Routes
router.get("/", slotController.getSlots);
router.post("/book", slotController.bookSlot);
router.patch("/confirm", slotController.confirmSlot);
router.patch("/complete", slotController.completeSlot);

module.exports = router;
