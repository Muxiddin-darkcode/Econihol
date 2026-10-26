import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { FlaskConical, Users, Calendar, Award, CheckCircle2, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';

export const ResearchOverview: React.FC = () => {
  const { study, participants, setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-purple-200">
            Ilmiy Tadqiqot Protokoli • 2026
          </span>
          <span className="text-xs font-bold bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full">
            Etik tasdiqlangan
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black max-w-3xl leading-tight">
          {study.title}
        </h1>

        <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
          Gipoteza: {study.hypothesis}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            onClick={() => setActiveView('research-analytics')}
            className="px-5 py-2.5 rounded-2xl bg-white text-purple-900 font-extrabold text-xs shadow-md hover:bg-purple-50 transition-transform active:scale-95 flex items-center gap-2"
          >
            <FlaskConical className="w-4 h-4 text-purple-700" />
            <span>T0 / T1 Analitika & Effekt d</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveView('research-export')}
            className="px-5 py-2.5 rounded-2xl bg-purple-700/80 hover:bg-purple-700 text-white font-extrabold text-xs border border-white/20 transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Ma’lumotlar bazasini eksport qilish</span>
          </button>
        </div>
      </div>

      {/* Protocol Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase">Jami qatnashchilar</div>
          <div className="text-2xl font-black text-slate-800">{study.sampleSize} o‘quvchi</div>
          <div className="text-[11px] text-slate-400">1-, 2-, 3- va 4-sinflar</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase">Tajriba guruhi (Platforma)</div>
          <div className="text-2xl font-black text-emerald-700">{study.experimentalCount} o‘quvchi</div>
          <div className="text-[11px] text-emerald-600 font-medium">Interaktiv darslar + amaliyot</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase">Nazorat guruhi</div>
          <div className="text-2xl font-black text-slate-700">{study.controlCount} o‘quvchi</div>
          <div className="text-[11px] text-slate-400">An’anaviy darslik uslubi</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase">O‘lchov nuqtalari</div>
          <div className="text-2xl font-black text-purple-700">T0 & T1</div>
          <div className="text-[11px] text-slate-400">Boshlang‘ich va yakuniy</div>
        </div>
      </div>

      {/* Experimental Design Details (Section 6.2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Tajriba-sinov dizayni (Section 6.2):</span>
          </h3>
          <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Protokol oldindan qayd etilgan:</strong> O‘rganish mezonlari, asosiy ko‘rsatkichlar va taqqoslash modeli oldindan tasdiqlangan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Taqqoslanuvchi guruhlar:</strong> Tajriba va nazorat guruhlari teng taqsimlangan bo‘lib, bir xil ta’lim dasturiga asoslanadi.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Ko‘p mezonli o‘lchov:</strong> Ekologik madaniyat faqat bitta test balli bilan emas, 4 o‘lchov (bilim, munosabat, amaliy ko‘nikma, xulq-atvor) bilan o‘lchanadi.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Etika va Bolalar Maxfiyligi Kafolati:</span>
          </h3>
          <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Pseudonimlashtirish:</strong> Tahlilda shaxsiy ism-sharif o‘rniga P-001 kabi kodlar ishlatiladi.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Ota-ona roziligi:</strong> Barcha qatnashchilar uchun qonuniy vakillarning tadqiqotda ishtirok roziligi olingan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Shaxsiy ma’lumotlarni minimallashtirish:</strong> Yashash manzili, telefon yoki biometrik ma’lumotlar yig‘ilmaydi.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
