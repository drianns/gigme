'use client';

import { FiCopy, FiShoppingBag, FiUsers, FiBox } from 'react-icons/fi';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { ProductStatChart } from '@/components/dashboard/charts/ProductStatChart';
import { CustomerHabitChart } from '@/components/dashboard/charts/CustomerHabitChart';
import { CustomerGrowthChart } from '@/components/dashboard/charts/CustomerGrowthChart';

// Stats Card Component (Local)
const TopStatsCard = ({ title, value, subText, icon, color, isMain = false }: any) => {
    return (
        <div className={`p-6 rounded-[24px] flex flex-col justify-between h-[160px] relative overflow-hidden transition-all hover:shadow-lg ${isMain ? 'bg-emerald-500 text-white shadow-emerald-500/30 shadow-xl' : 'bg-white text-gray-900 shadow-sm'
            }`}>
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${isMain ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-500'
                }`}>
                {icon}
            </div>

            <div>
                <h3 className={`text-sm font-medium mb-1 ${isMain ? 'text-white/80' : 'text-gray-500'}`}>{title}</h3>
                <p className="text-3xl font-bold">{value}</p>
                <div className="flex items-center mt-1 text-xs gap-1">
                    <span className={isMain ? 'text-white/80' : 'text-gray-400'}>{subText}</span>
                </div>
            </div>

            {/* Badge */}
            <div className={`absolute top-6 right-6 px-2 py-1 rounded-full text-xs font-bold ${isMain ? 'bg-lime-400 text-gray-900' :
                color === 'green' ? 'bg-green-100 text-green-600' :
                    color === 'red' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                {isMain ? '+2.08%' : color === 'red' ? '-2.08%' : '+12.4%'}
            </div>
        </div>
    );
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FD] flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-4 lg:p-8">
                <Header />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                    {/* Left: Stats Cards (2x2) */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <TopStatsCard
                            title="Total Sales"
                            value="$612.917"
                            subText="Products vs last month"
                            icon={<FiCopy className="w-5 h-5" />}
                            isMain={true}
                        />
                        <TopStatsCard
                            title="Total Orders"
                            value="34.760"
                            subText="Orders vs last month"
                            icon={<FiShoppingBag className="w-5 h-5" />}
                            color="green"
                        />
                        <TopStatsCard
                            title="Visitor"
                            value="14.987"
                            subText="Users vs last month"
                            icon={<FiUsers className="w-5 h-5" />}
                            color="red"
                        />
                        <TopStatsCard
                            title="Total Sold Products"
                            value="12.987"
                            subText="Products vs last month"
                            icon={<FiBox className="w-5 h-5" />}
                            color="green"
                        />

                        {/* Customer Habbits (Wide) */}
                        <div className="sm:col-span-2 h-[320px]">
                            <CustomerHabitChart />
                        </div>
                    </div>

                    {/* Right: Charts Vertical Stack */}
                    <div className="space-y-6">
                        <div className="h-[400px]">
                            <ProductStatChart />
                        </div>
                        <div className="h-[300px]">
                            <CustomerGrowthChart />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
