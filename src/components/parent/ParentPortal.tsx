import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { HeartHandshake, CheckCircle2, ShieldCheck, Sparkles, Award, Home, Droplet, Sun } from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const { studentDimensionScores, studentOverallScore, submissions, badges } = useApp();

  const [homeHabits, setHomeHabits] = useState([
    { id: 1, text: 'Tish tozalaganda kranni stakanga suv olib yopish', done: true },
    { id: 2, text: 'Xonadan chiqayotganda elektr chirog‘ini o‘chirish', done: true },
    { id: 3, text: 'Uyda hosil bo‘lgan eski qog‘oz va qutilarni alohida to‘plash', done: false },
    { id: 4, text: 'Xonaki gullarga birgalikda suv quyish va barglarini artish', done: true }
  ]);

  const toggleHabit = (id: number) => {
    setHomeHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-rose-100">
            Ota-ona Kabineti (M11 Modul)
          </span>
          <span className="text-xs font-bold bg-white/20 text-rose-100 px-2.5 py-0.5 rounded-full">
            Farzand: Ali Valiyev (3-A sinf)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">
          Farzandingizning Ekologik Odatlari va Rivojlanishi
        </h1>

        <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
          Tabiatga mehr va tozalik madaniyati avvalo oiladan boshlanadi. Bu yerda farzandingizning darsdagi amaliy yutuqlari va uyda birga bajariladigan ekologik odatlarni kuzatishingiz mumkin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Child's Progress & Badges */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                Umumiy Ekologik Madaniyat Indeksi:
              </h3>
              <span className="text-xl font-black text-emerald-700">{studentOverallScore}%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {studentDimensionScores.map(d => (
                <div key={d.dimension} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-slate-800">{d.titleUz}</span>
                    <span className="text-emerald-700">{d.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submissions done by child */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
              Farzandingiz bajargan amaliy ishlar:
            </h3>

            <div className="space-y-3">
              {submissions.map(sub => (
                <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-800">{sub.taskTitle}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {sub.status === 'graded' ? `${sub.score}/3 ball (Tekshirilgan)` : 'Tekshiruvda'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{sub.notes}"</p>
                  {sub.feedback && (
                    <div className="text-[11px] text-emerald-800 pt-1 font-medium">
                      Ustoz izohi: {sub.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Home Eco Checklist */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Uyda birgalikdagi ekologik odatlar:
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="text-xs text-slate-600 leading-relaxed">
              Farzandingiz bilan har kuni ushbu oddiy amallarni bajaring va belgilab boring:
            </div>

            <div className="space-y-2.5">
              {homeHabits.map(h => (
                <button
                  key={h.id}
                  onClick={() => toggleHabit(h.id)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs font-medium flex items-start gap-2.5 transition-all ${
                    h.done
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                    h.done ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                  }`}>
                    {h.done && '✓'}
                  </span>
                  <span className="leading-snug">{h.text}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ota-ona ma’lumotlari xavfsiz va boshqalarga ko‘rsatilmaydi.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
