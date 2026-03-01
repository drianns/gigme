"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "motion/react";
import {
    FiZap,
    FiShield,
    FiSmartphone,
    FiUsers,
    FiDollarSign
} from "react-icons/fi";
import DecryptedText from "@/components/ui/DecryptedText";

// Animated skeleton components for visual appeal
const SkeletonOne = () => {
    const variants = {
        initial: { x: 0 },
        animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
    };
    const variantsSecond = {
        initial: { x: 0 },
        animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-emerald-200 p-2 items-center space-x-2 bg-white"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shrink-0" />
                <div className="w-full bg-emerald-100 h-4 rounded-full" />
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-emerald-200 p-2 items-center space-x-2 w-3/4 ml-auto bg-white"
            >
                <div className="w-full bg-emerald-100 h-4 rounded-full" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shrink-0" />
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-emerald-200 p-2 items-center space-x-2 bg-white"
            >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shrink-0" />
                <div className="w-full bg-emerald-100 h-4 rounded-full" />
            </motion.div>
        </motion.div>
    );
};

const SkeletonTwo = () => {
    const variants = {
        initial: { width: 0 },
        animate: { width: "100%", transition: { duration: 0.2 } },
        hover: { width: ["0%", "100%"], transition: { duration: 2 } },
    };
    // Use deterministic widths instead of Math.random() to prevent SSR hydration mismatch
    const widths = [72, 45, 88, 65, 55, 90];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2"
        >
            {widths.map((width, i) => (
                <motion.div
                    key={"skeleton-two" + i}
                    variants={variants}
                    style={{ maxWidth: width + "%" }}
                    className="flex flex-row rounded-full border border-blue-200 p-2 items-center space-x-2 bg-blue-50 w-full h-4"
                />
            ))}
        </motion.div>
    );
};


const SkeletonThree = () => {
    const variants = {
        initial: { scale: 1 },
        animate: { scale: 1.05, transition: { duration: 0.3 } },
    };
    const variantsSecond = {
        initial: { y: 0 },
        animate: { y: -5, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex-col items-center justify-center p-4 space-y-2"
        >
            <motion.div
                variants={variantsSecond}
                className="flex items-center gap-2"
            >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">Rp</span>
                </div>
                <motion.span
                    variants={variants}
                    className="text-2xl font-bold text-emerald-600"
                >
                    10.000
                </motion.span>
            </motion.div>
            <div className="flex items-center gap-2 mt-2">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-2 bg-emerald-200 rounded-full w-16"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-2 bg-teal-200 rounded-full w-12"
                />
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-2 bg-emerald-300 rounded-full w-8"
                />
            </div>
            <p className="text-xs text-emerald-600 font-medium">Mulai dari</p>
        </motion.div>
    );
};

const SkeletonFour = () => {
    const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
    const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-row space-x-2"
        >
            <motion.div
                variants={first}
                className="h-full w-1/3 rounded-2xl bg-white p-4 border border-gray-200 flex flex-col items-center justify-center"
            >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <span className="text-xl">🇮🇩</span>
                </div>
                <p className="text-xs text-center font-medium text-gray-500">Indonesia</p>
            </motion.div>
            <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 border border-gray-200 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                    <span className="text-xl">💰</span>
                </div>
                <p className="text-xs text-center font-medium text-emerald-600">Escrow</p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-white p-4 border border-gray-200 flex flex-col items-center justify-center"
            >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <span className="text-xl">⭐</span>
                </div>
                <p className="text-xs text-center font-medium text-gray-500">Verified</p>
            </motion.div>
        </motion.div>
    );
};

const SkeletonFive = () => {
    const variants = {
        initial: { x: 0 },
        animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
    };
    const variantsSecond = {
        initial: { x: 0 },
        animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-purple-200 p-2 items-start space-x-2 bg-white"
            >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <span>💬</span>
                </div>
                <p className="text-xs text-gray-500">
                    Hai, saya butuh desain logo untuk startup saya...
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-emerald-200 p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white"
            >
                <p className="text-xs text-emerald-600">Siap! Deadline 2 hari ✓</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shrink-0" />
            </motion.div>
        </motion.div>
    );
};

// Keunggulan GigMe items
const items = [
    {
        title: "Pendaftaran Cepat",
        description: (
            <span className="text-sm">
                Daftar dalam hitungan detik dengan email atau akun sosial media. Langsung mulai jual atau beli jasa.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <FiZap className="h-4 w-4 text-emerald-500" />,
    },
    {
        title: "Akses Mudah",
        description: (
            <span className="text-sm">
                Platform responsif yang bisa diakses dari mana saja, kapan saja melalui browser atau aplikasi.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <FiSmartphone className="h-4 w-4 text-blue-500" />,
    },
    {
        title: "Harga Terjangkau",
        description: (
            <span className="text-sm">
                Mulai dari Rp 10.000. Sesuai untuk budget mahasiswa dan UMKM Indonesia.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <FiDollarSign className="h-4 w-4 text-emerald-500" />,
    },
    {
        title: "Pembayaran Aman",
        description: (
            <span className="text-sm">
                Sistem escrow yang melindungi buyer dan seller. Uang aman sampai pekerjaan selesai dengan baik.
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <FiShield className="h-4 w-4 text-amber-500" />,
    },
    {
        title: "Komunitas Gen Z",
        description: (
            <span className="text-sm">
                Bergabung dengan ribuan freelancer muda Indonesia. Chat langsung dan kolaborasi dengan mudah.
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <FiUsers className="h-4 w-4 text-purple-500" />,
    },
];

export default function KeunggulanGigMe() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Keunggulan <span className="text-emerald-600"><DecryptedText text="GigMe" animateOn="view" speed={60} maxIterations={15} /></span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Platform freelance yang dirancang khusus untuk Gen Z Indonesia dengan fitur-fitur yang memudahkan
                    </p>
                </div>

                <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={cn("[&>p:text-lg]", item.className)}
                            icon={item.icon}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
