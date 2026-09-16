"use client";

import React, { useState, useEffect } from "react";
import BackButton from "../../../components/BackButton";

const CreateSlot = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5080";
  const [time, setTime] = useState("");
  const [barberId, setBarberId] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch barbers from backend
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/barbers`);
        const data = await response.json();
        setBarbers(data.data || data.barbers || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching barbers:", error);
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  const handleCreateSlot = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/slots/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time, barberId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Slot created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="text-xl font-bold">Create a Slot</h1>
        <BackButton targetPath="/admin/AllButton" />
      </div>
      <input
        type="text"
        placeholder="Enter Time (e.g., 10:00 AM)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 mb-4 block w-full"
      />
      <select
        value={barberId}
        onChange={(e) => setBarberId(e.target.value)}
        className="border p-2 mb-4 block w-full"
        disabled={loading}
      >
        <option value="">{loading ? "Loading barbers..." : "Select Barber"}</option>
        {barbers && barbers.length > 0 ? (
          barbers.map((barber) => (
            <option key={barber._id} value={barber._id}>
              {barber.name}
            </option>
          ))
        ) : (
          !loading && <option value="">No barbers available</option>
        )}
      </select>
      <button
        onClick={handleCreateSlot}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Slot
      </button>
    </div>
  );
};

export default CreateSlot;
