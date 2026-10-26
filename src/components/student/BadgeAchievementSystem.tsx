import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext.tsx';
import { AchievementBadge, BadgeCategory, BadgeTier } from '../../types/index.ts';
import {
  calculateBadgePercentage,
  getBadgeTierDetails,
  getStudentMilestoneRank
} from '../../utils/ecoLogic.ts';
import {
  Award,
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight,
  Filter,
  Trophy,
  Share2,
  X,
  ExternalLink,
  Droplet,
  Recycle,
  Sprout,
  Sun,
  Flame,
  Check,
  FileCheck,
  Download,
  Printer
} from 'lucide-react';

export const BadgeAchievementSystem: React.FC = () => {
  const { badges, setActiveView, awardStars, currentUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'earned' | 'in_progress'>('all');
  const [activeModalBadge, setActiveModalBadge] = useState<AchievementBadge | null>(null);
  const [claimedToast, setClaimedToast] = useState(false);
  const [diplomaModalOpen, setDiplomaModalOpen] = useState(false);

  const earnedCount = badges.filter(b => b.earned).length;
  const totalCount = badges.length;
  const milestone = getStudentMilestoneRank(earnedCount, totalCount);

  const filteredBadges = badges.filter(b => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (statusFilter === 'earned' && !b.earned) return false;
    if (statusFilter === 'in_progress' && b.earned) return false;
    return true;
  });

  const categories: { key: BadgeCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'Barchasi', icon: '🌟' },
    { key: 'water', label: 'Suv posboni', icon: '💧' },
    { key: 'waste', label: 'Chiqindi & Qayta ishlash', icon: '♻️' },
    { key: 'plants', label: 'Tabiat & Gullar', icon: '🌱' },
    { key: 'planet', label: 'Sayyora & Yashil quvvat', icon: '🌍' },
    { key: 'habits', label: 'Muntazam odatlar', icon: '🔥' }
  ];

  const handleActionClick = (targetView?: string) => {
    if (targetView) {
      setActiveView(targetView as AppView);
      setActiveModalBadge(null);
    }
  };

  const handleSimulateUnlock = (badge: AchievementBadge) => {
    awardStars(badge.starReward, `"${badge.title}" nishoni qo‘lga kiritildi!`);
    setClaimedToast(true);
    setTimeout(() => setClaimedToast(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Milestone Progress Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/60">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider">
                {milestone.rankLevel}-Darajali Ekolog
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                {milestone.diplomaUz.split("'")[1] || milestone.diplomaUz}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl animate-bounce">{milestone.icon}</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {milestone.rankTitleUz}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">
                  Boshlang‘ich sinf o‘quvchilarining ekologik madaniyat bosqichlari va rag‘bat tizimi
                </p>
              </div>
            </div>

            {/* Milestone Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-300">
                  Umumiy yutuq: {earnedCount} / {totalCount} ta nishon ({milestone.progressPercent}%)
                </span>
                <span className="text-amber-300">
                  Keyingi unvonga: {Math.max(0, milestone.nextThreshold - earnedCount)} ta nishon qoldi
                </span>
              </div>
              <div className="w-full h-3.5 bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-700/50">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${milestone.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Diploma Action Button */}
            <div className="pt-2">
              <button
                onClick={() => setDiplomaModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4 text-slate-900" />
                <span>Mening Rasmiy Diplomimni ko‘rish 📜</span>
              </button>
            </div>
          </div>

          {/* Quick Trophy Stat Box */}
          <div className="bg-emerald-900/60 border border-emerald-600/40 rounded-3xl p-5 flex flex-col items-center justify-center text-center min-w-[180px] shrink-0 shadow-inner">
            <Trophy className="w-8 h-8 text-amber-400 mb-1" />
            <div className="text-2xl font-black text-white">{earnedCount * 30 + 125}</div>
            <div className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
              Yulduzlar Mukofoti
            </div>
            <div className="mt-2 text-[10px] text-emerald-200/70">
              Har bir nishon +20...+100 ⭐ beradi
            </div>
          </div>
        </div>

        {/* Ambient Nature Watermark */}
        <div className="absolute -right-8 -bottom-10 opacity-15 text-9xl pointer-events-none select-none">
          🏆
        </div>
      </div>

      {/* 2. Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-xs space-y-3.5">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50/60 p-1 rounded-2xl border border-emerald-200/60">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                statusFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950'
              }`}
            >
              Barcha nishonlar ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('earned')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                statusFilter === 'earned'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Erishilgan ({earnedCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                statusFilter === 'in_progress'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600/50" />
              <span>Jarayonda ({totalCount - earnedCount})</span>
            </button>
          </div>

          <div className="text-xs font-bold text-emerald-800">
            Ko‘rsatilmoqda: <strong>{filteredBadges.length} ta nishon</strong>
          </div>
        </div>

        {/* Category Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all whitespace-nowrap border ${
                selectedCategory === cat.key
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-emerald-900 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map(badge => {
          const tierInfo = getBadgeTierDetails(badge.tier);
          const percent = calculateBadgePercentage(badge.currentProgress, badge.targetProgress);

          return (
            <div
              key={badge.id}
              onClick={() => setActiveModalBadge(badge)}
              className={`relative rounded-3xl p-5 border-2 text-left transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg ${
                badge.earned
                  ? 'bg-white border-emerald-300 shadow-xs'
                  : 'bg-white/90 border-dashed border-emerald-200 hover:border-emerald-400'
              }`}
            >
              {/* Card Header: Tier & Star Reward */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${tierInfo.borderColor} ${tierInfo.badgeBg}`}
                  >
                    {tierInfo.labelUz}
                  </span>

                  <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    ⭐ +{badge.starReward}
                  </span>
                </div>

                {/* Badge Icon & Title */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110 shadow-xs ${
                      badge.earned
                        ? 'bg-gradient-to-tr from-emerald-100 to-teal-50 border border-emerald-200'
                        : 'bg-slate-100 text-slate-400 grayscale border border-slate-200'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress & Milestone Footer */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                {badge.earned ? (
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Qo‘lga kiritildi!</span>
                    </span>
                    <span className="text-[10px] text-emerald-600/80">{badge.earnedAt}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>
                        {badge.currentProgress} / {badge.targetProgress} {badge.unit}
                      </span>
                      <span className="text-emerald-700">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action button on card */}
                {!badge.earned && badge.actionLabelUz && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleActionClick(badge.actionTargetView);
                    }}
                    className="w-full mt-1 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 border border-emerald-200"
                  >
                    <span>{badge.actionLabelUz}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Badge Certificate / Detail Modal */}
      {activeModalBadge && (
        <div className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 space-y-6 animate-scaleIn relative">
            <button
              onClick={() => setActiveModalBadge(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Badge Showcase */}
            <div className="text-center space-y-3">
              <div
                className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-md ${
                  activeModalBadge.earned
                    ? 'bg-gradient-to-tr from-emerald-100 via-teal-50 to-amber-50 border-2 border-emerald-300 animate-bounce'
                    : 'bg-slate-100 border-2 border-dashed border-slate-300 grayscale'
                }`}
              >
                {activeModalBadge.icon}
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {getBadgeTierDetails(activeModalBadge.tier).labelUz}
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    +{activeModalBadge.starReward} ⭐ Mukofot
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {activeModalBadge.title}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  {activeModalBadge.description}
                </p>
              </div>
            </div>

            {/* Scientific Ecological Significance (Nega bu muhim?) */}
            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 space-y-1.5">
              <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Nega bu amal sayyoramiz uchun muhim?</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {activeModalBadge.ecoLoreUz}
              </p>
            </div>

            {/* Progress Checklist */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Ekologik mezon bajarilishi:</span>
                <span className="text-emerald-700">
                  {activeModalBadge.currentProgress} / {activeModalBadge.targetProgress}{' '}
                  {activeModalBadge.unit}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${calculateBadgePercentage(
                      activeModalBadge.currentProgress,
                      activeModalBadge.targetProgress
                    )}%`
                  }}
                />
              </div>
              {activeModalBadge.earned && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nishon muvaffaqiyatli qo‘lga kiritilgan ({activeModalBadge.earnedAt})</span>
                </div>
              )}
            </div>

            {claimedToast && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Yulduzlar balansingizga qo‘shildi! ⭐</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveModalBadge(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 flex-1"
              >
                Yopish
              </button>

              {!activeModalBadge.earned && activeModalBadge.actionTargetView ? (
                <button
                  onClick={() => handleActionClick(activeModalBadge.actionTargetView)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-1"
                >
                  <span>{activeModalBadge.actionLabelUz || 'Vazifaga o‘tish'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleSimulateUnlock(activeModalBadge)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-1"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Yulduzlarni olish ⭐</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Official Diploma & Certificate Modal */}
      {diplomaModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#fffdf7] rounded-3xl max-w-2xl w-full p-8 sm:p-10 shadow-2xl border-8 border-double border-amber-300 relative text-slate-900 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setDiplomaModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-amber-200 pb-5">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🇺🇿</span>
                <span className="text-3xl">🌱</span>
                <span className="text-3xl">📜</span>
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest text-emerald-900">
                O‘zbekiston Respublikasi Maktabgacha va Maktab Ta’limi
              </div>
              <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                Eco Nihol: Tabiiy Fanlar Ta’lim Platformasi
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 font-serif tracking-tight mt-1">
                FAXRIY EKOLOGIK DIPLOM
              </h2>
            </div>

            {/* Certificate Body */}
            <div className="py-6 text-center space-y-4 font-serif">
              <p className="text-xs sm:text-sm text-slate-600 italic">
                Ushbu diplom tabiiy fanlar orqali ekologik madaniyatni yuksaltirishda faollik ko‘rsatganligi uchun berildi:
              </p>

              <div className="text-2xl sm:text-3xl font-black text-emerald-900 underline decoration-amber-400 decoration-2 underline-offset-8">
                {currentUser.displayName}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                {currentUser.schoolName}ning {currentUser.gradeLevel || 3}-sinf o‘quvchisi amaliy darslar, chiqindilarni saralash hamda suvni tejash vazifalarini a’lo darajada bajarib, quyidagi unvonga sazovor bo‘ldi:
              </p>

              <div className="inline-block px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 border border-amber-300 text-emerald-950 text-base sm:text-lg font-black font-sans shadow-xs">
                {milestone.icon} {milestone.diplomaUz}
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs font-sans font-bold text-emerald-800">
                <span>Erishilgan nishonlar: <strong>{earnedCount} / {totalCount} ta</strong></span>
                <span>•</span>
                <span>To‘plangan yulduzlar: <strong>{earnedCount * 30 + 125} ⭐</strong></span>
              </div>
            </div>

            {/* Certificate Seal & Footer */}
            <div className="pt-4 border-t-2 border-amber-200 flex items-center justify-between text-xs text-slate-600">
              <div className="text-left space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400">Sana:</div>
                <div className="font-bold text-emerald-900">18-Oktabr, 2026-yil</div>
                <div className="text-[10px] text-slate-500">Protokol: PROT-ECO-2026</div>
              </div>

              {/* Seal */}
              <div className="w-16 h-16 rounded-full border-4 border-double border-amber-500 bg-amber-50 flex flex-col items-center justify-center text-center p-1 shadow-inner">
                <span className="text-xs">🏆</span>
                <span className="text-[7px] font-black uppercase text-amber-900 leading-tight">Eco Nihol Tasdiqlangan</span>
              </div>

              <div className="text-right space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400">Pedagogik Ekspertiza:</div>
                <div className="font-bold text-emerald-900">Dilnoza Karimova</div>
                <div className="text-[10px] text-emerald-700">Tabiiy fanlar o‘qituvchisi</div>
              </div>
            </div>

            {/* Print / Close button */}
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etish (PDF)</span>
              </button>
              <button
                onClick={() => setDiplomaModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-amber-300 bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
