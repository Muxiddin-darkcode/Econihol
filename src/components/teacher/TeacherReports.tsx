import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2, Download, Layers } from 'lucide-react';

export const TeacherReports: React.FC = () => {
  const { currentUser, addAuditLog } = useApp();

  const handleExportClassReport = () => {
    addAuditLog('EXPORT_CLASS_REPORT', 'report', 'class-3A', 'SUCCESS', "Sinf hisoboti eksport qilindi.");
    alert("3-A sinf bo'yicha ekologik monitoring hisoboti tayyorlandi!");
  };

  const topicsAnalysis = [
    { topic: 'Suvni tejash va kranni tekshirish', masterRate: 94, difficulty: 'Oson (yuqori o‘zlashtirish)' },
    { topic: 'Chiqindilarni 5 toifaga saralash', masterRate: 88, difficulty: 'Yaxshi' },
    { topic: 'Daraxtlar va kislorod fotosintezi', masterRate: 78, difficulty: 'O‘rtacha' },
    { topic: 'Ekologik oziq zanjirini tuzish', masterRate: 68, difficulty: 'Qiyinchilik mavjud (qo‘shimcha mashq zarur)' },
    { topic: 'Eski batareyalar xavfi va tuproq', masterRate: 82, difficulty: 'Yaxshi' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <h1 className="text-2xl font-black text-slate-800">
              Sinf Diagnostikasi va Pedagogik Hisobotlar
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Section 4 (/teacher/reports): Mavzular bo‘yicha o‘zlashtirish, qiyinchilik nuqtalari va rivojlanish grafigi
          </p>
        </div>

        <button
          onClick={handleExportClassReport}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Sinf hisobotini yuklab olish</span>
        </button>
      </div>

      {/* Topics Master Rate Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
          Tabiiy fanlar mavzulari bo‘yicha sinf o‘zlashtirishi:
        </h3>

        <div className="space-y-4 pt-1">
          {topicsAnalysis.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">{item.topic}</span>
                <span className={`${item.masterRate >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {item.masterRate}% o‘zlashtirildi ({item.difficulty})
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.masterRate >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.masterRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
