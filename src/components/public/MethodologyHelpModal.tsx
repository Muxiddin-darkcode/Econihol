import React from 'react';
import { HelpCircle, BookOpen, GraduationCap, FlaskConical, Shield, CheckCircle2 } from 'lucide-react';

export const MethodologyHelpModal: React.FC = () => {
  const faqs = [
    {
      q: "Eco Nihol platformasi nima uchun mo‘ljallangan?",
      a: "Boshlang‘ich sinf (1–4-sinflar) o‘quvchilarida Tabiiy fanlar misolida ekologik bilim, tabiatga qadriyatli munosabat, amaliy ko‘nikma va xulq-atvorni shakllantirish, shuningdek pedagogik va ilmiy monitoringni amalga oshirish uchun yaratilgan."
    },
    {
      q: "0–3 ballik rubrika qanday ishlaydi?",
      a: "0 — hali namoyon bo‘lmadi, 1 — yordam bilan bajaradi, 2 — mustaqil bajaradi, 3 — qo‘llaydi va izohlaydi. Bu mezon o‘quvchining amaliy xatti-harakatini aniq va obyektiv baholash imkonini beradi."
    },
    {
      q: "EkoDo‘st AI o‘quvchiga qanday yordam beradi?",
      a: "EkoDo‘st bolaga tayyor javobni darhol aytish o‘rniga, fikrlashga undovchi do‘stona savollar va maslahatlar beradi. O‘zbekiston va UNICEF xavfsizlik standartlariga to‘liq javob beradi."
    },
    {
      q: "Tadqiqotchi uchun qanday imkoniyatlar bor?",
      a: "Tajriba va nazorat guruhlari kesimida T0 (boshlang‘ich) va T1 (yakuniy) o‘lchovlar, Cohen's d statistik effekt kattaligi va SPSS/R dasturlari uchun tayyor CSV eksport imkoniyati mavjud."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800 text-2xl">
            📖
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
              Metodik Qo‘llanma va Tez-tez So‘raladigan Savollar (FAQ)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              O‘qituvchilar, tadqiqotchilar va ota-onalar uchun metodik tavsiyalar
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-slate-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
