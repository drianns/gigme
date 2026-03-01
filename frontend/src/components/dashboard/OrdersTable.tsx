import { motion } from 'motion/react';

interface Order {
    id: string;
    service: string;
    buyer: string;
    date: string;
    amount: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
}

const recentOrders: Order[] = [
    { id: '#ORD-001', service: 'Logo Design Minimalis', buyer: 'PT Maju Jaya', date: '08 Jan 2025', amount: 'Rp 500.000', status: 'active' },
    { id: '#ORD-002', service: 'Video Editing Reels', buyer: 'Coffee Shop ID', date: '07 Jan 2025', amount: 'Rp 250.000', status: 'completed' },
    { id: '#ORD-003', service: 'Content Writing Blog', buyer: 'Tech Startup', date: '05 Jan 2025', amount: 'Rp 150.000', status: 'pending' },
    { id: '#ORD-004', service: 'Website Landing Page', buyer: 'Fashion Store', date: '02 Jan 2025', amount: 'Rp 1.500.000', status: 'completed' },
];

export function OrdersTable() {
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'active': return 'bg-blue-100 text-blue-600';
            case 'completed': return 'bg-emerald-100 text-emerald-600';
            case 'pending': return 'bg-orange-100 text-orange-600';
            case 'cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Pesanan Terbaru</h3>
                <button className="text-sm text-emerald-600 font-medium hover:underline">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">ID Order</th>
                            <th className="px-6 py-4">Layanan</th>
                            <th className="px-6 py-4">Pembeli</th>
                            <th className="px-6 py-4">Harga</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentOrders.map((order, i) => (
                            <motion.tr
                                key={order.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">{order.service}</td>
                                <td className="px-6 py-4 text-gray-600">{order.buyer}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{order.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
