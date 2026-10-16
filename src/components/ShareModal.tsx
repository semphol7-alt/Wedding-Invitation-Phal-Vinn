import React, { useState } from 'react';
import { Share2, Copy, Check, Printer, Send, Sparkles, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGuestName: string;
  onUpdateGuestName: (name: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  currentGuestName,
  onUpdateGuestName,
}) => {
  const [guestInput, setGuestInput] = useState(currentGuestName || '');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const shareableUrl = guestInput.trim()
    ? `${currentUrl}?guest=${encodeURIComponent(guestInput.trim())}`
    : currentUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyGuest = () => {
    onUpdateGuestName(guestInput.trim());
    handleCopyLink();
  };

  const handlePrint = () => {
    window.print();
  };

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=${encodeURIComponent(
    'ពិធីរៀបអាពាហ៍ពិពាហ៍ ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន (ខេត្តតាកែវ) - សូមគោរពអញ្ជើញ!'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#edd3dd] p-6 text-left font-kantumruy">
        <div className="flex items-center justify-between pb-3 border-b border-[#eed7e0]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#7f5539]" />
            <h3 className="font-moul text-sm text-[#43281c]">ចែករំលែកធៀបការឌីជីថល</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          {/* Guest Name Customizer */}
          <div className="bg-[#f6f9f7] p-3.5 rounded-xl border border-[#dce9e1]">
            <label className="block text-xs font-bold text-[#2c4233] mb-1">
              📝 បញ្ចូលឈ្មោះភ្ញៀវដែលត្រូវអញ្ជើញ (Personalize Guest Name)
            </label>
            <p className="text-[11px] text-[#5a7664] mb-2 leading-relaxed">
              ពេលភ្ញៀវបើកដំណរភ្ជាប់នេះ នឹងឃើញឈ្មោះរបស់គាត់នៅលើស្រោមសំបុត្រ និងក្បាលធៀបការដោយស្វ័យប្រវត្តិ។
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ឧ. ឯកឧត្តម... / លោកពូ និងអ្នកមីង..."
                value={guestInput}
                onChange={(e) => setGuestInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-[#c8dcd0] bg-white text-xs focus:outline-none focus:border-emerald-600"
              />
              <button
                type="button"
                onClick={handleApplyGuest}
                className="px-3 py-2 rounded-lg bg-[#2c4233] hover:bg-[#203225] text-amber-100 font-bold transition-colors cursor-pointer shrink-0"
              >
                ដាក់ឈ្មោះ
              </button>
            </div>
          </div>

          {/* Share Link Box */}
          <div>
            <label className="block text-xs font-bold text-[#2c4233] mb-1">
              🔗 ដំណរភ្ជាប់ធៀបការ (Invitation URL)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-3 py-2 rounded-lg border border-[#c8dcd0] bg-gray-50 text-[11px] text-gray-700 select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'បានចម្លង!' : 'ចម្លង'}</span>
              </button>
            </div>
          </div>

          {/* Quick Sharing Options */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#229ed9] hover:bg-[#1e8bc0] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ចែករំលែក Telegram</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f0f4f1] hover:bg-[#e1eae3] text-[#2c4233] border border-[#c8dcd0] text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#5a8a6e]" />
              <span>បោះពុម្ព / Save PDF</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#e5efe8] text-center">
          <p className="text-[11px] text-[#6b8273]">
            សូមអរគុណដែលបានចែករំលែកដំណឹងមង្គលការដ៏វិសេសវិសាលនេះ!
          </p>
        </div>
      </div>
    </div>
  );
};
