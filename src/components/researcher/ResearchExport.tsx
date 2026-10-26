import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Download, FileText, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

export const ResearchExport: React.FC = () => {
  const { participants, study, addAuditLog, currentUser } = useApp();
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const dataDictionary = [
    { column: 'participant_code', type: 'string', desc: 'O‘quvchining pseudonimlashtirilgan unikal kodi (masalan: EXP-101)', range: 'EXP-*, CTRL-*', missing: 'NA', version: 'v1.0' },
    { column: 'group_type', type: 'categorical', desc: 'Tadqiqot guruhi toifasi: tajriba (experimental) yoki nazorat (control)', range: 'experimental | control', missing: 'NA', version: 'v1.0' },
    { column: 'grade_level', type: 'integer', desc: 'O‘quvchining ta’lim olayotgan sinfi', range: '1, 2, 3, 4', missing: 'NA', version: 'v1.0' },
    { column: 't0_knowledge', type: 'float', desc: 'Boshlang‘ich o‘lchovdagi ekologik bilim darajasi', range: '0.0 - 100.0', missing: '-999', version: 'INST-KNOW-2026' },
    { column: 't1_knowledge', type: 'float', desc: 'Yakuniy o‘lchovdagi ekologik bilim darajasi', range: '0.0 - 100.0', missing: '-999', version: 'INST-KNOW-2026' },
    { column: 't0_attitude', type: 'float', desc: 'Boshlang‘ich ekologik qadriyat va munosabat', range: '0.0 - 100.0', missing: '-999', version: 'INST-ATT-2026' },
    { column: 't1_attitude', type: 'float', desc: 'Yakuniy ekologik qadriyat va munosabat', range: '0.0 - 100.0', missing: '-999', version: 'INST-ATT-2026' },
    { column: 't0_skill', type: 'float', desc: 'Boshlang‘ich amaliy ko‘nikma (rubrika asosida)', range: '0.0 - 100.0', missing: '-999', version: 'RUB-PRAC-2026' },
    { column: 't1_skill', type: 'float', desc: 'Yakuniy amaliy ko‘nikma (rubrika asosida)', range: '0.0 - 100.0', missing: '-999', version: 'RUB-PRAC-2026' },
    { column: 't0_behavior', type: 'float', desc: 'Boshlang‘ich ekologik xulq-atvor odatlari', range: '0.0 - 100.0', missing: '-999', version: 'INST-BEH-2026' },
    { column: 't1_behavior', type: 'float', desc: 'Yakuniy ekologik xulq-atvor odatlari', range: '0.0 - 100.0', missing: '-999', version: 'INST-BEH-2026' },
    { column: 'overall_t0', type: 'float', desc: 'Kompozit T0 Ekologik Madaniyat Indeksi', range: '0.0 - 100.0', missing: '-999', version: 'COMP-IDX-v1' },
    { column: 'overall_t1', type: 'float', desc: 'Kompozit T1 Ekologik Madaniyat Indeksi', range: '0.0 - 100.0', missing: '-999', version: 'COMP-IDX-v1' }
  ];

  const handleDownloadCsv = () => {
    // Generate CSV content
    const headers = [
      'participant_code',
      'group_type',
      'grade_level',
      't0_knowledge',
      't1_knowledge',
      't0_attitude',
      't1_attitude',
      't0_skill',
      't1_skill',
      't0_behavior',
      't1_behavior',
      'overall_t0',
      'overall_t1'
    ];

    const rows = participants.map(p => [
      p.participantCode,
      p.groupType,
      p.gradeLevel,
      p.t0Knowledge,
      p.t1Knowledge,
      p.t0Attitude,
      p.t1Attitude,
      p.t0Skill,
      p.t1Skill,
      p.t0Behavior,
      p.t1Behavior,
      p.overallT0,
      p.overallT1
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Eco_Nihol_Research_Dataset_${study.protocolVersion}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditLog('DATA_EXPORT_CSV', 'research_dataset', study.id, 'SUCCESS', `Tadqiqotchi ${currentUser.displayName} pseudonimlashtirilgan datasetni CSV formatida yuklab oldi.`);
    setDownloadToast('CSV dataset muvaffaqiyatli yuklab olindi va Audit jurnaliga qayd etildi.');
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(participants, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Eco_Nihol_Research_Dataset_${study.protocolVersion}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addAuditLog('DATA_EXPORT_JSON', 'research_dataset', study.id, 'SUCCESS', `JSON eksport qilindi.`);
    setDownloadToast('JSON formatidagi ma’lumotlar fayli yuklab olindi.');
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📥</span>
            <h1 className="text-2xl font-black text-slate-800">
              Ilmiy Ma’lumotlar Eksporti va Ma’lumotlar Lug‘ati
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Section 13.1 talabi: Pseudonimlashtirilgan tadqiqot natijalari (SPSS, R, Python tahlili uchun) va rasmiy Data Dictionary
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadCsv}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>CSV (Excel/SPSS) yuklab olish</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>JSON yuklab olish</span>
          </button>
        </div>
      </div>

      {downloadToast && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Protocol Meta Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
              {study.protocolVersion}
            </span>
            <span className="text-xs text-slate-500 font-medium">Tasdiqlangan sana: {study.approvedDate}</span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-800">{study.title}</h3>
          <p className="text-xs text-slate-500 max-w-xl">{study.hypothesis}</p>
        </div>

        <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs">
          <ShieldCheck className="w-6 h-6 text-purple-600 shrink-0" />
          <div className="space-y-0.5">
            <div className="font-extrabold text-purple-950">Maxfiylik va Etika kafolatlangan</div>
            <div className="text-purple-800 text-[11px]">
              O‘quvchilar ism-familiyasi, maktab manzili yoki shaxsiy ma’lumotlari eksportga chiqarilmaydi.
            </div>
          </div>
        </div>
      </div>

      {/* Data Dictionary Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
              Ma’lumotlar Lug‘ati (Data Dictionary / Codebook):
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{dataDictionary.length} ta o‘zgaruvchi</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-black">
                <th className="py-3 px-3">Ustun nomi</th>
                <th className="py-3 px-3">Turi</th>
                <th className="py-3 px-3">Ta’rif (Mazmuni)</th>
                <th className="py-3 px-3">Qiymat diapazoni</th>
                <th className="py-3 px-3">Yetishmovchilik kodi</th>
                <th className="py-3 px-3">Instrument versiyasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataDictionary.map(item => (
                <tr key={item.column} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-purple-800">{item.column}</td>
                  <td className="py-3 px-3 font-semibold text-slate-500">{item.type}</td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{item.desc}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{item.range}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{item.missing}</td>
                  <td className="py-3 px-3 text-slate-500">{item.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
