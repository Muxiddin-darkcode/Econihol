import React from 'react';
import { ShieldCheck, Lock, ExternalLink, FileCheck, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyModal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-2xl">
            ⚖️
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
              Shaxsiy Ma’lumotlar Maxfiyligi va Qonunchilikka Moslik
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Section 12: Bolalar ma’lumotlari xavfsizligi, O‘zbekiston Respublikasi qonunlari va xalqaro me’yorlar
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
            <h3 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Asosiy Qonuniy Havolalar va Manbalar:</span>
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-emerald-900 font-medium">
              <li>
                O‘zbekiston Respublikasining <strong>"Shaxsga doir ma’lumotlar to‘g‘risida"</strong>gi Qonuni: {' '}
                <a
                  href="https://www.lex.uz/uz/docs/-4396419"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-emerald-700 font-bold inline-flex items-center gap-0.5"
                >
                  lex.uz/uz/docs/-4396419 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                O‘RQ-1125 (2026-yil) — Shaxsga doir ma’lumotlar to‘g‘risidagi qonunga o‘zgartirishlar: {' '}
                <a
                  href="https://www.lex.uz/uz/acts/-8099215"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-emerald-700 font-bold inline-flex items-center gap-0.5"
                >
                  lex.uz/uz/acts/-8099215 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                O‘zbekiston Respublikasining <strong>"Bola huquqlarining kafolatlari to‘g‘risida"</strong>gi Qonuni: {' '}
                <a
                  href="https://test.lex.uz/docs/-1297315"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-emerald-700 font-bold inline-flex items-center gap-0.5"
                >
                  lex.uz/docs/-1297315 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                UNICEF, Guidance on AI and children, Version 3.0 (2025): {' '}
                <a
                  href="https://www.unicef.org/innocenti/reports/policy-guidance-ai-children"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-emerald-700 font-bold inline-flex items-center gap-0.5"
                >
                  unicef.org/innocenti/reports/policy-guidance-ai-children <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              1. Ma’lumotlarni minimallashtirish (Data Minimization):
            </h3>
            <p>
              Platformada o‘quvchilar profilida faqat ta’lim jarayoni uchun zarur bo‘lgan minimal ma’lumotlar (ism, sinf va o‘qish faoliyati) saqlanadi. O‘quvchining to‘liq tug‘ilgan sanasi, uy manzili, telefon raqami, biometrik ma’lumotlari yoki geolokatsiyasi mutlaqo yig‘ilmaydi va saqlanmaydi.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              2. AI Suhbatlarida Maxfiylik va Filtrlar:
            </h3>
            <p>
              EkoDo‘st AI yordamchisi bilan suhbatda bola o‘z telefon raqami yoki manzilini yozishga uringan taqdirda, server qatlamidagi avtomatik xavfsizlik filtri so‘rovni to‘xtatadi va shaxsiy ma’lumotlarni yubormaslik haqida tushuntirish beradi. AI xizmatlariga hech qanday shaxsiy identifikatorlar yuborilmaydi.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              3. Ilmiy Tadqiqot Eksportlarida Pseudonimlashtirish:
            </h3>
            <p>
              Tadqiqotchi uchun yuklab olinadigan T0 va T1 o‘lchovlarida barcha o‘quvchilar maxsus kodlar (masalan, EXP-101, CTRL-201) bilan belgilanadi. Haqiqiy ism-shariflar ilmiy tahlil va eksport fayllaridan butunlay ajratilgan.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              4. Audit va Nazorat (Audit Logs):
            </h3>
            <p>
              Tizimda baholar, darslar tasdiqlanishi va ma’lumotlar eksporti bo‘yicha barcha muhim harakatlar o‘zgarmas audit jurnalida qayd etiladi. Shubhali yoki xavfsizlikka zid urinishlar administratorga signal sifatida yuboriladi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
