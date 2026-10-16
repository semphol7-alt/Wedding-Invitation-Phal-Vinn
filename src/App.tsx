/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Share2, Mail, Sparkles, Heart } from 'lucide-react';
import defaultCouplePhoto from './assets/images/khmer_wedding_couple_1792157328614.jpg';
import archBg from './assets/images/soft_pink_orchid_arch_1792159771072.jpg';
import { WEDDING_DATA } from './utils/khmerHelpers';
import { WeddingMusicPlayer } from './components/WeddingMusicPlayer';
import { EnvelopeModal } from './components/EnvelopeModal';
import { CountdownTimer } from './components/CountdownTimer';
import { ProgramSchedule } from './components/ProgramSchedule';
import { LocationMap } from './components/LocationMap';
import { WeddingPhotoGallery } from './components/WeddingPhotoGallery';
import { GuestbookWishes } from './components/GuestbookWishes';
import { KhmerWeddingKHQR } from './components/KhmerWeddingKHQR';
import { PhotoCustomizer } from './components/PhotoCustomizer';
import { ShareModal } from './components/ShareModal';
import { AnimatedButterfly } from './components/AnimatedButterfly';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [guestName, setGuestName] = useState<string>('');
  const [couplePhoto, setCouplePhoto] = useState<string>(defaultCouplePhoto);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Check URL query parameters for custom guest name
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('guest') || params.get('to');
      if (guestParam) {
        setGuestName(guestParam);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen relative flex flex-col justify-center items-center py-6 sm:py-10 px-3 bg-gradient-to-br from-[#fcedf2] via-[#fbf2f5] to-[#f4dce5] selection:bg-[#edd3dd] text-[#43281c]"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(252, 237, 242, 0.7) 0%, transparent 80%), url(${archBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Soft Scrim for High-Contrast Readability (ផ្កាឈូកស្រាល / ផ្កាឈូកទន់) */}
      <div className="absolute inset-0 bg-[#fdf5f8]/85 backdrop-blur-[2px] pointer-events-none" />

      {/* Floating Animated Butterflies on the sides (ដូចគំរូ 647.jpg) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute top-12 left-4 sm:left-12 opacity-85">
          <AnimatedButterfly size={36} flyAnimation="animate-butterfly-1" />
        </div>
        <div className="absolute top-1/4 right-3 sm:right-16 opacity-85">
          <AnimatedButterfly size={42} flyAnimation="animate-butterfly-2" />
        </div>
        <div className="absolute top-2/3 left-2 sm:left-10 opacity-75">
          <AnimatedButterfly size={32} flyAnimation="animate-butterfly-3" />
        </div>
        <div className="absolute bottom-16 right-6 sm:right-20 opacity-80">
          <AnimatedButterfly size={38} flyAnimation="animate-butterfly-1" />
        </div>
      </div>

      {/* Sealed Traditional Envelope Modal on First View */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
        guestName={guestName}
      />

      {/* Floating Action Controls for Navigation and Sharing */}
      <div className="no-print fixed top-4 right-4 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-[#fcf3f6] text-[#43281c] border border-[#edd3dd] text-xs font-kantumruy font-bold shadow-md hover:shadow-lg transition-all cursor-pointer backdrop-blur-sm"
          title="ចែករំលែកធៀបការ"
        >
          <Share2 className="w-3.5 h-3.5 text-[#7f5539]" />
          <span className="hidden sm:inline">ចែករំលែក</span>
        </button>

        <button
          onClick={() => setIsEnvelopeOpen(false)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-[#fcf3f6] text-[#43281c] border border-[#edd3dd] text-xs font-kantumruy font-bold shadow-md hover:shadow-lg transition-all cursor-pointer backdrop-blur-sm"
          title="មើលស្រោមសំបុត្រឡើងវិញ"
        >
          <Mail className="w-3.5 h-3.5 text-[#9c6644]" />
          <span className="hidden sm:inline">ស្រោមសំបុត្រ</span>
        </button>
      </div>

      {/* Main Wedding Invitation Container */}
      <main className="relative z-10 w-full max-w-[450px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(110,65,75,0.18)] border-2 border-[#edd3dd] overflow-hidden flex flex-col p-5 sm:p-7 text-center print-card transition-all duration-300">
        
        {/* Top Gold & Coffee Corner Ornament */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[#7f5539]">
          <span className="text-xs">✤ ❁ ✤</span>
        </div>

        {/* Header Frame - Formatted exactly like sample 644.jpg */}
        <header className="header-frame border-2 border-[#edd3dd] rounded-t-[20px] rounded-b-[70px] pt-7 pb-6 px-4 sm:px-6 bg-[#fdf8fa] mb-5 shadow-xs relative overflow-hidden">
          {/* Subtle gold-coffee floral border accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b38728] to-transparent opacity-60" />

          {/* Title: សិរីមង្គលអាពាហ៍ពិពាហ៍ */}
          <h1 className="title font-moul text-[#43281c] text-lg sm:text-[21px] mb-5 tracking-wide leading-relaxed">
            {WEDDING_DATA.title}
          </h1>

          {/* Parents 2-Column Grid (ដូចគំរូ 644.jpg) */}
          <div className="parents-grid flex justify-between text-xs sm:text-[12.5px] text-[#43281c] mb-5 leading-relaxed font-kantumruy px-1 sm:px-3">
            <div className="w-[48%] text-left">
              <div className="font-bold text-[#3d2314]">{WEDDING_DATA.groom.fatherTitle} {WEDDING_DATA.groom.father}</div>
              <div className="font-bold text-[#3d2314]">{WEDDING_DATA.groom.motherTitle} {WEDDING_DATA.groom.mother}</div>
            </div>
            <div className="w-[48%] text-right">
              <div className="font-bold text-[#3d2314]">{WEDDING_DATA.bride.fatherTitle} {WEDDING_DATA.bride.father}</div>
              <div className="font-bold text-[#3d2314]">{WEDDING_DATA.bride.motherTitle} {WEDDING_DATA.bride.mother}</div>
            </div>
          </div>

          {/* Personalized Guest Welcome Header */}
          {guestName && (
            <div className="mb-4 py-1.5 px-3.5 rounded-xl bg-[#faedf2] border border-[#ebd0dc] inline-block max-w-full">
              <span className="text-[10.5px] text-[#7f5539] font-kantumruy block">សូមគោរពអញ្ជើញ៖</span>
              <span className="text-xs sm:text-sm font-bold text-[#43281c] font-kantumruy break-words">
                {guestName}
              </span>
            </div>
          )}

          {/* Invitation Call (មានកិត្តិយសសូមគោរពអញ្ជើញ) */}
          <div className="font-moul text-xs sm:text-sm text-[#43281c] mt-2 mb-2 tracking-wide">
            {WEDDING_DATA.invitationCall}
          </div>

          {/* Formal Invitation Message (ដូចគំរូ 644.jpg) */}
          <div className="invitation-text text-[11.5px] sm:text-[12px] text-[#5e3825] leading-relaxed my-2 font-kantumruy px-1 text-center">
            {WEDDING_DATA.invitationText}
          </div>

          {/* Couple Names Section inside card frame (កូនប្រុសនាម ... ជាគូនឹង ... កូនស្រីនាម ដូចគំរូ 644.jpg) */}
          <div className="my-5 py-2 flex items-center justify-between gap-1 sm:gap-2 px-1">
            <div className="text-center flex-1">
              <span className="text-[11px] text-[#7f5539] font-kantumruy block">កូនប្រុសនាម</span>
              <span className="font-moul text-base sm:text-lg text-[#3d2314] leading-tight block mt-1">
                {WEDDING_DATA.groom.fullName}
              </span>
            </div>

            <div className="text-[11px] sm:text-xs text-[#9c6644] font-kantumruy italic px-1 shrink-0">
              ជាគូនឹង
            </div>

            <div className="text-center flex-1">
              <span className="text-[11px] text-[#7f5539] font-kantumruy block">កូនស្រីនាម</span>
              <span className="font-moul text-base sm:text-lg text-[#3d2314] leading-tight block mt-1">
                {WEDDING_DATA.bride.fullName}
              </span>
            </div>
          </div>

          {/* Date, Time & Venue (ដូចគំរូ 644.jpg) */}
          <div className="text-xs text-[#5e3825] font-kantumruy leading-relaxed pt-3 border-t border-[#edd3dd]/80 space-y-1">
            <div>នៅ{WEDDING_DATA.lunarDate}</div>
            <div className="font-bold text-[#43281c]">{WEDDING_DATA.solarDate}</div>
            <div className="font-bold text-[#7f5539]">{WEDDING_DATA.time}</div>
            <div className="text-[11px] text-[#6f4b36]">ទីតាំង៖ {WEDDING_DATA.location.address}</div>
          </div>

          <div className="scroll-hint text-[11px] text-[#7f5539] mt-3 pt-2 font-kantumruy flex items-center justify-center gap-1">
            <span>👇 ទម្លាក់ចុះក្រោមដើម្បីមើលលម្អិត 👇</span>
          </div>
        </header>

        {/* Couple Photo Container with interactive zoom / custom photo upload */}
        <PhotoCustomizer
          currentPhoto={couplePhoto}
          onPhotoChange={setCouplePhoto}
          defaultPhoto={defaultCouplePhoto}
        />

        <hr className="border-0 h-[1px] bg-[#edd3dd] my-4" />

        {/* Date & Location Section with Map / Calendar Integration */}
        <LocationMap />

        {/* Real-time Countdown to Wedding Day */}
        <CountdownTimer />

        {/* Traditional Khmer Wedding Schedule */}
        <ProgramSchedule />

        {/* Wedding Photo Gallery (វិចិត្រសាលរូបថត - ដូចគំរូ 646.jpg) */}
        <WeddingPhotoGallery />

        {/* Guestbook & Wishes Board (កន្លែងជូនពរ និង RSVP ដាក់មកវិញ) */}
        <GuestbookWishes />

        {/* KHQR Wedding Gift - ABA Bank, ACLEDA Bank, Wing Bank, Any Bank in Cambodia */}
        <KhmerWeddingKHQR />

        {/* Footer Note */}
        <footer className="footer-note mt-4 pt-4 border-t border-[#edd3dd]">
          <div className="font-moul text-xs sm:text-sm text-[#43281c] leading-relaxed">
            {WEDDING_DATA.footerNote}
          </div>
          <div className="text-[11px] text-[#7f5539] font-kantumruy mt-1.5">
            សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ
          </div>

          <div className="flex items-center justify-center gap-3 mt-4 no-print">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#43281c] hover:bg-[#321c11] text-amber-100 text-xs font-kantumruy font-bold transition-all shadow-sm cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span>ចែករំលែកធៀបនេះ</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Wedding Song Player with YouTube (https://youtu.be/NaZznqme2hg) */}
      <WeddingMusicPlayer autoPlayTrigger={isEnvelopeOpen} />

      {/* Share & Personalize Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentGuestName={guestName}
        onUpdateGuestName={setGuestName}
      />
    </div>
  );
}
