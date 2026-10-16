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
  Building2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { WEDDING_DATA } from '../utils/khmerHelpers';

interface BankOption {
  id: string;
  name: string;
  khName: string;
  accountNumber: string;
  accountName: string;
  themeColor: string;
  headerBg: string;
  tag: string;
  qrPayload: string;
}

export const KhmerWeddingKHQR: React.FC = () => {
  const [selectedBankId, setSelectedBankId] = useState<string>('khqr');
  const [qrDataUrls, setQrDataUrls] = useState<Record<string, string>>({});
  const [customQrImage, setCustomQrImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bank accounts config
  const banks: BankOption[] = [
    {
      id: 'khqr',
      name: 'KHQR (គ្រប់ធនាគារ)',
      khName: 'គាំទ្រគ្រប់ធនាគារក្នុងប្រទេសកម្ពុជា',
      accountNumber: '002 984 761 (USD) / 002 984 762 (KHR)',
      accountName: 'SIM SOPHAL & MAK KAGNADAVINN (ស៊ឹម សុផល & ម៉ាក់ កញ្ញាវីន)',
      themeColor: '#e21a22',
      headerBg: 'bg-[#e21a22]',
      tag: 'KHQR Bakong NBC',
      qrPayload: 'https://bakong.nbc.org.kh/pay?account=sim_sophal_mak_kagnadavinn@aba&currency=USD',
    },
    {
      id: 'aba',
      name: 'ABA Bank',
      khName: 'ធនាគារ អេប៊ីអេ (ABA Mobile)',
      accountNumber: '002 984 761 (USD / KHR)',
      accountName: 'SIM SOPHAL / MAK KAGNADAVINN',
      themeColor: '#004f71',
      headerBg: 'bg-gradient-to-r from-[#004f71] to-[#01354d]',
      tag: 'ABA KHQR PayWay',
      qrPayload: 'https://link.payway.com.kh/aba?id=002984761&name=SIM+SOPHAL+MAK+KAGNADAVINN',
    },
    {
      id: 'acleda',
      name: 'ACLEDA Bank',
      khName: 'ធនាគារ អេស៊ីលីដា (ACLEDA Mobile)',
      accountNumber: '010 382 918 (USD / KHR)',
      accountName: 'SIM SOPHAL / MAK KAGNADAVINN',
      themeColor: '#193259',
      headerBg: 'bg-gradient-to-r from-[#193259] to-[#0f213d]',
      tag: 'ACLEDA KHQR',
      qrPayload: 'https://acledabank.com.kh/pay?acc=010382918&name=SIM+SOPHAL',
    },
    {
      id: 'wing',
      name: 'Wing Bank',
      khName: 'ធនាគារ វីង (Wing Bank App)',
      accountNumber: '098 765 432 (USD / KHR)',
      accountName: 'SIM SOPHAL & MAK KAGNADAVINN',
      themeColor: '#8ec03f',
      headerBg: 'bg-gradient-to-r from-[#8ec03f] to-[#6d962c]',
      tag: 'Wing KHQR',
      qrPayload: 'https://wingmoney.com/pay?account=098765432&name=SIM+SOPHAL',
    },
  ];

  const currentBank = banks.find((b) => b.id === selectedBankId) || banks[0];

  // Generate crisp, clean QR codes with zero obstruction in front
  useEffect(() => {
    banks.forEach((b) => {
      QRCode.toDataURL(b.qrPayload, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 480,
        color: {
          dark: '#1a1a1a',
          light: '#ffffff',
        },
      })
        .then((url) => {
          setQrDataUrls((prev) => ({ ...prev, [b.id]: url }));
        })
        .catch((err) => {
          console.error('Error generating QR', err);
        });
    });
  }, []);

  const handleCopyAccount = () => {
    const textToCopy = `ចំណងដៃអាពាហ៍ពិពាហ៍ (Wedding Gift):
ឈ្មោះគណនី: ${currentBank.accountName}
ធនាគារ: ${currentBank.name} (${currentBank.khName})
លេខគណនី: ${currentBank.accountNumber}
ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ ស៊ឹម សុផល & ម៉ាក់ កញ្ញាវីន`;
    
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
    link.href = customQrImage || qrDataUrls[currentBank.id] || '';
    link.download = `KHQR-${currentBank.name.replace(/\s+/g, '_')}-Sim_Sophal_Mak_Kagnavinn.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeQrSrc = customQrImage || qrDataUrls[currentBank.id];

  return (
    <div className="my-6 rounded-3xl bg-[#fdf7f9] border-2 border-[#edd3dd] p-4 sm:p-6 text-center shadow-xs">
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

      {/* Bank Selection Tabs (ABA, ACLEDA, Wing, KHQR) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-md mx-auto">
        {banks.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBankId(b.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-kantumruy font-bold transition-all cursor-pointer ${
              selectedBankId === b.id
                ? 'bg-[#43281c] text-amber-100 shadow-sm scale-102'
                : 'bg-white hover:bg-[#faedf2] text-[#5e3a24] border border-[#ebd0dc]'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Official KHQR Card Container - 100% Clean and Unobstructed */}
      <div className="relative mx-auto max-w-[280px] bg-white rounded-3xl border-2 border-[#e21a22] shadow-xl overflow-hidden text-left font-kantumruy">
        
        {/* Top Bank Banner */}
        <div className={`${currentBank.headerBg} px-4 py-3 flex items-center justify-between text-white`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
              <span className="text-[#e21a22] text-xs font-bold font-sans">✦</span>
            </div>
            <div>
              <span className="font-bold tracking-wider text-base font-sans leading-none block">
                {currentBank.id === 'khqr' ? 'KHQR' : currentBank.name}
              </span>
              <span className="text-[9px] text-white/85 font-kantumruy">
                {currentBank.tag}
              </span>
            </div>
          </div>

          <div className="text-[9.5px] bg-black/20 px-2 py-0.5 rounded-full font-medium">
            Bakong
          </div>
        </div>

        {/* Account Info Header */}
        <div className="p-3 bg-[#fdfbf9] border-b border-gray-100">
          <div className="text-[9.5px] text-gray-500 uppercase font-semibold tracking-wide">
            ឈ្មោះគណនី / Account Name
          </div>
          <div className="font-bold text-[#1b2f23] text-xs sm:text-[13px] mt-0.5 truncate">
            {currentBank.accountName}
          </div>
          <div className="text-[11px] font-bold text-[#43281c] mt-0.5 flex items-center justify-between">
            <span className="font-mono text-xs">{currentBank.accountNumber}</span>
            <span className="text-emerald-700 text-[10px] flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> ផ្ទៀងផ្ទាត់រួច
            </span>
          </div>
        </div>

        {/* The Clean, Scannable QR Code Area - NO OVERLAY IN FRONT */}
        <div className="p-4 bg-white flex flex-col items-center justify-center">
          <div className="relative p-2.5 bg-white rounded-2xl border border-gray-200 shadow-inner">
            {activeQrSrc ? (
              <img
                src={activeQrSrc}
                alt={`${currentBank.name} QR Code`}
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
                កំពុងបង្កើត QR...
              </div>
            )}
          </div>

          {/* Subtext below QR - not blocking anything */}
          <div className="text-center mt-3">
            <span className="text-[11px] font-bold text-[#e21a22] tracking-wider block">
              SCAN TO PAY / ស្កេនដើម្បីចងដៃ
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">
              គាំទ្រ ABA, ACLEDA, Wing និងគ្រប់ធនាគារ
            </span>
          </div>
        </div>

        {/* Zoom In Button below QR */}
        <div className="px-3 pb-3 pt-1 bg-white flex justify-center">
          <button
            onClick={() => setIsZoomed(true)}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#43281c] text-xs font-medium border border-gray-200 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#7f5539]" />
            <span>ចុចពង្រីកស្កេនធំពេញអេក្រង់</span>
          </button>
        </div>

        {/* Card Footer with Bank Badges */}
        <div className="bg-[#f8faf9] px-3 py-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[9.5px] text-gray-600 font-medium flex-wrap">
          <span className="px-1.5 py-0.5 rounded bg-[#004f71] text-white text-[9px] font-bold">ABA</span>
          <span className="px-1.5 py-0.5 rounded bg-[#193259] text-amber-300 text-[9px] font-bold">ACLEDA</span>
          <span className="px-1.5 py-0.5 rounded bg-[#8ec03f] text-gray-900 text-[9px] font-bold">Wing</span>
          <span className="px-1.5 py-0.5 rounded bg-[#c8102e] text-white text-[9px] font-bold">Canadia</span>
          <span className="text-[9px] text-[#2c4233] font-bold">+ គ្រប់ធនាគារ</span>
        </div>
      </div>

      {/* Action Buttons: Copy Account, Download QR, Upload Custom QR */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-kantumruy">
        <button
          onClick={handleCopyAccount}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#faedf2] text-[#43281c] border border-[#edd3dd] font-medium transition-all shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">បានចម្លងព័ត៌មាន!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#7f5539]" />
              <span>ចម្លងលេខគណនី</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#43281c] hover:bg-[#321c11] text-amber-100 font-medium transition-all shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-300" />
          <span>ទាញយក QR ទុក</span>
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
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fdf5f8] hover:bg-[#f7e6ed] text-[#7f5539] border border-[#ebd0dc] text-[11px] font-medium transition-all cursor-pointer"
          title="ដាក់រូបភាព QR ផ្ទាល់ខ្លួនពីទូរស័ព្ទ / កុំព្យូទ័រ"
        >
          <Upload className="w-3 h-3 text-[#9c6644]" />
          <span>{customQrImage ? 'ប្តូររូប QR' : 'ដាក់រូប QR ផ្ទាល់ខ្លួន'}</span>
        </button>
      </div>

      {/* Cambodian Bank Support Badges */}
      <div className="mt-5 pt-3.5 border-t border-[#f0dce4]">
        <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[#43281c] mb-2 font-kantumruy">
          <Building2 className="w-3.5 h-3.5 text-amber-700" />
          <span>អាចស្កេនបានជាមួយគ្រប់ធនាគារក្នុងប្រទេសកម្ពុជា (Any Bank in Cambodia)</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#004f71] to-[#01354d] text-white text-[10px] font-bold shadow-xs">
            ABA Mobile
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#193259] to-[#0f213d] text-amber-300 text-[10px] font-bold shadow-xs">
            ACLEDA mobile
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#8ec03f] to-[#6d962c] text-gray-900 text-[10px] font-bold shadow-xs">
            Wing Bank
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#c8102e] to-[#960b22] text-white text-[10px] font-bold shadow-xs">
            Canadia Bank
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-[#43281c] text-amber-200 text-[10px] font-bold shadow-xs">
            + គ្រប់ធនាគារ Bakong
          </div>
        </div>
      </div>

      {/* Heartfelt Note */}
      <div className="mt-4 p-2.5 rounded-2xl bg-[#fffcfd] border border-[#ebd0dc] text-[11px] text-[#7f5539] font-kantumruy flex items-center justify-center gap-1.5">
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400 shrink-0" />
        <span>សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះចំណងដៃ និងពរជ័យសិរីសួស្តី!</span>
      </div>

      {/* Fullscreen QR Zoom Modal - Completely Unobstructed for Easy Scanning */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl border-4 border-[#e21a22] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[#e21a22] font-bold font-sans text-xl mb-1">
              {currentBank.id === 'khqr' ? 'KHQR' : currentBank.name}
            </div>
            <p className="text-xs font-bold text-gray-800 font-kantumruy mb-3">
              {currentBank.accountName}
            </p>

            {/* Completely Unobstructed Large QR Code */}
            <div className="p-3 bg-white rounded-2xl border border-gray-200 inline-block shadow-inner">
              {activeQrSrc && (
                <img
                  src={activeQrSrc}
                  alt={`${currentBank.name} QR Code Large`}
                  className="w-64 h-64 object-contain rounded-lg"
                />
              )}
            </div>

            <p className="text-xs text-emerald-700 font-bold font-kantumruy mt-3">
              បើក App ធនាគារ (ABA, ACLEDA, Wing...) ដើម្បីស្កេន
            </p>
            <div className="text-[11px] text-gray-500 font-mono mt-1">
              {currentBank.accountNumber}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
