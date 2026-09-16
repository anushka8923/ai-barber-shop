'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, CurrencyRupeeIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/services`);
      setServices(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Premium Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience excellence with our curated collection of professional services
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-white/50 rounded-2xl shadow-lg animate-pulse"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md mx-auto">
            <SparklesIcon className="h-12 w-12 text-indigo-400 mx-auto mb-3" />
            <p className="text-gray-700 text-lg font-medium">No services available right now.</p>
            <p className="text-gray-500 text-sm mt-1">Please check back later.</p>
          </div>
        ) : (
          <motion.ul
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.li
                  key={service._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <motion.div
                    className="h-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="p-4 bg-indigo-100 rounded-xl">
                        <SparklesIcon className="h-8 w-8 text-indigo-600" />
                      </div>
                      <h3 className="ml-4 text-2xl font-bold text-gray-900">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <CurrencyRupeeIcon className="h-6 w-6 text-green-600" />
                        <span className="text-xl font-bold text-gray-900">
                          {service.price}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-6 w-6 text-blue-600" />
                        <span className="text-gray-600 font-medium">
                          {service.duration}m
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}