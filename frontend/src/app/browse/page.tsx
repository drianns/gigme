'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FiHeart, FiStar, FiShoppingCart, FiArrowRight, FiMessageCircle, FiBookmark } from 'react-icons/fi';

// Featured gigs data
const trendGigs = [
  {
    id: 1,
    title: 'Professional Logo Design untuk Brand Kamu',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop',
    price: 150000,
    rating: 4.9,
    reviews: 48,
    seller: 'Andi Creative',
  },
  {
    id: 2,
    title: 'Video Editing TikTok & Reels Viral',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=400&fit=crop',
    price: 200000,
    rating: 4.8,
    reviews: 72,
    seller: 'Budi Editor',
  },
  {
    id: 3,
    title: 'Website Landing Page Next.js',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    price: 500000,
    rating: 5.0,
    reviews: 36,
    seller: 'Deni Developer',
  },
  {
    id: 4,
    title: 'UI/UX Design Mobile App Figma',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop',
    price: 350000,
    rating: 4.9,
    reviews: 54,
    seller: 'Eva Designer',
  },
];

// Gig Card Component
const GigCard = ({ gig, index }: { gig: typeof trendGigs[0]; index: number }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
        <Image
          src={gig.image}
          alt={gig.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-emerald-500 hover:text-white'
            }`}
        >
          <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {gig.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium text-gray-900">{gig.rating}</span>
          <span className="text-gray-400 text-sm">({gig.reviews} reviews)</span>
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-bold text-gray-900">
            Rp {gig.price.toLocaleString('id-ID')}
          </p>
          <button className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { name: 'Semua', slug: 'all' },
    { name: 'Design', slug: 'design' },
    { name: 'Video', slug: 'video' },
    { name: 'Writing', slug: 'writing' },
    { name: 'Programming', slug: 'programming' },
  ];

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero Section - Clean Minimal Design */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2rem] overflow-hidden p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-4">
                <span className="text-sm text-gray-500 font-medium">Discover</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Freelance<br />
                  Collection.
                </h1>
              </div>

              {/* Right Content - 3D Image with floating elements */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Gradient Background */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-purple-400 via-emerald-400 to-teal-300 rounded-3xl -z-10" />

                  {/* 3D Freelancer Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src="/images/freelancer-3d.png"
                      alt="Freelancer 3D"
                      width={350}
                      height={350}
                      className="relative z-10"
                    />
                  </motion.div>

                  {/* Floating GigMe Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 z-20"
                  >
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">G</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">GigMe</p>
                      <p className="text-xs text-gray-500">Marketplace</p>
                    </div>
                  </motion.div>

                  {/* Floating Stats Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg z-20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-400 border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-teal-400 border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">500+ Services</span>
                    </div>
                  </motion.div>

                  {/* Price Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-16 -left-12 bg-gray-900 text-white rounded-full px-4 py-2 shadow-lg z-20"
                  >
                    <span className="font-bold text-sm">Mulai Rp 10K</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-8 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch gap-2">
              {/* Category Tabs */}
              <div className="flex items-center gap-1 px-2 overflow-x-auto">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.slug}
                    onClick={() => setActiveCategory(tab.slug)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === tab.slug
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px bg-gray-200 my-2" />

              {/* Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4">
                <input
                  type="text"
                  placeholder="Cari jasa freelancer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />
              </div>

              {/* Search Button */}
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                <span>Cari Semua</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Deals Section */}
      <section id="deals" className="px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Penawaran Terbaik</h2>
            <Link href="/browse" className="text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <FiArrowRight />
            </Link>
          </div>

          {/* Deal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Design Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-emerald-100 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] group hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900">Design &<br />Graphics</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Diskon hingga 40% untuk<br />Logo & Branding.
                </p>
                <Link href="/browse?category=design" className="inline-block mt-4 text-sm font-semibold text-gray-900 underline hover:text-emerald-600">
                  Jelajahi →
                </Link>
              </div>
              <div className="flex justify-center mt-4">
                <Image
                  src="/images/3d-design.png"
                  alt="Design"
                  width={120}
                  height={120}
                  className="object-contain group-hover:scale-110 transition-transform drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* Video Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-pink-100 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] group hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900">Video &<br />Animation</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Diskon hingga 25% untuk<br />Video Editing.
                </p>
                <Link href="/browse?category=video" className="inline-block mt-4 text-sm font-semibold text-gray-900 underline hover:text-pink-600">
                  Jelajahi →
                </Link>
              </div>
              <div className="flex justify-center mt-4">
                <Image
                  src="/images/3d-video.png"
                  alt="Video"
                  width={120}
                  height={120}
                  className="object-contain group-hover:scale-110 transition-transform drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* Programming Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-orange-100 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] group hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900">Web &<br />Programming</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Hemat 30% untuk<br />Website Development.
                </p>
                <Link href="/browse?category=programming" className="inline-block mt-4 text-sm font-semibold text-gray-900 underline hover:text-orange-600">
                  Jelajahi →
                </Link>
              </div>
              <div className="flex justify-center mt-4">
                <Image
                  src="/images/3d-programming.png"
                  alt="Programming"
                  width={120}
                  height={120}
                  className="object-contain group-hover:scale-110 transition-transform drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* Writing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-100 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] group hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900">Writing &<br />Content</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Diskon hingga 15% untuk<br />Copywriting.
                </p>
                <Link href="/browse?category=writing" className="inline-block mt-4 text-sm font-semibold text-gray-900 underline hover:text-gray-700">
                  Jelajahi →
                </Link>
              </div>
              <div className="flex justify-center mt-4">
                <Image
                  src="/images/3d-writing.png"
                  alt="Writing"
                  width={120}
                  height={120}
                  className="object-contain group-hover:scale-110 transition-transform drop-shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Freelancer Services Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Jasa Freelancer Populer</h2>
            <Link href="/browse" className="text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <FiArrowRight />
            </Link>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Logo Designer',
                tags: ['Full Time', 'Design'],
                salary: 'Rp 500K - 2Jt',
                company: 'GigMe',
                companyIcon: 'G',
                employees: '100-500',
                isBlue: true,
              },
              {
                title: 'Video Editor TikTok',
                tags: ['Part Time', 'Video'],
                salary: 'Rp 300K - 1Jt',
                company: 'CreativeHub',
                companyIcon: 'C',
                employees: '50-100',
                isBlue: false,
              },
              {
                title: 'Web Developer',
                tags: ['Full Time', 'Frontend'],
                salary: 'Rp 1Jt - 5Jt',
                company: 'TechID',
                companyIcon: 'T',
                employees: '200-500',
                isBlue: true,
              },
              {
                title: 'Content Writer',
                tags: ['Part Time', 'SEO'],
                salary: 'Rp 200K - 800K',
                company: 'WriteNow',
                companyIcon: 'W',
                employees: '20-50',
                isBlue: false,
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 ${service.isBlue
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
                  } hover:shadow-xl transition-all cursor-pointer group`}
              >
                {/* Title */}
                <h3 className={`text-lg font-bold mb-3 ${service.isBlue ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full ${service.isBlue
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Salary */}
                <p className={`text-xl font-bold mb-4 ${service.isBlue ? 'text-white' : 'text-gray-900'}`}>
                  {service.salary}
                </p>

                {/* Time info */}
                <p className={`text-sm mb-4 ${service.isBlue ? 'text-white/70' : 'text-gray-500'}`}>
                  1 hari lalu
                </p>

                {/* Divider */}
                <div className={`border-t ${service.isBlue ? 'border-white/20' : 'border-gray-100'} my-4`} />

                {/* Company Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${service.isBlue
                      ? 'bg-white text-blue-600'
                      : 'bg-emerald-100 text-emerald-600'
                      }`}>
                      {service.companyIcon}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${service.isBlue ? 'text-white' : 'text-gray-900'}`}>
                        {service.company}
                      </p>
                      <p className={`text-xs ${service.isBlue ? 'text-white/60' : 'text-gray-400'}`}>
                        👥 {service.employees}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${service.isBlue
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-600'
                    }`}>
                    🎯 Gigs
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelancer Populer Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Gigs <span className="text-emerald-500">Populer</span>
            </h2>
            <Link href="/freelancers" className="text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <FiArrowRight />
            </Link>
          </div>
          <p className="text-gray-500 mb-8">Layanan terbaik dari freelancer kami</p>

          {/* Freelancer Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Andi Designer',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
                description: 'Desain logo minimalis untuk brand kamu',
                rating: 4.9,
                earned: '25k+',
                price: '50k',
                verified: true,
              },
              {
                name: 'Budi Editor',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
                description: 'Edit video TikTok dan Reels yang viral',
                rating: 4.7,
                earned: '45k+',
                price: '75k',
                verified: true,
              },
              {
                name: 'Citra Writer',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
                description: 'Tulis caption Instagram yang menarik',
                rating: 4.8,
                earned: '30k+',
                price: '25k',
                verified: true,
              },
              {
                name: 'Deni Dev',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
                description: 'Buat website landing page profesional',
                rating: 5.0,
                earned: '50k+',
                price: '150k',
                verified: true,
              },
            ].map((freelancer, index) => (
              <motion.div
                key={freelancer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image */}
                <div className="relative h-[380px]">
                  <Image
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{freelancer.name}</h3>
                      {freelancer.verified && (
                        <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">{freelancer.description}</p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-bold">{freelancer.rating}</span>
                        </div>
                        <span className="text-white/60 text-xs">Rating</span>
                      </div>
                      <div>
                        <span className="text-white font-bold">Rp {freelancer.earned}</span>
                        <p className="text-white/60 text-xs">Earned</p>
                      </div>
                      <div>
                        <span className="text-white font-bold">Rp {freelancer.price}</span>
                        <p className="text-white/60 text-xs">/hr</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gray-700/80 hover:bg-gray-600 text-white py-2.5 px-4 rounded-xl text-sm font-medium transition-colors">
                        <FiMessageCircle className="w-4 h-4" />
                        <span>Get In Touch</span>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-gray-700/80 hover:bg-gray-600 text-white rounded-xl transition-colors">
                        <FiBookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Promotional Banner Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Promo <span className="text-emerald-500">Spesial</span>
          </h2>
          <p className="text-gray-500">Jangan lewatkan penawaran terbatas</p>
        </div>

        {/* Infinite Scroll Banner Container */}
        <div className="relative">
          {/* First Row - Left to Right */}
          <div className="flex animate-scroll-left hover:pause-animation">
            {[...Array(2)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="flex gap-6 mr-6">
                {/* Banner 1 - New User */}
                <div className="w-[400px] h-[180px] flex-shrink-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex-1">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">🎉 New User</span>
                    <h3 className="text-2xl font-bold text-white mt-3">Diskon 50%</h3>
                    <p className="text-white/80 text-sm mt-1">Untuk pengguna baru</p>
                    <button className="mt-3 bg-white text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
                      Klaim Sekarang
                    </button>
                  </div>
                  <div className="text-6xl">🎁</div>
                </div>

                {/* Banner 2 - Referral */}
                <div className="w-[400px] h-[180px] flex-shrink-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex-1">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">👥 Referral</span>
                    <h3 className="text-2xl font-bold text-white mt-3">Bonus Rp 50K</h3>
                    <p className="text-white/80 text-sm mt-1">Ajak teman bergabung</p>
                    <button className="mt-3 bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
                      Undang Teman
                    </button>
                  </div>
                  <div className="text-6xl">🤝</div>
                </div>

                {/* Banner 3 - Premium */}
                <div className="w-[400px] h-[180px] flex-shrink-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex-1">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">⭐ Premium</span>
                    <h3 className="text-2xl font-bold text-white mt-3">Jadi Freelancer Pro</h3>
                    <p className="text-white/80 text-sm mt-1">Fitur eksklusif untukmu</p>
                    <button className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
                      Upgrade Sekarang
                    </button>
                  </div>
                  <div className="text-6xl">👑</div>
                </div>

                {/* Banner 4 - Flash Sale */}
                <div className="w-[400px] h-[180px] flex-shrink-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div className="flex-1">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">⚡ Flash Sale</span>
                    <h3 className="text-2xl font-bold text-white mt-3">Hemat 70%</h3>
                    <p className="text-white/80 text-sm mt-1">Hanya hari ini!</p>
                    <button className="mt-3 bg-white text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
                      Beli Sekarang
                    </button>
                  </div>
                  <div className="text-6xl">🔥</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for infinite scroll animation */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </main>
  );
}
