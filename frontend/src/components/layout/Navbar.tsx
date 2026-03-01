"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={cn(
          "fixed top-6 inset-x-0 max-w-4xl mx-auto z-50 hidden md:block",
          className
        )}
      >
        <div className="flex items-center justify-between bg-white rounded-full px-6 py-2 border border-gray-200">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GigMe</span>
          </Link>

          {/* Menu Items */}
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Layanan">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/browse?category=design">Design & Graphics</HoveredLink>
                <HoveredLink href="/browse?category=video">Video & Animation</HoveredLink>
                <HoveredLink href="/browse?category=writing">Writing & Content</HoveredLink>
                <HoveredLink href="/browse?category=programming">Programming & Tech</HoveredLink>
                <HoveredLink href="/browse?category=marketing">Digital Marketing</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Freelancer">
              <div className="text-sm grid grid-cols-2 gap-6 p-2">
                <ProductItem
                  title="Top Designers"
                  href="/browse?category=design"
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=150&fit=crop"
                  description="Logo, branding, UI/UX profesional"
                />
                <ProductItem
                  title="Video Editors"
                  href="/browse?category=video"
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=150&fit=crop"
                  description="TikTok, YouTube, Reels viral"
                />
                <ProductItem
                  title="Developers"
                  href="/browse?category=programming"
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=150&fit=crop"
                  description="Web, mobile, custom apps"
                />
                <ProductItem
                  title="Writers"
                  href="/browse?category=writing"
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=150&fit=crop"
                  description="Artikel & copywriting"
                />
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Harga">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/browse?price=budget">Budget (Rp 10k - 50k)</HoveredLink>
                <HoveredLink href="/browse?price=standard">Standard (Rp 50k - 200k)</HoveredLink>
                <HoveredLink href="/browse?price=premium">Premium (Rp 200k+)</HoveredLink>
                <HoveredLink href="/become-seller">Jadi Freelancer</HoveredLink>
              </div>
            </MenuItem>

            <Link
              href="/browse"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Jelajahi
            </Link>
          </Menu>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-emerald-500 text-white px-5 py-2 rounded-full hover:bg-emerald-600 transition-colors"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 inset-x-0 z-50 md:hidden">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-3 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-lg font-bold text-gray-900">GigMe</span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/browse"
                className="block text-gray-700 font-medium hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jelajahi
              </Link>
              <Link
                href="/browse?category=design"
                className="block text-gray-700 font-medium hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Design & Graphics
              </Link>
              <Link
                href="/browse?category=video"
                className="block text-gray-700 font-medium hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Video & Animation
              </Link>
              <Link
                href="/browse?category=programming"
                className="block text-gray-700 font-medium hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Programming
              </Link>
              <Link
                href="/become-seller"
                className="block text-gray-700 font-medium hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jadi Freelancer
              </Link>

              <div className="border-t pt-4 flex gap-3">
                <Link
                  href="/login"
                  className="flex-1 text-center text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center text-sm font-medium bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
