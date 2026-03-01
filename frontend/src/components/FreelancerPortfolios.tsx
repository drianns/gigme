"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

// Portfolio data - these will link to freelancer profiles
const portfolios = [
    {
        title: "E-Commerce Dashboard",
        link: "/freelancer/andi-developer",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        freelancer: "Andi Developer",
        category: "Web Development",
    },
    {
        title: "Brand Identity Design",
        link: "/freelancer/bella-designer",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
        freelancer: "Bella Designer",
        category: "Graphic Design",
    },
    {
        title: "Mobile App UI Kit",
        link: "/freelancer/citra-uiux",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        freelancer: "Citra UI/UX",
        category: "UI/UX Design",
    },
    {
        title: "Marketing Analytics Dashboard",
        link: "/freelancer/deni-analyst",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        freelancer: "Deni Analyst",
        category: "Data Analytics",
    },
    {
        title: "Social Media Content Pack",
        link: "/freelancer/eka-content",
        thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop",
        freelancer: "Eka Content",
        category: "Content Creation",
    },
    {
        title: "Corporate Video Production",
        link: "/freelancer/farhan-video",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        freelancer: "Farhan Video",
        category: "Video Editing",
    },
    {
        title: "Landing Page Design",
        link: "/freelancer/gita-webdev",
        thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
        freelancer: "Gita WebDev",
        category: "Web Development",
    },
    {
        title: "Logo Collection 2024",
        link: "/freelancer/hadi-designer",
        thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
        freelancer: "Hadi Designer",
        category: "Logo Design",
    },
    {
        title: "Financial Report Visualization",
        link: "/freelancer/indah-data",
        thumbnail: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800&auto=format&fit=crop",
        freelancer: "Indah Data",
        category: "Data Visualization",
    },
    {
        title: "YouTube Thumbnail Pack",
        link: "/freelancer/joko-creative",
        thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop",
        freelancer: "Joko Creative",
        category: "Thumbnail Design",
    },
    {
        title: "React Native App",
        link: "/freelancer/kiki-mobile",
        thumbnail: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop",
        freelancer: "Kiki Mobile",
        category: "Mobile Development",
    },
    {
        title: "Podcast Cover Art",
        link: "/freelancer/luna-ilustrator",
        thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
        freelancer: "Luna Ilustrator",
        category: "Illustration",
    },
    {
        title: "SEO Campaign Results",
        link: "/freelancer/mega-marketing",
        thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
        freelancer: "Mega Marketing",
        category: "Digital Marketing",
    },
    {
        title: "3D Product Rendering",
        link: "/freelancer/nando-3d",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
        freelancer: "Nando 3D",
        category: "3D Design",
    },
    {
        title: "WordPress Theme",
        link: "/freelancer/olga-developer",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        freelancer: "Olga Developer",
        category: "WordPress",
    },
];

export default function FreelancerPortfolios() {
    return (
        <HeroParallax
            products={portfolios}
            title={
                <>
                    Lihat Karya <br />
                    <span className="text-emerald-600">Freelancer Kami</span>
                </>
            }
            subtitle="PORTFOLIO FREELANCER"
            description="Telusuri portfolio dari freelancer berbakat kami. Klik untuk melihat profile dan karya-karya mereka yang menginspirasi."
        />
    );
}
