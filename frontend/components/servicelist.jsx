import React from 'react';

const ServiceCard = ({ icon, title, description, price }) => {
  return (
    // Card container with hover effect
    <div className="bg-[#191c24] p-8 rounded-lg shadow-lg flex gap-6 transition-transform duration-300 hover:scale-105 hover:shadow-red-900/50">
      
      {/* Icon */}
      <div className="text-red-600">
        {icon}
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-gray-400 mt-2 flex-grow">{description}</p>
        <p className="text-red-600 text-2xl font-bold mt-4">{price}</p>
      </div>

    </div>
  );
};

export default ServiceCard;
