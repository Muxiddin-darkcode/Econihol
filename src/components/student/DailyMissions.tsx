import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Target,
  CheckCircle2,
  Sparkles,
  Flame,
  Clock,
  ArrowRight,
  Droplet,
  BookOpen,
  Gamepad2,
  Lightbulb,
  Check,
  Star,
  Award,
  ChevronRight,
  Zap,
  RotateCcw
} from 'lucide-react';

export interface DailyMissionItem {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'waste' | 'water' | 'lesson' | 'garden' | 'energy';
  icon: string;
  squircleColor: string;
  actionType: 'check' | 'water' | 'lesson' | 'game';
  actionLabelUz: string;
}

interface DailyMissionsProps {
  onOpenLesson?: () => void;
  onOpenGame?: (gameType?: string) => void;
}

export const DailyMissions: React.FC<DailyMissionsProps> = ({
  onOpenLesson,
  onOpenGame
}) => {
  const { awardStars, waterGarden, gardenState } = useApp();

  // Initial Daily Missions
  const [missions, setMissions] = useState<DailyMissionItem[]>([
    {
      id: 'm-1',
      title: 'Chiqindilarni saralash amaliyoti',
      description: 'Plastik va qog‘oz chiqindilarni mos rangli qutiga to‘g‘ri saralang',
      points: 15,
      completed: true,
      category: 'waste',
      icon: '♻️',
      squircleColor: 'bg-amber-500',
      actionType: 'game',
      actionLabelUz: 'Saralash'
    },
    {
      id: 'm-2',
      title: 'Tomchivoy: Suvni asrash odati',
      description: 'Tish tozalaganda jo‘mrakni yopib, stakanga suv quyib ishlatish',
      points: 10,
      completed: false,
      category: 'water',
      icon: '🚰',
      squircleColor: 'bg-blue-500',
      actionType: 'check',
      actionLabelUz: 'Bajardim'
    },
    {
      id: 'm-3',
      title: 'Bugungi DTS Darsi mutolaasi',
      description: 'Suvning tabiatdagi aylanishi mavzusi bilan tanishing va test yeching',
      points: 20,
      completed: false,
      category: 'lesson',
      icon: '📖',
      squircleColor: 'bg-indigo-500',
      actionType: 'lesson',
      actionLabelUz: 'Darsni ochish'
    },
    {
      id: 'm-4',
      title: 'Eko-Bog‘chaning nihollariga suv quyish',
      description: 'Shaxsiy bog‘ingiz tuprog‘ini namlang va yangi gul ochilishiga yordam bering',
      points: 10,
      completed: false,
      category: 'garden',
      icon: '🌱',
      squircleColor: 'bg-emerald-500',
      actionType: 'water',
      actionLabelUz: 'Suv quyish'
    },
    {
      id: 'm-5',
      title: 'Energiya tejamkorligi patruli',
      description: 'Uydagi bo‘sh xonalarda bekorga yonib turgan chiroqlarni o‘chiring',
      points: 15,
      completed: false,
      category: 'energy',
      icon: '💡',
      squircleColor: 'bg-yellow-500',
      actionType: 'check',
      actionLabelUz: 'Bajardim'
    }
  ]);

  const [superBonusClaimed, setSuperBonusClaimed] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string>('14:28:40');

  // Countdown timer simulation for daily reset
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = missions.filter(m => m.completed).length;
  const totalCount = missions.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);
  const totalEarnedPoints = missions
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.points, 0);

  const toggleMission = (id: string) => {
    const mission = missions.find(m => m.id === id);
    if (!mission) return;

    if (!mission.completed) {
      sounds.playSuccess();
      awardStars(mission.points, `Kunlik missiya: ${mission.title}`);

      const nextMissions = missions.map(m =>
        m.id === id ? { ...m, completed: true } : m
      );
      setMissions(nextMissions);

      // Check if all are now completed
      if (nextMissions.every(m => m.completed) && !superBonusClaimed) {
        setTimeout(() => {
          sounds.playFanfare();
          awardStars(30, "Kunlik Barcha Missiyalar Super Bonusi!");
          setSuperBonusClaimed(true);
        }, 350);
      }
    } else {
      sounds.playAppleClick();
      setMissions(prev =>
        prev.map(m => (m.id === id ? { ...m, completed: false } : m))
      );
    }
  };

  const handleActionClick = (mission: DailyMissionItem) => {
    sounds.playAppleClick();

    if (mission.actionType === 'water') {
      sounds.playWaterDrop();
      waterGarden();
      if (!mission.completed) {
        toggleMission(mission.id);
      }
    } else if (mission.actionType === 'lesson') {
      if (onOpenLesson) {
        onOpenLesson();
      }
      if (!mission.completed) {
        toggleMission(mission.id);
      }
    } else if (mission.actionType === 'game') {
      if (onOpenGame) {
        onOpenGame('waste');
      }
    } else {
      toggleMission(mission.id);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                Kunlik Ekologik Missiyalar
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                DTS-2024
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Har kuni 5 ta kichik amaliy vazifani bajaring, ballar to‘plang va odat zanjirini davom ettiring!
            </p>
          </div>
        </div>

        {/* Live Reset Timer & Streak Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-2xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>3 kunlik streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-mono font-medium shadow-2xs" title="Yangi vazifalarga qolgan vaqt">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Progress & Reward Overview */}
      <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-blue-50/70 border border-emerald-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="text-xs font-bold text-slate-700">
              Bugungi bajarilish holati:
            </span>
            <span className="text-xs font-black text-emerald-800 font-mono">
              {completedCount} / {totalCount} ta bajarildi ({percentComplete}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full sm:w-64 h-2 bg-white/90 rounded-full overflow-hidden border border-emerald-200/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Bugun qo‘lga kiritildi
            </div>
            <div className="text-sm font-black text-emerald-900 font-mono flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>+{totalEarnedPoints} ball</span>
            </div>
          </div>

          {percentComplete === 100 && (
            <div className="px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs shadow-sm animate-bounce flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+30 Super Bonus!</span>
            </div>
          )}
        </div>
      </div>

      {/* Mission Items List */}
      <div className="space-y-2.5">
        {missions.map(mission => {
          return (
            <div
              key={mission.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                mission.completed
                  ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950 shadow-2xs'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/80 text-slate-800'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Apple Checkbox Button */}
                <button
                  onClick={() => toggleMission(mission.id)}
                  className={`w-6 h-6 rounded-full mt-0.5 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    mission.completed
                      ? 'bg-emerald-500 text-white shadow-2xs'
                      : 'border-2 border-slate-300 hover:border-slate-400'
                  }`}
                  title={mission.completed ? "Bekor qilish" : "Bajarildi deb belgilash"}
                >
                  {mission.completed && <Check className="w-4 h-4 stroke-[3]" />}
                </button>

                {/* Squircle Category Icon */}
                <div
                  className={`w-9 h-9 rounded-xl ${mission.squircleColor} text-white flex items-center justify-center text-base shadow-2xs shrink-0 select-none`}
                >
                  {mission.icon}
                </div>

                {/* Mission Text */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-bold leading-tight ${
                        mission.completed ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {mission.title}
                    </h4>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.2 rounded-full font-mono shrink-0">
                      +{mission.points} ⭐
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 sm:line-clamp-1">
                    {mission.description}
                  </p>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-center">
                {mission.completed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 px-3 py-1 rounded-xl bg-emerald-100/70">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Bajarildi</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleActionClick(mission)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{mission.actionLabelUz}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Super Bonus Celebration Banner when all 100% completed */}
      {percentComplete === 100 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 text-slate-950 shadow-md flex items-center justify-between gap-3 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <div className="font-black text-sm">
                Tabriklaymiz, Chempion! Barcha kunlik missiyalar yakunlandi!
              </div>
              <div className="text-xs text-slate-800 font-medium">
                Siz bugun jami 100 ⭐ yulduz to‘pladingiz va tabiatni asrashga hissa qo‘shdingiz.
              </div>
            </div>
          </div>
          <span className="text-xs font-black bg-white px-3 py-1 rounded-full shadow-2xs font-mono shrink-0">
            +30 ⭐ Bonus
          </span>
        </div>
      )}
    </div>
  );
};
