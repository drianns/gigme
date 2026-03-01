import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    subValue?: string;
    icon: ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    color: 'emerald' | 'blue' | 'purple' | 'orange';
    index: number;
}

export function StatsCard({ title, value, subValue, icon, trend, color, index }: StatsCardProps) {
    const colorStyles = {
        emerald: 'bg-emerald-50 text-emerald-600',
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    const iconBgStyles = {
        emerald: 'bg-emerald-100',
        blue: 'bg-blue-100',
        purple: 'bg-purple-100',
        orange: 'bg-orange-100',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
                </div>
                <div className={`p-3 rounded-xl ${iconBgStyles[color]} ${colorStyles[color]}`}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                        {trend.value}
                    </span>
                    <span className="text-xs text-gray-400">vs bulan lalu</span>
                </div>
            )}
        </motion.div>
    );
}
