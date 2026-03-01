"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// Freelancer content when card is expanded
const FreelancerContent = ({
    title,
    description,
    skills
}: {
    title: string;
    description: string;
    skills: string[]
}) => {
    return (
        <div className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 text-base md:text-xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700">{title}</span>{" "}
                {description}
            </p>
            <div className="mt-6">
                <p className="font-semibold text-neutral-700 mb-3">Skills yang dicari:</p>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-8 p-6 bg-white rounded-2xl">
                <p className="font-semibold text-neutral-700 mb-2">💰 Range Harga</p>
                <p className="text-2xl font-bold text-emerald-600">Rp 50.000 - Rp 500.000</p>
                <p className="text-sm text-gray-500 mt-1">Tergantung kompleksitas project</p>
            </div>
        </div>
    );
};

// Freelancer types data
const freelancerTypes = [
    {
        category: "Development",
        title: "Full Stack Developer",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        content: (
            <FreelancerContent
                title="Full Stack Developer"
                description="adalah profesional yang menguasai pengembangan frontend dan backend. Mereka dapat membangun aplikasi web dari awal hingga selesai, mulai dari desain UI hingga database dan server."
                skills={["React", "Node.js", "Python", "MongoDB", "PostgreSQL", "TypeScript"]}
            />
        ),
    },
    {
        category: "Design",
        title: "UI/UX Designer",
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop",
        content: (
            <FreelancerContent
                title="UI/UX Designer"
                description="fokus pada menciptakan pengalaman pengguna yang intuitif dan visual yang menarik. Mereka melakukan riset pengguna, wireframing, prototyping, dan desain interface yang user-friendly."
                skills={["Figma", "Adobe XD", "Prototyping", "User Research", "Design System"]}
            />
        ),
    },
    {
        category: "Data",
        title: "Data Analyst",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        content: (
            <FreelancerContent
                title="Data Analyst"
                description="mengumpulkan, memproses, dan melakukan analisis statistik pada data. Mereka membantu bisnis membuat keputusan berdasarkan insight dari data yang ada."
                skills={["Python", "SQL", "Tableau", "Power BI", "Excel", "Statistics"]}
            />
        ),
    },
    {
        category: "Content",
        title: "Content Writer",
        src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop",
        content: (
            <FreelancerContent
                title="Content Writer"
                description="membuat konten tertulis yang menarik untuk berbagai platform, mulai dari artikel blog, caption social media, hingga copywriting untuk iklan dan website."
                skills={["SEO Writing", "Copywriting", "Creative Writing", "Social Media", "Research"]}
            />
        ),
    },
    {
        category: "Video",
        title: "Video Editor",
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
        content: (
            <FreelancerContent
                title="Video Editor"
                description="mengolah footage mentah menjadi video yang engaging dan profesional. Mereka menguasai teknik editing, color grading, motion graphics, dan sound design."
                skills={["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Color Grading"]}
            />
        ),
    },
    {
        category: "Marketing",
        title: "Digital Marketer",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        content: (
            <FreelancerContent
                title="Digital Marketer"
                description="merencanakan dan mengeksekusi strategi pemasaran digital untuk meningkatkan brand awareness dan konversi melalui berbagai channel online."
                skills={["Google Ads", "Meta Ads", "SEO", "Analytics", "Email Marketing", "Social Media"]}
            />
        ),
    },
];

export default function FreelancerCarousel() {
    const cards = freelancerTypes.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Left Side Text */}
            <div className="lg:w-80 flex-shrink-0 px-4 sm:px-6 lg:px-8 lg:pl-8 mb-8 lg:mb-0 lg:pt-16">
                <div className="lg:sticky lg:top-32">
                    <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full mb-4">
                        KATEGORI FREELANCER
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Temukan
                        <br />
                        Talent
                        <br />
                        <span className="text-emerald-600">Terbaik</span>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        Pilih dari berbagai kategori freelancer profesional sesuai kebutuhan projectmu.
                        Setiap talent sudah terverifikasi dengan portfolio dan rating.
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-5xl font-bold text-emerald-600">6</span>
                        <span className="text-gray-500 text-sm">Kategori<br />Tersedia</span>
                    </div>
                </div>
            </div>

            {/* Right Side Carousel */}
            <div className="flex-1 overflow-hidden">
                <Carousel items={cards} />
            </div>
        </div>
    );
}
