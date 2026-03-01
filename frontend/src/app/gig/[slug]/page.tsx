'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FiStar, FiClock, FiCheck, FiHeart, FiChevronLeft, FiChevronDown, FiChevronUp, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

// Dummy data for the gig page
const gig = {
  id: 1,
  title: 'Logo Design Minimalis',
  price: 150000,
  category: 'Design & Graphics',
  deliveryTime: '2-3 hari pengerjaan',
  images: [
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=800&fit=crop',
  ],
  seller: {
    name: 'Andi Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    verified: true,
  },
  packages: [
    { id: 'basic', name: 'Basic', price: 75000 },
    { id: 'standard', name: 'Standard', price: 150000 },
    { id: 'premium', name: 'Premium', price: 300000 },
  ],
  description: `Logo ini menggunakan desain minimalis dengan konsep modern yang cocok untuk berbagai jenis bisnis. Dibuat dengan perhatian detail tinggi menggunakan teknik profesional.

Apa yang kamu dapatkan:
• File PNG high resolution
• File vector (AI/EPS) 
• Source file editable
• Unlimited revisi
• Commercial use rights`,
  shipping: {
    delivery: '2-3 hari kerja',
    revision: 'Revisi hingga puas',
  },
  rating: 4.5,
  totalReviews: 82,
  reviews: [
    {
      id: 1,
      user: { name: 'Alex Melho', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      rating: 5,
      date: '12 Oct 2024',
      comment: 'Designer ini sangat profesional dan memiliki pendekatan yang etis. Hasil kerjanya sangat memuaskan dan sesuai dengan brief yang saya berikan. Highly recommended!',
      images: [
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop',
      ],
    },
  ],
  relatedGigs: [
    { id: 2, title: 'Logo dengan Konsep Trim', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=300&fit=crop', rating: 4.8, reviews: 45, price: 212000, oldPrice: 245000 },
    { id: 3, title: 'Gradient Graphic T-shirt', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop', rating: 4.5, reviews: 28, price: 145000 },
    { id: 4, title: 'Logo dengan Tipping Details', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=300&fit=crop', rating: 4.5, reviews: 32, price: 180000 },
    { id: 5, title: 'Brand Identity Package', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=300&fit=crop', rating: 4.9, reviews: 67, price: 350000, oldPrice: 395000 },
  ],
};

export default function GigPage({ params }: { params: { slug: string } }) {
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [showShipping, setShowShipping] = useState(false);

  const currentPackage = gig.packages.find(p => p.id === selectedPackage) || gig.packages[1];

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/browse" className="hover:text-gray-900 flex items-center gap-1">
            <FiChevronLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-gray-400">{gig.category}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            >
              <Image
                src={gig.images[selectedImage]}
                alt={gig.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {gig.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all ${selectedImage === index
                      ? 'ring-2 ring-black ring-offset-2'
                      : 'hover:opacity-80'
                    }`}
                >
                  <Image src={image} alt={`Preview ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-sm text-gray-500">{gig.category}</p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{gig.title}</h1>

            {/* Price */}
            <p className="text-2xl font-bold text-gray-900">
              Rp {currentPackage.price.toLocaleString('id-ID')}
            </p>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiClock className="w-4 h-4" />
              <span>{gig.deliveryTime}</span>
            </div>

            {/* Package Selector */}
            <div>
              <p className="text-sm text-gray-700 mb-3">Pilih Paket</p>
              <div className="flex gap-3">
                {gig.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${selectedPackage === pkg.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-900 text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Pesan Sekarang
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Description Accordion */}
            <div>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-full flex items-center justify-between py-3"
              >
                <span className="font-medium text-gray-900">Deskripsi & Detail</span>
                {showDescription ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {showDescription && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="text-gray-600 text-sm leading-relaxed whitespace-pre-line pb-4"
                >
                  {gig.description}
                </motion.div>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* Shipping Accordion */}
            <div>
              <button
                onClick={() => setShowShipping(!showShipping)}
                className="w-full flex items-center justify-between py-3"
              >
                <span className="font-medium text-gray-900">Info Pengiriman</span>
                {showShipping ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {showShipping && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-3 pb-4"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FiTruck className="w-5 h-5 text-gray-400" />
                    <span>{gig.shipping.delivery}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FiRefreshCw className="w-5 h-5 text-gray-400" />
                    <span>{gig.shipping.revision}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FiShield className="w-5 h-5 text-gray-400" />
                    <span>Garansi uang kembali</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Rating & Reviews Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Rating & Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Rating Summary */}
            <div className="flex items-start gap-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold text-gray-900">{gig.rating}</span>
                  <span className="text-2xl text-gray-400">/5</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(gig.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">({gig.totalReviews} Total Reviews)</p>
              </div>

              {/* Rating Bars */}
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-2">
              {gig.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start gap-4">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{review.user.name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-2">{review.comment}</p>

                      {/* Review Images */}
                      {review.images && (
                        <div className="flex gap-2 mt-3">
                          {review.images.map((img, i) => (
                            <div key={i} className="w-16 h-16 rounded-lg overflow-hidden">
                              <Image src={img} alt="" width={64} height={64} className="object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Mungkin Kamu Juga Suka</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gig.relatedGigs.map((relatedGig) => (
              <Link key={relatedGig.id} href={`/gig/${relatedGig.id}`} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={relatedGig.image}
                    alt={relatedGig.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {relatedGig.title}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`w-3 h-3 ${i < Math.floor(relatedGig.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({relatedGig.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Rp {relatedGig.price.toLocaleString('id-ID')}</span>
                  {relatedGig.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">Rp {relatedGig.oldPrice.toLocaleString('id-ID')}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
