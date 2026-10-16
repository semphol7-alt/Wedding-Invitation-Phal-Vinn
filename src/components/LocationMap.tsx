import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, CalendarPlus, ExternalLink } from 'lucide-react';
import { WEDDING_DATA, generateGoogleCalendarUrl, downloadIcsFile } from '../utils/khmerHelpers';

export const LocationMap: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(WEDDING_DATA.location.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="my-6 rounded-2xl bg-[#fdf5f8] p-4 sm:p-5 border-l-4 border-[#9c6644] border border-[#edd3dd] text-center shadow-xs">
      <div className="flex items-center justify-center gap-1.5 mb-2">
        <MapPin className="w-4 h-4 text-[#7f5539]" />
        <h3 className="font-moul text-sm text-[#43281c]">កាលបរិច្ឆេទ និងទីតាំង</h3>
      </div>

      <div className="space-y-1.5 my-3 text-xs font-kantumruy text-[#5e3a24]">
        <p className="font-bold text-[#3d2314] text-sm">
          📅 {WEDDING_DATA.lunarDate}
        </p>
        <p className="text-[#6f4b36] font-medium">
          {WEDDING_DATA.solarDate}
        </p>
        <div className="pt-2 border-t border-[#edd3dd] mt-2">
          <p className="font-bold text-[#43281c] leading-relaxed">
            📍 ទីតាំង៖ {WEDDING_DATA.location.address}
          </p>
        </div>
      </div>

      {/* Styled Interactive Mini Map Card */}
      <div className="relative mt-4 mb-3 rounded-xl overflow-hidden border border-[#edd3dd] bg-[#faedf2] h-32 flex flex-col items-center justify-center shadow-inner group">
        {/* Subtle decorative grid/road pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#9c6644_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col items-center p-3">
          <div className="w-9 h-9 rounded-full bg-[#43281c] text-amber-200 flex items-center justify-center shadow-md animate-bounce">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="font-bold font-kantumruy text-xs text-[#3d2314] mt-1 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
            {WEDDING_DATA.location.commune}, {WEDDING_DATA.location.district}
          </span>
          <span className="text-[10px] text-[#7f5539] font-kantumruy">
            {WEDDING_DATA.location.province}
          </span>
        </div>

        <a
          href={WEDDING_DATA.location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#43281c]/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px] text-white font-kantumruy text-xs font-bold gap-1.5"
        >
          <span>ចុចដើម្បីមើលក្នុងផែនទី Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Action Buttons: Copy Address & Open Maps & Add to Calendar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2">
        <a
          href={WEDDING_DATA.location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#43281c] hover:bg-[#321c11] text-amber-100 text-xs font-kantumruy font-medium transition-all shadow-sm"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-300" />
          <span>បើកមើល Google Maps</span>
        </a>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-[#faedf2] text-[#43281c] border border-[#edd3dd] text-xs font-kantumruy font-medium transition-all cursor-pointer shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">បានចម្លងអាសយដ្ឋាន!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#9c6644]" />
              <span>ចម្លងអាសយដ្ឋាន</span>
            </>
          )}
        </button>
      </div>

      {/* Calendar Add Dropdown / Trigger */}
      <div className="relative mt-2">
        <button
          onClick={() => setShowCalendarMenu(!showCalendarMenu)}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#e6f0ea] hover:bg-[#dbe9e0] text-[#3b5344] text-xs font-kantumruy font-medium transition-colors cursor-pointer"
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>កត់ត្រាទុកក្នុងប្រតិទិន (Add to Calendar)</span>
        </button>

        {showCalendarMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-white rounded-xl shadow-lg border border-[#c8dcd0] z-20 flex flex-col gap-1 text-xs font-kantumruy animate-fadeIn">
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-left rounded-lg hover:bg-[#f0f6f2] text-[#2c4233] flex items-center justify-between"
            >
              <span>📅 Google Calendar (Online)</span>
              <ExternalLink className="w-3 h-3 text-[#5a8a6e]" />
            </a>
            <button
              onClick={() => {
                downloadIcsFile();
                setShowCalendarMenu(false);
              }}
              className="px-3 py-2 text-left rounded-lg hover:bg-[#f0f6f2] text-[#2c4233] flex items-center justify-between cursor-pointer"
            >
              <span>📱 Apple Calendar / Outlook (.ics file)</span>
              <span className="text-[10px] text-emerald-700 font-bold">ទាញយក</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
