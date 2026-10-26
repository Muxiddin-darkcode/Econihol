import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  FlaskConical,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
  Star,
  Users,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentRole, setActiveView } = useApp();

  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto">
      {/* Apple-Style Keynote Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/40 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] p-8 sm:p-14 text-center space-y-6">
        {/* Soft Ambient Light Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 text-slate-700 text-xs font-semibold border border-slate-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Davlat Ta’lim Standartlari • 1–4-Sinflar Tabiiy Fanlar Dasturi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Kichik Yoshdagi O‘quvchilarda{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Ekologik Madaniyatni
            </span>{' '}
            Rivojlantirish
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Interaktiv o‘yinlar, amaliy laboratoriya topshiriqlari, xavfsiz AI yordamchisi hamda ilmiy-pedagogik monitoring uchun yagona zamonaviy raqamli makon.
          </p>
        </div>

        {/* Apple Style Segmented Quick Role Entrance */}
        <div className="relative z-10 pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setCurrentRole('student');
              setActiveView('student-home');
            }}
            className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>👦🏻</span>
            <span>O‘quvchi Kabinetiga Kirish</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          <button
            onClick={() => {
              setCurrentRole('teacher');
              setActiveView('teacher-dashboard');
            }}
            className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200/90 shadow-2xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>👩🏻‍🏫</span>
            <span>O‘qituvchi Boshqaruvi</span>
          </button>

          <button
            onClick={() => {
              setCurrentRole('researcher');
              setActiveView('research-analytics');
            }}
            className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200/90 shadow-2xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>👨🏻‍🔬</span>
            <span>Tadqiqotchi Tahlili</span>
          </button>
        </div>
      </section>

      {/* 4 Core Dimensions of Ecological Culture */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ekologik Madaniyatning 4 O‘lchovli Modeli
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Ilmiy tadqiqotda ekologik madaniyat faqat bitta test bali bilan emas, balki to‘rtta o‘zaro uyg‘un o‘lchov orqali shakllanadi:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DimensionCard
            title="1. Ekologik Bilim"
            desc="Tushunchalarni to‘g‘ri tanish, sabab-oqibatni tushunish va dars testlarida qo‘llash."
            color="bg-blue-50/80 border-blue-200/70 text-blue-950"
            squircle="bg-blue-500"
            icon="🧠"
          />
          <DimensionCard
            title="2. Ekologik Munosabat"
            desc="Tabiat go‘zalligini his etish, tirik mavjudotlarga mehr va ekologik empatiya."
            color="bg-rose-50/80 border-rose-200/70 text-rose-950"
            squircle="bg-rose-500"
            icon="❤️"
          />
          <DimensionCard
            title="3. Amaliy Ko‘nikma"
            desc="Chiqindilarni saralash, suvni tejash bo‘yicha to‘g‘ri amallar va 0–3 rubrika bahosi."
            color="bg-amber-50/80 border-amber-200/70 text-amber-950"
            squircle="bg-amber-500"
            icon="🛠️"
          />
          <DimensionCard
            title="4. Ekologik Xulq-atvor"
            desc="Kundalik hayotda (uyda va maktabda) tejamkorlik odatlarini ongli ravishda qo‘llash."
            color="bg-emerald-50/80 border-emerald-200/70 text-emerald-950"
            squircle="bg-emerald-500"
            icon="🌱"
          />
        </div>
      </section>

      {/* Key Functional Modules Bento Grid */}
      <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Platformaning Asosiy Funksional Modullari (M01 – M12)
          </h2>
          <p className="text-xs text-slate-500">Texnik topshiriqda belgilangan me’yorlar asosida ishlab chiqilgan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureBox
            icon={<BookOpen className="w-4 h-4 text-white" />}
            squircleColor="bg-blue-500"
            title="M01. 1–4-Sinflar Darslari"
            desc="Tabiiy fanlar dasturi bilan uzviy bog‘langan 8 ta interaktiv dars, yangi tushunchalar lug‘ati va formativ savollar."
          />
          <FeatureBox
            icon={<Gamepad2 className="w-4 h-4 text-white" />}
            squircleColor="bg-amber-500"
            title="M02. Interaktiv O‘yinlar"
            desc="Chiqindilarni 5 xil idishga saralash, Suvni tejash posboni, Ekologik oziq zanjiri va Virtual Tabiat Bog‘i."
          />
          <FeatureBox
            icon={<Sparkles className="w-4 h-4 text-white" />}
            squircleColor="bg-teal-500"
            title="M05. O‘quvchi AI Yordamchisi"
            desc="UNICEF 2025 AI Child Safety talablariga to‘liq mos, bolalar uchun xavfsiz va pedagogik yo‘naltirilgan AI maslahatchi."
          />
          <FeatureBox
            icon={<GraduationCap className="w-4 h-4 text-white" />}
            squircleColor="bg-purple-600"
            title="M06. AI O‘qituvchi Metodisti"
            desc="Bloom taksonomiyasi va 0-3 rubrikasi asosida 45 daqiqalik dars ishlanmasi qoralamasini tezkor generatsiya qilish."
          />
          <FeatureBox
            icon={<FlaskConical className="w-4 h-4 text-white" />}
            squircleColor="bg-indigo-600"
            title="M09. T0 / T1 Tadqiqot Analitikasi"
            desc="Tajriba va nazorat guruhlarini taqqoslash, Cohen's d effekt kattaligi va SPSS/R uchun data dictionary."
          />
          <FeatureBox
            icon={<ShieldCheck className="w-4 h-4 text-white" />}
            squircleColor="bg-rose-600"
            title="M10. Audit va Qonuniy Moslik"
            desc="O‘zbekiston Respublikasining 'Shaxsga doir ma’lumotlar to‘g‘risida'gi Qonuniga muvofiq xavfsizlik va audit jurnali."
          />
        </div>
      </section>
    </div>
  );
};

const DimensionCard: React.FC<{
  title: string;
  desc: string;
  color: string;
  squircle: string;
  icon: string;
}> = ({ title, desc, color, squircle, icon }) => (
  <div className={`p-5 rounded-3xl border ${color} space-y-2 text-left shadow-2xs`}>
    <div className={`w-8 h-8 rounded-xl ${squircle} flex items-center justify-center text-base shadow-2xs`}>
      {icon}
    </div>
    <h3 className="font-bold text-sm leading-snug">{title}</h3>
    <p className="text-xs leading-relaxed opacity-85 font-normal">{desc}</p>
  </div>
);

const FeatureBox: React.FC<{
  icon: React.ReactNode;
  squircleColor: string;
  title: string;
  desc: string;
}> = ({ icon, squircleColor, title, desc }) => (
  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2 text-left">
    <div className={`w-7 h-7 rounded-lg ${squircleColor} flex items-center justify-center shadow-2xs`}>
      {icon}
    </div>
    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{title}</h4>
    <p className="text-xs text-slate-600 leading-relaxed font-normal">{desc}</p>
  </div>
);
