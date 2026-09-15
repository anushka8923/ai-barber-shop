const Slot = require("../models/bookslotmodel");

// Fetch all slots
exports.getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    next(error);
  }
};

// Book a slot
exports.bookSlot = async (req, res, next) => {
  try {
    const { slotId, userId } = req.body;
    const slot = await Slot.findById(slotId);

    if (slot.status !== "available") {
      return res.status(400).json({ message: "Slot is not available" });
    }

    slot.status = "pending";
    slot.bookedBy = userId;
    await slot.save();

    res.json({ message: "Slot booked and awaiting admin approval", slot });
  } catch (error) {
    next(error);
  }
};

// Confirm a slot
exports.confirmSlot = async (req, res, next) => {
  try {
    const { slotId } = req.body;
    const slot = await Slot.findByIdAndUpdate(slotId, { status: "booked" }, { new: true });

    res.json({ message: "Slot confirmed", slot });
  } catch (error) {
    next(error);
  }
};

// Complete a slot
exports.completeSlot = async (req, res, next) => {
  try {
    const { slotId } = req.body;
    const slot = await Slot.findByIdAndUpdate(
      slotId,
      { status: "available", bookedBy: null },
      { new: true }
    );

    res.json({ message: "Slot is now available", slot });
  } catch (error) {
    next(error);
  }
};
