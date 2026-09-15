const mongoose = require('mongoose');

// Barber schema
const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  specialization: { type: String, required: true },
}, { timestamps: true });

const Barber = mongoose.model('Barber', barberSchema);

module.exports = Barber;
