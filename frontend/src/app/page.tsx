'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiDollarSign, FiClock, FiShield, FiStar, FiCode, FiPenTool, FiVideo, FiEdit3, FiMusic, FiTrendingUp } from 'react-icons/fi';
import GigCard from '@/components/ui/GigCard';
import SplitText from '@/components/ui/SplitText';
import GradientText from '@/components/ui/GradientText';
import FreelancerCarousel from '@/components/FreelancerCarousel';
import FreelancerPortfolios from '@/components/FreelancerPortfolios';
import KeunggulanGigMe from '@/components/KeunggulanGigMe';
import FAQSection from '@/components/FAQSection';

// Dummy data for featured gigs
const featuredGigs = [
  {
    id: 1,
    title: 'Desain logo minimalis untuk brand kamu',
    image: '/images/gig-1.jpg',
    sellerName: 'Andi Designer',
    sellerAvatar: '/images/avatar-1.jpg',
    price: 50000,
    rating: 4.9,
    category: 'Design',
  },
  {
    id: 2,
    title: 'Edit video TikTok dan Reels yang viral',
    image: '/images/gig-2.jpg',
    sellerName: 'Budi Editor',
    sellerAvatar: '/images/avatar-2.jpg',
    price: 75000,
    rating: 4.7,
    category: 'Video',
  },
  {
    id: 3,
    title: 'Tulis caption Instagram yang menarik',
    image: '/images/gig-3.jpg',
    sellerName: 'Citra Writer',
    sellerAvatar: '/images/avatar-3.jpg',
    price: 25000,
    rating: 4.8,
    category: 'Writing',
  },
  {
    id: 4,
    title: 'Buat website landing page profesional',
    image: '/images/gig-1.jpg',
    sellerName: 'Deni Dev',
    sellerAvatar: '/images/avatar-1.jpg',
    price: 150000,
    rating: 5.0,
    category: 'Programming',
  },
];

// Categories data
const categories = [
  { id: 1, name: 'Design & Graphics', icon: FiPenTool, count: 250, color: '#8b5cf6' },
  { id: 2, name: 'Video & Animation', icon: FiVideo, count: 180, color: '#ec4899' },
  { id: 3, name: 'Writing & Content', icon: FiEdit3, count: 120, color: '#f59e0b' },
  { id: 4, name: 'Programming', icon: FiCode, count: 200, color: '#10b981' },
  { id: 5, name: 'Music & Audio', icon: FiMusic, count: 90, color: '#3b82f6' },
  { id: 6, name: 'Digital Marketing', icon: FiTrendingUp, count: 150, color: '#ef4444' },
];

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <SplitText
                  text="Temukan Freelancer"
                  tag="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  delay={50}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-50px"
                  textAlign="left"
                />
                <div className="flex items-baseline gap-3">
                  <GradientText
                    colors={["#10b981", "#059669", "#34d399", "#10b981"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  >
                    Terbaik
                  </GradientText>
                  <SplitText
                    text="untuk"
                    tag="span"
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                    delay={50}
                    duration={0.8}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-50px"
                    textAlign="left"
                  />
                </div>
                <SplitText
                  text="Projectmu"
                  tag="span"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  delay={50}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-50px"
                  textAlign="left"
                />
              </div>

              <p className="text-lg text-gray-600 max-w-lg">
                Platform freelance micro-jobs untuk Gen Z Indonesia.
                Temukan jasa dengan harga terjangkau mulai 10K dan waktu pengerjaan cepat 1-3 hari.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full transition-all hover:bg-gray-800 hover:scale-105 shadow-lg"
                >
                  Jelajahi Gigs
                  <FiArrowRight />
                </Link>
                <Link
                  href="/become-seller"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-full transition-all hover:bg-gray-100"
                >
                  Jadi Seller
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-gray-900">524<span className="text-emerald-600">+</span></p>
                  <p className="text-sm text-gray-500">Freelancer Aktif</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">12<span className="text-emerald-600">+</span></p>
                  <p className="text-sm text-gray-500">Kategori</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">1.8K<span className="text-emerald-600">+</span></p>
                  <p className="text-sm text-gray-500">Transaksi Sukses</p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-emerald-100 rounded-3xl rotate-6"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gray-100 rounded-3xl -rotate-6"></div>

                {/* Main image container */}
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-freelancer.jpg"
                    alt="Freelancer working on laptop"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <FiStar className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">4.8 Rating</p>
                      <p className="text-sm text-gray-500">Rata-rata</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freelancer Types Carousel Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <FreelancerCarousel />
      </section>

      {/* Freelancer Portfolio Parallax Section */}
      <section className="bg-white">
        <FreelancerPortfolios />
      </section>

      {/* Popular Gigs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Gigs <span className="text-emerald-600">Populer</span>
              </h2>
              <p className="text-gray-600 mt-2">Layanan terbaik dari freelancer kami</p>
            </div>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Lihat Semua
              <FiArrowRight />
            </Link>
          </div>

          {/* Gigs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGigs.map((gig, index) => (
              <GigCard key={gig.id} gig={gig} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan GigMe Section */}
      <KeunggulanGigMe />

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}
