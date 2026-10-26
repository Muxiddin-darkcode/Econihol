import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import { X, Award, CheckCircle2, Printer, Download, Sparkles, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ onClose }) => {
  const { currentUser, badges } = useApp();
  const earnedBadgesCount = badges.filter(b => b.earned).length;

  const handlePrint = () => {
    sounds.playAppleClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="text-xs font-semibold text-slate-600 ml-2">
              Davlat Ekologik Sertifikati • Raqamli Guvohnoma
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop etish / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet (Printable Area) */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-amber-50/30 via-white to-emerald-50/20 text-center relative selection:bg-amber-100 overflow-y-auto">
          {/* Ornate Certificate Border */}
          <div className="border-4 border-double border-amber-300/80 rounded-2xl p-6 sm:p-10 relative bg-white/70 backdrop-blur-xs">
            {/* Corner Filigrees */}
            <div className="absolute top-2 left-2 text-amber-500/40 text-lg select-none">❖</div>
            <div className="absolute top-2 right-2 text-amber-500/40 text-lg select-none">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-500/40 text-lg select-none">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-500/40 text-lg select-none">❖</div>

            {/* Republic Header */}
            <div className="space-y-1 mb-6">
              <div className="text-2xl mb-1">🇺🇿</div>
              <div className="text-[11px] font-black tracking-widest uppercase text-slate-700">
                O‘zbekiston Respublikasi Maktabgacha va Maktab Ta’limi Vazirligi
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-emerald-800 uppercase">
                Davlat Ta’lim Standarti (DTS-2024) • «Eco Nihol» Milliy Tizimi
              </div>
            </div>

            {/* Certificate Title */}
            <div className="space-y-1 my-6">
              <div className="text-xs font-serif italic text-amber-700 tracking-wider">
                Raqamli Muvaffaqiyat Sertifikati
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 uppercase">
                Yashil Qahramon Guvohnomasi
              </h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2" />
            </div>

            {/* Student Name & Honor */}
            <div className="my-6 space-y-2">
              <p className="text-xs text-slate-600 italic">
                Ushbu sertifikat Tabiiy fanlar fanidan ekologik madaniyatni yuksaltirishda faollik ko‘rsatgani uchun berildi:
              </p>

              <div className="text-2xl sm:text-3xl font-black text-emerald-900 border-b-2 border-emerald-300/70 inline-block px-6 py-1 font-serif">
                {currentUser.displayName}
              </div>

              <div className="text-xs font-semibold text-slate-700 mt-2">
                {currentUser.className || '3-«A» sinf'} o‘quvchisi • {currentUser.schoolName}
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Identifikator kodi: {currentUser.studentId || 'UZ-EDU-2024-84920'}
              </div>
            </div>

            {/* Achievement Badges & Star Score */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto my-6 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70">
              <div className="text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Erishilgan daraja</div>
                <div className="text-sm font-black text-emerald-800">2-Bosqich</div>
              </div>
              <div className="text-center border-x border-slate-200">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Nishonlar</div>
                <div className="text-sm font-black text-amber-700">{earnedBadgesCount} ta</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase">To‘plangan Yulduz</div>
                <div className="text-sm font-black text-yellow-600">⭐ {currentUser.stars}</div>
              </div>
            </div>

            {/* Seal & Verification */}
            <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-left text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] text-slate-400 uppercase">Sana:</div>
                <div className="font-semibold text-slate-700">2026-yil, 26-oktabr</div>
                <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>e-Maktab orqali tasdiqlangan</span>
                </div>
              </div>

              {/* Gold Official Stamp Emblem */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-400 bg-amber-50/90 flex flex-col items-center justify-center text-center p-1 shadow-inner rotate-[-6deg]">
                <span className="text-lg">🌿</span>
                <span className="text-[8px] font-black uppercase text-amber-900 leading-tight">
                  Davlat Tasdig‘i
                </span>
                <span className="text-[7px] text-amber-700 font-mono">DTS-2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
