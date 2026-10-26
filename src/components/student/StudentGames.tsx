import React, { useState } from 'react';
import { WasteSortingGame } from './WasteSortingGame.tsx';
import { WaterSavingGame } from './WaterSavingGame.tsx';
import { FoodChainGame } from './FoodChainGame.tsx';
import { EcoGarden } from './EcoGarden.tsx';
import { Gamepad2, Sparkles, RefreshCw, Trophy, Star } from 'lucide-react';

export const StudentGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<'waste' | 'water' | 'chain' | 'garden'>('waste');

  const games = [
    {
      id: 'waste',
      title: 'Chiqindilarni saralash',
      subtitle: 'Sariq, moviy, yashil qutilar siri',
      emoji: '♻️',
      bgColor: 'from-amber-400 via-orange-400 to-amber-500',
      activeRing: 'border-amber-500 ring-4 ring-amber-300/60 shadow-[0_6px_0_#b45309]',
      inactiveBorder: 'border-amber-200 hover:border-amber-300 bg-amber-50/50',
      badge: 'Eng sevimli ⭐'
    },
    {
      id: 'water',
      title: 'Suvni tejash posboni',
      subtitle: 'Tomchivoy bilan suvni asraymiz',
      emoji: '💧',
      bgColor: 'from-cyan-400 via-sky-400 to-blue-500',
      activeRing: 'border-cyan-500 ring-4 ring-cyan-300/60 shadow-[0_6px_0_#0e7490]',
      inactiveBorder: 'border-cyan-200 hover:border-cyan-300 bg-cyan-50/50',
      badge: 'Interaktiv 🌊'
    },
    {
      id: 'chain',
      title: 'Tabiat oziq zanjiri',
      subtitle: 'Quyoshdan burgutgacha quvvat',
      emoji: '🦅',
      bgColor: 'from-emerald-400 via-teal-400 to-green-600',
      activeRing: 'border-emerald-500 ring-4 ring-emerald-300/60 shadow-[0_6px_0_#047857]',
      inactiveBorder: 'border-emerald-200 hover:border-emerald-300 bg-emerald-50/50',
      badge: 'Mantiqiy 🧩'
    },
    {
      id: 'garden',
      title: 'Sehrli Eko-Bog‘cha',
      subtitle: 'Daraxt ekamiz, meva teramiz',
      emoji: '🏡',
      bgColor: 'from-lime-400 via-green-400 to-emerald-600',
      activeRing: 'border-lime-500 ring-4 ring-lime-300/60 shadow-[0_6px_0_#4d7c0f]',
      inactiveBorder: 'border-lime-200 hover:border-lime-300 bg-lime-50/50',
      badge: 'Shaxsiy bog‘ 🌻'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Joyful Arcade Header for Children */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Background decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg pointer-events-none" />

        <div className="flex items-center gap-4 text-center sm:text-left z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner border-2 border-white/40 shrink-0 animate-bounce-subtle">
            🎮
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Bolajonlar Ekologik O‘yinlar Maydoni
              </h1>
              <span className="bg-yellow-400 text-yellow-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                3-Sinf
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-medium mt-1">
              Qiziqarli topshiriqlarni bajaring, ballar to‘plang va yangi yulduzli nishonlarga ega bo‘ling! 🌟
            </p>
          </div>
        </div>

        <div className="z-10 flex items-center gap-2 bg-white/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/30">
          <Trophy className="w-5 h-5 text-yellow-300 animate-pulse" />
          <div className="text-left">
            <div className="text-[9px] uppercase font-bold text-white/80">O‘yin mukofoti</div>
            <div className="text-sm font-black text-white">+15 ball har g‘alabaga!</div>
          </div>
        </div>
      </div>

      {/* 3D Tactile Game Selection Cards for Kids */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {games.map(g => {
          const isSelected = selectedGame === g.id;

          return (
            <button
              key={g.id}
              onClick={() => setSelectedGame(g.id as any)}
              className={`p-4 rounded-3xl border-3 text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `bg-white ${g.activeRing} -translate-y-1`
                  : `${g.inactiveBorder} hover:-translate-y-0.5 shadow-sm`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl filter drop-shadow-sm">{g.emoji}</span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs ${
                    isSelected ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}>
                    {g.badge}
                  </span>
                </div>
                <div className="font-black text-sm text-slate-900 leading-tight">
                  {g.title}
                </div>
                <div className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-1">
                  {g.subtitle}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-black">
                <span className={isSelected ? 'text-emerald-700' : 'text-slate-400'}>
                  {isSelected ? 'O‘ynalmoqda 🕹️' : 'O‘ynash 👉'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Game Component */}
      <div className="pt-1">
        {selectedGame === 'waste' && <WasteSortingGame />}
        {selectedGame === 'water' && <WaterSavingGame />}
        {selectedGame === 'chain' && <FoodChainGame />}
        {selectedGame === 'garden' && <EcoGarden />}
      </div>
    </div>
  );
};
