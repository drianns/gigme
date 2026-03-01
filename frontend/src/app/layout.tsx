import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GigMe - Fiverr meets TikTok for Indonesian Gen Z",
  description: "Platform freelance micro-jobs yang dirancang khusus untuk Gen Z di Indonesia",
  keywords: ["freelance", "micro-jobs", "Gen Z", "Indonesia", "design", "editing", "coding", "writing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
