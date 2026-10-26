import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, ShieldAlert, FileText } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <h1 className="text-2xl font-black text-slate-800">
              Tizim Xavfsizligi va Audit Jurnali (Audit Logs)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Section 7 va 12 talabi: Barcha muhim kirish, baholash, AI xavfsizlik filtri va eksport amallari to‘liq qayd etiladi
          </p>
        </div>

        <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Jami yozuvlar: <strong>{auditLogs.length} ta hodisa</strong>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                <th className="py-3 px-3">Vaqt (UTC/UZ)</th>
                <th className="py-3 px-3">Foydalanuvchi / Rol</th>
                <th className="py-3 px-3">Harakat (Action)</th>
                <th className="py-3 px-3">Resurs turi</th>
                <th className="py-3 px-3">Natija</th>
                <th className="py-3 px-3">Tafsilotlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                    {log.eventTime}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-extrabold text-slate-800">{log.actorName}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      {log.actorRole}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-700">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px]">
                      {log.resourceType}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black inline-flex items-center gap-1 ${
                        log.result === 'SUCCESS'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.result === 'FLAGGED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.result === 'SUCCESS' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <ShieldAlert className="w-3 h-3 text-rose-600" />
                      )}
                      <span>{log.result}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs truncate" title={log.details}>
                    {log.details}
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
