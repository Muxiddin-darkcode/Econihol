import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ShieldCheck, Bot, Sliders, CheckCircle2, Lock, Save, AlertTriangle } from 'lucide-react';

export const AdminAiSettings: React.FC = () => {
  const { addAuditLog } = useApp();
  const [modelName, setModelName] = useState('gemini-2.5-flash');
  const [temperature, setTemperature] = useState(0.4);
  const [maxOutputTokens, setMaxOutputTokens] = useState(300);
  const [safetyFilterActive, setSafetyFilterActive] = useState(true);
  const [blockedKeywords, setBlockedKeywords] = useState('telefon, parol, manzilim, uyim, familyam');
  const [promptVersion, setPromptVersion] = useState('PROMPT-STUDENT-SAFE-v2.1');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    addAuditLog('UPDATE_AI_CONFIG', 'ai_settings', promptVersion, 'SUCCESS', 'AI xavfsizlik parametrlari yangilandi.');
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <h1 className="text-2xl font-black text-slate-800">
            Sun’iy Intellekt Sozlamalari va Bolalar Xavfsizligi
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          UNICEF 2025 AI Yo‘riqnomasi va O‘zbekiston qonunchiligiga muvofiq promptlar, filtrlar va limitlarni boshqarish
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                AI Gateway & Model Parametrlari
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Faol
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  AI Model provayderi:
                </label>
                <select
                  value={modelName}
                  onChange={e => setModelName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Tezkor va xavfsiz)</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Chuqur tahlil)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Faol Tizim Siyosati (Prompt versiyasi):
                </label>
                <input
                  type="text"
                  value={promptVersion}
                  onChange={e => setPromptVersion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Harorat (Temperature):</span>
                  <span>{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-[10px] text-slate-400">
                  Bolalar ta’limi uchun 0.3-0.5 oralig‘i tavsiya etiladi (aniqlik va do‘stonalik).
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Maksimal token chegarasi (Max tokens):
                </label>
                <input
                  type="number"
                  value={maxOutputTokens}
                  onChange={e => setMaxOutputTokens(parseInt(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
                <span className="text-[10px] text-slate-400">
                  Qisqa va ixcham javoblar (bolalar diqqatiga mos).
                </span>
              </div>
            </div>

            {/* Guardrail controls */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Avtomatik Shaxsiy Ma’lumotlar Filtri (PII Guardrail)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    O‘quvchilar telefon raqami, manzili va parollarni yozganda so‘rovni to‘xtatish
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={safetyFilterActive}
                  onChange={e => setSafetyFilterActive(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Filtrlanadigan so‘zlar va iboralar:
                </label>
                <input
                  type="text"
                  value={blockedKeywords}
                  onChange={e => setBlockedKeywords(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            {savedToast && (
              <div className="p-3 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Sozlamalar saqlandi va barcha AI so‘rovlariga qo‘llanildi!</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Sozlamalarni saqlash</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Info Box: UNICEF AI Ethics Check */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            UNICEF 2025 AI Tamoyillari:
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Inson nazorati ustun</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              AI hech qachon o‘quvchiga yakuniy baho qo‘ymaydi va uning qobiliyati haqida xulosa chiqarmaydi. Barcha qarorlar pedagog tomonidan tasdiqlanadi.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-blue-800 font-bold">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Shaxsiy ma’lumotlar daxlsizligi</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              O‘zbekiston "Shaxsga doir ma’lumotlar to‘g‘risida"gi qonuniga binoan AI provayderiga bolalarning identifikatsion ma’lumotlari yuborilmaydi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
