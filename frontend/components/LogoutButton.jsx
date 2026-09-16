"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton = ({ className = "" }) => {
    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("isAdmin");
            document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/admin/Auth");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={`inline-flex items-center gap-2 bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg border border-red-500/50 shadow-lg backdrop-blur-md transition-all duration-200 text-sm font-semibold hover:scale-105 active:scale-95 ${className}`}
            aria-label="Logout"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;
