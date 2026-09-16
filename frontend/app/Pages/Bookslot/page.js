'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { ClockIcon, UserCircleIcon, TicketIcon } from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";
import BackButton from "../../../components/BackButton";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";

const RealTimeSlots = () => {
  const router = useRouter();
  const [slots, setSlots] = useState([]);
  const [userId, setUserId] = useState(""); // ✅ Re-added User ID field
  const [isLoading, setIsLoading] = useState(true);
  const [bookingSlot, setBookingSlot] = useState(null);

  // Fetch available slots on load
  useEffect(() => {
    const socket = io(backendUrl, { transports: ['polling', 'websocket'] });

    const fetchSlots = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/slots/available`);
        const data = await response.json();
        setSlots(Array.isArray(data) ? data : data.slots || data.data || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();

    // Real-time slot updates from the server
    socket.on("updateSlots", (updatedSlots) => {
      setSlots(Array.isArray(updatedSlots) ? updatedSlots : []);
    });

    return () => {
      socket.off("updateSlots");
      socket.disconnect();
    };
  }, []);

  // ✅ Non-blocking email confirmation via EmailJS with 5s timeout wrapper
  const sendEmailConfirmation = async (slotTime) => {
    const templateParams = {
      to_name: "User",
      user_email: localStorage.getItem("userEmail") || "",
      message: `Your slot at ${slotTime} has been successfully booked!`,
    };

    const emailPromise = emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("EmailJS network timeout (5s exceeded)")), 5000)
    );

    try {
      const response = await Promise.race([emailPromise, timeoutPromise]);
      console.log("Email sent successfully!", response.status, response.text);
    } catch (error) {
      console.error("Non-blocking email confirmation notice:", error.message || error);
    }
  };

  // ✅ Handle slot booking immediately without blocking UI on email response
  const handleBookSlot = async (slotId, slotTime) => {
    if (!userId.trim()) {
      alert("Please enter a valid User ID");
      return;
    }

    setBookingSlot(slotId);

    try {
      const response = await fetch(`${backendUrl}/api/slots/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        // Show success confirmation immediately (0ms delay)
        // Fire-and-forget: do not await email send
        sendEmailConfirmation(slotTime);
      } else {
        alert(data.message || "Failed to book slot");
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    } finally {
      setTimeout(() => setBookingSlot(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 p-8 relative">
      {bookingSlot && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Booking Confirmed! 🎉
        </motion.div>
      )}

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <BackButton />
      </div>

      <motion.button
        className="fixed top-6 right-6 bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-xl shadow-2xl hover:bg-white/20 flex items-center gap-2"
        onClick={() => router.push("/Pages/realtimeSlot")}
        whileHover={{ scale: 1.05 }}
      >
        <TicketIcon className="h-6 w-6" />
        View All Slots
      </motion.button>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Real-Time Booking
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Instant updates and seamless reservations
          </p>
        </motion.div>

        {/* ✅ User ID Input Field */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Enter Your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-64 p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {slots.map((slot, index) => (
                <motion.div
                  key={slot._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <div className="p-6 rounded-xl backdrop-blur-sm border transition-all bg-green-900/20 border-green-400/20 hover:bg-green-900/30">
                    <div className="flex items-center gap-4 mb-4">
                      <ClockIcon className="h-6 w-6 text-green-400" />
                      <h3 className="text-xl font-semibold text-white">{slot.time}</h3>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleBookSlot(slot._id, slot.time)}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Reserve Slot
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RealTimeSlots;
