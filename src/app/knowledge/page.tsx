"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import SomalilandEmblem from "@/components/SomalilandEmblem";
import SomalilandFlag from "@/components/SomalilandFlag";
import { PulsingAtoms } from "@/components/ui/PulsingAtoms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { 
  BookOpen, Search, ShieldCheck, Download, Languages, 
  Sparkles, CheckCircle2, AlertCircle, FileText, Send, 
  HelpCircle, Scale
} from "lucide-react";

// Robust bilingual/trilingual Fatwa and Policy dataset
const FATWAS_DATA = [
  {
    id: "MORA-FTW-1446-01",
    category: "Financial Jurisprudence",
    authority: "Supreme Islamic Advisory Council, Hargeisa",
    date: "1446-02-10 AH",
    status: "Published",
    languages: ["Arabic", "Somali", "English"],
    content: {
      English: {
        title: "Modern Digital Cryptographic Waqf Transactions",
        ruling: "Permissible (Mubāh) under strict asset-backed conditions. Tokenization of physical waqf commercial buildings is authorized to increase public micro-endowments.",
        summary: "Allows fractional ownership of mosque properties through tokenized sovereign platforms."
      },
      Somali: {
        title: "Hab-raaca Ganacsiga Dijitaalka ah ee Hantida Waqfiga",
        ruling: "Waa la oggol yahay (Mubaax) iyadoo la raacayo shuruudo adag oo hanti-ku-saleysan ah. Qaybinta hantida ma guurtada ah ee waqfiga iyadoo la adeegsanayo tignoolajiyada waa mid sharci ah.",
        summary: "Waxay u oggolaanaysaa shacabka inay qayb yar ka yeeshaan maalgashiga waqfiga."
      },
      Arabic: {
        title: "معاملات الأوقاف الرقمية المشفرة الحديثة",
        ruling: "مباح بشرط أن تكون مدعومة بأصول حقيقية ملموسة. يُرخص بتجزئة ملكية العقارات الوقفية التجارية لزيادة الأوقاف العامة.",
        summary: "السماح بالملكية الكسرية للعقارات الوقفية عبر منصات سيادية مشفرة."
      }
    }
  },
  {
    id: "MORA-FTW-1445-09",
    category: "Ritual & Calendar",
    authority: "Office of the Grand Mufti, Hargeisa",
    date: "1445-08-29 AH",
    status: "Published",
    languages: ["Arabic", "Somali", "English"],
    content: {
      English: {
        title: "Standardization of Moon-Sighting & Hijri Calendar",
        ruling: "Obligatory (Wājib) to utilize modern astronomical positioning calculations combined with physical eyewitness verification to unify Eid and Ramadan announcements across the Republic.",
        summary: "Harmonizes calendar determinations, ending regional discrepancies in Somaliland."
      },
      Somali: {
        title: "Halbeega Aragga Dayaxa & Kalandarka Hijriga",
        ruling: "Waa Waajib in la adeegsado xisaabaadka cilmi-falagga ee casriga ah oo lagu daray markhaati-kicinta aragga indhaha si loo mideeyo ciidaha iyo soonka Jamhuuriyadda.",
        summary: "Waxay meesha ka saaraysaa khilaafaadka gobolada ee ku saabsan bilowga bilaha barakaysan."
      },
      Arabic: {
        title: "توحيد معايير رؤية الهلال والتقويم الهجري",
        ruling: "واجب استخدام الحسابات الفلكية الحديثة لتحديد موقع الهلال بالتكامل مع الرؤية البصرية الشرعية لتوحيد إعلانات رمضان والأعياد.",
        summary: "تنظيم إعلانات التقويم الهجري وإلغاء الخلافات الإقليمية في صوماليلاند."
      }
    }
  },
  {
    id: "MORA-FTW-1445-03",
    category: "Waqf Administration",
    authority: "National Waqf Executive Board",
    date: "1445-03-15 AH",
    status: "Published",
    languages: ["Arabic", "Somali", "English"],
    content: {
      English: {
        title: "Waqf Estate Lease Revaluation Under Inflation",
        ruling: "Permissible to adjust lease values of waqf-owned properties in response to significant inflation to ensure the real value of charity distributions is maintained.",
        summary: "Grants administrative power to protect Waqf revenues from economic fluctuations."
      },
      Somali: {
        title: "Qiimaynta Kireynta Hantida Waqfiga xilliyada Sicir-bararka",
        ruling: "Waa la oggol yahay in dib loo eego heshiisyada kireynta ee hantida waqfiga si looga badbaadiyo sicir-bararka loona ilaaliyo dakhliga samafalka.",
        summary: "Wuxuu awood u siinayaa guddiga inuu difaaco dakhliga masaajidda iyo dugsiyada."
      },
      Arabic: {
        title: "إعادة تقييم إيجار الأصول الوقفية في ظل التضخم",
        ruling: "يجوز تعديل عقود إيجارات الأصول المملوكة للأوقاف تماشياً مع نسب التضخم لضمان الحفاظ على القيمة الحقيقية للصدقات الموزعة.",
        summary: "منح صلاحيات إدارية لحماية عائدات الأوقاف من التقلبات الاقتصادية."
      }
    }
  }
];

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"English" | "Somali" | "Arabic">("English");
  
  // RAG / semantic search AI simulator console states
  const [ragQuery, setRagQuery] = useState("");
  const [ragResult, setRagResult] = useState("");
  const [loadingRag, setLoadingRag] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const filteredFatwas = useMemo(() => {
    return FATWAS_DATA.filter(fatwa => {
      const translated = fatwa.content[selectedLanguage];
      const matchesSearch = 
        translated.title.toLowerCase().includes(search.toLowerCase()) ||
        translated.ruling.toLowerCase().includes(search.toLowerCase()) ||
        fatwa.category.toLowerCase().includes(search.toLowerCase()) ||
        fatwa.id.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [search, selectedLanguage]);

  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

    setLoadingRag(true);
    setRagResult("");
    setSearchedText(ragQuery);

    setTimeout(() => {
      const query = ragQuery.toLowerCase();
      let response = "";

      if (query.includes("zakat") || query.includes("digital") || query.includes("crypto")) {
        response = selectedLanguage === "English" 
          ? "Under decree MORA-FTW-1446-01, Zakat is obligatorily assessed on liquid digital assets, cryptotokens, and modern tokenized holdings. The Nisab threshold is pegged at the current market value of 85 grams of gold, and holding is required for one lunar year (Hawl)."
          : selectedLanguage === "Somali"
          ? "Sida ku cad digreetada MORA-FTW-1446-01, Sakada waxaa waajib ah in laga bixiyo hantida dhijitaalka ah iyo lacagaha sirta ah haddii ay gaaraan xaddiga Nisaabka (oo u dhiganta qiimaha suuqa ee 85 garaam oo dahab ah) ayna buuxiyaan shuruudda sannadka (Hawl)."
          : "بموجب القرار السيادي MORA-FTW-1446-01، تجب الزكاة في الأصول الرقمية السائلة والعملات المشفرة إذا بلغت النصاب الشرعي (ما يعادل قيمة 85 غراماً من الذهب) وحال عليها الحول الهجري كاملاً.";
      } else if (query.includes("solar") || query.includes("lease") || query.includes("land")) {
        response = selectedLanguage === "English"
          ? "Under standard Waqf leasing policies (MORA-FTW-1445-03), vacant or agricultural waqf land may be leased for infrastructure such as community solar panels and water wells. Lease terms are capped at 15 years with a 3-year rent revaluation clause."
          : selectedLanguage === "Somali"
          ? "Marka loo eego siyaasadaha kireynta Waqfiga (MORA-FTW-1445-03), dhulka bannaan ama kan beeraha waxaa loo kireyn karaa mashaariicda kaabayaasha sida tamarta qorraxda iyo ceelasha biyaha. Heshiisku kuma dhaafi karo 15 sano iyadoo 3-dii sanaba mar dib loo eegayo."
          : "وفقاً لسياسات الأوقاف (MORA-FTW-1445-03)، يجوز كراء الأراضي الوقفية الشاغرة لإقامة مشاريع البنية التحتية مثل حقول الطاقة الشمسية والآبار، بحد أقصى 15 سنة مع شرط إعادة تقييم الأجرة كل 3 سنوات.";
      } else if (query.includes("moon") || query.includes("calendar") || query.includes("ramadan")) {
        response = selectedLanguage === "English"
          ? "Decree MORA-FTW-1445-09 establishes Hargeisa as the sole national moon-sighting authority. While astronomical data determines the precise moon coordinates, physical visual eyewitness accounts are legally mandatory to validate Ramadan and Eid entry."
          : selectedLanguage === "Somali"
          ? "Go'aanka MORA-FTW-1445-09 wuxuu Hargeysa u aqoonsan yahay halka keliya ee laga go'aamiyo bil-aragga. Inkasta oo xogta cilmiga xiddigiska la adeegsado, markhaati-kicinta indhaha ee sharciga ah ayaa waajib ah si loo xaqiijiyo bilowga Soonka iyo Ciidda."
          : "يحدد القرار السيادي MORA-FTW-1445-09 العاصمة هرجيسا كمرجع وطني وحيد لرؤية الأهلة. ورغم الاعتماد على الحسابات الفلكية لتحديد الإحداثيات، تظل الرؤية البصرية بالعين المجردة هي الشرط الشرعي الوحيد.";
      } else {
        response = selectedLanguage === "English"
          ? "Your query has been processed against the Somaliland Sovereign Shariah Database using semantic embeddings. No direct match was found for this specific transaction type. Under general Shariah principles (Al-Asl fil-Ashya al-Ibahah), objects and transactions are deemed permissible until evidence of prohibition is established. Please contact the MORA Fatwa Department in Hargeisa for a formal decree."
          : selectedLanguage === "Somali"
          ? "Weydiintaada waxaa la waafajiyay Xog-tiiba Sharciga ee Jamhuuriyadda Somaliland. Wax toos ah oo la mid ah lama helin. Sida caadiga ah Sharciga Islaamku wuxuu oggol yahay wax kasta ilaa caddeyn mamnuucis ah laga helo. Fadlan la xiriir Waaxda Fatwada ee Hargeysa."
          : "تمت معالجة استفساركم في قاعدة البيانات الشرعية السيادية لصوماليلاند. لم يتم العثور على فتوى مطابقة مباشرة. القاعدة الأصولية تقضي بأن الأصل في الأشياء والمعاملات الإباحة ما لم يرد دليل التحريم. يرجى التواصل مع إدارة الفتوى في هرجيسا لطلب فتوى رسمية.";
      }

      setRagResult(response);
      setLoadingRag(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-geometric relative" style={{ background: "var(--background)" }}>
      {/* Background glowing atoms */}
      <PulsingAtoms />

      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b"
          style={{ borderColor: "rgba(26,92,42,0.2)", background: "rgba(8,11,8,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-gold" />
            <div>
              <h2 className="font-outfit font-bold text-sm text-gold tracking-widest flex items-center gap-2">
                FATWA POLICY & SHARIAH KNOWLEDGE HUB
                <SomalilandFlag width={20} height={13} className="rounded-[1px] border border-white/5 inline-block" />
              </h2>
              <p className="text-xs text-foreground/40">
                Ministry of Religious Affairs & Endowments · Sovereign Shariah Legislative Archives
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-zinc-950/80 border border-white/10 rounded-lg p-1">
              <Languages className="w-3.5 h-3.5 text-zinc-500 ml-1" />
              {(["English", "Somali", "Arabic"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setRagResult(""); // Clear search result to prevent language mismatch
                  }}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                    selectedLanguage === lang 
                      ? "bg-gold text-black" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {lang === "Arabic" ? "العربية" : lang}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* main container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Quick Info Grid */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-gold">Archived Decrees</Typography>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">145 Fatwas</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Dating from 1412H - 1446H</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-emerald-400">Authority Endorsed</Typography>
                <h3 className="font-outfit font-bold text-2xl text-emerald-400 mt-1">100% Sovereign</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Republic of Somaliland Council</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-gold">Average Verification</Typography>
                <h3 className="font-outfit font-bold text-2xl text-white mt-1">3 Advisory Tiers</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Clerical, Legislative, Mufti</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-white/5 bg-white/3">
              <CardContent className="p-5">
                <Typography variant="label" className="text-amber-500">Searchable Index</Typography>
                <h3 className="font-outfit font-bold text-2xl text-amber-500 mt-1">Semantic Vector</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">AI retrieval augmented registry</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">

            {/* main Fatwa search directory */}
            <Card className="col-span-2 glass-card border-white/5 bg-white/3 p-5">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
                <h3 className="font-outfit font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gold" /> Sovereign Legal & Shariah Declarations
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search standard rulings by query..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredFatwas.length === 0 ? (
                  <p className="text-center text-xs text-zinc-500 py-8">
                    No verified declarations matched your search.
                  </p>
                ) : (
                  filteredFatwas.map((fatwa) => {
                    const localData = fatwa.content[selectedLanguage];
                    const isRtl = selectedLanguage === "Arabic";
                    return (
                      <div key={fatwa.id} className="p-4 bg-white/2 border border-white/5 hover:border-gold/20 rounded-lg transition-all space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold text-gold">{fatwa.id}</span>
                              <Badge className="bg-zinc-800 text-zinc-300 border-white/5 text-[9px]">
                                {fatwa.category}
                              </Badge>
                            </div>
                            <h4 className={`font-outfit font-bold text-sm text-white ${isRtl ? "text-right font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
                              {localData.title}
                            </h4>
                          </div>
                          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 text-[9px] font-bold">
                            {fatwa.status}
                          </Badge>
                        </div>

                        <div className={`p-3 bg-zinc-950/80 border border-white/5 rounded-md text-xs leading-relaxed text-zinc-300 font-medium ${isRtl ? "text-right font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
                          <span className="font-bold text-gold block mb-1">{selectedLanguage === "English" ? "Ruling Decree:" : selectedLanguage === "Somali" ? "Xukunka:" : "الفتوى الشرعية:"}</span>
                          {localData.ruling}
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-zinc-400">{fatwa.authority}</span>
                            <span>·</span>
                            <span className="font-mono">{fatwa.date}</span>
                          </div>
                          <Button size="sm" className="h-6 px-2.5 bg-transparent border border-white/10 hover:border-gold/30 hover:bg-gold/5 text-gold text-[10px] font-semibold gap-1">
                            <Download className="w-3 h-3" /> PDF
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            {/* Semantic Vector AI RAG Simulator */}
            <div className="space-y-4">
              <Card className="glass-card border-white/5 bg-white/3 p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-gold animate-bounce" />
                  <h3 className="font-outfit font-bold text-sm text-white">
                    Sovereign Shariah AI RAG Engine
                  </h3>
                </div>
                <Typography variant="small" className="text-zinc-400 leading-relaxed mb-4">
                  Interact with the Ministry's retrieval-augmented neural search indexing database. Ask questions regarding Zakat rates, Waqf leases, or moon-sighting protocols.
                </Typography>

                <form onSubmit={handleRagSearch} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Enter your query</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Zakat rules on digital coins"
                        value={ragQuery}
                        onChange={(e) => setRagQuery(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-xs rounded bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-gold"
                      />
                      <HelpCircle className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </div>

                  {/* Suggest queries */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-zinc-600 block">SUGGESTED PILOT QUERIES:</span>
                    <div className="flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() => setRagQuery("Zakat on digital assets")}
                        className="text-[9px] bg-white/5 border border-white/5 hover:border-gold/20 text-zinc-300 rounded px-1.5 py-0.5"
                      >
                        Zakat on Digital Coins
                      </button>
                      <button
                        type="button"
                        onClick={() => setRagQuery("Waqf solar panels lease")}
                        className="text-[9px] bg-white/5 border border-white/5 hover:border-gold/20 text-zinc-300 rounded px-1.5 py-0.5"
                      >
                        Leasing Waqf For Solar
                      </button>
                      <button
                        type="button"
                        onClick={() => setRagQuery("Standard moon sighting")}
                        className="text-[9px] bg-white/5 border border-white/5 hover:border-gold/20 text-zinc-300 rounded px-1.5 py-0.5"
                      >
                        Moon-sighting Standard
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loadingRag || !ragQuery.trim()}
                    className="w-full bg-gold hover:bg-gold/90 text-black text-xs font-bold py-2 rounded flex items-center justify-center gap-1.5"
                  >
                    {loadingRag ? (
                      <>Analyzing Archives...</>
                    ) : (
                      <>
                        <Send className="w-3 h-3" /> Query Semantic Vector
                      </>
                    )}
                  </Button>
                </form>

                {/* AI RAG Response Output Block */}
                {searchedText && (
                  <div className="mt-4 p-3.5 bg-zinc-950/80 border border-gold/15 rounded-md space-y-2 relative overflow-hidden">
                    {/* Glowing highlight stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-gold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Semantic Synthesis Result
                      </span>
                      {loadingRag && (
                        <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
                      )}
                    </div>

                    {loadingRag ? (
                      <div className="space-y-1.5 pt-1.5">
                        <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
                        <div className="h-3 bg-white/5 rounded animate-pulse w-5/6" />
                        <div className="h-3 bg-white/5 rounded animate-pulse w-4/6" />
                      </div>
                    ) : (
                      <>
                        <p className="text-[10px] text-zinc-500 font-semibold italic truncate">
                          "{searchedText}"
                        </p>
                        <p className={`text-[11px] leading-relaxed text-zinc-200 pt-1 ${selectedLanguage === "Arabic" ? "text-right font-arabic" : ""}`} dir={selectedLanguage === "Arabic" ? "rtl" : "ltr"}>
                          {ragResult}
                        </p>
                        <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold pt-1.5">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Advisory Council Verified (100% Match)</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Card>

              {/* Government Digital Sovereignty Panel */}
              <Card className="glass-card border-white/5 bg-white/3 p-4 flex items-center gap-3">
                <SomalilandEmblem size={36} className="flex-shrink-0" />
                <div>
                  <Typography variant="small" className="text-white font-bold leading-normal">
                    Republic of Somaliland Constitution
                  </Typography>
                  <Typography variant="caption" className="text-zinc-500 leading-normal block">
                    Under Article 5, the Shariah is the primary foundation of national legislation.
                  </Typography>
                </div>
              </Card>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
