import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import {
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Sun,
  Shield,
  Zap,
  Award
} from 'lucide-react';

interface ChainLink {
  id: string;
  nameUz: string;
  roleUz: string;
  levelBadge: string;
  emoji: string;
  imageUrl: string;
  correctStep: number;
  energyBioUz: string;
}

const ALL_ORGANISMS: ChainLink[] = [
  {
    id: 'c-1',
    nameUz: 'Quyosh Nuri',
    roleUz: 'Birlamchi Energiya Manbai',
    levelBadge: '1-bosqich: Quvvat Manbai',
    emoji: '☀️',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    correctStep: 1,
    energyBioUz: 'Quyosh barcha tirik mavjudotlarga fotosintez orqali hayot va oziq-ovqat beradi.'
  },
  {
    id: 'c-2',
    nameUz: 'Yashil Maysa',
    roleUz: 'Ishlab chiqaruvchi (O‘simlik)',
    levelBadge: '2-bosqich: Produtsent',
    emoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1533460004989-acf295ce70ff?auto=format&fit=crop&w=400&q=80',
    correctStep: 2,
    energyBioUz: 'Maysa quyosh nurini yutib, o‘z tanasida organik ozuqalar hosil qiladi.'
  },
  {
    id: 'c-3',
    nameUz: 'O‘txo‘r Chigirtka',
    roleUz: '1-darajali Iste’molchi',
    levelBadge: '3-bosqich: Fitofag',
    emoji: '🦗',
    imageUrl: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&w=400&q=80',
    correctStep: 3,
    energyBioUz: 'Chigirtka maysalar bilan oziqlanib, o‘simlik energiyasini o‘ziga oladi.'
  },
  {
    id: 'c-4',
    nameUz: 'Qo‘shiqchi Chumchuq',
    roleUz: '2-darajali Iste’molchi',
    levelBadge: '4-bosqich: Hasharotxo‘r',
    emoji: '🐦',
    imageUrl: 'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&w=400&q=80',
    correctStep: 4,
    energyBioUz: 'Chumchuq hasharotlarni tutib yeydi va populyatsiyani muvozanatda tutadi.'
  },
  {
    id: 'c-5',
    nameUz: 'Mag‘rur Burgut',
    roleUz: 'Oliy Yirtqich (Konsument)',
    levelBadge: '5-bosqich: Oliy Yirtqich',
    emoji: '🦅',
    imageUrl: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=400&q=80',
    correctStep: 5,
    energyBioUz: 'Burgut ekologik piramidaning cho‘qqisida turib, tabiat sanitariga aylanadi.'
  }
];

