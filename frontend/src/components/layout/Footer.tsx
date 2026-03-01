"use client";

import React from "react";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import ShinyText from "@/components/ui/ShinyText";

export default function Footer() {
  const placeholders = [
    "Cari desain logo minimalis...",
    "Video editing untuk TikTok...",
    "Website landing page...",
    "Content writer Indonesia...",
    "UI/UX design mobile app...",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  return (
    <footer className="bg-gradient-to-b from-blue-50 to-white">
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          <ShinyText
            text="Siap Memulai Project"
            speed={3}
            color="#111827"
            shineColor="#10b981"
            spread={120}
            className="font-bold"
          />
          <br />
          <ShinyText
            text="Bersama GigMe?"
            speed={3}
            delay={0.5}
            color="#111827"
            shineColor="#10b981"
            spread={120}
            className="font-bold"
          />
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Temukan freelancer terbaik atau mulai jual skill kamu sekarang — semua dimulai dari sini.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-full transition-all hover:bg-gray-800 hover:scale-105"
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full transition-all hover:bg-gray-100"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Logo & Newsletter */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-gray-900">GigMe</span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">
                Daftar untuk menerima update terbaru.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email kamu"
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors">
                  Daftar
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Dengan mendaftar kamu setuju dengan <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>

            {/* Care Plans */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/browse?category=design" className="hover:text-emerald-600">Design</Link></li>
                <li><Link href="/browse?category=video" className="hover:text-emerald-600">Video</Link></li>
                <li><Link href="/browse?category=writing" className="hover:text-emerald-600">Writing</Link></li>
                <li><Link href="/browse?category=programming" className="hover:text-emerald-600">Programming</Link></li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Pelajari</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/blog" className="hover:text-emerald-600">Blog</Link></li>
                <li><Link href="/tutorials" className="hover:text-emerald-600">Tutorial</Link></li>
                <li><Link href="/resources" className="hover:text-emerald-600">Resources</Link></li>
                <li><Link href="/certifications" className="hover:text-emerald-600">Sertifikasi</Link></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Tentang</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-emerald-600">Tentang Kami</Link></li>
                <li><Link href="/careers" className="hover:text-emerald-600">Karir</Link></li>
                <li><Link href="/press" className="hover:text-emerald-600">Press</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-600">Kontak</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/terms" className="hover:text-emerald-600">Syarat & Ketentuan</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-emerald-600">Refund Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-emerald-600">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2024 GigMe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
