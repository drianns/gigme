'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">GigMe</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/browse" className={`${isActive('/browse')} px-3 py-2 text-sm font-medium`}>
              Browse Gigs
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                <span>Categories</span>
                <FiChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link href="/categories/design" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Design
                  </Link>
                  <Link href="/categories/programming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Programming
                  </Link>
                  <Link href="/categories/marketing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Digital Marketing
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about" className={`${isActive('/about')} px-3 py-2 text-sm font-medium`}>
              About
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/browse" 
            className={`${isActive('/browse')} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Gigs
          </Link>
          <Link 
            href="/categories" 
            className={`${isActive('/categories')} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>
          <Link 
            href="/about" 
            className={`${isActive('/about')} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="shrink-0">
              <Link 
                href="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
            <div className="ml-3">
              <Link 
                href="/signup" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}