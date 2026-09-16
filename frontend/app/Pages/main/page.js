"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDaysIcon, ClipboardDocumentIcon, UserCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import BackButton from "../../../components/BackButton";

const ServiceBookingPage = () => {
  const router = useRouter();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = [...Array(12)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(generated);
  }, []);

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center relative overflow-hidden p-4">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: `${p.x}%`,
              y: `${p.y}%`,
              scale: p.scale,
            }}
            animate={{
              x: ['0%', '100%', '0%'],
              y: ['0%', '100%', '0%'],
              transition: {
                duration: p.duration,
                repeat: Infinity,
                repeatType: 'loop'
              }
            }}
          />
        ))}
      </div>

      {/* Back Button on Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <BackButton targetPath="/PublicRoutes" />
      </div>

      {/* Admin Floating Button */}
      <motion.button
        className="fixed top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white py-2.5 px-4 rounded-full shadow-xl hover:bg-white/20 transition-all z-50"
        whileHover={{ scale: 1.05 }}
        onClick={() => handleRedirect("/admin/Auth")}
      >
        <UserCircleIcon className="w-5 h-5" />
        <span className="font-medium">Admin Dashboard</span>
        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
      </motion.button>

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
      >
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-sm"
          >
            <CalendarDaysIcon className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Professional Booking
            </h1>
            <p className="text-white/80 text-lg">
              Schedule your appointment with precision
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Steps Indicator */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className="h-2 w-12 bg-white/20 rounded-full"
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: step * 0.2 }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all"
              onClick={() => handleRedirect("/Pages/BookingForm")}
            >
              <ClipboardDocumentIcon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Booking Form
              </h3>
              <p className="text-white/60">
                Fill in details for personalized service
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-all"
              onClick={() => handleRedirect("/Pages/Bookslot")}
            >
              <CalendarDaysIcon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Time Slots
              </h3>
              <p className="text-white/60">
                Choose from available time slots
              </p>
            </motion.button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {['Instant Confirmation', '24/7 Support', 'Secure Payment'].map((feature) => (
              <div key={feature} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <span className="text-sm font-medium text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 text-center">
          <p className="text-white/50 text-sm">
            © 2024 ServiceBook Pro. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceBookingPage;