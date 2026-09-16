import React from 'react';
import ServiceCard from '../../../components/servicelist'; // Reusable card component ko import kiya

// --- Har service ke liye SVG Icons ---
// Humne images ko SVG se replace kar diya hai, yeh hamesha load honge.
const icons = {
  haircut: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.63 2.59a2.3 2.3 0 0 1 2.74 2.74l-1.34 6.7a2.3 2.3 0 0 1-4.16 2.1l-2.42-4.84a2.3 2.3 0 0 1 2.1-4.16l3.09.46Z"/><path d="m5.21 8.44-1.82-1.82a1.6 1.6 0 0 1 0-2.26l.48-.48a1.6 1.6 0 0 1 2.26 0l1.82 1.82"/><path d="m10.15 3.53 1.82 1.82a1.6 1.6 0 0 1 0 2.26l-.48.48a1.6 1.6 0 0 1-2.26 0l-1.82-1.82"/><path d="M12 22v-4"/><path d="M8 22v-4"/><path d="M16 22v-4"/></svg>,
  beard: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6"/><path d="M14 13v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3"/><path d="M15 5a2 2 0 0 0-4 0"/><path d="M8 5a2 2 0 0 1 4 0"/></svg>,
  shave: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19.65 19.65 17 21l-2.04-2.04"/><path d="M15.68 18.32 14 20l-1.32-1.32"/><path d="m7 7 2-2"/><path d="m14 7 2-2"/><path d="m7 14 2-2"/><path d="M3.7 13.2a3.8 3.8 0 0 1 3.8-3.8h.4c1 .6 2.2 1 3.6 1s2.6-.4 3.6-1h.4a3.8 3.8 0 0 1 3.8 3.8v.4c-.6 1-1 2.2-1 3.6s.4 2.6 1 3.6v.4a3.8 3.8 0 0 1-3.8 3.8h-.4a8.5 8.5 0 0 1-7.2 0h-.4a3.8 3.8 0 0 1-3.8-3.8v-.4a8.5 8.5 0 0 1 0-7.2v-.4Z"/></svg>,
  dye: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 2.5a2.4 2.4 0 0 1 3 2.4 2.4 2.4 0 0 1-3 2.4V2.5Z"/><path d="M8.5 10.5a2.4 2.4 0 0 1 3 2.4 2.4 2.4 0 0 1-3 2.4v-4.8Z"/><path d="M8.5 18.5a2.4 2.4 0 0 1 3 2.4 2.4 2.4 0 0 1-3 2.4v-4.8Z"/><path d="M17 4.5H8.5"/><path d="M17 12.5H8.5"/><path d="M17 20.5H8.5"/></svg>,
  mustache: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15a6 6 0 0 0-6-6 6 6 0 0 0-6 6"/><path d="M22 15v1a2 2 0 0 1-2 2h-1a2 2 0 0 0-2-2"/><path d="M2 15v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2-2"/></svg>,
  stacking: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2.5 7v10L12 22l9.5-5V7Z"/><path d="m2.5 7 9.5 5.25"/><path d="m21.5 7-9.5 5.25"/><path d="M12 22V12.25"/></svg>
};

// --- Service Data ---
// Ab nayi service add karna bahut aasan hai, bas is array mein ek aur object daal dein.
const servicesData = [
  {
    icon: icons.haircut,
    title: 'HAIRCUT',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.',
    price: 'From ₹15',
  },
  {
    icon: icons.beard,
    title: 'BEARD TRIM',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.',
    price: 'From ₹15',
  },
  {
    icon: icons.shave,
    title: 'MANS SHAVE',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.',
    price: 'From ₹15',
  },
  {
    icon: icons.dye,
    title: 'HAIR DYEING',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.',
    price: 'From ₹15',
  },
  {
    icon: icons.mustache,
    title: 'MUSTACHE',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.',
    price: 'From ₹15',
  },
  {
    icon: icons.stacking,
    title: 'STACKING',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.',
    price: 'From ₹15',
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        
        {/* Page Title Section */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold text-lg tracking-wider">SERVICES</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2">WHAT WE PROVIDE</h1>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              price={service.price}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;