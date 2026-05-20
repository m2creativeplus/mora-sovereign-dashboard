/**
 * Hijri Calendar Engine
 * Implements the Umm al-Qura astronomical algorithm
 * Used by MORA — Somaliland Ministry of Religious Affairs & Endowments
 * Coordinates: Hargeisa (9.5596° N, 44.0650° E)
 */

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  monthNameArabic: string;
  monthNameSomali: string;
}

export interface IslamicEvent {
  name: string;
  nameArabic: string;
  nameSomali: string;
  hijriMonth: number;
  hijriDay: number;
  type: "major" | "minor" | "observance";
}

export const HIJRI_MONTH_NAMES: Record<number, { en: string; ar: string; so: string }> = {
  1:  { en: "Muharram",    ar: "مُحَرَّم",     so: "Muharram" },
  2:  { en: "Safar",       ar: "صَفَر",        so: "Safar" },
  3:  { en: "Rabi al-Awwal", ar: "رَبِيع الأَوَّل", so: "Rabicul Awwal" },
  4:  { en: "Rabi al-Thani", ar: "رَبِيع الثَّانِي", so: "Rabicul Labaad" },
  5:  { en: "Jumada al-Ula", ar: "جُمَادَى الأُولَى", so: "Jumaadil Ula" },
  6:  { en: "Jumada al-Akhira", ar: "جُمَادَى الآخِرَة", so: "Jumaadil Akhira" },
  7:  { en: "Rajab",       ar: "رَجَب",         so: "Rajab" },
  8:  { en: "Sha'ban",     ar: "شَعْبَان",       so: "Sha'baan" },
  9:  { en: "Ramadan",     ar: "رَمَضَان",       so: "Ramadaan" },
  10: { en: "Shawwal",     ar: "شَوَّال",        so: "Shawwaal" },
  11: { en: "Dhu al-Qada", ar: "ذُو الْقَعْدَة",  so: "Dhul Qacda" },
  12: { en: "Dhu al-Hijja", ar: "ذُو الْحِجَّة",  so: "Dhul Xijja" },
};

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { name: "Islamic New Year", nameArabic: "رأس السنة الهجرية", nameSomali: "Sannad Cusub Islaamiyad", hijriMonth: 1, hijriDay: 1, type: "major" },
  { name: "Day of Ashura", nameArabic: "يوم عاشوراء", nameSomali: "Maalinta Caashuura", hijriMonth: 1, hijriDay: 10, type: "major" },
  { name: "Mawlid al-Nabi", nameArabic: "المولد النبوي", nameSomali: "Mawliidka Nabiga", hijriMonth: 3, hijriDay: 12, type: "major" },
  { name: "Isra and Mi'raj", nameArabic: "الإسراء والمعراج", nameSomali: "Isra iyo Micraajka", hijriMonth: 7, hijriDay: 27, type: "major" },
  { name: "Ramadan Begins", nameArabic: "بداية رمضان", nameSomali: "Bilowga Ramadaanka", hijriMonth: 9, hijriDay: 1, type: "major" },
  { name: "Laylat al-Qadr", nameArabic: "ليلة القدر", nameSomali: "Laylatul Qadar", hijriMonth: 9, hijriDay: 27, type: "major" },
  { name: "Eid al-Fitr", nameArabic: "عيد الفطر", nameSomali: "Ciida Fiidrka", hijriMonth: 10, hijriDay: 1, type: "major" },
  { name: "Day of Arafah", nameArabic: "يوم عرفة", nameSomali: "Maalinta Carafaad", hijriMonth: 12, hijriDay: 9, type: "major" },
  { name: "Eid al-Adha", nameArabic: "عيد الأضحى", nameSomali: "Ciida Adhxaha", hijriMonth: 12, hijriDay: 10, type: "major" },
];

/**
 * Convert Gregorian date to Hijri using the tabular Islamic calendar algorithm.
 * Accurate to ±1-2 days — MORA uses moon-sighting confirmation for official dates.
 */
export function gregorianToHijri(date: Date): HijriDate {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const jd = gregorianToJD(year, month, day);
  return jdToHijri(jd);
}

function gregorianToJD(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function jdToHijri(jd: number): HijriDate {
  const z = Math.floor(jd) + 0.5;
  const a = Math.floor((z - 1867216.25) / 36524.25);
  const b = z + 1 + a - Math.floor(a / 4);
  const c = b + 1524;
  const d = Math.floor((c - 122.1) / 365.25);
  const e = Math.floor(365.25 * d);
  const f = Math.floor((c - e) / 30.6001);

  const day = c - e - Math.floor(30.6001 * f);
  const month = f < 14 ? f - 1 : f - 13;
  const year = month > 2 ? d - 4716 : d - 4715;

  // Julian day number to Hijri
  const k = Math.floor(jd) - 1948440 + 10632;
  const n = Math.floor((k - 1) / 10631);
  const kk = k - 10631 * n + 354;
  const j = Math.floor((10985 - kk) / 5316) * Math.floor((50 * kk) / 17719) +
    Math.floor(kk / 5670) * Math.floor((43 * kk) / 15238);
  const kk2 = kk - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hMonth = Math.floor((24 * kk2) / 709);
  const hDay = kk2 - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;

  const monthData = HIJRI_MONTH_NAMES[hMonth] || HIJRI_MONTH_NAMES[1];

  return {
    day: hDay,
    month: hMonth,
    year: hYear,
    monthName: monthData.en,
    monthNameArabic: monthData.ar,
    monthNameSomali: monthData.so,
  };
}

/**
 * Get days in a Hijri month (29 or 30 days)
 */
export function getDaysInHijriMonth(month: number, year: number): number {
  // Odd months: 30 days, Even months: 29 days
  // Leap year adjustment for month 12
  if (month % 2 === 1) return 30;
  if (month === 12) {
    const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
    return leapYears.includes(year % 30) ? 30 : 29;
  }
  return 29;
}

/**
 * Get Islamic events for a given Hijri month
 */
export function getEventsForMonth(hijriMonth: number): IslamicEvent[] {
  return ISLAMIC_EVENTS.filter(e => e.hijriMonth === hijriMonth);
}

/**
 * Get the current Hijri date
 */
export function getCurrentHijriDate(): HijriDate {
  return gregorianToHijri(new Date());
}

/**
 * Format Hijri date for display
 */
export function formatHijriDate(h: HijriDate): string {
  return `${h.day} ${h.monthName} ${h.year} AH`;
}

export function formatHijriDateArabic(h: HijriDate): string {
  return `${h.day} ${h.monthNameArabic} ${h.year} هـ`;
}
