'use client'
import React from 'react'
import About from './about/page'
import Service from './services/page'
import Price from './pricing/page'
import Barber from './barbers/page'
import Contact from './contact/page'

const page = () => {
  return (
    <div>
    <About/>
    <Service/>
    <Price/>
    <Barber/>
    <Contact/>
    </div>
  )
}

export default page