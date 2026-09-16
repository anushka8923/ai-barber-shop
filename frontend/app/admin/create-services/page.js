'use client';

import { useState } from "react";
import axios from "axios";

const ServiceForm = ({ fetchServices }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${backendUrl}/api/services`, {
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration, 10), // Explicit base 10 for parsing
      });
      if (fetchServices) {
        fetchServices(); // Call fetchServices if it's passed as a prop
      }
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto my-8 border rounded-xl shadow-md space-y-4 bg-white">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add New Service</h2>
      </div>
      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Duration (in minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        {isSubmitting ? "Submitting..." : "Add Service"}
      </button>
    </form>
  );
};

export default ServiceForm;
