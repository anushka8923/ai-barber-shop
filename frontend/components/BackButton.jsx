"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

let internalNavCount = 0;

export function useTrackInternalNav() {
  const pathname = usePathname();
  useEffect(() => {
    internalNavCount += 1;
  }, [pathname]);
}

const BackButton = ({ className = "", targetPath = null, href = null }) => {
    const router = useRouter();
    const destination = targetPath || href;

    const handleBack = () => {
        if (destination) {
            router.push(destination);
            return;
        }

        // Only call router.back() if we're confident there's an internal page to go back to;
        // otherwise fall back to the safe internal home route (/PublicRoutes)
        if (internalNavCount > 1) {
            router.back();
        } else {
            router.push('/PublicRoutes');
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`inline-flex items-center gap-2 bg-neutral-800/80 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg border border-neutral-600 shadow-lg backdrop-blur-md transition-all duration-200 text-sm font-semibold hover:scale-105 active:scale-95 ${className}`}
            aria-label="Go back"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
        </button>
    );
};

export default BackButton;
