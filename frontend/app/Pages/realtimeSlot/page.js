"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";

const RealTimeSlots = () => {
  const router = useRouter();
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io(backendUrl, { transports: ['polling', 'websocket'] });

    const fetchSlots = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/slots/available`);
        const data = await response.json();
        setSlots(data.slots || data.data || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
    socket.on("updateSlots", fetchSlots);

    return () => {
      socket.off("updateSlots", fetchSlots);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Live Slot Monitor
              </span>
            </h1>
            <p className="text-gray-600">Real-time availability status updates</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            onClick={() => router.push("/")}
          >
            <ClockIcon className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-gray-700">Slot Dashboard</span>
          </motion.button>
        </motion.div>

        {/* Slot Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-white/50 rounded-2xl shadow-md animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className={`group p-6 rounded-2xl backdrop-blur-sm border transition-all
                    ${slot.status === "available" 
                      ? "bg-green-50/80 border-green-200 hover:bg-green-100" 
                      : "bg-red-50/80 border-red-200 hover:bg-red-100"}`}>

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${
                        slot.status === "available" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-red-100 text-red-600"
                      }`}>
                        {slot.status === "available" ? (
                          <CheckCircleIcon className="h-8 w-8" />
                        ) : (
                          <XCircleIcon className="h-8 w-8" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{slot.time}</h3>
                        <p className={`text-sm font-medium ${
                          slot.status === "available" 
                            ? "text-green-700" 
                            : "text-red-700"
                        }`}>
                          {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <ClockIcon className="h-5 w-5" />
                      <span className="text-sm">Last updated: Just now</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && slots.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300">
              <XCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-xl">No slots available currently</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RealTimeSlots;