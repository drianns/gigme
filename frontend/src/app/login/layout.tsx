'use client';

import { useEffect } from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Hide navbar and footer on auth pages
        const navbar = document.querySelector('nav');
        const footer = document.querySelector('footer');

        if (navbar) navbar.style.display = 'none';
        if (footer) footer.style.display = 'none';

        return () => {
            // Restore on unmount
            if (navbar) navbar.style.display = '';
            if (footer) footer.style.display = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            {children}
        </div>
    );
}
