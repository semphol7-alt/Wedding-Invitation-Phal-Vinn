import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Zap, Layers } from 'lucide-react';
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
  const [burstSparkles, setBurstSparkles] = useState(false);
  const [zoomMode, setZoomMode] = useState<'zoom-in' | 'zoom-out'>('zoom-in');

  if (isOpen) return null;

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.65);
      });
    } catch {
      // Audio fallback
    }
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    setBurstSparkles(true);

    playChime();

    setTimeout(() => {
      onOpen();
      setIsOpening(false);
      setBurstSparkles(false);
    }, 1250);
  };

  // Flying lotus petals for opening explosion
  const petals = [
    { tx: '-160px', ty: '-260px', rot: '180deg', delay: '0s', size: 'w-4 h-6' },
    { tx: '180px', ty: '-280px', rot: '-160deg', delay: '0.04s', size: 'w-5 h-7' },
    { tx: '-220px', ty: '-110px', rot: '220deg', delay: '0.08s', size: 'w-4 h-5' },
    { tx: '240px', ty: '-120px', rot: '-200deg', delay: '0.06s', size: 'w-5 h-6' },
    { tx: '-130px', ty: '140px', rot: '140deg', delay: '0.12s', size: 'w-4 h-5' },
    { tx: '160px', ty: '160px', rot: '-130deg', delay: '0.1s', size: 'w-5 h-6' },
    { tx: '-50px', ty: '-320px', rot: '90deg', delay: '0.02s', size: 'w-6 h-8' },
    { tx: '60px', ty: '-340px', rot: '-90deg', delay: '0.03s', size: 'w-5 h-7' },
    { tx: '-260px', ty: '10px', rot: '240deg', delay: '0.09s', size: 'w-4 h-6' },
    { tx: '270px', ty: '20px', rot: '-210deg', delay: '0.07s', size: 'w-5 h-7' },
    { tx: '0px', ty: '-360px', rot: '0deg', delay: '0.01s', size: 'w-6 h-9' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-hidden transition-all duration-700 animate-fadeIn"
      style={{
        background: 'linear-gradient(135deg, #fcedf2 0%, #fbf2f5 50%, #f5dde5 100%)',
      }}
    >
      {/* Background Floral Arch Image with Soft Scrim (ផ្កាឈូកស្រាល / ផ្កាឈូកទន់) */}
      <div
        className={`absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-1000 ${
          isOpening
            ? zoomMode === 'zoom-in'
              ? 'scale-125 opacity-75 blur-xs'
              : 'scale-90 opacity-40 blur-xs'
            : 'scale-100 opacity-45 mix-blend-multiply'
        }`}
        style={{ backgroundImage: `url(${archBg})` }}
      />

      {/* Soft Lotus Pink Ambient Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-rose-200/40 blur-3xl transition-all duration-700 ${
            isOpening ? 'scale-150 bg-rose-300/60' : 'animate-pulse'
          }`}
        />
        <div className="absolute bottom-5 right-10 w-80 h-80 rounded-full bg-amber-100/60 blur-2xl" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-pink-300/30 blur-2xl" />

        {/* Floating Sparkles & Fairy Dust */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#ffd54f] animate-sparkle" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fff9c4] animate-sparkle [animation-delay:0.8s]" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-rose-200 shadow-[0_0_8px_#f8bbd0] animate-sparkle [animation-delay:1.4s]" />
        <div className="absolute top-1/6 right-1/3 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_14px_#ffe082] animate-sparkle [animation-delay:1.9s]" />
      </div>

      {/* Bursting Lotus Petals & Gold Aura on Open Click */}
      {burstSparkles && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          {petals.map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-br from-rose-200 via-pink-300 to-rose-400 shadow-lg animate-petal ${p.size}`}
              style={
                {
                  '--tx': p.tx,
                  '--ty': p.ty,
                  '--rot': p.rot,
                  animationDelay: p.delay,
                } as React.CSSProperties
              }
            />
          ))}
          {/* Central Golden Aura Flash */}
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-300/70 via-rose-300/70 to-amber-200/70 blur-3xl animate-ping" />
        </div>
      )}

      {/* Main Envelope Card with 3D Perspective & Zoom In / Zoom Out */}
      <div
        className={`relative w-full max-w-[420px] transition-all duration-700 [perspective:1200px] ${
          isOpening
            ? zoomMode === 'zoom-in'
              ? 'animate-envelope-zoom-in pointer-events-none'
              : 'animate-envelope-zoom-out pointer-events-none'
            : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Animated Flying Turquoise Butterflies (Fluttering Upwards like 647.jpg) */}
        <div
          className={`absolute inset-0 pointer-events-none z-30 transition-transform duration-700 ${
            isOpening ? 'scale-140 -translate-y-24 opacity-80' : ''
          }`}
        >
          {/* Top Floating Swarm of Butterflies */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <AnimatedButterfly size={34} flyAnimation="animate-butterfly-2" />
          </div>
          <div className="absolute -top-24 left-1/4">
            <AnimatedButterfly size={28} flyAnimation="animate-butterfly-1" />
          </div>
          <div className="absolute -top-10 right-10">
            <AnimatedButterfly size={36} flyAnimation="animate-butterfly-3" />
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
          
          {/* 3D Envelope Top Triangular Flap */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[92%] h-24 bg-gradient-to-b from-[#f8e4eb] to-[#eed0db] border-t-2 border-x-2 border-[#edd2dd] rounded-t-[32px] shadow-sm pointer-events-none z-25 origin-top transition-all duration-700 ${
              isOpening ? 'animate-flap-open' : ''
            }`}
          >
            {/* Flap gold foil tip */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#b38728]/40 rounded-full" />
          </div>

          {/* Letter Sliding Out from Envelope on Opening */}
          {isOpening && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[85%] bg-gradient-to-b from-[#fffcf8] via-[#fff8f2] to-[#fbf0ea] border-2 border-[#b38728] rounded-2xl p-4 shadow-2xl z-20 animate-letter-slide text-center font-kantumruy">
              <span className="text-[10px] text-[#b38728] uppercase tracking-widest font-bold">
                ❖ WEDDING INVITATION ❖
              </span>
              <div className="font-moul text-sm text-[#43281c] mt-1">
                {WEDDING_DATA.groom.fullName} & {WEDDING_DATA.bride.fullName}
              </div>
              <div className="text-[10px] text-[#7f5539] mt-0.5">
                {WEDDING_DATA.solarDate}
              </div>
            </div>
          )}

          {/* Envelope Body Card (Front in Coffee Tone: ខាងមុខដាក់ កាហ្វេ) */}
          <div
            onClick={handleOpenEnvelope}
            className={`relative bg-[#ffffff] rounded-3xl shadow-[0_25px_60px_rgba(110,65,75,0.22)] border-2 border-[#edd3dd] overflow-hidden p-6 sm:p-8 text-center backdrop-blur-xs transition-all duration-500 cursor-pointer group hover:border-[#dfbac8] hover:shadow-[0_30px_70px_rgba(110,65,75,0.3)] ${
              isOpening ? 'shadow-[0_40px_90px_rgba(110,65,75,0.45)]' : ''
            }`}
          >
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
            <div
              className={`my-4 py-3.5 px-2 rounded-2xl bg-gradient-to-b from-[#fdf7f9] to-[#faebf0] border border-[#ebd0dc]/80 relative overflow-hidden group-hover:border-[#b38728]/40 transition-all duration-500 ${
                isOpening ? 'scale-105 border-amber-300' : ''
              }`}
            >
              {/* Inner ambient shine */}
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

            {/* Interactive Open Envelope Button with Zoom In / Zoom Out */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEnvelope();
                }}
                className={`group/btn relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#43281c] via-[#5e3a24] to-[#43281c] text-[#fff8f5] font-medium font-kantumruy text-sm shadow-[0_10px_25px_rgba(67,40,28,0.35)] hover:shadow-[0_15px_30px_rgba(67,40,28,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#b38728]/50 cursor-pointer ${
                  isOpening ? 'animate-wax-burst' : ''
                }`}
              >
                {/* Wax Stamp Sparkle Icon */}
                <div className="w-5 h-5 rounded-full bg-[#f3d3de] text-[#7f394f] flex items-center justify-center text-xs shadow-inner">
                  <Sparkles className="w-3 h-3 text-[#43281c] group-hover/btn:rotate-12 transition-transform" />
                </div>
                <span className="font-bold tracking-wide text-amber-100">
                  បើកសំបុត្រអាពាហ៍ពិពាហ៍
                </span>
                <Mail className="w-4 h-4 text-amber-200" />
              </button>

              <p className="text-[11px] text-[#8c6551] mt-3 font-kantumruy flex items-center gap-1">
                <span>✨ ចុចបើកដើម្បីអានធៀបការ និងស្តាប់បទចម្រៀង</span>
              </p>

              {/* Effect Zoom Mode Selector (Zoom In or Zoom Out) */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-3 inline-flex items-center gap-1.5 p-1 rounded-full bg-[#fcedf2] border border-[#edd3dd] text-[10px] font-kantumruy text-[#7f5539]"
              >
                <span className="px-2 font-bold text-[#43281c] flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 text-amber-600" /> ចលនា៖
                </span>
                <button
                  type="button"
                  onClick={() => setZoomMode('zoom-in')}
                  className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    zoomMode === 'zoom-in'
                      ? 'bg-[#43281c] text-amber-100 font-bold shadow-xs'
                      : 'hover:bg-white text-[#7f5539]'
                  }`}
                >
                  Zoom In (ពង្រីកចូល)
                </button>
                <button
                  type="button"
                  onClick={() => setZoomMode('zoom-out')}
                  className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    zoomMode === 'zoom-out'
                      ? 'bg-[#43281c] text-amber-100 font-bold shadow-xs'
                      : 'hover:bg-white text-[#7f5539]'
                  }`}
                >
                  Zoom Out (ពង្រីកចេញ)
                </button>
              </div>
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
