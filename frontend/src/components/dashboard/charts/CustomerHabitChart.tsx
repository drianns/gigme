'use client';

export function CustomerHabitChart() {
    const data = [40, 65, 30, 80, 55, 30, 50, 60]; // Dummy bar heights

    return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Customer Habbits</h3>
                    <p className="text-gray-400 text-xs">Track your customer habbits</p>
                </div>
                <select className="text-xs bg-gray-50 border-none rounded-lg px-2 py-1 outline-none text-gray-500">
                    <option>This year</option>
                </select>
            </div>

            <div className="flex items-center gap-4 mb-6 text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                    <span className="text-gray-400">Seen product</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-gray-400">Sales</span>
                </div>
            </div>

            {/* Bar Chart Visual */}
            <div className="flex-1 flex items-end justify-between px-2 gap-3 pb-2 pt-8 relative">

                {/* Tooltip Mock */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-900 text-white p-3 rounded-xl text-xs z-10 shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        <span>43.787 Products</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>39.784 Products</span>
                    </div>
                    {/* Triangle pointer */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                </div>

                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                    <div key={month} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                        <div className="flex gap-1 items-end h-40 w-full justify-center">
                            {/* Bar 1 (Gray) */}
                            <div
                                className="w-3 md:w-4 rounded-full bg-gray-200 transition-all hover:bg-gray-300"
                                style={{ height: `${data[i]}%` }}
                            ></div>
                            {/* Bar 2 (Emerald) */}
                            <div
                                className={`w-3 md:w-4 rounded-full transition-all hover:opacity-80 ${i === 3 ? 'bg-emerald-500' : 'bg-emerald-500'}`} // Apr is highlighted in ref
                                style={{ height: `${data[i] * 0.8}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{month}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}
