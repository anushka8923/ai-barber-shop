const Barber = require('../models/barber');

// Create Barber
exports.createBarber = async (req, res) => {
  try {
    const { name, experience, specialization } = req.body;

    const newBarber = new Barber({ name, experience, specialization });
    await newBarber.save();

    res.status(201).json({ success: true, message: 'Barber created successfully', data: newBarber, barber: newBarber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// Get All Barbers
exports.getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find().select("name experience specialization").lean();
    res.status(200).json({ success: true, message: 'Barbers fetched successfully', data: barbers, barbers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// Get Barber by ID
exports.getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) return res.status(404).json({ success: false, message: 'Barber not found', data: null });

    res.status(200).json({ success: true, message: 'Barber fetched successfully', data: barber, barber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// Update Barber
exports.updateBarber = async (req, res) => {
  try {
    const { name, experience, specialization } = req.body;
    const updatedBarber = await Barber.findByIdAndUpdate(
      req.params.id,
      { name, experience, specialization },
      { new: true }
    );
    
    if (!updatedBarber) return res.status(404).json({ success: false, message: 'Barber not found', data: null });

    res.status(200).json({ success: true, message: 'Barber updated successfully', data: updatedBarber, barber: updatedBarber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// Delete Barber
exports.deleteBarber = async (req, res) => {
  try {
    const Slot = require('../models/slot');
    const activeSlots = await Slot.find({ barber: req.params.id, status: { $in: ['pending', 'booked'] } });
    if (activeSlots && activeSlots.length > 0) {
      return res.status(400).json({ success: false, message: 'Cannot delete barber with active bookings/slots', data: null });
    }

    const deletedBarber = await Barber.findByIdAndDelete(req.params.id);
    if (!deletedBarber) return res.status(404).json({ success: false, message: 'Barber not found', data: null });

    res.status(200).json({ success: true, message: 'Barber deleted successfully', data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};
