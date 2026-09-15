const express = require("express");
const router = express.Router();
const Service = require("../models/servicemodel");

const verifyAdmin = require("../middleware/verifyAdmin");

// CRUD operations
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, message: "Services fetched successfully", data: services, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    if (!name || !description || !price || !duration) {
      return res.status(400).json({ success: false, message: "All fields are required", data: null });
    }

    const service = new Service({ name, description, price, duration });
    const savedService = await service.save();
    res.status(201).json({ success: true, message: "Service created successfully", data: savedService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, price, duration },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Service deleted successfully", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
});

module.exports = router;
