import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../utils/khmerHelpers';
import { AnimatedButterfly } from './AnimatedButterfly';
import archBg from '../assets/images/soft_pink_orchid_arch_1792159771072.jpg';

interface EnvelopeModalProps {
  guestName?: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  guestName,
  onOpen,
  isOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (isOpen) return null;

  const handleOpenEnvelope = () => {
    setIsOpening(true);

    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 850);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-hidden transition-all duration-700 animate-fadeIn"
      style={{
        background: 'linear-gradient(135deg, #fcedf2 0%, #fbf2f5 50%, #f5dde5 100%)',
      }}
    >
      {/* Background Floral Arch Image with Soft Scrim (ផ្កាឈូកស្រាល / ផ្កាឈូកទន់) */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-multiply"
        style={{ backgroundImage: `url(${archBg})` }}
      />

      {/* Soft Lotus Pink Ambient Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-rose-200/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-5 right-10 w-80 h-80 rounded-full bg-amber-100/60 blur-2xl" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-pink-300/30 blur-2xl" />

        {/* Floating Sparkles & Fairy Dust */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#ffd54f] animate-sparkle" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fff9c4] animate-sparkle [animation-delay:0.8s]" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-rose-200 shadow-[0_0_8px_#f8bbd0] animate-sparkle [animation-delay:1.4s]" />
        <div className="absolute top-1/6 right-1/3 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_14px_#ffe082] animate-sparkle [animation-delay:1.9s]" />
      </div>

      {/* Main Container */}
      <div
        className={`relative w-full max-w-[420px] transition-all duration-700 transform ${
          isOpening
            ? 'scale-110 opacity-0 -translate-y-12'
            : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Animated Flying Turquoise Butterflies (Fluttering Upwards from Envelope like 647.jpg) */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Top Floating Swarm of Butterflies */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <AnimatedButterfly size={32} flyAnimation="animate-butterfly-2" />
          </div>
          <div className="absolute -top-24 left-1/3">
            <AnimatedButterfly size={26} flyAnimation="animate-butterfly-1" />
          </div>
          <div className="absolute -top-10 right-10">
            <AnimatedButterfly size={34} flyAnimation="animate-butterfly-3" />
          </div>
          <div className="absolute top-4 -right-4">
            <AnimatedButterfly size={42} flyAnimation="animate-butterfly-1" />
          </div>
          <div className="absolute top-24 -left-6">
            <AnimatedButterfly size={38} flyAnimation="animate-butterfly-2" />
          </div>
          <div className="absolute top-36 -right-6">
            <AnimatedButterfly size={46} flyAnimation="animate-butterfly-3" />
          </div>
          <div className="absolute bottom-24 -left-3">
            <AnimatedButterfly size={30} flyAnimation="animate-butterfly-1" />
          </div>
        </div>

        {/* 3D Envelope Wrapper in Soft Lotus Pink / Blush Tone */}
        <div className="relative pt-6 pb-2">
          {/* Opened Envelope Back Flap */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[92%] h-36 bg-[#f7e4eb] rounded-t-[40px] border border-[#ecd2dc] shadow-sm transform -rotate-1 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-b from-[#faedf2] to-[#ebd2dd] rounded-t-[40px] opacity-90" />
          </div>

          {/* Envelope Body Card (Front in Coffee Tone: ខាងមុខដាក់ កាហ្វេ) */}
          <div className="relative bg-[#ffffff] rounded-3xl shadow-[0_25px_60px_rgba(110,65,75,0.22)] border-2 border-[#edd3dd] overflow-hidden p-6 sm:p-8 text-center backdrop-blur-xs">
            {/* Top Ornamental Ribbon with Coffee Accents */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-[#9c6644]" />
              <span className="text-[#7f5539] text-xs">✤ ❁ ✤</span>
              <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-[#9c6644]" />
            </div>

            {/* Header: សិរីមង្គលអាពាហ៍ពិពាហ៍ in Rich Warm Coffee Tone (កាហ្វេ) */}
            <div className="font-moul text-base sm:text-lg text-[#43281c] tracking-wide mb-1 leading-relaxed">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </div>

            {/* Guest Name Greeting if personalized */}
            {guestName && (
              <div className="my-2 py-1.5 px-3.5 bg-[#fdf5f7] rounded-xl border border-[#ecd5de] inline-block max-w-full">
                <span className="text-[10px] text-[#7f5539] font-kantumruy block">
                  សូមគោរពអញ្ជើញ៖
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#43281c] font-kantumruy break-words">
                  {guestName}
                </span>
              </div>
            )}

            {/* Couple Calligraphic Monogram Emblem (in Coffee Tone #43281c & Champagne Gold) */}
            <div className="my-4 py-3 px-2 rounded-2xl bg-gradient-to-b from-[#fdf7f9] to-[#faebf0] border border-[#ebd0dc]/80 relative overflow-hidden group">
              {/* Subtle inner gold shine */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-amber-200/25 blur-xl pointer-events-none" />

              <span className="text-[10.5px] text-[#9c6644] font-kantumruy block mb-1">
                កូនកំលោះ & កូនក្រមុំ
              </span>

              {/* Groom's Name in Coffee Tone */}
              <div className="font-moul text-xl sm:text-2xl text-[#3d2314] tracking-wide leading-tight">
                {WEDDING_DATA.groom.fullName}
              </div>

              {/* Intertwined Calligraphic Knot / Heart */}
              <div className="flex items-center justify-center gap-3 my-1.5">
                <span className="h-[1px] w-8 bg-[#caa28b]" />
                <span className="text-[#7f5539] font-serif-display text-lg italic font-bold">
                  &
                </span>
                <span className="h-[1px] w-8 bg-[#caa28b]" />
              </div>

              {/* Bride's Name in Coffee Tone */}
              <div className="font-moul text-xl sm:text-2xl text-[#3d2314] tracking-wide leading-tight">
                {WEDDING_DATA.bride.fullName}
              </div>
            </div>

            {/* "សូមគោរពអញ្ជើញ" (Cordially Invite in Coffee Tone as shown in 647.jpg) */}
            <div className="font-moul text-sm sm:text-base text-[#5e3825] my-2 tracking-wide">
              សូមគោរពអញ្ជើញ
            </div>

            {/* Date & Location Brief */}
            <div className="text-xs text-[#7f5539] font-kantumruy mb-5 leading-relaxed">
              <span className="font-bold text-[#43281c]">{WEDDING_DATA.solarDate}</span>
              <br />
              <span className="text-[11px] text-[#9c6644]">{WEDDING_DATA.location.province}</span>
            </div>

            {/* Open Envelope Button with Soft Lotus Wax Stamp Effect */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleOpenEnvelope}
                className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#43281c] via-[#5e3a24] to-[#43281c] text-[#fff8f5] font-medium font-kantumruy text-sm shadow-[0_10px_25px_rgba(67,40,28,0.35)] hover:shadow-[0_15px_30px_rgba(67,40,28,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#b38728]/50 cursor-pointer"
              >
                {/* Wax Stamp Lotus Icon */}
                <div className="w-5 h-5 rounded-full bg-[#f3d3de] text-[#7f394f] flex items-center justify-center text-xs shadow-inner">
                  <Sparkles className="w-3 h-3 text-[#43281c] group-hover:rotate-12 transition-transform" />
                </div>
                <span className="font-bold tracking-wide text-amber-100">
                  បើកសំបុត្រអាពាហ៍ពិពាហ៍
                </span>
                <Mail className="w-4 h-4 text-amber-200" />
              </button>

              <p className="text-[11px] text-[#8c6551] mt-3 font-kantumruy flex items-center gap-1">
                <span>✨ ចុចបើកដើម្បីអានធៀបការ និងស្តាប់បទចម្រៀង</span>
              </p>
            </div>

            {/* Bottom Auspicious Blessing in Warm Coffee/Mocha */}
            <div className="mt-5 pt-3.5 border-t border-[#f0dce4] text-[10.5px] text-[#9c6644] font-kantumruy flex items-center justify-center gap-1.5">
              <span>សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
