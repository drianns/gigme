'use client';
import { FiCheck, FiX } from 'react-icons/fi';

export function Pricing() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Toggle Scope (Optional) */}
            <div className="flex justify-end items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">3 Packages</span>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="p-4 w-1/4 min-w-[150px]"></th>
                            <th className="p-4 w-1/4 min-w-[200px] bg-gray-100 text-center text-gray-800">Basic</th>
                            <th className="p-4 w-1/4 min-w-[200px] text-center text-gray-800">Standard</th>
                            <th className="p-4 w-1/4 min-w-[200px] text-center text-gray-800">Premium</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {/* Package Name */}
                        <tr>
                            <td className="p-4 text-gray-500 font-medium">Name your package</td>
                            <td className="p-2"><input type="text" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500" placeholder="Basic Plan" /></td>
                            <td className="p-2"><input type="text" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500" placeholder="Standard Plan" /></td>
                            <td className="p-2"><input type="text" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500" placeholder="Premium Plan" /></td>
                        </tr>
                        {/* Description */}
                        <tr>
                            <td className="p-4 text-gray-500 font-medium align-top pt-6">Describe the details</td>
                            <td className="p-2"><textarea className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 resize-none h-24" placeholder="Description for basic..." /></td>
                            <td className="p-2"><textarea className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 resize-none h-24" placeholder="Description for standard..." /></td>
                            <td className="p-2"><textarea className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 resize-none h-24" placeholder="Description for premium..." /></td>
                        </tr>
                        {/* Delivery Time */}
                        <tr>
                            <td className="p-4 text-gray-500 font-medium">Delivery Time</td>
                            <td className="p-2">
                                <select className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500">
                                    <option>1 Day Delivery</option>
                                    <option>2 Days Delivery</option>
                                </select>
                            </td>
                            <td className="p-2">
                                <select className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500">
                                    <option>3 Days Delivery</option>
                                </select>
                            </td>
                            <td className="p-2">
                                <select className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500">
                                    <option>5 Days Delivery</option>
                                </select>
                            </td>
                        </tr>
                        {/* Price */}
                        <tr className="bg-gray-50">
                            <td className="p-4 text-gray-600 font-bold">Total Price</td>
                            <td className="p-2">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                                    <input type="number" className="w-full pl-8 p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-gray-900" placeholder="0" />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                                    <input type="number" className="w-full pl-8 p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-gray-900" placeholder="0" />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                                    <input type="number" className="w-full pl-8 p-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-gray-900" placeholder="0" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
