'use client';

export function Overview() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">

                {/* Gig Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Gig Title</label>
                    <input
                        type="text"
                        placeholder="I will do something explicitly for you..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400 mt-2 text-right">0/80 max</p>
                </div>

                {/* Category */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-white">
                            <option>Select Category</option>
                            <option>Graphics & Design</option>
                            <option>Digital Marketing</option>
                            <option>Writing & Translation</option>
                            <option>Video & Animation</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Sub Category</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-white" disabled>
                            <option>Select Sub Category</option>
                        </select>
                    </div>
                </div>

                {/* Search Tags */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Search Tags</label>
                    <div className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all flex flex-wrap gap-2 min-h-[50px]">
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                            Logo Design
                            <button className="hover:text-emerald-800 text-lg leading-none">×</button>
                        </span>
                        <input
                            type="text"
                            placeholder="Type and hit enter..."
                            className="flex-1 outline-none text-sm min-w-[120px]"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">5 tags maximum. Use letters and numbers only.</p>
                </div>

            </div>
        </div>
    );
}
