'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * ClientLayout
 * Conditionally renders Navbar and Footer based on the current pathname.
 * Wraps children (page content).
 */
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Paths where Navbar and Footer should be HIDDEN
    const hideNavFooter =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup');

    return (
        <div className="relative flex min-h-screen flex-col">
            {!hideNavFooter && <Navbar />}
            <div className="flex-1">{children}</div>
            {!hideNavFooter && <Footer />}
        </div>
    );
}
