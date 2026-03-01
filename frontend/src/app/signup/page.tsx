'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, LayoutGroup } from 'motion/react';
import { FiEye, FiEyeOff, FiChevronDown, FiArrowLeft } from 'react-icons/fi';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Checkbox } from '@/components/animate-ui/components/radix/checkbox';
import { LanguageSelector } from '@/components/auth/LanguageSelector';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

function SignupContent() {
  const { dict } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fullName, email, phone, password, agreeTerms });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4 lg:p-8 relative">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-[#00c569] transition-colors font-medium text-sm group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        {dict.signup.backToHome}
      </Link>

      {/* Container Card - Standard Layout */}
      <div
        className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-xl flex flex-col lg:flex-row min-h-[700px]"
      >
        {/* Left Side - Illustration */}
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

        {/* Right Side - Form */}
        <motion.div
          layoutId="auth-form-container"
          className="lg:w-[55%] bg-white p-8 lg:px-16 lg:py-10 flex flex-col overflow-y-auto"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header Actions */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          <div className="flex-1 max-w-sm mx-auto w-full flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{dict.signup.title}</h1>
              <p className="text-sm text-gray-400">
                {dict.signup.subtitle.split('freelancer')[0]} <span className="text-gray-300">{dict.signup.subtitle.split('dan')[1] || 'freelancer.'}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dict.signup.nameLabel}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={dict.signup.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-100 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00c569]/20 focus:border-[#00c569] transition-all text-sm text-gray-700"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dict.signup.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.signup.emailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-100 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00c569]/20 focus:border-[#00c569] transition-all text-sm text-gray-700"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dict.signup.phoneLabel}</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-3 border border-r-0 border-gray-100 rounded-l-lg bg-gray-100 text-sm text-gray-500">
                    +62
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={dict.signup.phonePlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-100 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00c569]/20 focus:border-[#00c569] transition-all text-sm text-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dict.signup.passwordLabel}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={dict.signup.passwordPlaceholder}
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

              {/* Terms Checkbox - Animated */}
              <div className="flex items-start py-2 gap-3">
                <Checkbox
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  variant="default"
                  size="default"
                  className="mt-1 data-[state=checked]:bg-[#00c569] data-[state=checked]:border-[#00c569]"
                />
                <label
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className="cursor-pointer text-xs font-medium text-gray-500 leading-relaxed select-none"
                >
                  {dict.signup.termsStart}<Link href="#" className="text-[#00c569] font-bold hover:underline">{dict.signup.termsLink}</Link>{dict.signup.and}<Link href="#" className="text-[#00c569] font-bold hover:underline">{dict.signup.privacyLink}</Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#00c569] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-[#00b05e] transition-all shadow-lg shadow-[#00c569]/20 active:scale-[0.98]"
              >
                {dict.signup.button}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="w-full border-t border-gray-100" />
              <span className="absolute bg-white px-4 text-[10px] font-bold text-gray-300 uppercase">{dict.signup.or}</span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                <FaFacebook className="text-[#3b5998] text-lg" />
                <span className="text-xs font-bold text-gray-600">{dict.signup.facebook}</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                <FaGoogle className="text-[#ea4335] text-lg" />
                <span className="text-xs font-bold text-gray-600">{dict.signup.google}</span>
              </button>
            </div>

            {/* Links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 font-medium tracking-tight">
                {dict.signup.hasAccount}{' '}
                <Link href="/login" className="text-[#00c569] font-bold hover:underline">{dict.signup.loginLink}</Link>
              </p>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="mt-auto pt-10 text-center">
            <p className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">
              {dict.signup.footer}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <LanguageProvider>
      <LayoutGroup>
        <SignupContent />
      </LayoutGroup>
    </LanguageProvider>
  );
}
