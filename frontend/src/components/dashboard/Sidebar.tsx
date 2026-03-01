'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingBag, FiBox, FiPieChart, FiSettings, FiLogOut } from 'react-icons/fi';
import { motion } from 'motion/react';

const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Order', icon: FiShoppingBag, path: '/dashboard/orders' },
    { name: 'Products', icon: FiBox, path: '/dashboard/products' },
    { name: 'Analytics', icon: FiPieChart, path: '/dashboard/analytics' },
    { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-20 lg:w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col justify-between py-8 z-50 transition-all duration-300">
            {/* Logo */}
            <div className="px-4 lg:px-8 mb-8 flex items-center justify-center lg:justify-start gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="hidden lg:block font-bold text-xl text-gray-900">GigMe</span>
            </div>

            {/* Menu */}
            <div className="flex-1 px-4 lg:px-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                    : 'text-gray-400 hover:bg-gray-50 hover:text-emerald-500'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="hidden lg:block font-medium text-sm">{item.name}</span>

                            {/* Active Indicator for mobile/collapsed state */}
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="lg:hidden absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Footer / Profile */}
            <div className="px-4 lg:px-6">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <FiLogOut className="w-5 h-5" />
                    <span className="hidden lg:block font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}
