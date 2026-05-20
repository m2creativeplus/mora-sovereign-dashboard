/**
 * Prayer Times Calculator — Hargeisa, Republic of Somaliland
 * Coordinates: 9.5596° N, 44.0650° E | Timezone: EAT (UTC+3)
 * Method: Muslim World League (MWL) — used across East Africa
 * 
 * MORA — Ministry of Religious Affairs & Endowments
 */

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerEntry {
  name: string;
  nameArabic: string;
  nameSomali: string;
  time: string;
  key: keyof PrayerTimes;
}

const HARGEISA = {
  lat: 9.5596,
  lng: 44.0650,
  timezone: 3, // EAT = UTC+3
};

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function fixAngle(angle: number): number {
  return angle - 360 * Math.floor(angle / 360);
}

function fixHour(hour: number): number {
  return hour - 24 * Math.floor(hour / 24);
}

function computeSunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * Math.sin(toRad(g)) + 0.02 * Math.sin(toRad(2 * g)));
  const e = 23.439 - 0.00000036 * D;
  const RA = toDeg(Math.atan2(Math.cos(toRad(e)) * Math.sin(toRad(L)), Math.cos(toRad(L)))) / 15;
  const eqt = q / 15 - fixHour(RA);
  const decl = toDeg(Math.asin(Math.sin(toRad(e)) * Math.sin(toRad(L))));
  return { decl, eqt };
}

function dateToJD(date: Date): number {
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const A = Math.floor((14 - M) / 12);
  const y = Y + 4800 - A;
  const m = M + 12 * A - 3;
  return D + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function computePrayerTime(jd: number, angle: number, direction: "rise" | "set" = "rise"): number {
  const { decl, eqt } = computeSunPosition(jd);
  const lat = HARGEISA.lat;

  const cosHour = (Math.cos(toRad(angle)) - Math.sin(toRad(decl)) * Math.sin(toRad(lat))) /
    (Math.cos(toRad(decl)) * Math.cos(toRad(lat)));

  if (cosHour < -1) return 0; // Always above
  if (cosHour > 1) return 0;  // Always below

  const T = toDeg(Math.acos(cosHour)) / 15;
  return 12 - eqt + (direction === "rise" ? -T : T) + HARGEISA.lng / 15;
}

function computeAsr(jd: number, factor: number): number {
  const { decl, eqt } = computeSunPosition(jd);
  const lat = HARGEISA.lat;
  const z = toDeg(Math.atan(1 / (factor + Math.tan(toRad(Math.abs(lat - decl))))));
  const cosHour = (Math.sin(toRad(z)) - Math.sin(toRad(decl)) * Math.sin(toRad(lat))) /
    (Math.cos(toRad(decl)) * Math.cos(toRad(lat)));
  const T = toDeg(Math.acos(cosHour)) / 15;
  return 12 - eqt + T + HARGEISA.lng / 15;
}

function hourToTime(hour: number): string {
  const adjusted = fixHour(hour - HARGEISA.timezone + 3); // Already UTC+3 for Hargeisa
  const h = Math.floor(adjusted);
  const m = Math.round((adjusted - h) * 60);
  const hDisplay = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 || h === 24 ? "AM" : "PM";
  return `${hDisplay}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/**
 * Calculate prayer times for Hargeisa for a given date
 * Uses MWL angles: Fajr 18°, Isha 17°
 */
export function calculatePrayerTimes(date: Date = new Date()): PrayerTimes {
  const jd = dateToJD(date);
  const { eqt } = computeSunPosition(jd);

  const dhuhrTime = 12 - eqt + HARGEISA.lng / 15;

  return {
    fajr: hourToTime(computePrayerTime(jd, -18, "rise")),       // MWL: 18°
    sunrise: hourToTime(computePrayerTime(jd, -0.833, "rise")),  // Standard sunrise
    dhuhr: hourToTime(dhuhrTime + 1/60),                         // Dhuhr = solar noon + 1min
    asr: hourToTime(computeAsr(jd, 1)),                          // Shafi'i standard
    maghrib: hourToTime(computePrayerTime(jd, -0.833, "set")),   // Sunset
    isha: hourToTime(computePrayerTime(jd, -17, "set")),         // MWL: 17°
  };
}

/**
 * Get prayer entries with names in 3 languages
 */
export function getPrayerEntries(date: Date = new Date()): PrayerEntry[] {
  const times = calculatePrayerTimes(date);
  return [
    { name: "Fajr",    nameArabic: "الفجر",    nameSomali: "Subax",    time: times.fajr,    key: "fajr" },
    { name: "Sunrise", nameArabic: "الشروق",    nameSomali: "Qorrax",   time: times.sunrise, key: "sunrise" },
    { name: "Dhuhr",   nameArabic: "الظهر",    nameSomali: "Duhur",    time: times.dhuhr,   key: "dhuhr" },
    { name: "Asr",     nameArabic: "العصر",    nameSomali: "Casar",    time: times.asr,     key: "asr" },
    { name: "Maghrib", nameArabic: "المغرب",   nameSomali: "Maqrib",   time: times.maghrib, key: "maghrib" },
    { name: "Isha",    nameArabic: "العشاء",   nameSomali: "Cisho",    time: times.isha,    key: "isha" },
  ];
}

/**
 * Get the currently active prayer based on current time
 */
export function getCurrentPrayer(times: PrayerTimes): keyof PrayerTimes {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const timeToDecimal = (t: string): number => {
    const [timePart, period] = t.split(" ");
    const [h, m] = timePart.split(":").map(Number);
    let hour = h;
    if (period === "PM" && h !== 12) hour += 12;
    if (period === "AM" && h === 12) hour = 0;
    return hour + m / 60;
  };

  const schedule: Array<[keyof PrayerTimes, number]> = [
    ["fajr", timeToDecimal(times.fajr)],
    ["sunrise", timeToDecimal(times.sunrise)],
    ["dhuhr", timeToDecimal(times.dhuhr)],
    ["asr", timeToDecimal(times.asr)],
    ["maghrib", timeToDecimal(times.maghrib)],
    ["isha", timeToDecimal(times.isha)],
  ];

  let current: keyof PrayerTimes = "isha";
  for (const [key, time] of schedule) {
    if (currentHour >= time) current = key;
  }
  return current;
}
