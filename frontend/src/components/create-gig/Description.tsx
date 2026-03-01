'use client';
import { FiPlus } from 'react-icons/fi';

export function Description() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                <div className="text-xs text-gray-400 mb-4">Briefly Describe Your Gig</div>
                <textarea
                    className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none resize-none transition-all placeholder:text-gray-300"
                    placeholder="Hello there! I am..."
                />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">min. 120 characters</span>
                    <span className="text-xs text-gray-400">0/1200</span>
                </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold text-gray-900">Frequently Asked Questions</label>
                    <button className="text-sm text-emerald-600 font-bold flex items-center gap-1 hover:underline">
                        <FiPlus /> Add FAQ
                    </button>
                </div>

                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                    No FAQs added yet
                </div>
            </div>

        </div>
    );
}
