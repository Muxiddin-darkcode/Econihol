import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { getStudentMilestoneRank } from '../../utils/ecoLogic.ts';
import { sounds } from '../../utils/soundEffects.ts';
import { CertificateModal } from './CertificateModal.tsx';
import { LessonDetailModal } from './LessonDetailModal.tsx';
import { DailyMissions } from './DailyMissions.tsx';
import { Lesson } from '../../types/index.ts';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  CheckSquare,
  Bot,
  ArrowRight,
  Award,
  Droplet,
  Sun,
  Sprout,
  Flame,
  CheckCircle2,
  Trophy,
  ChevronRight,
  Compass,
  Clock,
  Play,
  Heart,
  ShieldCheck,
  Check,
  Star,
  Layers,
  Leaf,
  Printer
} from 'lucide-react';

export const StudentHome: React.FC = () => {
  const {
    currentUser,
    selectedGrade,
    setActiveView,
    setCurrentRole,
    gardenState,
    waterGarden,
    badges,
    lessons,
    awardStars
  } = useApp();

  const [justWatered, setJustWatered] = useState(false);
  const [sunshineAura, setSunshineAura] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const earnedBadgesCount = badges.filter(b => b.earned).length;
  const totalBadgesCount = badges.length;
  const milestone = getStudentMilestoneRank(earnedBadgesCount, totalBadgesCount);

  // Find next badge to earn
  const nextBadge = badges.find(b => !b.earned) || badges[0];
  const nextBadgePercent = nextBadge
    ? Math.round((nextBadge.currentProgress / nextBadge.targetProgress) * 100)
    : 100;

  // Find TAB-3-02 or first grade 3 lesson
  const featuredLesson = lessons.find(l => l.topicCode === 'TAB-3-02') || lessons[0];

  const handleWaterClick = () => {
    sounds.playWaterDrop();
    waterGarden();
    setJustWatered(true);
    setTimeout(() => setJustWatered(false), 2000);
  };

  const handleSunClick = () => {
    sounds.playPop();
    setSunshineAura(true);
    setTimeout(() => setSunshineAura(false), 2200);
  };

  // Dynamic time-based greeting (Apple style)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Xayrli tong';
    if (hour < 18) return 'Xayrli kun';
    return 'Xayrli oqshom';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. Apple Cupertino Frosted Glass Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-emerald-50/40 to-teal-50/50 backdrop-blur-2xl border border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] p-6 sm:p-8">
        {/* Soft Ambient Apple Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Column: Greeting, Class Pill, CTA buttons */}
          <div className="max-w-xl space-y-4">
            {/* Top Apple Status Capsule */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{currentUser.className || '3-«A» sinf'}</span>
                <span>·</span>
                <span className="text-slate-500 font-normal truncate max-w-[170px]">
                  110-umumta’lim maktabi
                </span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>3 kunlik streak</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{currentUser.stars} yulduz</span>
              </span>
            </div>

            {/* Main Greeting Typography */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {getGreeting()}, {currentUser.displayName}! 🌿
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1.5">
                Bugun tabiatimizni asrash, suv va havoni toza saqlash hamda yangi <span className="text-emerald-700 font-semibold">davlat ekologik nishonlari</span> sari intiladigan ajoyib kun!
              </p>
            </div>

            {/* Apple Weather / Air Quality Capsule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/70 border border-slate-200/60 text-xs text-slate-600 shadow-2xs">
              <span>☀️</span>
              <span className="font-semibold text-slate-800">Toshkent:</span>
              <span>Toza havo (AQI 28 • A’lo)</span>
              <span>·</span>
              <span className="text-slate-500">22°C Iliq</span>
            </div>

            {/* Cupertino Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setActiveLesson(featuredLesson);
                }}
                className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer group"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Darsni davom ettirish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setActiveView('student-games');
                }}
                className="px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 font-semibold text-xs border border-slate-200/90 shadow-2xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                <span>O‘yinlar maydoni</span>
              </button>

              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setCertificateOpen(true);
                }}
                className="px-4 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100/80 text-amber-900 font-semibold text-xs border border-amber-200/70 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Sertifikatni ko‘rish</span>
              </button>
            </div>
          </div>

          {/* Right Column: Apple Fitness Style Activity Rings Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center gap-6 shrink-0">
            {/* 3 Concentric Glowing Activity Rings (SVG) */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                {/* Background Track Rings */}
                <circle cx="60" cy="60" r="48" stroke="#f1f5f9" strokeWidth="9" fill="none" />
                <circle cx="60" cy="60" r="36" stroke="#f1f5f9" strokeWidth="9" fill="none" />
                <circle cx="60" cy="60" r="24" stroke="#f1f5f9" strokeWidth="9" fill="none" />

                {/* Outer Ring: Lessons (Green) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="#10b981"
                  strokeWidth="9"
                  strokeDasharray="301.6"
                  strokeDashoffset={301.6 * (1 - 0.75)}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Middle Ring: Tasks (Blue) */}
                <circle
                  cx="60"
                  cy="60"
                  r="36"
                  stroke="#3b82f6"
                  strokeWidth="9"
                  strokeDasharray="226.2"
                  strokeDashoffset={226.2 * (1 - 0.60)}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Inner Ring: Daily Habit/Streak (Orange) */}
                <circle
                  cx="60"
                  cy="60"
                  r="24"
                  stroke="#f97316"
                  strokeWidth="9"
                  strokeDasharray="150.8"
                  strokeDashoffset={150.8 * (1 - 0.85)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Center Icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
            </div>

            {/* Ring Legend & Stats */}
            <div className="space-y-2 text-left">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Bugungi Faollik Halqalari
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Darslar</span>
                  </div>
                  <span className="font-semibold text-slate-900 font-mono">6 / 8</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>Topshiriqlar</span>
                  </div>
                  <span className="font-semibold text-slate-900 font-mono">3 / 4</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Streak</span>
                  </div>
                  <span className="font-semibold text-slate-900 font-mono">3 kun 🔥</span>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-emerald-700 font-medium">
                Umumiy ko‘rsatkich: <strong className="font-bold font-mono">75%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Apple Bento-Box Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Bento 1: Next Recommended Lesson (Apple Books / Podcasts Card) */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 group hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200/60">
                <BookOpen className="w-3 h-3" />
                <span>Navbatdagi DTS Darsi</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 font-medium">
                {featuredLesson.topicCode}
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-2xl text-white shadow-sm shrink-0">
                {featuredLesson.coverEmoji}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {featuredLesson.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  {featuredLesson.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
                <span>O‘zlashtirish darajasi:</span>
                <span className="text-blue-600 font-bold font-mono">45%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playAppleClick();
                setActiveLesson(featuredLesson);
              }}
              className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-2xs"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Darsni boshlash</span>
            </button>
          </div>
        </div>

        {/* Bento 2: Virtual Eco-Garden Live Miniature Widget */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 group hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200/60">
                <Sprout className="w-3 h-3 text-emerald-600" />
                <span>Jonli Eko-Bog‘cha</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">
                {gardenState.stage}-bosqich
              </span>
            </div>

            {/* Garden View Mini Canvas */}
            <div className={`relative h-28 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-300 via-teal-200 to-emerald-500 p-3 flex flex-col justify-between text-white transition-all ${
              sunshineAura ? 'brightness-110 saturate-125' : ''
            }`}>
              <div className="flex items-center justify-between z-10">
                <span className="text-xl">🏡</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                  🌸 {gardenState.flowersCount} ta gul ochildi
                </span>
              </div>

              <div className="z-10 text-[11px] font-medium text-white/95 drop-shadow">
                {justWatered ? '💧 Suv quyildi! Tabiat xursand!' : 'Meva va nihollar sog‘lom rivojlanmoqda'}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Quick Haptic Apple Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleWaterClick}
              className="py-2 px-3 rounded-2xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Droplet className="w-3.5 h-3.5 text-cyan-600" />
              <span>Suv quyish</span>
            </button>

            <button
              onClick={handleSunClick}
              className="py-2 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Quyosh nuri</span>
            </button>
          </div>
        </div>

        {/* Bento 3: Apple Watch Achievement & Next Badge Showcase */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 group hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200/60">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span>Nishonlar & Rag‘bat</span>
              </span>
              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setCertificateOpen(true);
                }}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Guvohnoma</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current Rank Showcase (Clickable to view official certificate) */}
            <button
              onClick={() => {
                sounds.playAppleClick();
                setCertificateOpen(true);
              }}
              className="w-full flex items-center gap-3.5 text-left p-1 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border border-amber-300 flex items-center justify-center text-3xl shadow-sm shrink-0">
                {milestone.icon}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {milestone.rankLevel}-Darajali Unvon
                </div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">
                  {milestone.rankTitleUz.split('(')[0]}
                </h3>
                <div className="text-[11px] text-amber-600 font-bold mt-0.5 flex items-center gap-1">
                  <span>⭐</span>
                  <span>{earnedBadgesCount} / {totalBadgesCount} nishon qo‘lga kiritildi</span>
                </div>
              </div>
            </button>
          </div>

          {/* Next Badge Spotlight */}
          {nextBadge && (
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <span>{nextBadge.icon}</span>
                  <span className="truncate">{nextBadge.title}</span>
                </span>
                <span className="font-mono text-emerald-700 font-bold text-[11px]">
                  +{nextBadge.starReward} ⭐
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${nextBadgePercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Daily Missions & Interactive Games Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Apple-style Daily Missions Component */}
        <div className="lg:col-span-7">
          <DailyMissions
            onOpenLesson={() => {
              sounds.playAppleClick();
              setActiveLesson(featuredLesson);
            }}
            onOpenGame={() => {
              sounds.playAppleClick();
              setActiveView('student-games');
            }}
          />
        </div>

        {/* 4. Educational Games Showcase (Apple Arcade style) */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-2xs">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Interaktiv O‘yinlar Zali
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    O‘rganish va amaliyot uyg‘unligi
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setActiveView('student-games');
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
              >
                <span>Barchasi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setActiveView('student-games');
                }}
                className="w-full p-2.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 flex items-center justify-between transition-all cursor-pointer text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl group-hover:scale-110 transition-transform">♻️</span>
                  <div>
                    <div className="font-bold text-xs text-amber-950">Chiqindilarni saralash</div>
                    <div className="text-[10px] text-amber-700">5 xil rangli qutilar siri</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sounds.playAppleClick();
                  setActiveView('student-games');
                }}
                className="w-full p-2.5 rounded-2xl bg-cyan-50/70 hover:bg-cyan-100/70 border border-cyan-200/80 flex items-center justify-between transition-all cursor-pointer text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl group-hover:scale-110 transition-transform">💧</span>
                  <div>
                    <div className="font-bold text-xs text-cyan-950">Suvni tejash posboni</div>
                    <div className="text-[10px] text-cyan-700">Tomchivoy bilan vaziyatlar</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500">Muvaffaqiyat mukofoti:</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 font-mono">
              +15 ⭐ yulduz har o‘yinga
            </span>
          </div>
        </div>
      </div>

      {/* 5. Apple Style Universal Role Access Portal Switcher */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 text-[10px] font-semibold border border-white/15">
            <span>🏛️</span>
            <span>Davlat Ta’lim Standartlari • 5 Tizim Roli</span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-white">
            Eco Nihol Milliy Boshqaruv Portali
          </h3>
          <p className="text-xs text-slate-400 font-normal">
            Boshlang‘ich ta’lim ishtirokchilari uchun ixtisoslashtirilgan interfeyslarni sinab ko‘ring:
          </p>
        </div>

        {/* Role Pills (Apple Segmented Style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 z-10">
          <button
            onClick={() => {
              sounds.playAppleClick();
              setCurrentRole('student');
              setActiveView('student-home');
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs shadow-sm hover:bg-emerald-400 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>👦🏻</span>
            <span>O‘quvchi</span>
          </button>

          <button
            onClick={() => {
              sounds.playAppleClick();
              setCurrentRole('teacher');
              setActiveView('teacher-dashboard');
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>👩🏻‍🏫</span>
            <span>O‘qituvchi</span>
          </button>

          <button
            onClick={() => {
              sounds.playAppleClick();
              setCurrentRole('researcher');
              setActiveView('research-analytics');
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>👨🏻‍🔬</span>
            <span>Tadqiqotchi</span>
          </button>

          <button
            onClick={() => {
              sounds.playAppleClick();
              setCurrentRole('admin');
              setActiveView('admin-users');
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🛡️</span>
            <span>Administrator</span>
          </button>

          <button
            onClick={() => {
              sounds.playAppleClick();
              setCurrentRole('parent');
              setActiveView('parent-portal');
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>👩🏻</span>
            <span>Ota-ona</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {certificateOpen && (
        <CertificateModal onClose={() => setCertificateOpen(false)} />
      )}

      {/* Direct Interactive Lesson Reader Modal */}
      {activeLesson && (
        <LessonDetailModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </div>
  );
};
