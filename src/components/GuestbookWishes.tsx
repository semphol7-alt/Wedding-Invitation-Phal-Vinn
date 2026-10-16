import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, Sparkles } from 'lucide-react';

interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  rsvp: 'attending' | 'regrets';
  guestCount: number;
  timestamp: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    name: 'ពូ វណ្ណារ៉ា និងអ្នកមីង',
    relation: 'សាច់ញាតិខាងកូនកំលោះ',
    message: 'សូមជូនពរឱ្យក្មួយទាំងពីរស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំដូចទឹកអង្គែ ផ្អែមល្ហែមដូចទឹកឃ្មុំ!',
    rsvp: 'attending',
    guestCount: 2,
    timestamp: 'ម្សិលមិញ',
  },
  {
    id: '2',
    name: 'ចាន់ថា & គ្រួសារ',
    relation: 'មិត្តភក្តិកូនក្រមុំ',
    message: 'អបអរសាទរដាវីនសម្លាញ់! សមគ្នាខ្លាំងណាស់ កូនកំលោះសង្ហា កូនក្រមុំស្អាតដូចទេពធីតា សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍ពោរពេញដោយសុភមង្គល!',
    rsvp: 'attending',
    guestCount: 2,
    timestamp: '២ ម៉ោងមុន',
  },
  {
    id: '3',
    name: 'សុខា និងសុខុម',
    relation: 'មិត្តភក្តិកូនកំលោះ',
    message: 'ជ័យមង្គល សិរីសួស្តី វិបុលសុខ មហាប្រសើរ! សូមឱ្យមានកូនពូនជាចៅ និងជោគជ័យគ្រប់ភារកិច្ចក្នុងគ្រួសារថ្មី!',
    rsvp: 'attending',
    guestCount: 1,
    timestamp: 'ថ្មីៗនេះ',
  },
];

const PRESET_BLESSINGS = [
  'សូមជូនពរឱ្យស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!',
  'សូមឱ្យគ្រួសារថ្មីពោរពេញដោយសុភមង្គល និងទ្រព្យសម្បត្តិស្តុកស្តម្ភ!',
  'សូមឱ្យមានកូនពូនជាចៅ ឆ្លាតវៃ និងកតញ្ញូ!',
  'ត្រជាក់ត្រជុំដូចទឹកអង្គែ ផ្អែមល្ហែមដូចទឹកឃ្មុំ!',
];

