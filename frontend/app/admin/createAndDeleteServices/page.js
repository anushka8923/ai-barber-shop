'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Next.js router for navigation

const ServicesPage = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const router = useRouter(); // Initialize router

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/services`);
      setServices(response.data.data || response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/services`, formData);
      fetchServices();
      setFormData({ name: "", description: "", price: "", duration: "" });
      alert("Service added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-16">
      <h1 className="text-3xl font-bold mb-6">Services</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-lg shadow-lg border"
          >
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="mb-2 text-gray-700">{service.description}</p>
            <p className="mb-2">Price: <span className="font-bold">₹{service.price}</span></p>
            <p className="mb-4">Duration: {service.duration} minutes</p>
            <button
              onClick={() => handleDelete(service._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
