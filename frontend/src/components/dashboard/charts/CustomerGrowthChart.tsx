'use client';

export function CustomerGrowthChart() {
    return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Customer Growth</h3>
                    <p className="text-gray-400 text-xs">Track customer by locations</p>
                </div>
                <select className="text-xs bg-gray-50 border-none rounded-lg px-2 py-1 outline-none text-gray-500">
                    <option>Today</option>
                </select>
            </div>

            <div className="flex-1 flex gap-4">
                {/* Map/Bubble Viz - Simplified Interactive Bubble */}
                <div className="relative flex-1 bg-emerald-50/50 rounded-2xl flex items-center justify-center overflow-hidden">

                    {/* Bubbles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[40%] text-center">
                        <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 z-20 relative text-white">
                            <div>
                                <span className="block text-sm font-bold">2.417</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-[110%] -translate-y-[10%] text-center">
                        <div className="w-16 h-16 bg-emerald-400/80 rounded-full flex items-center justify-center text-white z-10">
                            <span className="text-xs font-bold">287</span>
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-[80%] translate-y-[40%] text-center">
                        <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white z-10 shadow-md">
                            <span className="text-sm font-bold">2.281</span>
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 translate-x-[10%] translate-y-[30%] text-center">
                        <div className="w-14 h-14 bg-emerald-400/60 rounded-full flex items-center justify-center text-white">
                            <span className="text-xs font-bold">812</span>
                        </div>
                    </div>

                </div>

                {/* Country Legend */}
                <div className="w-1/3 flex flex-col justify-center gap-4">
                    {[
                        { name: 'United States', flag: '🇺🇸', val: '40%' },
                        { name: 'Germany', flag: '🇩🇪', val: '25%' },
                        { name: 'Australia', flag: '🇦🇺', val: '20%' },
                        { name: 'France', flag: '🇫🇷', val: '15%' },
                    ].map((country) => (
                        <div key={country.name} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{country.flag}</span>
                                <span className="text-xs font-bold text-gray-700">{country.name}</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full w-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: country.val }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
