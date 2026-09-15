const express = require('express');
const {
  createBarber,
  getAllBarbers,
  getBarberById,
  updateBarber,
  deleteBarber,
} = require('../controllers/barber');

const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

// Create Barber (Admin only)
router.post('/create', verifyAdmin, createBarber);

// Get All Barbers (Public)
router.get('/', getAllBarbers);

// Get Barber by ID (Public)
router.get('/:id', getBarberById);

// Update Barber (Admin only)
router.put('/:id', verifyAdmin, updateBarber);

// Delete Barber (Admin only)
router.delete('/:id', verifyAdmin, deleteBarber);

module.exports = router;
