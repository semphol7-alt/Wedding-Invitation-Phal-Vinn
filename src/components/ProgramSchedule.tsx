import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Sparkles, Utensils, Scissors, Users } from 'lucide-react';
import { WEDDING_DATA } from '../utils/khmerHelpers';

export const ProgramSchedule: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-4 h-4 text-emerald-700" />;
      case 1:
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 2:
        return <Scissors className="w-4 h-4 text-emerald-700" />;
      case 3:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 4:
      default:
        return <Utensils className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div className="my-6 rounded-2xl bg-[#faf2f5] border border-[#edd3dd] p-4 sm:p-5 text-left shadow-xs">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#fae8ee] text-[#43281c]">
            <Calendar className="w-4 h-4 text-[#7f5539]" />
          </div>
          <div>
            <h3 className="font-moul text-sm text-[#43281c]">កម្មវិធីមង្គលការ</h3>
            <span className="text-[11px] text-[#7f5539] font-kantumruy">កាលវិភាគពិធីសិរីសួស្តីតាមប្រពៃណី</span>
          </div>
        </div>
        <button
          className="p-1 rounded-full hover:bg-[#faedf2] text-[#7f5539] transition-colors"
          aria-label={isExpanded ? 'បង្រួម' : 'ពង្រីក'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-[#eed7e0] space-y-3.5">
          {WEDDING_DATA.schedule.map((item, index) => (
            <div
              key={index}
              className={`relative pl-7 pb-1 text-xs font-kantumruy transition-all ${
                index === 1 ? 'bg-[#fdf4f7] p-2.5 rounded-xl border border-[#ebd0dc]' : ''
              }`}
            >
              {/* Timeline indicator line */}
              {index !== WEDDING_DATA.schedule.length - 1 && index !== 1 && (
                <span className="absolute left-2.5 top-5 bottom-0 w-[1.5px] bg-[#ecd4de]" />
              )}
              {/* Dot icon */}
              <span className="absolute left-1 top-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#fae5ed] text-[#43281c]">
                {getIconForIndex(index)}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#3d2314] tabular-nums">{item.time}</span>
                {index === 1 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#faedf2] text-[#5e3825] font-bold border border-[#ebd0dc]">
                    ✨ ហូបនំបញ្ចុកសិរីសួស្តី
                  </span>
                )}
              </div>
              <div className="font-semibold text-[#43281c] mt-0.5 text-[12px]">{item.title}</div>
              <div className="text-[11px] text-[#6f4b36] mt-0.5 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
