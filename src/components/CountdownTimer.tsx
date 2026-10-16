import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { toKhmerDigits } from '../utils/khmerHelpers';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2027-03-03T07:00:00+07:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-6 p-4 rounded-2xl bg-gradient-to-b from-[#fdf5f8] to-[#faebf0] border border-[#edd3dd] shadow-sm text-center">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#43281c] mb-3">
        <Clock className="w-3.5 h-3.5 text-[#9c6644]" />
        <span>រាប់ថយក្រោយដល់ថ្ងៃមង្គលការ</span>
      </div>

      {timeLeft.isPast ? (
        <div className="py-2 text-sm font-bold text-[#43281c]">
          ពិធីមង្គលការបានប្រារព្ធឡើងដោយជោគជ័យ និងពោរពេញដោយសុភមង្គល!
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {/* Days */}
          <div className="p-2 bg-white rounded-xl border border-[#edd3dd] shadow-xs flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold font-kantumruy text-[#3d2314] tabular-nums">
              {toKhmerDigits(timeLeft.days)}
            </span>
            <span className="text-[10px] text-[#7f5539] font-kantumruy mt-0.5">ថ្ងៃ</span>
            <span className="text-[9px] text-[#9c6644] font-mono">({timeLeft.days}d)</span>
          </div>

          {/* Hours */}
          <div className="p-2 bg-white rounded-xl border border-[#edd3dd] shadow-xs flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold font-kantumruy text-[#3d2314] tabular-nums">
              {toKhmerDigits(String(timeLeft.hours).padStart(2, '0'))}
            </span>
            <span className="text-[10px] text-[#7f5539] font-kantumruy mt-0.5">ម៉ោង</span>
            <span className="text-[9px] text-[#9c6644] font-mono">({String(timeLeft.hours).padStart(2, '0')}h)</span>
          </div>

          {/* Minutes */}
          <div className="p-2 bg-white rounded-xl border border-[#edd3dd] shadow-xs flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold font-kantumruy text-[#3d2314] tabular-nums">
              {toKhmerDigits(String(timeLeft.minutes).padStart(2, '0'))}
            </span>
            <span className="text-[10px] text-[#7f5539] font-kantumruy mt-0.5">នាទី</span>
            <span className="text-[9px] text-[#9c6644] font-mono">({String(timeLeft.minutes).padStart(2, '0')}m)</span>
          </div>

          {/* Seconds */}
          <div className="p-2 bg-white rounded-xl border border-[#edd3dd] shadow-xs flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold font-kantumruy text-[#5e3a24] tabular-nums">
              {toKhmerDigits(String(timeLeft.seconds).padStart(2, '0'))}
            </span>
            <span className="text-[10px] text-[#7f5539] font-kantumruy mt-0.5">វិនាទី</span>
            <span className="text-[9px] text-[#9c6644] font-mono">({String(timeLeft.seconds).padStart(2, '0')}s)</span>
          </div>
        </div>
      )}
    </div>
  );
};
