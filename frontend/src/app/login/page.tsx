'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, LayoutGroup } from 'motion/react';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Checkbox } from '@/components/animate-ui/components/radix/checkbox';
import { LanguageSelector } from '@/components/auth/LanguageSelector';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

function LoginContent() {
  const { dict } = useLanguage(); // Consume Dictionary
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4 lg:p-8 relative">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-[#00c569] transition-colors font-medium text-sm group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        {dict.login.backToHome}
      </Link>

      {/* Container Card - Swapped Layout */}
      <div
        className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-xl flex flex-col lg:flex-row-reverse min-h-[650px]"
      >
        {/* RIGHT Side (was left) - Illustration */}
        <motion.div
          layoutId="auth-image-container"
          className="lg:w-[45%] bg-[#ebf2ff] relative flex flex-col p-8"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-12 relative z-10">
            <div className="w-8 h-8 bg-[#00c569] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base">G</span>
            </div>
            <span className="text-xl font-bold text-[#1f2937]">GigMe</span>
          </Link>

          {/* 3D Character Container */}
          <div className="flex-1 flex items-center justify-center scale-110 relative z-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full max-h-[400px]"
            >
              <Image
                src="/images/3d-person.png"
                alt="3D Character"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </motion.div>

        {/* LEFT Side (was right) - Form */}
        <motion.div
          layoutId="auth-form-container"
          className="lg:w-[55%] bg-white p-8 lg:p-12 flex flex-col"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header Actions */}
          <div className="flex justify-end mb-8">
            <LanguageSelector />
          </div>

          <div className="flex-1 max-w-sm mx-auto w-full flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{dict.login.title}</h1>
              <p className="text-sm text-gray-400">
                {dict.login.subtitle.split('! ')[0]}! <span className="text-gray-300">{dict.login.subtitle.split('! ')[1]}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{dict.login.emailLabel}</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.login.emailPlaceholder}
                    className="w-full px-4 py-3 border border-gray-100 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00c569]/20 focus:border-[#00c569] transition-all text-sm text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{dict.login.passwordLabel}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={dict.login.passwordPlaceholder}
                    className="w-full px-4 py-3 border border-gray-100 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00c569]/20 focus:border-[#00c569] transition-all text-sm text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  variant="default"
                  size="default"
                  className="data-[state=checked]:bg-[#00c569] data-[state=checked]:border-[#00c569]"
                />
                <label
                  onClick={() => setRememberMe(!rememberMe)}
                  className="cursor-pointer text-sm font-medium text-gray-600 select-none"
                >
                  {dict.login.rememberMe}
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#00c569] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-[#00b05e] transition-all shadow-lg shadow-[#00c569]/20 active:scale-[0.98]"
              >
                {dict.login.button}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-8">
              <div className="w-full border-t border-gray-100" />
              <span className="absolute bg-white px-4 text-xs text-gray-400">{dict.login.or}</span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                <FaFacebook className="text-[#3b5998] text-lg" />
                <span className="text-xs font-bold text-gray-600">{dict.login.facebook}</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                <FaGoogle className="text-[#ea4335] text-lg" />
                <span className="text-xs font-bold text-gray-600">{dict.login.google}</span>
              </button>
            </div>

            {/* Links */}
            <div className="mt-10 text-center space-y-4">
              <p className="text-sm text-gray-600 font-medium">
                {dict.login.noAccount}{' '}
                <Link href="/signup" className="text-[#00c569] font-bold hover:underline">{dict.login.signupLink}</Link>
              </p>
              <Link href="/forgot" className="block text-xs font-bold text-[#00c569] hover:underline">
                {dict.login.forgotPassword}
              </Link>
            </div>
          </div>

          <div className="mt-auto pt-8 text-center">
            <p className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">
              {dict.login.footer}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <LanguageProvider>
      <LayoutGroup>
        <LoginContent />
      </LayoutGroup>
    </LanguageProvider>
  );
}
