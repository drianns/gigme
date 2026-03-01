'use client';
import { motion } from 'motion/react';

export function ProductStatChart() {
    return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm h-full flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Product Statistic</h3>
                    <p className="text-gray-400 text-xs">Track your product sales</p>
                </div>
                <select className="text-xs bg-gray-50 border-none rounded-lg px-2 py-1 outline-none text-gray-500">
                    <option>Today</option>
                </select>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Radial Chart Visual Mock */}
                <div className="relative w-48 h-48">
                    {/* Outer Ring (Emerald) */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="#F3F4F6" strokeWidth="12" fill="transparent" />
                        <circle cx="96" cy="96" r="88" stroke="#10B981" strokeWidth="12" fill="transparent" strokeDasharray="552" strokeDashoffset="180" strokeLinecap="round" />
                    </svg>
                    {/* Middle Ring (Teal) */}
                    <div className="absolute inset-0 p-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="72" stroke="#F3F4F6" strokeWidth="12" fill="transparent" />
                            <circle cx="80" cy="80" r="72" stroke="#14B8A6" strokeWidth="12" fill="transparent" strokeDasharray="452" strokeDashoffset="300" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Inner Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-bold text-gray-900">9.829</h2>
                        <p className="text-xs text-gray-400 mb-1">Products Sales</p>
                        <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">+5.34%</span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border-2 border-gray-400"></span>
                        <span className="text-sm font-medium text-gray-600">Electronic</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">2.487</span>
                        <span className="text-[10px] bg-green-100 text-green-600 px-1 rounded">+1.8%</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border-2 border-gray-400"></span>
                        <span className="text-sm font-medium text-gray-600">Games</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">1.828</span>
                        <span className="text-[10px] bg-green-100 text-green-600 px-1 rounded">+2.3%</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border-2 border-gray-400"></span>
                        <span className="text-sm font-medium text-gray-600">Furniture</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">1.463</span>
                        <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">-1.04%</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
