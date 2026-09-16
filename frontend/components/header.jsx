"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import BackButton from './BackButton';

// --- Icons for the mobile menu button ---
const MenuIcon = () => (
    <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
    </svg>
);

const CloseIcon = () => (
    <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
    </svg>
);

// --- All your navigation links in one place for easy management ---
const navLinks = [
    { href: '/PublicRoutes/about', label: 'ABOUT' },
    { href: '/PublicRoutes/services', label: 'SERVICES' },
    { href: '/PublicRoutes/pricing', label: 'PRICING' },
    { href: '/PublicRoutes/barbers', label: 'BARBERS' },
    { href: '/PublicRoutes/contact', label: 'CONTACT' },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
        router.push('/');
    };

    // Function to toggle the mobile menu and prevent scrolling
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    
    // A function to close the menu, useful when a link is clicked
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <header className='bg-[#191c24] text-white shadow-lg sticky top-0 z-50'>
            <div className='container mx-auto flex items-center justify-between h-24 px-4'>
                <div className="flex items-center gap-4">
                    {pathname !== '/PublicRoutes' && pathname !== '/PublicRoutes/about' && <BackButton />}
                    {/* Logo */}
                    <Link href="/" className='text-4xl text-red-600 font-bold tracking-tighter'>
                        HAIRCUT
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden lg:flex items-center gap-8 text-base font-medium text-[#ADB1D1]'>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className='relative py-2 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-300 after:origin-center hover:after:scale-x-100'>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Buttons - DESKTOP */}
                <div className='hidden lg:flex items-center gap-5'>
                    <button 
                        onClick={handleLogout}
                        className='bg-gray-800 text-white font-bold py-3 px-6 rounded-md border border-gray-600 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105'
                    >
                        Logout
                    </button>
                    <Link href="/Pages/main" className='bg-red-700 text-white font-bold py-3 px-6 rounded-md hover:bg-red-800 transition-all duration-300 transform hover:scale-105'>
                        Appointment
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className='lg:hidden'>
                    <button onClick={toggleMobileMenu} aria-label="Toggle Menu" className="z-50 relative">
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-[#191c24] z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className='flex flex-col items-center justify-center h-full gap-6'>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={closeMobileMenu} className='text-3xl text-[#ADB1D1] hover:text-red-600 transition-colors duration-300'>
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/Pages/main" onClick={closeMobileMenu} className='mt-8 bg-red-700 text-white font-bold py-4 px-8 rounded-md hover:bg-red-800 transition-colors duration-300 text-xl'>
                        Appointment
                    </Link>
                   
                </div>
            </div>
        </header>
    );
};

export default Header;
