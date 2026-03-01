'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FiStar, FiPhone, FiMail, FiMapPin, FiBriefcase, FiCheck, FiChevronDown, FiHeart, FiMessageCircle, FiClock, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';

// Dummy data for the freelancer profile
const freelancer = {
    id: 1,
    name: 'Andi Designer',
    daysOnPlatform: 286,
    phone: '+62 812-3456-7890',
    email: 'andi.designer@gmail.com',
    location: 'Jakarta, Indonesia',
    company: 'Creative Studio ID',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
    stats: {
        totalGigs: 12,
        projectsSold: 912,
        activeProjects: 320,
    },
    summary: [
        { id: 1, title: 'Leads Baru', value: 23, change: '+5 dari minggu lalu', color: 'bg-orange-100 text-orange-600', trend: 'up' },
        { id: 2, title: 'Klien Tertarik', value: 8, change: 'Update 16 Mar, 03:34 pm', color: 'bg-emerald-100 text-emerald-600', trend: 'up' },
        { id: 3, title: 'Potential Buyer', value: 15, change: 'Update 16 Mar, 02:34 pm', color: 'bg-blue-100 text-blue-600', trend: 'up' },
    ],
    gigs: [
        { id: 1, title: 'Logo Design Minimalis', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop', price: 150000, isNew: true },
        { id: 2, title: 'Brand Identity Package', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop', price: 500000 },
        { id: 3, title: 'Social Media Kit', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop', price: 200000 },
    ],
    liveFeed: [
        {
            id: 1,
            type: 'sale',
            title: 'Logo Design untuk StartupXYZ',
            location: '303 Sudirman Ave, Jakarta',
            time: '2 jam lalu',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=150&fit=crop',
            views: 45,
        },
    ],
    recentActivity: [
        { id: 1, user: 'Logan Davidson', action: 'Order baru', time: '⭐ 26.88', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', status: 'Agen', extra: 'Created' },
        { id: 2, user: 'Megan Pearce', action: 'Lead baru', time: '⭐ 26.55', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', status: 'Lead', extra: 'Was Assigned' },
        { id: 3, user: 'Mason Reynolds', action: 'Inquiry', time: '⭐ 25.55', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', status: 'Inquiry', extra: 'Add Search' },
    ],
};

export default function FreelancerProfilePage({ params }: { params: { username: string } }) {
    const [activeFilter, setActiveFilter] = useState('This Month');

    return (
        <main className="min-h-screen bg-gray-100 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            {/* Gradient Header */}
                            <div className="relative h-32 bg-gradient-to-b from-teal-200 via-teal-100 to-white">
                                {/* View Profile Button */}
                                <button className="absolute top-4 right-4 text-sm text-gray-600 hover:text-gray-900">
                                    View profile
                                </button>
                            </div>

                            {/* Profile Content */}
                            <div className="px-6 pb-6 -mt-16">
                                {/* Avatar */}
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                            <Image
                                                src={freelancer.avatar}
                                                alt={freelancer.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {freelancer.verified && (
                                            <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                                                <FiCheck className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Name & Email */}
                                <div className="text-center mb-6">
                                    <h1 className="text-xl font-bold text-gray-900 mb-1">{freelancer.name}</h1>
                                    <p className="text-sm text-gray-500">{freelancer.email}</p>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-4 gap-2 pt-6 border-t border-gray-100">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">First seen</p>
                                        <p className="text-sm font-semibold text-gray-900">1 Jun, 2025</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">First purchase</p>
                                        <p className="text-sm font-semibold text-gray-900">4 May, 2025</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">Revenue</p>
                                        <p className="text-sm font-semibold text-gray-900">Rp 2.08Jt</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-1">Total Gigs</p>
                                        <p className="text-sm font-semibold text-gray-900">{freelancer.stats.totalGigs}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* My Summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Ringkasan Saya</h2>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors">
                                    {activeFilter}
                                    <FiChevronDown className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {freelancer.summary.map((item) => (
                                    <div key={item.id} className={`rounded-xl p-4 ${item.color.split(' ')[0]}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="text-sm text-gray-600">{item.title}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.color}`}>
                                                <FiTrendingUp className="w-3 h-3 inline" />
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
                                        <p className="text-xs text-gray-500">{item.change}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* New Objects / Gigs */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Gigs Terbaru ({freelancer.gigs.length})</h2>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors">
                                    This Month
                                    <FiChevronDown className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {freelancer.gigs.map((gig) => (
                                    <Link key={gig.id} href={`/gig/${gig.id}`} className="group">
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-3">
                                            <Image
                                                src={gig.image}
                                                alt={gig.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {gig.isNew && (
                                                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg">
                                                    Baru
                                                </span>
                                            )}
                                            <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FiHeart className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                            {gig.title}
                                        </h3>
                                        <p className="font-bold text-gray-900">Rp {gig.price.toLocaleString('id-ID')}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Live Feed */}
                    <div className="space-y-6">
                        {/* Live Feed Header */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Live Feed</h2>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                                            <Image
                                                src={`https://images.unsplash.com/photo-${1507003211169 + i}-0a1dd7228f2d?w=50&h=50&fit=crop`}
                                                alt=""
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-medium text-emerald-600">
                                        +5
                                    </div>
                                </div>
                            </div>

                            {/* Featured Item */}
                            {freelancer.liveFeed.map((item) => (
                                <div key={item.id} className="mb-6">
                                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
                                            Sale
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>Property Viewed</span>
                                        <span className="flex items-center gap-1">
                                            <FiClock className="w-4 h-4" />
                                            {item.views}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Activity List */}
                            <div className="space-y-4">
                                {freelancer.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="relative">
                                            <Image
                                                src={activity.avatar}
                                                alt={activity.user}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <FiCheck className="w-2.5 h-2.5 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-gray-900 text-sm">{activity.user}</p>
                                                <span className="text-xs text-yellow-600">{activity.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">{activity.action}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{activity.status}</span>
                                            <span className="text-xs text-emerald-600">{activity.extra}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                                    <FiMessageCircle className="w-5 h-5" />
                                    <span className="font-medium">Hubungi Freelancer</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                                    <FiHeart className="w-5 h-5" />
                                    <span className="font-medium">Simpan Profil</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                                    <FiUsers className="w-5 h-5" />
                                    <span className="font-medium">Lihat Semua Gigs</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
