'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy data for user profile
const user = {
  id: 1,
  username: 'andidesigner',
  name: 'Andi Designer',
  avatar: '/images/avatar-1.jpg',
  coverImage: '/images/cover-image.jpg',
  bio: 'Graphic designer dengan pengalaman 3 tahun di bidang branding dan logo design. Saya membantu brand kamu untuk tampil lebih profesional dengan desain yang minimalis dan modern.',
  location: 'Jakarta, Indonesia',
  memberSince: 'Januari 2023',
  languages: ['Indonesia', 'English'],
  skills: ['Logo Design', 'Brand Identity', 'UI/UX', 'Illustration'],
  stats: {
    level: 2,
    rating: 4.9,
    reviewCount: 124,
    completedOrders: 98,
    onTimeDelivery: '100%',
    responseTime: '1 jam',
    followers: 256,
    following: 124,
  },
  gigs: [
    {
      id: 1,
      title: 'Desain logo minimalis untuk brand kamu',
      slug: 'desain-logo-minimalis',
      image: '/images/gig-1.jpg',
      startingPrice: 50000,
      reviewCount: 124,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Desain feed Instagram aesthetic',
      slug: 'desain-feed-instagram',
      image: '/images/gig-5.jpg',
      startingPrice: 100000,
      reviewCount: 87,
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Desain banner dan thumbnail YouTube',
      slug: 'desain-banner-youtube',
      image: '/images/gig-9.jpg',
      startingPrice: 75000,
      reviewCount: 56,
      rating: 4.7,
    },
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: 'Budi',
        avatar: '/images/review-avatar-1.jpg',
      },
      rating: 5,
      date: '2 minggu yang lalu',
      comment: 'Keren banget hasilnya! Sesuai dengan ekspektasi dan revisi cepat. Recommended seller!',
    },
    {
      id: 2,
      user: {
        name: 'Citra',
        avatar: '/images/review-avatar-2.jpg',
      },
      rating: 4,
      date: '1 bulan yang lalu',
      comment: 'Bagus hasilnya, tapi agak lama responnya. Overall puas dengan hasil akhirnya.',
    },
  ],
  portfolio: [
    {
      id: 1,
      title: 'Logo Design for Coffee Shop',
      image: '/images/portfolio-1.jpg',
      likes: 124,
    },
    {
      id: 2,
      title: 'Brand Identity for Fashion Brand',
      image: '/images/portfolio-2.jpg',
      likes: 98,
    },
    {
      id: 3,
      title: 'UI Design for Mobile App',
      image: '/images/portfolio-3.jpg',
      likes: 156,
    },
    {
      id: 4,
      title: 'Illustration for Children Book',
      image: '/images/portfolio-4.jpg',
      likes: 87,
    },
  ],
};

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState('gigs');
  const [isFollowing, setIsFollowing] = useState(false);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src={user.coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative -mt-16 sm:-mt-24 mb-6 flex flex-col sm:flex-row sm:items-end sm:space-x-5">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden ring-4 ring-white">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 truncate">{user.name}</h1>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => window.location.href = '/messages/new?username=' + user.username}
                >
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Chat
                </button>
                <button
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    isFollowing 
                      ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50' 
                      : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user.location}
              </div>
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Member since {user.memberSince}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{user.stats.rating}</div>
            <div className="text-sm text-gray-500">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{user.stats.reviewCount}</div>
            <div className="text-sm text-gray-500">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{user.stats.followers}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">Level {user.stats.level}</div>
            <div className="text-sm text-gray-500">Seller Level</div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">About Me</h2>
          <p className="text-gray-700 mb-4">{user.bio}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((language, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                    {language}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'gigs'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('gigs')}
              >
                Gigs
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'portfolio'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('portfolio')}
              >
                Portfolio
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Gigs Tab */}
            {activeTab === 'gigs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.gigs.map((gig) => (
                  <div key={gig.id} className="bg-white rounded-lg shadow overflow-hidden border">
                    <Link href={`/gig/${gig.slug}`} className="block">
                      <div className="relative h-48">
                        <Image
                          src={gig.image}
                          alt={gig.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <h3 className="font-medium mb-2 line-clamp-2">
                        <Link href={`/gig/${gig.slug}`} className="hover:text-indigo-600">
                          {gig.title}
                        </Link>
                      </h3>
                      <div className="flex items-center text-sm text-yellow-500 mb-2">
                        ★ {gig.rating} <span className="text-gray-600 ml-1">({gig.reviewCount})</span>
                      </div>
                      <div className="text-right font-medium">
                        Mulai <span className="text-lg">Rp {gig.startingPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.portfolio.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden border">
                    <div className="relative h-64">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <div className="flex items-center text-white text-sm mt-1">
                          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                          </svg>
                          {item.likes} likes
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <button className="text-gray-500 hover:text-red-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-indigo-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {user.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={review.user.avatar}
                          alt={review.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{review.user.name}</div>
                        <div className="flex items-center">
                          <div className="text-yellow-500">
                            {'★'.repeat(review.rating)}
                            {'☆'.repeat(5 - review.rating)}
                          </div>
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
