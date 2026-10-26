import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { STANDARD_ECO_RUBRICS } from '../../utils/ecoLogic.ts';
import { CheckSquare, Users, BookOpen, Bot, BarChart3, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { submissions, lessons, setActiveView, currentUser } = useApp();

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const gradedSubmissions = submissions.filter(s => s.status === 'graded');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-blue-100">
              O‘qituvchi Kabineti • {currentUser.schoolName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Xush kelibsiz, {currentUser.displayName}! 👩🏻‍🏫
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Boshlang‘ich sinflarda Tabiiy fanlar orqali ekologik madaniyatni shakllantirish, o‘quvchilar amaliy ishlarini mezonli baholash va ilmiy monitoring tizimi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('teacher-submissions')}
              className="px-5 py-2.5 rounded-2xl bg-white text-blue-900 font-extrabold text-xs shadow-md hover:bg-blue-50 transition-transform active:scale-95 flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4 text-blue-700" />
              <span>Tekshirish ({pendingSubmissions.length} ta)</span>
            </button>

            <button
              onClick={() => setActiveView('teacher-ai-planner')}
              className="px-5 py-2.5 rounded-2xl bg-blue-800/80 hover:bg-blue-800 text-white font-extrabold text-xs border border-white/20 transition-transform active:scale-95 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>AI Dars Loyihasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Biriktirilgan sinf</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 font-black text-xs">3-A</span>
          </div>
          <div className="text-2xl font-black text-slate-800">28 o‘quvchi</div>
          <div className="text-[11px] text-slate-500">Faollik darajasi: 92%</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Kutilayotgan ishlar</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{pendingSubmissions.length} ta vazifa</div>
          <div className="text-[11px] text-slate-500">0-3 rubrika bilan baholash zarur</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Sinf o‘rtacha indeksi</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">79.5%</div>
          <div className="text-[11px] text-emerald-600 font-semibold">T0 ga nisbatan +34.2% o‘sish</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Nashr darslar</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">{lessons.length} ta mavzu</div>
          <div className="text-[11px] text-slate-500">1-4 sinf o‘quv dasturiga mos</div>
        </div>
      </div>

      {/* Main Content: Pending Submissions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pending Reviews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <span>Tekshirish uchun kelib tushgan amaliy ishlar</span>
            </h3>
            <button
              onClick={() => setActiveView('teacher-submissions')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Barchasini ko‘rish →
            </button>
          </div>

          <div className="space-y-3">
            {pendingSubmissions.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-400 text-xs">
                Hozircha tekshirilmagan ishlar yo‘q. Barcha vazifalar ko‘rib chiqilgan! 🎉
              </div>
            ) : (
              pendingSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{sub.studentName}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {sub.className}
                      </span>
                      <span className="text-[10px] text-slate-400">{sub.submittedAt}</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-800">{sub.taskTitle}</div>
                    <p className="text-xs text-slate-600 line-clamp-1 italic">"{sub.notes}"</p>
                  </div>

                  <button
                    onClick={() => setActiveView('teacher-submissions')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs shrink-0 flex items-center gap-1.5"
                  >
                    <span>Rubrika bilan baholash</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Standard Rubric Overview */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Rasmiy 0-3 Baholash Rubrikasi (Metodika):
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="text-xs font-black text-slate-800">
              Amaliy ekologik ko‘nikma va xulq-atvor mezonlari:
            </div>

            <div className="space-y-2">
              {STANDARD_ECO_RUBRICS.map(r => (
                <div key={r.score} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-emerald-800">{r.score} ball: {r.labelUz}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{r.descriptionUz}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
              Ushbu rubrika ilmiy tadqiqotda T0 va T1 o‘lchovlarining obyektivligini kafolatlaydi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
