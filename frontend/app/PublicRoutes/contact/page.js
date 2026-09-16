'use client'
import React, { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4'>
      
      {/* Main Container */}
      <div className='w-full max-w-4xl mx-auto'>
        
        {/* Contact Form Card */}
        <div className='bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700'>
          
          {/* Header Section */}
          <div className='px-8 py-12 lg:px-16 lg:py-16'>
            
            {/* Contact Us Tag */}
            <div className='mb-8'>
              <span className='inline-block bg-black text-red-700 px-6 py-3 text-sm font-bold tracking-wider uppercase border border-gray-600'>
                Contact Us
              </span>
            </div>
            
            {/* Main Title */}
            <div className='mb-12'>
              <h1 className='text-3xl lg:text-5xl font-bold text-white leading-tight mb-4'>
                HAVE ANY QUERY? PLEASE
              </h1>
              <h2 className='text-3xl lg:text-5xl font-bold text-white leading-tight'>
                CONTACT US
              </h2>
            </div>
            
            {/* Success Message */}
            {isSuccess && (
              <div className='mb-8 p-4 bg-green-900/50 border border-green-700 rounded-lg'>
                <p className='text-green-400 text-center font-medium'>
                  ✓ Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              
              {/* Name and Email Row */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                
                {/* Name Input */}
                <div className='space-y-2'>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Your Name'
                    className={`w-full px-6 py-4 bg-gray-700 border-2 ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    } text-white placeholder-gray-400 focus:outline-none focus:border-red-700 focus:bg-gray-600 transition-all duration-300 text-lg`}
                  />
                  {errors.name && (
                    <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
                  )}
                </div>
                
                {/* Email Input */}
                <div className='space-y-2'>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter Your Email'
                    className={`w-full px-6 py-4 bg-gray-700 border-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } text-white placeholder-gray-400 focus:outline-none focus:border-red-700 focus:bg-gray-600 transition-all duration-300 text-lg`}
                  />
                  {errors.email && (
                    <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
                  )}
                </div>
              </div>
              
              {/* Message Textarea */}
              <div className='space-y-2'>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Message'
                  rows='6'
                  className={`w-full px-6 py-4 bg-gray-700 border-2 ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  } text-white placeholder-gray-400 focus:outline-none focus:border-red-700 focus:bg-gray-600 transition-all duration-300 resize-none text-lg`}
                />
                {errors.message && (
                  <p className='text-red-400 text-sm mt-1'>{errors.message}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className={`w-full py-4 px-8 text-white font-bold text-lg uppercase tracking-wider transition-all duration-300 transform ${
                    isLoading
                      ? 'bg-red-600/50 cursor-not-allowed'
                      : 'bg-red-700 hover:bg-red-800 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]'
                  }`}
                >
                  {isLoading ? (
                    <div className='flex items-center justify-center space-x-3'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  )
}
export default ContactPage