export const GuestbookWishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('khmer_wedding_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('មិត្តភក្តិ');
  const [message, setMessage] = useState('');
  const [rsvp, setRsvp] = useState<'attending' | 'regrets'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('khmer_wedding_wishes', JSON.stringify(wishes));
    } catch {
      // localstorage quota safety
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || 'ភ្ញៀវកិត្តិយស',
      message: message.trim(),
      rsvp,
      guestCount: rsvp === 'attending' ? guestCount : 0,
      timestamp: 'ទើបតែផ្ញើ',
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 1800);
  };

  const attendingCount = wishes.filter((w) => w.rsvp === 'attending').reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

  return (
    <div className="my-6 rounded-2xl bg-[#fdf6f8] border-2 border-[#edd3dd] p-4 sm:p-5 text-left shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#fae8ee] text-[#43281c]">
            <MessageSquareHeart className="w-4 h-4 text-[#7f5539]" />
          </div>
          <div>
            <h3 className="font-moul text-sm text-[#43281c]">សៀវភៅជូនពរ & RSVP</h3>
            <span className="text-[11px] text-[#7f5539] font-kantumruy">
              ភ្ញៀវជូនពរ {wishes.length} នាក់ · បានបញ្ជាក់វត្តមាន {attendingCount} នាក់
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3.5 py-1.5 rounded-xl bg-[#43281c] hover:bg-[#341d13] text-amber-100 text-xs font-kantumruy font-bold transition-all shadow-xs cursor-pointer"
        >
          {showForm ? 'បិទ' : '+ ជូនពរ'}
        </button>
      </div>

      {/* Wish Submission & RSVP Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-5 p-4 rounded-xl bg-white border border-[#edd3dd] shadow-sm animate-fadeIn text-xs font-kantumruy">
          <div className="font-bold text-[#43281c] text-sm mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>សូមផ្ញើសារជូនពរដល់គូស្វាមីភរិយាថ្មី</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
            <div>
              <label className="block text-[11px] text-[#7f5539] mb-1">ឈ្មោះរបស់អ្នក *</label>
              <input
                type="text"
                required
                placeholder="ឧ. សុខ ពិសាល"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#edd3dd] bg-[#fdfafb] focus:outline-none focus:border-[#43281c] text-xs text-[#43281c]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#7f5539] mb-1">ត្រូវជា</label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#edd3dd] bg-[#fdfafb] focus:outline-none focus:border-[#43281c] text-xs text-[#43281c]"
              >
                <option value="មិត្តភក្តិ">មិត្តភក្តិ</option>
                <option value="សាច់ញាតិខាងកូនកំលោះ">សាច់ញាតិខាងកូនកំលោះ</option>
                <option value="សាច់ញាតិខាងកូនក្រមុំ">សាច់ញាតិខាងកូនក្រមុំ</option>
                <option value="មិត្តរួមការងារ">មិត្តរួមការងារ</option>
                <option value="ភ្ញៀវកិត្តិយស">ភ្ញៀវកិត្តិយស</option>
              </select>
            </div>
          </div>

          {/* RSVP Selection */}
          <div className="mb-3 p-2.5 rounded-lg bg-[#faedf2] border border-[#ebd0dc]">
            <span className="block text-[11px] font-bold text-[#43281c] mb-1.5">ការបញ្ជាក់ការចូលរួម (RSVP)</span>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rsvp"
                  checked={rsvp === 'attending'}
                  onChange={() => setRsvp('attending')}
                  className="text-[#43281c] focus:ring-[#43281c]"
                />
                <span className="text-[#43281c] font-bold">✨ នឹងចូលរួម</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rsvp"
                  checked={rsvp === 'regrets'}
                  onChange={() => setRsvp('regrets')}
                  className="text-gray-400 focus:ring-gray-400"
                />
                <span className="text-[#7f5539]">មិនអាចចូលរួមបាន (ជូនពរពីចម្ងាយ)</span>
              </label>

              {rsvp === 'attending' && (
                <div className="flex items-center gap-1.5 ml-auto text-[11px]">
                  <span className="text-[#7f5539]">ចំនួនភ្ញៀវ៖</span>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="px-2 py-0.5 rounded border border-[#edd3dd] bg-white font-bold text-[#43281c]"
                  >
                    <option value={1}>១ នាក់</option>
                    <option value={2}>២ នាក់</option>
                    <option value={3}>៣ នាក់</option>
                    <option value={4}>៤ នាក់</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Quick preset blessings */}
          <div className="mb-2">
            <span className="text-[10px] text-[#7f5539] block mb-1">ពាក្យជូនពររហ័ស (ចុចដើម្បីជ្រើសរើស)៖</span>
            <div className="flex flex-wrap gap-1">
              {PRESET_BLESSINGS.map((blessing, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setMessage(blessing)}
                  className="text-[10px] px-2 py-1 rounded-md bg-[#faedf2] hover:bg-[#f6e1eb] text-[#43281c] border border-[#ebd0dc] transition-colors text-left cursor-pointer"
                >
                  {blessing}
                </button>
              ))}
            </div>
          </div>

          {/* Custom message */}
          <div className="mb-3">
            <textarea
              required
              rows={3}
              placeholder="សរសេរសារជូនពររបស់អ្នកនៅទីនេះ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#edd3dd] bg-[#fdfafb] focus:outline-none focus:border-[#43281c] text-xs text-[#43281c]"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-700 font-bold">
              {submitted ? '✓ បានផ្ញើសារជូនពរដោយជោគជ័យ!' : ''}
            </span>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#43281c] hover:bg-[#341d13] text-amber-100 font-bold transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </div>
        </form>
      )}

      {/* Wishes Stream */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 invitation-scroll">
        {wishes.map((item) => (
          <div key={item.id} className="p-3 rounded-xl bg-white border border-[#eed7e0] shadow-xs text-xs font-kantumruy">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#43281c]">{item.name}</span>
                <span className="text-[10px] text-[#7f5539] font-normal">· {item.relation}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                {item.rsvp === 'attending' ? (
                  <span className="px-1.5 py-0.5 rounded bg-[#faedf2] text-[#5e3825] font-bold border border-[#ebd0dc]">
                    ចូលរួម {item.guestCount > 1 ? `(${item.guestCount}នាក់)` : ''}
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-medium">
                    ជូនពរពីចម្ងាយ
                  </span>
                )}
              </div>
            </div>

            <p className="text-[#5e3a24] leading-relaxed text-[11.5px] mt-1 bg-[#fdf8fa] p-2 rounded-lg border border-[#f5e3eb]">
              "{item.message}"
            </p>
            <div className="text-[9.5px] text-[#9c6644] mt-1 text-right">
              {item.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
