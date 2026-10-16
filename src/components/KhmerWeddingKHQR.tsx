import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  ZoomIn,
  X,
  Upload,
  Heart,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { WEDDING_DATA } from '../utils/khmerHelpers';

export const KhmerWeddingKHQR: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [customQrImage, setCustomQrImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Standard KHQR format or Bakong payment identifier
  // In Cambodia, KHQR EMVCo tag format or Bakong deep link
  const defaultKhqrString = 'https://bakong.nbc.org.kh/pay?account=sim_sophal_mak_kagnadavinn@aba';

  // Generate QR Code with central Bakong emblem on initial load
  useEffect(() => {
    QRCode.toDataURL(defaultKhqrString, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 400,
      color: {
        dark: '#111827',
        light: '#ffffff',
      },
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR', err);
      });
  }, []);

  const handleCopyAccount = () => {
    const textToCopy = `ចំណងដៃអាពាហ៍ពិពាហ៍:\nឈ្មោះគណនី: ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន (Sim Sophal & Mak Kagnadavinn)\nធនាគារ: ABA Bank / ACLEDA Bank / Wing Bank / Any KHQR\nទីតាំង: ខេត្តតាកែវ`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomQrImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = customQrImage || qrDataUrl;
    link.download = 'KHQR-Wedding-Gift-Sim-Sophal-Mak-Kagnadavinn.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // List of major supported Cambodian banks
  const banks = [
    { name: 'ABA Bank', color: 'from-[#004f71] to-[#01354d]', text: 'ABA Mobile' },
    { name: 'ACLEDA Bank', color: 'from-[#193259] to-[#0f213d]', text: 'ACLEDA mobile' },
    { name: 'Wing Bank', color: 'from-[#8ec03f] to-[#6d962c]', text: 'Wing App' },
    { name: 'Canadia Bank', color: 'from-[#c8102e] to-[#960b22]', text: 'Canadia App' },
    { name: 'Sathapana Bank', color: 'from-[#0a4874] to-[#073252]', text: 'Sathapana' },
    { name: 'Chip Mong Bank', color: 'from-[#e35205] to-[#b33e02]', text: 'Chip Mong' },
  ];

  return (
    <div className="my-6 rounded-2xl bg-[#fdf6f8] border-2 border-[#edd3dd] p-4 sm:p-5 text-center shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="font-moul text-sm sm:text-base text-[#43281c]">
          ចំណងដៃអាពាហ៍ពិពាហ៍ (KHQR)
        </h3>
        <Sparkles className="w-4 h-4 text-amber-500" />
      </div>

      <p className="text-[11.5px] text-[#5e3a24] font-kantumruy leading-relaxed mb-4 max-w-sm mx-auto">
        ស្កេនដើម្បីចងដៃតាមរយៈ <strong>ABA Bank</strong>, <strong>ACLEDA Bank</strong>, <strong>Wing Bank</strong> និងគ្រប់ធនាគារទាំងអស់ក្នុងប្រទេសកម្ពុជា
      </p>

      {/* Official KHQR Card Container */}
      <div className="relative mx-auto max-w-[270px] bg-white rounded-2xl border-2 border-red-500 shadow-xl overflow-hidden text-left font-kantumruy">
        
        {/* Red KHQR Top Banner */}
        <div className="bg-[#e21a22] px-4 py-2.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5">
            {/* White/Red Bakong Flower Emblem */}
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs">
              <div className="w-full h-full rounded-full bg-[#e21a22] flex items-center justify-center text-white text-[10px] font-bold">
                ✤
              </div>
            </div>
            <span className="font-bold tracking-wider text-base font-sans">KHQR</span>
          </div>

          <div className="text-[10px] bg-red-700/80 px-2 py-0.5 rounded-full font-medium">
            Bakong NBC
          </div>
        </div>

        {/* Account Holder Name */}
        <div className="p-3 bg-[#fdfaf8] border-b border-gray-100">
          <div className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">
            ឈ្មោះគណនី / Account Name
          </div>
          <div className="font-bold text-[#1b2f23] text-xs sm:text-[13px] mt-0.5 truncate">
            {WEDDING_DATA.groom.fullName} & {WEDDING_DATA.bride.fullName}
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 mt-0.5">
            <span>Currency: KHR (៛) / USD ($)</span>
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> បានផ្ទៀងផ្ទាត់
            </span>
          </div>
        </div>

        {/* The QR Code Area */}
        <div className="p-4 bg-white flex flex-col items-center justify-center relative">
          <div className="relative p-2 bg-white rounded-xl border border-gray-200 shadow-inner group">
            {customQrImage ? (
              <img
                src={customQrImage}
                alt="KHQR Wedding Gift QR Code"
                className="w-48 h-48 object-contain rounded-lg"
              />
            ) : qrDataUrl ? (
              <div className="relative w-48 h-48 flex items-center justify-center">
                <img
                  src={qrDataUrl}
                  alt="KHQR Code"
                  className="w-full h-full object-contain"
                />
                {/* Official Bakong Red Center Lotus Emblem (matching 645.jpg) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white p-1 shadow-md flex items-center justify-center border border-red-200">
                    <div className="w-full h-full rounded-full bg-[#e21a22] flex items-center justify-center text-white text-base shadow-xs">
                      <span className="text-white text-xs">۞</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
                កំពុងបង្កើត QR...
              </div>
            )}

            {/* Hover overlay for zoom */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-1.5 text-white text-xs font-bold cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
              <span>ពង្រីកស្កេន</span>
            </button>
          </div>

          <div className="text-center mt-2.5">
            <span className="text-[10.5px] font-bold text-[#e21a22] tracking-wide block">
              SCAN TO PAY / ស្កេនដើម្បីចងដៃ
            </span>
            <span className="text-[9.5px] text-gray-400">
              គាំទ្រគ្រប់កម្មវិធីធនាគារក្នុងស្រុក
            </span>
          </div>
        </div>

        {/* Card Footer with Bank Badges */}
        <div className="bg-[#f7faf8] px-3 py-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[9.5px] text-gray-600 font-medium">
          <span className="px-1.5 py-0.5 rounded bg-[#004f71] text-white text-[9px] font-bold">ABA</span>
          <span className="px-1.5 py-0.5 rounded bg-[#193259] text-amber-300 text-[9px] font-bold">ACLEDA</span>
          <span className="px-1.5 py-0.5 rounded bg-[#8ec03f] text-gray-900 text-[9px] font-bold">Wing</span>
          <span className="px-1.5 py-0.5 rounded bg-[#c8102e] text-white text-[9px] font-bold">Canadia</span>
          <span className="text-[9px] text-[#2c4233] font-bold">+ 40 ធនាគារ</span>
        </div>
      </div>

      {/* Action Buttons: Download QR, Copy Details, Change/Upload QR */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-kantumruy">
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#2c4233] hover:bg-[#1f3024] text-amber-100 font-medium transition-all shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-300" />
          <span>ទាញយក KHQR</span>
        </button>

        <button
          onClick={handleCopyAccount}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white hover:bg-[#edf5f0] text-[#2c4233] border border-[#c8dcd0] font-medium transition-all shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">បានចម្លងព័ត៌មាន!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#5a8a6e]" />
              <span>ចម្លងព័ត៌មាន</span>
            </>
          )}
        </button>

        {/* Upload custom QR button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#f0f6f2] hover:bg-[#e4eee7] text-[#3b5344] border border-[#c8dcd0] text-[11px] font-medium transition-all cursor-pointer"
          title="ដាក់រូបភាព QR ផ្ទាល់ខ្លួនពីទូរស័ព្ទ / កុំព្យូទ័រ"
        >
          <Upload className="w-3 h-3 text-[#5a8a6e]" />
          <span>{customQrImage ? 'ប្តូររូប QR' : 'ដាក់រូប QR ផ្ទាល់ខ្លួន'}</span>
        </button>
      </div>

      {/* Cambodian Bank Support Badges */}
      <div className="mt-5 pt-3 border-t border-[#e3ede6]">
        <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#2c4233] mb-2 font-kantumruy">
          <Building2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>អាចស្កេនបានជាមួយគ្រប់ធនាគារក្នុងប្រទេសកម្ពុជា (Any Bank in Cambodia)</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {banks.map((b, idx) => (
            <div
              key={idx}
              className={`px-2.5 py-1 rounded-lg bg-gradient-to-r ${b.color} text-white text-[10px] font-bold shadow-xs flex items-center gap-1`}
            >
              <span>{b.name}</span>
            </div>
          ))}
          <div className="px-2.5 py-1 rounded-lg bg-emerald-800 text-amber-200 text-[10px] font-bold shadow-xs">
            + គ្រប់ធនាគារ Bakong
          </div>
        </div>
      </div>

      {/* Heartfelt Note */}
      <div className="mt-4 p-2.5 rounded-xl bg-[#edf6f1] border border-[#d2e5da] text-[11px] text-[#3b5344] font-kantumruy flex items-center justify-center gap-1.5">
        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-400 shrink-0" />
        <span>សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះចំណងដៃ និងពរជ័យសិរីសួស្តី!</span>
      </div>

      {/* Fullscreen QR Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl border-4 border-red-500 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[#e21a22] font-bold font-sans text-xl mb-1">KHQR</div>
            <p className="text-xs font-bold text-gray-800 font-kantumruy mb-3">
              {WEDDING_DATA.groom.fullName} & {WEDDING_DATA.bride.fullName}
            </p>

            <div className="p-2 bg-white rounded-xl border border-gray-200 relative inline-block">
              {customQrImage ? (
                <img
                  src={customQrImage}
                  alt="KHQR Large"
                  className="w-64 h-64 object-contain rounded-lg"
                />
              ) : (
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <img
                    src={qrDataUrl}
                    alt="KHQR Large"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center border border-red-200">
                      <div className="w-full h-full rounded-full bg-[#e21a22] flex items-center justify-center text-white text-lg">
                        ✤
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-[#5a8a6e] font-kantumruy mt-3">
              បើក App ធនាគារ (ABA, ACLEDA, Wing, Canadia...) ដើម្បីស្កេន
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
