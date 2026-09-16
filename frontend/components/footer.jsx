import React from 'react';
import Link from 'next/link';

// --- Icons for contact and social media ---
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;

const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-red-600 transition-colors"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.23v2.355H7.332v3.209h2.753v8.196h3.312z"></path></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-red-600 transition-colors"><path d="M16.023 18.237c.013.16.013.321.013.483 0 4.939-3.764 10.641-10.64 10.641-2.112 0-4.078-.618-5.732-1.681.292.034.587.051.886.051 1.754 0 3.368-.598 4.658-1.614a3.744 3.744 0 0 1-3.495-2.59c.23.042.467.065.71.065.362 0 .71-.048 1.045-.139a3.74 3.74 0 0 1-2.998-3.666v-.048c.532.295 1.14.473 1.785.493a3.74 3.74 0 0 1-1.758-3.11c0-.685.184-1.326.498-1.86a10.604 10.604 0 0 0 7.684 3.895 3.74 3.74 0 0 1 6.37-3.414 7.485 7.485 0 0 0 2.365-.902 3.75 3.75 0 0 1-1.637 2.06 7.43 7.43 0 0 0 2.14-.584 7.545 7.545 0 0 1-1.857 1.928z"></path></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-red-600 transition-colors"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><path d="M16.949 6.885a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25z"></path><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.627A9.627 9.627 0 1 1 21.627 12 9.638 9.638 0 0 1 12 21.627z"></path></svg>;

const Footer = () => {
  return (
    <footer className="bg-[#191c24] text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About & Socials */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-red-600 mb-4">HAIRCUT</h2>
            <p className="text-sm mb-6">Experience the art of grooming. Our professional barbers are dedicated to making you look and feel your best.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group" aria-label="Twitter"><TwitterIcon /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b-2 border-red-600 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-red-600 transition-colors duration-300">About Us</Link></li>
              <li><Link href="/services" className="hover:text-red-600 transition-colors duration-300">Our Services</Link></li>
              <li><Link href="/pricing" className="hover:text-red-600 transition-colors duration-300">Pricing Plans</Link></li>
              <li><Link href="/barbers" className="hover:text-red-600 transition-colors duration-300">Meet The Team</Link></li>
              <li><Link href="/contact" className="hover:text-red-600 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
             <h3 className="text-xl font-semibold text-white mb-6 border-b-2 border-red-600 pb-2 inline-block">Contact Us</h3>
             <ul className="space-y-4">
                <li className="flex items-start"><LocationIcon /><span>273016 Uttar Pradesh, India</span></li>
                <li className="flex items-start"><PhoneIcon /><span>+91 9336XXXXXX</span></li>
                <li className="flex items-start"><EmailIcon /><span>anuuu8077@gmail.com</span></li>
             </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b-2 border-red-600 pb-2 inline-block">Newsletter</h3>
            <p className="mb-4 text-sm">Subscribe to our newsletter to get the latest updates and special offers.</p>
            <form>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button 
                  type="submit" 
                  className="bg-red-600 text-white font-bold px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors"
                >
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-6 text-center md:flex md:justify-between">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Haircut. All Rights Reserved.</p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Developed by <a href="#" className="text-red-600 hover:underline">Anushka</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;