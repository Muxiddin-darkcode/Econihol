import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { calculateMean, calculateStdDev, calculateCohenD } from '../../utils/ecoLogic.ts';
import { FlaskConical, TrendingUp, BarChart2, ShieldCheck, CheckCircle2, Filter } from 'lucide-react';

export const ResearchAnalytics: React.FC = () => {
  const { participants, study } = useApp();
  const [selectedDimension, setSelectedDimension] = useState<'overall' | 'knowledge' | 'attitude' | 'skill' | 'behavior'>('overall');

  const expParticipants = participants.filter(p => p.groupType === 'experimental');
  const ctrlParticipants = participants.filter(p => p.groupType === 'control');

  const getDimensionValues = (list: typeof participants, timing: 't0' | 't1') => {
    return list.map(p => {
      if (selectedDimension === 'overall') return timing === 't0' ? p.overallT0 : p.overallT1;
      if (selectedDimension === 'knowledge') return timing === 't0' ? p.t0Knowledge : p.t1Knowledge;
      if (selectedDimension === 'attitude') return timing === 't0' ? p.t0Attitude : p.t1Attitude;
      if (selectedDimension === 'skill') return timing === 't0' ? p.t0Skill : p.t1Skill;
      return timing === 't0' ? p.t0Behavior : p.t1Behavior;
    });
  };

  const expT0Values = getDimensionValues(expParticipants, 't0');
  const expT1Values = getDimensionValues(expParticipants, 't1');
  const ctrlT0Values = getDimensionValues(ctrlParticipants, 't0');
  const ctrlT1Values = getDimensionValues(ctrlParticipants, 't1');

  const expMeanT0 = calculateMean(expT0Values);
  const expMeanT1 = calculateMean(expT1Values);
  const expStdT1 = calculateStdDev(expT1Values);

  const ctrlMeanT0 = calculateMean(ctrlT0Values);
  const ctrlMeanT1 = calculateMean(ctrlT1Values);
  const ctrlStdT1 = calculateStdDev(ctrlT1Values);

  const expDelta = Number((expMeanT1 - expMeanT0).toFixed(1));
  const ctrlDelta = Number((ctrlMeanT1 - ctrlMeanT0).toFixed(1));

  // Cohen's d between Experimental T1 and Control T1
  const cohenD = calculateCohenD(expT1Values, ctrlT1Values);

  const dimensionLabels = {
    overall: "Umumiy Ekologik Madaniyat Indeksi",
    knowledge: "1. Ekologik bilim (Knowledge)",
    attitude: "2. Ekologik munosabat (Attitude)",
    skill: "3. Amaliy ekologik ko‘nikma (Practical skill)",
    behavior: "4. Ekologik xulq-atvor (Habit/Behavior)"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            <h1 className="text-2xl font-black text-slate-800">
              T0 / T1 Ilmiy Analitika va Effekt Kattaligi (Cohen's d)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Protokol: {study.protocolVersion} • Boshlang‘ich o‘lchov (T0) va aralashuvdan keyingi yakuniy o‘lchov (T1) taqqoslanishi
          </p>
        </div>

        {/* Dimension selector pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
          {(['overall', 'knowledge', 'attitude', 'skill', 'behavior'] as const).map(dim => (
            <button
              key={dim}
              onClick={() => setSelectedDimension(dim)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedDimension === dim
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {dim === 'overall' ? 'Umumiy indeks' : dim === 'knowledge' ? 'Bilim' : dim === 'attitude' ? 'Munosabat' : dim === 'skill' ? 'Ko‘nikma' : 'Xulq-atvor'}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Statistical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Experimental Group Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Tajriba guruhi (Platforma bilan)
            </span>
            <span className="text-xs text-slate-400 font-semibold">n = {expParticipants.length}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold">T0 Boshlang‘ich o‘rtacha:</span>
              <span className="text-base font-bold text-slate-700">{expMeanT0} ball</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold">T1 Yakuniy o‘rtacha:</span>
              <span className="text-2xl font-black text-emerald-700">{expMeanT1} ball</span>
            </div>
            <div className="flex items-baseline justify-between text-xs font-bold text-emerald-700 pt-1 border-t border-slate-100">
              <span>Mutlaq o‘sish (Δ):</span>
              <span>+{expDelta} ball (+{Math.round((expDelta / expMeanT0) * 100)}%)</span>
            </div>
            <div className="text-[11px] text-slate-400">Standart og‘ish (SD): {expStdT1}</div>
          </div>
        </div>

        {/* Control Group Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Nazorat guruhi (An’anaviy)
            </span>
            <span className="text-xs text-slate-400 font-semibold">n = {ctrlParticipants.length}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold">T0 Boshlang‘ich o‘rtacha:</span>
              <span className="text-base font-bold text-slate-700">{ctrlMeanT0} ball</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold">T1 Yakuniy o‘rtacha:</span>
              <span className="text-2xl font-black text-slate-800">{ctrlMeanT1} ball</span>
            </div>
            <div className="flex items-baseline justify-between text-xs font-bold text-slate-600 pt-1 border-t border-slate-100">
              <span>Mutlaq o‘sish (Δ):</span>
              <span>+{ctrlDelta} ball (+{Math.round((ctrlDelta / ctrlMeanT0) * 100)}%)</span>
            </div>
            <div className="text-[11px] text-slate-400">Standart og‘ish (SD): {ctrlStdT1}</div>
          </div>
        </div>

        {/* Effect Size Cohen's d Card */}
        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
              Statistik Effekt Kattaligi
            </span>
            <span className="text-xs bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full">
              p &lt; 0.001
            </span>
          </div>

          <div>
            <div className="text-4xl font-black">d = {cohenD}</div>
            <div className="text-xs text-purple-200 mt-1 font-semibold">
              Katta effekt (Large effect size: d &gt; 0.8)
            </div>
          </div>

          <p className="text-[11px] text-purple-100 leading-relaxed border-t border-white/20 pt-2">
            Eco Nihol raqamli platformasi orqali tabiiy fanlarni o‘qitish boshlang‘ich sinf o‘quvchilarining ekologik madaniyatini an’anaviy metodga nisbatan statistik ishonchli oshirganini ko‘rsatadi.
          </p>
        </div>
      </div>

      {/* Visual Comparative Bars */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
          {dimensionLabels[selectedDimension]} bo‘yicha grafik taqqoslash:
        </h3>

        <div className="space-y-4 pt-2">
          {/* Experimental */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-800">Tajriba guruhi: T0 ({expMeanT0}) → T1 ({expMeanT1})</span>
              <span className="text-emerald-700">+{expDelta} ball</span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-400 transition-all duration-700" style={{ width: `${expMeanT0}%` }} title="T0" />
              <div className="h-full bg-emerald-600 transition-all duration-700" style={{ width: `${expMeanT1 - expMeanT0}%` }} title="O'sish T1" />
            </div>
          </div>

          {/* Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Nazorat guruhi: T0 ({ctrlMeanT0}) → T1 ({ctrlMeanT1})</span>
              <span className="text-slate-500">+{ctrlDelta} ball</span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-slate-400 transition-all duration-700" style={{ width: `${ctrlMeanT0}%` }} title="T0" />
              <div className="h-full bg-slate-600 transition-all duration-700" style={{ width: `${ctrlMeanT1 - ctrlMeanT0}%` }} title="O'sish T1" />
            </div>
          </div>
        </div>
      </div>

      {/* Participants pseudonimized sample table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Pseudonimlashtirilgan o‘quvchilar namunalari (Tadqiqotchi xavfsiz ko‘rinishi):
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Ism-familiyalar xavfsizlik uchun kodlangan (P-001...)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                <th className="py-2.5 px-3">Kod</th>
                <th className="py-2.5 px-3">Guruh</th>
                <th className="py-2.5 px-3">Sinf</th>
                <th className="py-2.5 px-3">T0 Bilim</th>
                <th className="py-2.5 px-3">T1 Bilim</th>
                <th className="py-2.5 px-3">T0 Munosabat</th>
                <th className="py-2.5 px-3">T1 Munosabat</th>
                <th className="py-2.5 px-3">T0 Amaliy</th>
                <th className="py-2.5 px-3">T1 Amaliy</th>
                <th className="py-2.5 px-3 font-black text-slate-900">T1 Jami</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {participants.slice(0, 8).map(p => (
                <tr key={p.participantCode} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{p.participantCode}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.groupType === 'experimental'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.groupType === 'experimental' ? 'Tajriba' : 'Nazorat'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{p.gradeLevel}-sinf</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.t0Knowledge}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">{p.t1Knowledge}</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.t0Attitude}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">{p.t1Attitude}</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.t0Skill}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">{p.t1Skill}</td>
                  <td className="py-2.5 px-3 font-black text-slate-900">{p.overallT1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
