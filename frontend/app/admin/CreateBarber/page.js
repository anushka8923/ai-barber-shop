'use client';
import React, { useState, useEffect } from 'react';

const BarberCrud = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [barberIdToDelete, setBarberIdToDelete] = useState('');
  const [barbers, setBarbers] = useState([]);

  // Fetch all barbers
  const fetchBarbers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/barbers`);
      const data = await response.json();
      setBarbers(data.data || data.barbers || []);
    } catch (error) {
      console.error('Error fetching barbers:', error);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  // Handle Barber creation
  const handleCreateBarber = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/barbers/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, experience, specialization }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Barber created successfully');
        setName('');
        setExperience('');
        setSpecialization('');
        if (data.barber) {
          setBarbers((prev) => [...prev, data.barber]);
        }
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating barber:', error);
    }
  };

  // Handle Barber deletion
  const handleDeleteBarber = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/barbers/${barberIdToDelete}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        alert('Barber deleted successfully');
        const deletedId = barberIdToDelete;
        setBarberIdToDelete('');
        setBarbers((prev) => prev.filter((b) => b._id !== deletedId));
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting barber:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Barber Management</h1>

      {/* Create Barber Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Barber</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Experience (in years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateBarber}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Barber
        </button>
      </div>

      {/* List of Barbers */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">All Barbers</h2>
        <ul className="divide-y divide-gray-200">
          {barbers.map((barber) => (
            <li key={barber._id} className="py-2">
              <span className="text-gray-800 font-medium">{barber.name}</span> -{' '}
              <span className="text-gray-600">{barber.specialization}</span>{' '}
              <span className="text-gray-400 text-sm">(ID: {barber._id})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Delete Barber Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Delete Barber</h2>
        <input
          type="text"
          placeholder="Barber ID to delete"
          value={barberIdToDelete}
          onChange={(e) => setBarberIdToDelete(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleDeleteBarber}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Delete Barber
        </button>
      </div>
    </div>
  );
};

export default BarberCrud;
