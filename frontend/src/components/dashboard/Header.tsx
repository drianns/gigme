'use client';

import { FiSearch, FiBell } from 'react-icons/fi';
import Image from 'next/image';

export function Header() {
    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sales Report</h1>
                <p className="text-gray-400 text-sm">Friday, December 15th 2023</p>
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2.5 bg-white rounded-full text-sm border-none focus:ring-2 focus:ring-emerald-100 outline-none w-64 shadow-sm"
                    />
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                {/* Notifications */}
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:bg-gray-50 transition-colors relative">
                    <FiBell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-400 rounded-full border border-white"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                            alt="Profile"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-gray-900">Ferra Alexandra</p>
                        <p className="text-xs text-gray-400">Admin store</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
