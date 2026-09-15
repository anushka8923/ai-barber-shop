const express = require("express");
const cors = require("cors"); // Add this for CORS
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const barberRoutes = require('./routes/barberroutes');
const slotRoutes = require("./routes/bookslotroutes");
const ServiceRoutes = require("./routes/serviceroutes");
const BookingRoutes = require("./routes/bookingroutes");
const errorHandler = require("./middleware/errorhandler");
const initializeSocket = require("./utils/socket");

dotenv.config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5080;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.use('/api/barbers', barberRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/services", ServiceRoutes);
app.use("/api/bookings", BookingRoutes);


// Error Handling Middleware
app.use(errorHandler);


// Server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Initialize Socket.IO
initializeSocket(server);
