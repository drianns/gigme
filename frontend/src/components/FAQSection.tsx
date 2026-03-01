"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import "./ui/AnimatedList.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FAQItem {
    question: string;
    answer: string;
}

const AnimatedFAQItem = ({
    item,
    index,
    isOpen,
    onToggle,
    delay = 0,
}: {
    item: FAQItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
    delay?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.3, once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: delay * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="animated-item"
        >
            <div
                className={`bg-white rounded-2xl border ${isOpen ? "border-emerald-200 shadow-lg" : "border-gray-100"
                    } overflow-hidden transition-all duration-300`}
            >
                {/* Question Header */}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                    <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        <FiChevronDown className="w-5 h-5" />
                    </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="px-5 pb-5 pt-0">
                                <div className="h-px bg-gray-100 mb-4" />
                                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// FAQ Data
const faqData: FAQItem[] = [
    {
        question: "Apa itu GigMe?",
        answer:
            "GigMe adalah platform freelance marketplace yang dirancang khusus untuk Gen Z Indonesia. Di sini, kamu bisa jual atau beli berbagai jasa digital seperti desain grafis, video editing, programming, content writing, dan masih banyak lagi dengan harga yang terjangkau.",
    },
    {
        question: "Bagaimana cara mendaftar di GigMe?",
        answer:
            "Pendaftaran di GigMe sangat mudah! Kamu bisa daftar menggunakan email, Google, atau akun sosial media lainnya. Prosesnya hanya membutuhkan beberapa detik dan kamu langsung bisa mulai menjelajahi atau menawarkan jasa.",
    },
    {
        question: "Apakah pembayaran di GigMe aman?",
        answer:
            "Ya, sangat aman! Kami menggunakan sistem escrow dimana uang pembayaran akan ditahan terlebih dahulu oleh GigMe. Dana baru akan diteruskan ke freelancer setelah buyer konfirmasi bahwa pekerjaan sudah selesai dengan baik.",
    },
    {
        question: "Berapa biaya untuk menggunakan GigMe?",
        answer:
            "Pendaftaran dan browsing di GigMe gratis! Kami hanya mengambil fee sebesar 10% dari setiap transaksi yang berhasil. Harga jasa mulai dari Rp 10.000, jadi sangat terjangkau untuk mahasiswa dan UMKM.",
    },
    {
        question: "Bagaimana jika saya tidak puas dengan hasil pekerjaan?",
        answer:
            "Kami punya sistem revisi dan dispute resolution. Setiap paket gig memiliki jumlah revisi tertentu yang bisa kamu gunakan. Jika masih ada masalah, tim support kami siap membantu menyelesaikan dispute secara adil.",
    },
    {
        question: "Apakah saya bisa menjadi freelancer di GigMe?",
        answer:
            "Tentu saja! Siapapun dengan skill digital bisa menjadi freelancer di GigMe. Cukup daftar, buat profil, dan mulai posting gig kamu. Tidak ada biaya untuk membuat akun freelancer.",
    },
    {
        question: "Berapa lama waktu pengerjaan rata-rata?",
        answer:
            "Waktu pengerjaan bervariasi tergantung jenis dan kompleksitas pekerjaan. Biasanya berkisar antara 1-7 hari. Setiap gig memiliki informasi estimasi waktu pengerjaan yang jelas sebelum kamu memesan.",
    },
    {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
            "GigMe mendukung berbagai metode pembayaran termasuk transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, DANA, ShopeePay), dan kartu kredit/debit. Semua metode aman dan terenkripsi.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side - Title */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                        <span className="text-sm font-medium text-emerald-600 mb-4 block">
                            Frequently asked questions
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Frequently asked<br />
                            <span className="text-emerald-600">questions</span>
                        </h2>
                        <p className="text-gray-600">
                            Pilih pertanyaan yang sesuai dengan kebutuhanmu. Tidak ada biaya tersembunyi—hanya jawaban yang jelas untuk manajemen freelance yang mudah.
                        </p>
                    </div>

                    {/* Right Side - FAQ List */}
                    <div className="lg:col-span-8">
                        <div className="space-y-4">
                            {faqData.map((item, index) => (
                                <AnimatedFAQItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    isOpen={openIndex === index}
                                    onToggle={() => handleToggle(index)}
                                    delay={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
