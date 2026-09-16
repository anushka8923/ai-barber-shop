import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div>
        <div className='flex-col lg:flex-row flex items-center lg:items-start pl-2 lg:pl-32 pt-24 gap-4 lg:gap-0'>
          {/* Price Section */}
          <div className='h-auto lg:h-[700px] w-full lg:w-[640px] bg-[#191c24] text-white p-8 rounded-lg lg:rounded-none'>
            <div className='pt-16 lg:pt-32'>
              <h1 className='text-red-700 bg-black h-9 w-32 pt-1 pl-3 text-sm font-medium'>Price & Plan</h1>
              <h1 className='text-2xl lg:text-4xl font-semibold tracking-tighter pt-6 leading-tight'>CHECK OUT OUR BARBER</h1>
              <h1 className='text-2xl lg:text-4xl font-semibold tracking-tighter pt-2 leading-tight'>Services AND PRICES</h1>
            </div>
            
            {/* Services List */}
            <div className='pt-8 space-y-4'>
              <div className='flex justify-between items-center text-lg font-semibold border-b border-gray-600 pb-2'>
                <h1>HAIRCUT</h1>
                <p className='text-red-400'>200</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold border-b border-gray-600 pb-2'>
                <h1>Beard Trim</h1>
                <p className='text-red-400'>100</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold border-b border-gray-600 pb-2'>
                <h1>Mans Shave</h1>
                <p className='text-red-400'>100</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold border-b border-gray-600 pb-2'>
                <h1>Hair Dyeing</h1>
                <p className='text-red-400'>200</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold border-b border-gray-600 pb-2'>
                <h1>Mustache</h1>
                <p className='text-red-400'>150</p>
              </div>

              <div className='flex justify-between items-center text-lg font-semibold border-b border-gray-600 pb-2'>
                <h1>Stacking</h1>
                <p className='text-red-400'>200</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className='w-full lg:w-auto'>
            <Image 
              src='https://demo.htmlcodex.com/2315/hair-salon-html-template/img/price.jpg' 
              alt='Barber Services'
              width={640}
              height={700}
              className='h-[400px] lg:h-[700px] w-full lg:w-[640px] object-cover rounded-lg lg:rounded-none'
            />
          </div>
        </div>
    </div>
  )
}

export default page
