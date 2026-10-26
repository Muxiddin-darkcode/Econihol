import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="font-extrabold text-base text-white tracking-tight">
                Eco<span className="text-emerald-400"> Nihol</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                1–4-sinflar uchun
              </span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-md">
              Boshlang‘ich sinf o‘quvchilarida Tabiiy fanlar orqali ekologik madaniyatni shakllantirish bo‘yicha ilmiy-amaliy raqamli platforma.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => setActiveView('landing')}
              className="hover:text-emerald-400 transition-colors"
            >
              Loyiha haqida
            </button>
            <button
              onClick={() => setActiveView('privacy')}
              className="hover:text-emerald-400 transition-colors"
            >
              Maxfiylik siyosati (Lex.uz)
            </button>
            <button
              onClick={() => setActiveView('help')}
              className="hover:text-emerald-400 transition-colors"
            >
              Metodik qo‘llanma
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Eco Nihol. Loyiha konsepsiyasi va texnik spetsifikatsiyasi asosida yaratildi.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>UNICEF 2025 AI and Children & O‘zR Qonunlariga muvofiq</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
