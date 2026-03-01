"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { FiStar, FiMessageCircle, FiBookmark } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";

interface GigCardProps {
    gig: {
        id: number;
        title: string;
        image: string;
        sellerName: string;
        sellerAvatar: string;
        price: number;
        rating: number;
        category: string;
    };
    index: number;
}

// Dummy freelancer photos
const dummyPhotos = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
];

export default function GigCard({ gig, index }: GigCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Get dummy photo based on index
    const freelancerPhoto = dummyPhotos[index % dummyPhotos.length];

    // Random earned amount for demo
    const earnedAmount = ["$25k+", "$45k+", "$30k+", "$50k+"][index % 4];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            <Link
                href={`/gig/${gig.id}`}
                className="group block relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
                {/* Full Photo Background */}
                <div className="relative h-[420px] w-full">
                    <Image
                        src={freelancerPhoto}
                        alt={gig.sellerName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                        {/* Name with Verified Badge */}
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-white">
                                {gig.sellerName}
                            </h3>
                            <HiCheckBadge className="w-5 h-5 text-emerald-400" />
                        </div>

                        {/* Description with Blur Background */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 mb-4">
                            <p className="text-white/90 text-sm line-clamp-2">
                                {gig.title}
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-center">
                                <div className="flex items-center gap-1">
                                    <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-white font-bold">{gig.rating}</span>
                                </div>
                                <p className="text-white/60 text-xs">Rating</p>
                            </div>
                            <div className="text-center">
                                <span className="text-white font-bold">{earnedAmount}</span>
                                <p className="text-white/60 text-xs">Earned</p>
                            </div>
                            <div className="text-center">
                                <span className="text-white font-bold">Rp {(gig.price / 1000).toFixed(0)}k</span>
                                <p className="text-white/60 text-xs">/hr</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white py-3 px-4 rounded-full text-sm font-medium transition-colors border border-white/20">
                                <FiMessageCircle className="w-4 h-4" />
                                Get In Touch
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-colors border border-white/20">
                                <FiBookmark className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
