'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { ClipboardDocumentIcon, UserCircleIcon, EnvelopeIcon, CalendarIcon, SparklesIcon } from "@heroicons/react/24/outline";
import BackButton from "../../../components/BackButton";

const BookingForm = () => {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";
  // State for the form
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [userId, setUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch services when the component mounts concurrently
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [servicesRes] = await Promise.all([
          axios.get(`${backendUrl}/api/services`),
        ]);
        setServices(servicesRes.data.data || servicesRes.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, [backendUrl]);

  // Handle form submission
  const handleBooking = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${backendUrl}/api/bookings`, {
        serviceId: selectedService,
        customerName,
        customerEmail,
        bookingDate,
      });

      setUserId(response.data.userId || response.data.data?.userId);
    } catch (error) {
      console.error("Error booking service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: ['0%', '100%', '0%'],
              y: ['0%', '100%', '0%'],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'loop'
              }
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <BackButton />
      </div>

      {/* Services Button */}
      <motion.button
        className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white py-2.5 px-4 rounded-full shadow-xl hover:bg-white/20 transition-all z-50"
        whileHover={{ scale: 1.05 }}
        onClick={() => router.push("serviceList")}
      >
        <SparklesIcon className="w-5 h-5" />
        <span className="font-medium">View Services</span>
      </motion.button>

      {/* Main Form Card */}
      <motion.div
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Form Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-6"
          >
            <ClipboardDocumentIcon className="w-12 h-12 text-purple-400 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Professional Booking
          </h1>
          <p className="text-white/60 text-lg">
            Fill in details to schedule your appointment
          </p>
        </div>

        <form onSubmit={handleBooking} className="space-y-8">
          {/* Service Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <label className="block text-sm font-medium text-white/80 mb-3">
              Select Service
            </label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all appearance-none"
                required
              >
                <option value="" className="bg-slate-800">-- Choose a Service --</option>
                {services.map((service) => (
                  <option
                    key={service._id}
                    value={service._id}
                    className="bg-slate-800 text-white"
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Customer Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-white/80 mb-3">
              Your Name
            </label>
            <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/30 transition-all">
              <UserCircleIcon className="w-5 h-5 text-white/50 mr-3" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/30 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
          </motion.div>

          {/* Customer Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-white/80 mb-3">
              Your Email
            </label>
            <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/30 transition-all">
              <EnvelopeIcon className="w-5 h-5 text-white/50 mr-3" />
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/30 focus:outline-none"
                placeholder="john@example.com"
                required
              />
            </div>
          </motion.div>

          {/* Booking Date */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-white/80 mb-3">
              Booking Date
            </label>
            <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400/30 transition-all">
              <CalendarIcon className="w-5 h-5 text-white/50 mr-3" />
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-transparent text-white [&::-webkit-calendar-picker-indicator]:invert-[0.8] focus:outline-none"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-6"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'}`}
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </button>
          </motion.div>
        </form>

        {/* Success Message */}
        {userId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-green-400">Booking Confirmed!</h3>
                <p className="text-green-300 text-sm mt-1">
                  Your User ID: <span className="font-mono text-green-200">{userId}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingForm;