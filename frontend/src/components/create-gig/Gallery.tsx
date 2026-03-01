'use client';
import { FiImage, FiVideo, FiUploadCloud } from 'react-icons/fi';

export function Gallery() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Images */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <label className="block text-sm font-bold text-gray-900 mb-4">Images (Up to 3)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Upload Box 1 (Main) */}
                    <div className="aspect-video bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors group">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-500 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                            <FiUploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-emerald-700">Drag & Drop</span>
                        <span className="text-xs text-emerald-600/70 mt-1">or Browse</span>
                    </div>

                    {/* Upload Box 2 */}
                    <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-400">
                        <FiImage className="w-8 h-8 mb-2" />
                        <span className="text-xs">Secondary Image</span>
                    </div>

                    {/* Upload Box 3 */}
                    <div className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-400">
                        <FiImage className="w-8 h-8 mb-2" />
                        <span className="text-xs">Third Image</span>
                    </div>
                </div>
            </div>

            {/* Video */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <label className="block text-sm font-bold text-gray-900 mb-4">Video (One only)</label>
                <div className="aspect-video max-w-sm bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-400">
                    <FiVideo className="w-8 h-8 mb-2" />
                    <span className="text-xs">Upload Video Presentation</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">MP4, AVI, MOV up to 100MB.</p>
            </div>

        </div>
    );
}
