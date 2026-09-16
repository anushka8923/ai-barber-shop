"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const anushka = () => {
  // Different barber background images
  const barberImages = [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % barberImages.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [barberImages.length]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Main container with proper mobile padding */}
      <div className='px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12'>
        
        {/* Responsive flex container */}
        <div className='flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-16 max-w-7xl mx-auto'>
          
          {/* Image section - responsive sizing */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <div className="relative">
              <Image 
                src='https://demo.htmlcodex.com/2315/hair-salon-html-template/img/about.jpg'
                width={500}
                height={500}
                className='h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 
                          w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 
                          rounded-xl shadow-2xl object-cover'
                alt="Hair salon"
              />
              {/* Decorative overlay */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-600 rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full opacity-30"></div>
            </div>
          </div>
        
          {/* Enhanced text section with dynamic barber background */}
          <div 
            className='w-full lg:w-[650px] xl:w-[700px] relative rounded-2xl overflow-hidden shadow-2xl'
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.65)), url(${barberImages[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: 'all 0.8s ease-in-out',
              opacity: isVisible ? 1 : 0.8
            }}
          >
            {/* Content overlay with responsive padding */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              
              {/* About Us Button - Solid background as requested */}
              <div className="mb-6">
                <button className='px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 
                                 text-white rounded-lg hover:from-red-700 hover:to-red-800 
                                 transition-all duration-300 font-semibold text-sm sm:text-base
                                 shadow-lg transform hover:scale-105'>
                  About Us
                </button>
              </div>
              
              {/* Main heading - responsive text sizes */}
              <div className='mb-6'>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                             font-bold tracking-tight leading-tight text-white drop-shadow-2xl'>
                  MORE THAN JUST A HAIR CUT.
                </h1>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                             font-bold tracking-tight leading-tight text-white drop-shadow-2xl mt-2'>
                  LEARN MORE ABOUT US!
                </h1>
              </div>
             
              {/* Description paragraphs - responsive text and spacing */}
              <div className="space-y-4 mb-8">
                <p className='text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed 
                             drop-shadow-lg max-w-full lg:max-w-[580px]'>
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. 
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
                </p>
                
                <p className='text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed 
                             drop-shadow-lg max-w-full lg:max-w-[580px]'> 
                  Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. 
                  Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.
                </p>
              </div>
              
              {/* Stats section - responsive grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8'>
                <div className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-xl backdrop-blur-sm 
                               border border-white border-opacity-20 hover:bg-opacity-60 
                               transition-all duration-300">
                  <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg mb-2'>
                    SINCE 1990
                  </h2>
                  <p className='text-gray-200 text-sm sm:text-base leading-relaxed'>
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                  </p>
                </div>

                <div className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-xl backdrop-blur-sm 
                               border border-white border-opacity-20 hover:bg-opacity-60 
                               transition-all duration-300">
                  <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg mb-2'>
                    1000+ CLIENTS
                  </h2>
                  <p className='text-gray-200 text-sm sm:text-base leading-relaxed'>
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                  </p>
                </div>
              </div>

              {/* Image indicator dots - responsive positioning */}
              <div className="flex justify-center space-x-3 mt-6">
                {barberImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 
                              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                              ${currentImageIndex === index 
                                ? 'bg-red-600 shadow-lg' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                    onClick={() => {
                      setIsVisible(false);
                      setTimeout(() => {
                        setCurrentImageIndex(index);
                        setIsVisible(true);
                      }, 300);
                    }}
                    aria-label={`Switch to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white border-opacity-20 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-red-400 border-opacity-30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default anushka;
