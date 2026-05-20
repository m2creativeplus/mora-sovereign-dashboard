import { mutation } from "./_generated/server";

// We inline the mock data here for the seed script
const MOSQUES = [
  { name: "Masjid Al-Rahman", region: "Hargeisa", district: "Xareed", imam: "Sheikh Abdullahi Farah", capacity: 1200, status: "Operational", waqf: true },
  { name: "Masjid Nuurul Islam", region: "Hargeisa", district: "Ayaha", imam: "Sheikh Omar Hussain", capacity: 800, status: "Operational", waqf: true },
  { name: "Masjid Al-Aqsa", region: "Berbera", district: "Central", imam: "Sheikh Mustafa Idle", capacity: 600, status: "Operational", waqf: false },
  { name: "Masjid Faisal", region: "Borama", district: "New Town", imam: "Sheikh Ibrahim Aw Hassan", capacity: 900, status: "Renovation", waqf: true },
  { name: "Masjid Al-Furqan", region: "Burco", district: "Market", imam: "Sheikh Abdirahman Sh. Ali", capacity: 700, status: "Operational", waqf: false },
  { name: "Masjid Al-Anwar", region: "Erigavo", district: "Main", imam: "Sheikh Dahir Jama", capacity: 450, status: "Operational", waqf: true },
  { name: "Masjid Al-Huda", region: "Hargeisa", district: "26th June", imam: "Sheikh Mohamed Hirsi", capacity: 1500, status: "Operational", waqf: true },
  { name: "Masjid Al-Taqwa", region: "Gabiley", district: "Central", imam: "Sheikh Abdi Warsame", capacity: 550, status: "Needs Repair", waqf: false },
];

const ANNOUNCEMENTS = [
  {
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

const PUBLICATIONS = [
  { type: "fatwa", title: "Fatwa on Digital Financial Products", titleArabic: "فتوى في المنتجات المالية الرقمية", scholar: "Sheikh Al-Fiqh Council", date: "2026-04-12", downloads: 847, language: "Somali/Arabic" },
  { type: "guidance", title: "Ramadan 1446H Official Guidance Booklet", titleArabic: "دليل رمضان ١٤٤٦هـ الرسمي", scholar: "MORA Publications", date: "2026-02-28", downloads: 4231, language: "Somali" },
  { type: "policy", title: "Waqf Administration Policy 2026", titleArabic: "سياسة إدارة الوقف 2026", scholar: "MORA Legal Division", date: "2026-01-15", downloads: 312, language: "English/Somali" },
  { type: "fatwa", title: "Fatwa on Takaful (Islamic Insurance)", titleArabic: "فتوى في التكافل", scholar: "Senior Scholars Council", date: "2025-11-20", downloads: 1083, language: "Arabic/Somali" },
  { type: "guidance", title: "Hajj & Umrah Pilgrim Guide 1447H", titleArabic: "دليل الحاج والمعتمر ١٤٤٧هـ", scholar: "MORA — Hajj Dept.", date: "2025-10-05", downloads: 2156, language: "Somali" },
];

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data to avoid duplicates on re-run
    const mosques = await ctx.db.query("mosques").collect();
    for (const doc of mosques) await ctx.db.delete(doc._id);

    const announcements = await ctx.db.query("announcements").collect();
    for (const doc of announcements) await ctx.db.delete(doc._id);

    const publications = await ctx.db.query("publications").collect();
    for (const doc of publications) await ctx.db.delete(doc._id);

    // Insert mock data
    for (const m of MOSQUES) {
      await ctx.db.insert("mosques", m);
    }
    for (const a of ANNOUNCEMENTS) {
      await ctx.db.insert("announcements", a);
    }
    for (const p of PUBLICATIONS) {
      await ctx.db.insert("publications", p);
    }
  },
});
