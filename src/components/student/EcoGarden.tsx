import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Droplet,
  Sun,
  Flower2,
  Sparkles,
  Sprout,
  Trees,
  Wind,
  Award,
  Heart,
  RotateCcw
} from 'lucide-react';

export const EcoGarden: React.FC = () => {
  const { gardenState, waterGarden, plantFlower } = useApp();
  const [sunshine, setSunshine] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const stages = [
    {
      title: '1-bosqich: Yangi Nish Urgan Maysazor',
      desc: 'Bog‘ endigina uyg‘onmoqda. Har kuni dars o‘qib suv quying.',
      emoji: '🌱',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '2-bosqich: Yosh Nihollar va Ko‘chatlar',
      desc: 'Daraxtlar ildiz otdi, barglar ko‘paymoqda va atrof yashil tus olmoqda.',
      emoji: '🌿',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '3-bosqich: Gullagan Mevali Bog‘',
      desc: 'Daraxtlar shox yoyib, gullar ochildi. Rang-barang kapalaklar uchib yuribdi.',
      emoji: '🌸',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '4-bosqich: Musaffo Yashil O‘rmoncha',
      desc: 'Ko‘plab qushlar in qurdi, havo toza va tabiat mo‘jizaga to‘ldi.',
      emoji: '🌳',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '5-bosqich: Mukammal Tabiiy Eko-Maskan',
      desc: 'Sayyoramizning eng toza, go‘zal va bioxilma-xil maskani barpo etildi!',
      emoji: '🏡',
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const currentStageInfo = stages[Math.min(stages.length - 1, gardenState.stage - 1)];

  const handleSunToggle = () => {
    sounds.playPop();
    setSunshine(true);
    setCelebrationMsg("Quyosh nurlari bog‘ga iliq hayot baxsh etdi! ☀️ (+Quyosh quvvati)");
    setTimeout(() => {
      setSunshine(false);
      setCelebrationMsg(null);
    }, 2500);
  };

  const handleWaterClick = () => {
    sounds.playWaterDrop();
    waterGarden();
    setCelebrationMsg("Tomchilar bog‘ tuprog‘iga hayot bag‘ishladi! 💧 (+5 yulduz)");
    setTimeout(() => setCelebrationMsg(null), 2500);
  };

  const handlePlantClick = () => {
    sounds.playSuccess();
    plantFlower();
    setCelebrationMsg("Yangi go‘zal gul ekildi! 🌸 (+10 yulduz)");
    setTimeout(() => setCelebrationMsg(null), 2500);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50/70 via-white to-lime-50/50 rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200/90 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-600 flex items-center justify-center text-2xl shadow-md border-2 border-white animate-bounce-subtle">
            🏡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Mening Sehrli Eko-Bog‘cham
              </h2>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 border border-emerald-500 shadow-xs">
                {currentStageInfo.title.split(':')[0]}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Darslarni o‘qib, topshiriqlarni bajaring — shaxsiy bog‘ingiz mevalarga to‘lib ulg‘ayadi!
            </p>
          </div>
        </div>

        {/* Counter Stats */}
        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-1.5 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-center shadow-xs">
            <div className="text-[9px] text-emerald-900 font-black uppercase">Gullar soni:</div>
            <div className="text-base font-black text-emerald-950 font-mono">
              🌸 {gardenState.flowersCount} ta
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-cyan-100 border-2 border-cyan-300 rounded-2xl text-center shadow-xs">
            <div className="text-[9px] text-cyan-900 font-black uppercase">Suv quyildi:</div>
            <div className="text-base font-black text-cyan-950 font-mono">
              💧 {gardenState.waterCount} marta
            </div>
          </div>
        </div>
      </div>

      {/* Scenic Garden View */}
      <div className="relative rounded-3xl overflow-hidden border-3 border-emerald-300 shadow-lg min-h-[300px] flex flex-col justify-end p-6 text-white group bg-gradient-to-b from-sky-400 to-emerald-600">
        {!imgError && (
          <img
            src={currentStageInfo.imageUrl}
            alt={currentStageInfo.title}
            onError={() => setImgError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
              sunshine ? 'brightness-110 saturate-125 scale-102' : 'brightness-95'
            }`}
          />
        )}

        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Floating sunlight particles */}
        {sunshine && (
          <div className="absolute inset-0 pointer-events-none bg-amber-400/20 mix-blend-screen animate-pulse" />
        )}

        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-black border-2 border-emerald-400">
            <span className="text-base">{currentStageInfo.emoji}</span>
            <span>{currentStageInfo.title}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow">
            {currentStageInfo.desc}
          </p>
        </div>
      </div>

      {/* Floating Alert Feedback */}
      {celebrationMsg && (
        <div className="p-4 rounded-3xl bg-emerald-100 border-3 border-emerald-400 text-emerald-950 font-black text-xs sm:text-sm text-center shadow-lg animate-in zoom-in-95">
          {celebrationMsg}
        </div>
      )}

      {/* Interactive 3D Action Control Center for Kids */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <button
          onClick={handleWaterClick}
          style={{ boxShadow: '0 5px 0 #0e7490' }}
          className="p-4 rounded-3xl bg-cyan-50 hover:bg-cyan-100/90 border-3 border-cyan-300 text-cyan-950 transition-all flex items-center justify-between group cursor-pointer active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shadow-md">
              <Droplet className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black">Suv quyish 💧</div>
              <div className="text-[10px] text-cyan-700 font-black">+5 ⭐ Yulduz</div>
            </div>
          </div>
          <span className="text-sm font-black text-cyan-800">Bosing</span>
        </button>

        <button
          onClick={handlePlantClick}
          style={{ boxShadow: '0 5px 0 #047857' }}
          className="p-4 rounded-3xl bg-emerald-50 hover:bg-emerald-100/90 border-3 border-emerald-300 text-emerald-950 transition-all flex items-center justify-between group cursor-pointer active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Flower2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black">Gul ekish 🌸</div>
              <div className="text-[10px] text-emerald-700 font-black">+10 ⭐ Yulduz</div>
            </div>
          </div>
          <span className="text-sm font-black text-emerald-800">Bosing</span>
        </button>

        <button
          onClick={handleSunToggle}
          style={{ boxShadow: '0 5px 0 #b45309' }}
          className="p-4 rounded-3xl bg-amber-50 hover:bg-amber-100/90 border-3 border-amber-300 text-amber-950 transition-all flex items-center justify-between group cursor-pointer active:translate-y-1 active:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Sun className="w-6 h-6 fill-amber-100 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black">Quyosh nuri ☀️</div>
              <div className="text-[10px] text-amber-700 font-black">Fotosintez</div>
            </div>
          </div>
          <span className="text-sm font-black text-amber-800">Bosing</span>
        </button>
      </div>
    </div>
  );
};
