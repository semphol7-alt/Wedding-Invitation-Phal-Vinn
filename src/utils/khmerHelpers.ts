/**
 * Khmer wedding data constants and formatting helpers
 */

export const WEDDING_DATA = {
  title: 'សិរីមង្គលអាពាហ៍ពិពាហ៍',
  groom: {
    fullName: 'ស៊ឹម សុផល',
    father: 'ស៊ឹម សុផាត',
    mother: 'ឆែម ហ៊ុច',
    fatherTitle: 'ឯកឧត្តម',
    motherTitle: 'លោកជំទាវ',
    role: 'កូនប្រុស',
  },
  bride: {
    fullName: 'ម៉ាក់ កញ្ញាដាវីន',
    father: 'ម៉ាក់ គង់',
    mother: 'ឆិល វណ្ណា',
    fatherTitle: 'លោក',
    motherTitle: 'លោកស្រី',
    role: 'កូនស្រី',
  },
  invitationCall: 'មានកិត្តិយសសូមគោរពអញ្ជើញ',
  invitationText: 'ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុង ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ',
  lunarDate: 'ថ្ងៃពុធ ៧កើត ខែកត្តិក ឆ្នាំ មមី អដ្ឋស័ក ព.ស. ២៥៧០',
  solarDate: 'ត្រូវនឹងថ្ងៃទី ០៣ ខែ មីនា ឆ្នាំ ២០២៧',
  time: 'វេលាម៉ោង ០៧ : ០០ ព្រឹក',
  targetDateIso: '2027-03-03T07:00:00+07:00', // March 3, 2027, 07:00 Cambodia Time
  location: {
    address: 'ភូមិស្នោរ សង្កាត់រកាក្នុង ក្រុងដូនកែវ ខេត្តតាកែវ',
    province: 'ខេត្តតាកែវ',
    district: 'ក្រុងដូនកែវ',
    commune: 'សង្កាត់រកាក្នុង',
    village: 'ភូមិស្នោរ',
    // Doun Kaev / Takeo approximate coordinates
    lat: 10.9904,
    lng: 104.7852,
    googleMapsUrl: 'https://maps.google.com/?q=10.9904,104.7852+(ពិធីរៀបអាពាហ៍ពិពាហ៍+ស៊ឹម+សុផល+និង+ម៉ាក់+កញ្ញាដាវីន)',
  },
  schedule: [
    {
      time: '០៧:០០ ព្រឹក',
      timeEn: '07:00 AM',
      title: 'ពិធីហែជំនូនចូលរោងជ័យ',
      desc: 'ជួបជុំញាតិមិត្ត ហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គលការ',
    },
    {
      time: '០៨:៣០ ព្រឹក',
      timeEn: '08:30 AM',
      title: 'ពិធីពិសាអាហារពេលព្រឹក / ហូបនំបញ្ចុកសិរីសួស្តី',
      desc: 'ទទួលទាននំបញ្ចុកសិរីសួស្តីប្រពៃណីខ្មែរ និងកាហ្វេពេលព្រឹក',
    },
    {
      time: '០៩:៣០ ព្រឹក',
      timeEn: '09:30 AM',
      title: 'ពិធីកាត់សក់បង្កក់សិរី',
      desc: 'ពិធីកាត់សក់ជូនពរជ័យ សិរីមង្គល វិបុលសុខ ដល់គូស្វាមីភរិយាថ្មី',
    },
    {
      time: '១១:៣០ ព្រឹក',
      timeEn: '11:30 AM',
      title: 'ពិធីសំពះផ្ទឹម ចងដៃ និងបង្វិលពពិល',
      desc: 'ពិធីបង្វិលពពិល ចងខ្សែអំបោះក្រហម និងប្រសិទ្ធពរជ័យពីមាតាបិតា ចាស់ទុំ',
    },
    {
      time: '០៥:០០ ល្ងាច',
      timeEn: '05:00 PM',
      title: 'ពិធីទទួលភ្ញៀវពិសាភោជនាហារ',
      desc: 'ពិធីលៀងសាយភោជន៍ និងអបអរសាទររាំកម្សាន្តប្រពៃណីខ្មែរ',
    },
  ],
  footerNote: 'សូមអរគុណ និងសូមស្វាគមន៍ដោយក្តីនឹករលឹក!',
};

export const toKhmerDigits = (num: number | string): string => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return String(num).replace(/[0-9]/g, (w) => khmerDigits[+w]);
};

export const generateGoogleCalendarUrl = () => {
  const title = encodeURIComponent('ពិធីរៀបអាពាហ៍ពិពាហ៍ - ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន');
  const details = encodeURIComponent(
    'ពិធីរៀបអាពាហ៍ពិពាហ៍ ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន។ ហូបនំបញ្ចុកសិរីសួស្តី និងពិសាភោជនាហារ។'
  );
  const location = encodeURIComponent('ភូមិស្នោរ សង្កាត់រកាក្នុង ក្រុងដូនកែវ ខេត្តតាកែវ');
  // 2027-03-03 from 07:00 to 22:00 in UTC (GMT+7 is 00:00 to 15:00 UTC)
  const dates = '20270303T000000Z/20270303T150000Z';
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};

export const downloadIcsFile = () => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Khmer Wedding//Sim Sophal & Mak Kagnadavinn//KM',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'SUMMARY:ពិធីរៀបអាពាហ៍ពិពាហ៍ - ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន',
    'DESCRIPTION:ពិធីរៀបអាពាហ៍ពិពាហ៍ ស៊ឹម សុផល & ម៉ាក់ កញ្ញាដាវីន នៅភូមិស្នោរ សង្កាត់រកាក្នុង ក្រុងដូនកែវ ខេត្តតាកែវ',
    'LOCATION:ភូមិស្នោរ សង្កាត់រកាក្នុង ក្រុងដូនកែវ ខេត្តតាកែវ',
    'DTSTART:20270303T000000Z',
    'DTEND:20270303T150000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'wedding-sim-sophal-mak-kagnadavinn.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
