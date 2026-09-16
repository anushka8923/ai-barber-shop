"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Admin123";

  // Redirect if already authenticated
  useEffect(() => {
    if (document.cookie.includes("adminToken=true") || localStorage.getItem("isAdmin") === "true") {
      document.cookie = "adminToken=true; path=/; max-age=86400";
      router.push("/admin/AllButton");
    }
  }, [router]);

  const handleLogin = () => {
    if (password === adminPassword || password === "Admin123") {
      localStorage.setItem("isAdmin", "true");
      document.cookie = "adminToken=true; path=/; max-age=86400";
      router.push("/admin/AllButton");
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const errorVariants = {
    shake: {
      x: [0, -20, 20, -10, 10, 0],
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          key="admin-login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full max-w-md"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10"
          >
            <motion.div
              variants={childVariants}
              className="flex flex-col items-center mb-8"
            >
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-4 rounded-2xl mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
                Restricted Access
              </h1>
            </motion.div>

            <motion.div variants={childVariants}>
              <motion.div
                animate={error ? "shake" : "visible"}
                variants={errorVariants}
              >
                <input
                  type="password"
                  placeholder="Authorization Key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={childVariants}>
              <motion.button
                onClick={handleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Verify Identity
              </motion.button>
              <p className="text-gray-400 text-xs text-center mt-3">Testing Key: Admin123</p>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-6 text-gray-300 text-sm"
          >
            Unauthorized access prohibited. All activities are monitored.
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminLogin;