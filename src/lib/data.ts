/**
 * MORA Platform — Mock Data
 * Realistic demo data for Somaliland Ministry of Religious Affairs & Endowments
 * All data is illustrative — clearly marked as DEMO
 */

export const MORA_STATS = {
  mosques: { value: 2847, label: "Mosques", subLabel: "All regions", trend: "+23 this year" },
  waqfAssets: { value: 1243, label: "Waqf Assets", subLabel: "Registered", trend: "48 pending" },
  scholars: { value: 386, label: "Scholars", subLabel: "Active imams", trend: "12 new" },
  pilgrims: { value: 3891, label: "Pilgrims 1446H", subLabel: "Hajj registered", trend: "Season open" },
};

export const MOSQUES = [
  { id: 1, name: "Masjid Al-Rahman", region: "Hargeisa", district: "Xareed", imam: "Sheikh Abdullahi Farah", capacity: 1200, status: "Operational", waqf: true },
  { id: 2, name: "Masjid Nuurul Islam", region: "Hargeisa", district: "Ayaha", imam: "Sheikh Omar Hussain", capacity: 800, status: "Operational", waqf: true },
  { id: 3, name: "Masjid Al-Aqsa", region: "Berbera", district: "Central", imam: "Sheikh Mustafa Idle", capacity: 600, status: "Operational", waqf: false },
  { id: 4, name: "Masjid Faisal", region: "Borama", district: "New Town", imam: "Sheikh Ibrahim Aw Hassan", capacity: 900, status: "Renovation", waqf: true },
  { id: 5, name: "Masjid Al-Furqan", region: "Burco", district: "Market", imam: "Sheikh Abdirahman Sh. Ali", capacity: 700, status: "Operational", waqf: false },
  { id: 6, name: "Masjid Al-Anwar", region: "Erigavo", district: "Main", imam: "Sheikh Dahir Jama", capacity: 450, status: "Operational", waqf: true },
  { id: 7, name: "Masjid Al-Huda", region: "Hargeisa", district: "26th June", imam: "Sheikh Mohamed Hirsi", capacity: 1500, status: "Operational", waqf: true },
  { id: 8, name: "Masjid Al-Taqwa", region: "Gabiley", district: "Central", imam: "Sheikh Abdi Warsame", capacity: 550, status: "Needs Repair", waqf: false },
];

export const WAQF_ASSETS = [
  { id: 1, name: "Waqf Land — Hargeisa Airport Road", type: "Land", region: "Hargeisa", areaM2: 12400, status: "Documented", value: "SLS 4.2M", mosque: "Masjid Al-Rahman" },
  { id: 2, name: "Endowment Shops — Berbera Port", type: "Commercial", region: "Berbera", units: 18, status: "Generating Revenue", value: "SLS 890K/yr", mosque: null },
  { id: 3, name: "Waqf Farm — Awdal Agricultural", type: "Farm", region: "Borama", areaM2: 85000, status: "Active", value: "SLS 1.8M", mosque: null },
  { id: 4, name: "Endowment Apartments — Hargeisa", type: "Building", region: "Hargeisa", units: 24, status: "Documented", value: "SLS 6.5M", mosque: "Masjid Nuurul Islam" },
  { id: 5, name: "Waqf Cemetery — Nasahablood", type: "Land", region: "Hargeisa", areaM2: 32000, status: "Protected", value: "N/A", mosque: null },
];

export const ANNOUNCEMENTS = [
  {
    id: 1,
    type: "official",
    title: "Moon Sighting Announcement — Dhu al-Qada 1446H",
    titleSomali: "Ogeysiiska Bilowga Dhul Qacda 1446H",
    titleArabic: "إعلان رؤية هلال ذو القعدة 1446هـ",
    content: "The Ministry of Religious Affairs hereby announces that the new crescent moon of Dhu al-Qada 1446H has been officially sighted. Friday, May 30, 2025 is declared the first day of Dhu al-Qada 1446H.",
    date: "2026-05-19",
    author: "MORA — Office of the Minister",
    urgent: true,
    channels: ["WhatsApp", "Radio", "TV"],
  },
  {
    id: 2,
    type: "religious",
    title: "Khutbah Guidance — Jumu'ah of 23 Shawwal 1446H",
    titleSomali: "Barshada Khudbaada — Jimcaha 23 Shawwaal 1446H",
    titleArabic: "إرشادات خطبة الجمعة ٢٣ شوال ١٤٤٦هـ",
    content: "This week's recommended Jumu'ah khutbah theme: Gratitude (Shukr) and its role in building a righteous society. Supporting materials and references have been distributed to all registered imams.",
    date: "2026-05-18",
    author: "MORA — Department of Religious Guidance",
    urgent: false,
    channels: ["WhatsApp", "Portal"],
  },
  {
    id: 3,
    type: "hajj",
    title: "Hajj 1446H — Final Registration Deadline",
    titleSomali: "Xajka 1446H — Xadka Kama Dambaysta ee Diiwaangelinta",
    titleArabic: "حج ١٤٤٦هـ — الموعد النهائي للتسجيل",
    content: "All citizens wishing to perform Hajj 1446H must complete registration through licensed travel agencies by 30 May 2026. The Ministry will not accept applications after this date.",
    date: "2026-05-17",
    author: "MORA — Hajj & Umrah Department",
    urgent: true,
    channels: ["WhatsApp", "Radio", "Print"],
  },
  {
    id: 4,
    type: "education",
    title: "National Quran Recitation Competition — Registration Open",
    titleSomali: "Tartanka Akhrinta Quraanka Qaranka — Diiwaangelinta Furan",
    titleArabic: "مسابقة تلاوة القرآن الوطنية — التسجيل مفتوح",
    content: "The 14th Annual National Quran Recitation Competition is now open for registration. Categories: Hifz (memorization), Tajweed, and Tafseer. Deadline: 15 June 2026.",
    date: "2026-05-15",
    author: "MORA — Islamic Education Division",
    urgent: false,
    channels: ["Portal", "Social Media"],
  },
];

export const PUBLICATIONS = [
  { id: 1, type: "fatwa", title: "Fatwa on Digital Financial Products", titleArabic: "فتوى في المنتجات المالية الرقمية", scholar: "Sheikh Al-Fiqh Council", date: "2026-04-12", downloads: 847, language: "Somali/Arabic" },
  { id: 2, type: "guidance", title: "Ramadan 1446H Official Guidance Booklet", titleArabic: "دليل رمضان ١٤٤٦هـ الرسمي", scholar: "MORA Publications", date: "2026-02-28", downloads: 4231, language: "Somali" },
  { id: 3, type: "policy", title: "Waqf Administration Policy 2026", titleArabic: "سياسة إدارة الوقف 2026", scholar: "MORA Legal Division", date: "2026-01-15", downloads: 312, language: "English/Somali" },
  { id: 4, type: "fatwa", title: "Fatwa on Takaful (Islamic Insurance)", titleArabic: "فتوى في التكافل", scholar: "Senior Scholars Council", date: "2025-11-20", downloads: 1083, language: "Arabic/Somali" },
  { id: 5, type: "guidance", title: "Hajj & Umrah Pilgrim Guide 1447H", titleArabic: "دليل الحاج والمعتمر ١٤٤٧هـ", scholar: "MORA — Hajj Dept.", date: "2025-10-05", downloads: 2156, language: "Somali" },
];

export const REGIONS = [
  { name: "Hargeisa", mosques: 624, scholars: 98, waqfAssets: 387 },
  { name: "Berbera", mosques: 312, scholars: 41, waqfAssets: 189 },
  { name: "Borama", mosques: 428, scholars: 67, waqfAssets: 241 },
  { name: "Burco", mosques: 519, scholars: 82, waqfAssets: 198 },
  { name: "Erigavo", mosques: 287, scholars: 44, waqfAssets: 112 },
  { name: "Gabiley", mosques: 319, scholars: 34, waqfAssets: 94 },
  { name: "Las Anod", mosques: 192, scholars: 15, waqfAssets: 22 },
  { name: "Sheikh", mosques: 166, scholars: 5, waqfAssets: 0 },
];

export const HAJJ_STATS = {
  totalRegistered: 3891,
  approved: 2847,
  pending: 744,
  rejected: 300,
  agencies: 23,
  quota: 4200,
  utilizationPct: 92.6,
};
