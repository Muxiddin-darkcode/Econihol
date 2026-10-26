import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Users, UserPlus, Key, School, Check, Sparkles } from 'lucide-react';

export const ClassManagement: React.FC = () => {
  const { currentUser, addAuditLog } = useApp();
  const [classCode] = useState('EKO-3A-7749');
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleRoster = [
    { id: 'std-1', name: 'Ali Valiyev', stars: 125, tasksDone: 4, ecoScore: 85, status: 'Faol' },
    { id: 'std-2', name: 'Madina Olimova', stars: 110, tasksDone: 3, ecoScore: 82, status: 'Faol' },
    { id: 'std-3', name: 'Sardorbek Rahimov', stars: 95, tasksDone: 3, ecoScore: 78, status: 'Faol' },
    { id: 'std-4', name: 'Zilola Ergasheva', stars: 130, tasksDone: 5, ecoScore: 90, status: 'Faol' },
    { id: 'std-5', name: 'Jasur Temirov', stars: 80, tasksDone: 2, ecoScore: 74, status: 'Faol' }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classCode);
    setCopiedCode(true);
    addAuditLog('COPY_CLASS_CODE', 'class', '3-A', 'SUCCESS', "Sinfga qo'shilish kodi nusxalandi.");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            <h1 className="text-2xl font-black text-slate-800">
              Sinf Boshqaruvi va O‘quvchilar Ro‘yxati
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            O‘zbekiston Respublikasi MMTB: e-Maktab ro‘yxati, sinf o‘quvchilari va ekologik baholash jurnali
          </p>
        </div>

        {/* Join Code Card */}
        <div className="bg-white px-4 py-2 rounded-2xl border border-blue-200 shadow-2xs flex items-center gap-3">
          <div className="text-left">
            <div className="text-[10px] text-slate-400 font-bold uppercase">e-Maktab sinf kodi:</div>
            <div className="text-sm font-mono font-black text-blue-900">{classCode}</div>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Key className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Nusxalandi' : 'Nusxa olish'}</span>
          </button>
        </div>
      </div>

      {/* Class Meta Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800 font-black text-lg">
            3-«A»
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800">3-«A» Sinf (Tabiiy fanlar • DTS dasturi)</h3>
            <p className="text-xs text-slate-500">
              Sinf rahbari: {currentUser.displayName} (Oliy toifa) • Maktab: {currentUser.schoolName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          <div>
            <span className="text-slate-400 block">Jami o‘quvchilar:</span>
            <span className="text-slate-800 font-bold text-sm">28 nafar</span>
          </div>
          <div>
            <span className="text-slate-400 block">O‘rtacha yulduz:</span>
            <span className="text-amber-600 font-bold text-sm">108 ⭐</span>
          </div>
          <div>
            <span className="text-slate-400 block">Ekologik indeks:</span>
            <span className="text-emerald-700 font-bold text-sm">79.5%</span>
          </div>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          O‘quvchilar ro‘yxati va ko‘rsatkichlari:
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                <th className="py-3 px-3">O‘quvchi</th>
                <th className="py-3 px-3">To‘plangan yulduzlar</th>
                <th className="py-3 px-3">Bajarilgan topshiriqlar</th>
                <th className="py-3 px-3">Ekologik madaniyat indeksi</th>
                <th className="py-3 px-3">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleRoster.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-extrabold text-slate-800">{s.name}</td>
                  <td className="py-3 px-3 font-bold text-amber-700">{s.stars} ⭐</td>
                  <td className="py-3 px-3 text-slate-700">{s.tasksDone} ta vazifa</td>
                  <td className="py-3 px-3">
                    <span className="font-black text-emerald-700">{s.ecoScore}%</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