export const FoodChainGame: React.FC = () => {
  const { awardStars } = useApp();
  const [selectedChain, setSelectedChain] = useState<ChainLink[]>([]);
  const [available, setAvailable] = useState<ChainLink[]>(
    [...ALL_ORGANISMS].sort(() => Math.random() - 0.5)
  );
  const [status, setStatus] = useState<'playing' | 'success' | 'mistake'>('playing');

  const handlePickOrganism = (item: ChainLink) => {
    if (status === 'success') return;

    sounds.playPop();
    const nextStep = selectedChain.length + 1;

    if (item.correctStep === nextStep) {
      sounds.playSuccess();
      const nextChain = [...selectedChain, item];
      setSelectedChain(nextChain);
      setAvailable(prev => prev.filter(x => x.id !== item.id));
      awardStars(5, `Zanjirga to‘g‘ri qo‘shildi: ${item.nameUz}`);

      if (nextChain.length === ALL_ORGANISMS.length) {
        sounds.playFanfare();
        setStatus('success');
        awardStars(25, "Oziq zanjiri to‘liq va xatosiz tuzildi!");
      } else {
        setStatus('playing');
      }
    } else {
      sounds.playError();
      setStatus('mistake');
      setTimeout(() => setStatus('playing'), 2000);
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setSelectedChain([]);
    setAvailable([...ALL_ORGANISMS].sort(() => Math.random() - 0.5));
    setStatus('playing');
  };

  return (
    <div className="bg-gradient-to-b from-teal-50/70 via-white to-emerald-50/50 rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-teal-200/90 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-teal-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-600 flex items-center justify-center text-2xl shadow-md border-2 border-white animate-bounce-subtle">
            🦅
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Sehrli Tabiat Oziq Zanjiri
              </h2>
              <span className="hidden sm:inline-flex text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-teal-400 text-teal-950 border border-teal-500 shadow-xs">
                3-Sinf Bolajonlari Uchun
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Quyosh nurlaridan boshlab oliy burgutgacha bo‘lgan jonli energiya zanjirini to‘g‘ri quring!
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-teal-100 border-2 border-teal-300 text-right shadow-xs">
          <div className="text-[9px] text-teal-900 font-black uppercase">To‘g‘ri zanjir:</div>
          <div className="text-base font-black text-teal-950 font-mono">
            {selectedChain.length} / {ALL_ORGANISMS.length} bo‘g‘in ✨
          </div>
        </div>
      </div>

      {/* Chain Construction Field (Slots) */}
      <div className="space-y-2">
        <div className="text-xs font-black text-slate-700 uppercase tracking-wider px-1 flex items-center gap-1.5">
          <span>⚡</span>
          <span>Ekotizim Zanjiri (Quyoshdan burgutgacha tartib bilan bosing):</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-white border-3 border-dashed border-teal-300 rounded-3xl min-h-[160px] items-center shadow-inner">
          {[1, 2, 3, 4, 5].map(step => {
            const currentItem = selectedChain[step - 1];

            return (
              <div
                key={step}
                className={`relative rounded-3xl p-3 flex flex-col items-center justify-center text-center transition-all ${
                  currentItem
                    ? 'bg-gradient-to-b from-teal-50 to-emerald-50 border-3 border-teal-500 shadow-md ring-2 ring-teal-200'
                    : 'bg-slate-50 border-2 border-dashed border-slate-300 text-slate-400'
                } min-h-[145px]`}
              >
                {currentItem ? (
                  <>
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-teal-200 shadow-xs mb-1.5 shrink-0 bg-white flex items-center justify-center">
                      <img
                        src={currentItem.imageUrl}
                        alt={currentItem.nameUz}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <span className="text-3xl">{currentItem.emoji}</span>
                    </div>
                    <div className="text-[9px] font-mono font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full uppercase leading-none">
                      #{step}-bo‘g‘in
                    </div>
                    <div className="font-black text-xs text-slate-900 leading-tight mt-1">
                      {currentItem.nameUz}
                    </div>
                    <div className="text-[10px] text-teal-700 font-bold leading-none mt-0.5 line-clamp-1">
                      {currentItem.roleUz}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-2xl opacity-40">✨</span>
                    <span className="text-xs font-black text-slate-500 mt-1">
                      {step}-o‘rin
                    </span>
                    <span className="text-[10px] font-bold text-teal-700">
                      {step === selectedChain.length + 1 ? 'Pastdan tanlang 👇' : 'Kutilmoqda'}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Alert */}
      {status === 'mistake' && (
        <div className="p-4 rounded-3xl bg-rose-50 border-3 border-rose-300 text-rose-950 text-xs font-bold flex items-center gap-3 animate-shake shadow-md">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>Bu organizm hozirgi bo‘g‘inga mos emas! Ekotizimda kim kim bilan oziqlanishini o‘ylab ko‘ring.</span>
        </div>
      )}

      {status === 'success' && (
        <div className="p-5 rounded-3xl bg-emerald-50 border-3 border-emerald-400 text-emerald-950 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-in zoom-in-95">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <span className="font-black text-base block">Ofarin, Chempion! Oziq Zanjiri Mukammal Tuzildi! 🎉</span>
              <span className="text-slate-700 font-medium">Quyosh energiyasi o‘simlikdan oliy yirtqichgacha bekamu-ko‘st yetib bordi!</span>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shrink-0 flex items-center gap-2 shadow-[0_4px_0_#047857] active:translate-y-1 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Qaytadan o‘ynash</span>
          </button>
        </div>
      )}

      {/* Available Organisms to Pick */}
      {available.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wider px-1">
            Quyidagi jonivor va o‘simliklardan to‘g‘risiga bosing:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {available.map(item => (
              <button
                key={item.id}
                onClick={() => handlePickOrganism(item)}
                style={{ boxShadow: '0 5px 0 #99f6e4' }}
                className="p-3 rounded-3xl bg-white border-3 border-teal-200 hover:border-teal-500 transition-all text-left group flex flex-col justify-between cursor-pointer hover:-translate-y-1 active:translate-y-1 active:shadow-none"
              >
                <div>
                  <div className="relative w-full h-24 rounded-2xl overflow-hidden border-2 border-teal-100 mb-2 bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.nameUz}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[11px] font-black">
                      {item.emoji}
                    </div>
                  </div>

                  <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                    {item.nameUz}
                  </div>
                  <div className="text-[10px] text-teal-800 font-bold mt-0.5 leading-tight">
                    {item.roleUz}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-black">
                  <span>Biriktirish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
