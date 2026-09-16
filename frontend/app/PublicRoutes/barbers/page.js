import React from 'react'
import Image from 'next/image'

// Social Media Icons Components
const TwitterIcon = () => (
  <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>
  </svg>
)

const PhoneIcon = () => (
  <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/>
  </svg>
)

const GmailIcon = () => (
  <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'/>
  </svg>
)

// Enhanced Barber Card Component with Better Animations
const BarberCard = ({ imageUrl, name, designation, index }) => {
  return (
    <div className={`group relative w-80 mx-auto lg:mx-0 transform transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl`} 
         style={{ animationDelay: `${index * 150}ms` }}>
      
      {/* Card Container with Shadow */}
      <div className='bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden'>
        
        {/* Image Container with Overlay */}
        <div className='relative overflow-hidden'>
          <Image 
            src={imageUrl} 
            alt={name}
            width={320}
            height={384}
            className='h-96 w-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110'
          />
          
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          
          {/* Social Media Icons Overlay */}
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0'>
            <div className='flex gap-4'>
              
              {/* Twitter Icon */}
              <div className='h-14 w-14 bg-white hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg'>
                <TwitterIcon />
              </div>
              
              {/* Phone Icon */}
              <div className='h-14 w-14 bg-white hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg'>
                <PhoneIcon />
              </div>
              
              {/* Gmail Icon */}
              <div className='h-14 w-14 bg-white hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg'>
                <GmailIcon />
              </div>
            </div>
          </div>
          
          {/* Animated Border */}
          <div className='absolute inset-0 border-4 border-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        
        {/* Name Card with Enhanced Styling */}
        <div className='bg-[#191c24] h-28 w-80 flex flex-col justify-center items-center text-white relative overflow-hidden'>
          
          {/* Background Pattern */}
          <div className='absolute inset-0 opacity-10'>
            <div className='w-full h-full bg-gradient-to-r from-red-700/20 to-transparent'></div>
          </div>
          
          <h1 className='text-xl font-bold tracking-tight z-10 transform transition-transform duration-300 group-hover:scale-105'>
            {name}
          </h1>
          <div className='w-16 h-1 bg-red-700 my-2 transform transition-all duration-300 group-hover:w-24 z-10'></div>
          <h2 className='text-red-700 text-sm font-medium tracking-wider uppercase z-10'>
            {designation}
          </h2>
        </div>
      </div>
    </div>
  )
}

const page = () => {
  const barbersData = [
    {
      name: "ALEX JOHNSON",
      designation: "Senior Barber",
      imageUrl: "https://demo.htmlcodex.com/2315/hair-salon-html-template/img/team-1.jpg"
    },
    {
      name: "MICHAEL BROWN", 
      designation: "Hair Stylist",
      imageUrl: "https://demo.htmlcodex.com/2315/hair-salon-html-template/img/team-2.jpg"
    },
    {
      name: "DAVID WILSON",
      designation: "Master Barber", 
      imageUrl: "https://demo.htmlcodex.com/2315/hair-salon-html-template/img/team-3.jpg"
    },
    {
      name: "JAMES DAVIS",
      designation: "Beard Specialist",
      imageUrl: "https://demo.htmlcodex.com/2315/hair-salon-html-template/img/team-4.jpg"
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      
      {/* Enhanced Header Section */}
      <div className='relative text-center pt-20 pb-20 overflow-hidden'>
        
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='w-full h-full bg-gradient-to-br from-red-700 to-gray-900'></div>
        </div>
        
        <div className='relative z-10'>
          {/* Tag */}
          <div className='inline-block mb-8 transform hover:scale-105 transition-transform duration-300'>
            <h1 className='text-red-700 bg-[#191c24] h-12 px-8 flex items-center justify-center text-sm font-bold tracking-wider uppercase shadow-lg'>
              Our Expert Team
            </h1>
          </div>
          
          {/* Main Title */}
          <div className='space-y-4'>
            <h1 className='text-4xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight'>
              MEET OUR <span className='text-red-700 relative'>
                PROFESSIONAL
                <div className='absolute -bottom-2 left-0 right-0 h-1 bg-red-700 transform scale-x-0 hover:scale-x-100 transition-transform duration-500'></div>
              </span>
            </h1>
            <h2 className='text-3xl lg:text-5xl font-bold text-gray-800'>
              BARBER TEAM
            </h2>
          </div>
          
          {/* Subtitle */}
          <p className='text-gray-600 mt-8 text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed'>
            Experienced professionals dedicated to giving you the perfect cut, style, and grooming experience
          </p>
          
          {/* Decorative Line */}
          <div className='flex items-center justify-center mt-12 space-x-4'>
            <div className='w-20 h-1 bg-red-700'></div>
            <div className='w-3 h-3 bg-red-700 rotate-45'></div>
            <div className='w-20 h-1 bg-red-700'></div>
          </div>
        </div>
      </div>

      {/* Enhanced Barbers Grid */}
      <div className='px-4 lg:px-24 pb-24'>
        {barbersData.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md max-w-md mx-auto">
            <p className="text-gray-700 text-lg font-medium">No barbers listed right now.</p>
            <p className="text-gray-500 text-sm mt-1">Please check back soon!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-8 place-items-center'>
            {barbersData.map((barber, index) => (
              <BarberCard
                key={index}
                name={barber.name}
                designation={barber.designation}
                imageUrl={barber.imageUrl}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      
    </div>
  )
}

export default page
