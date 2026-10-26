import React, { useState } from 'react';
import { WASTE_GAME_ITEMS } from '../../data/mockData.ts';
import { WasteCategory, WasteItem } from '../../types/index.ts';
import { validateWasteSorting } from '../../utils/ecoLogic.ts';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import { EkoBotMascot, KidBinIcon, KidWasteItemGraphic } from './KidGameAssets.tsx';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  Volume2,
  VolumeX,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface BinConfig {
  category: WasteCategory;
  labelUz: string;
  tag: string;
  colorName: string;
  binType: 'plastic' | 'paper' | 'organic' | 'glass' | 'hazardous';
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  buttonBg: string;
  textColor: string;
  icon3d: string;
}

const BINS: BinConfig[] = [
  {
    category: 'plastic',
    labelUz: 'Plastik idishlar',
    tag: 'Butilka, paket, baklajka',
    colorName: 'SARIQ QUTI',
    binType: 'plastic',
    bgGradient: 'from-amber-50 via-yellow-50 to-amber-100/70',
    borderColor: 'border-amber-400 hover:border-amber-500',
    shadowColor: '#b45309',
    buttonBg: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-amber-950',
    textColor: 'text-amber-950',
    icon3d: '🟡'
  },
  {
    category: 'paper',
    labelUz: 'Qog‘oz & Karton',
    tag: 'Daftar, kitob, gazeta, quti',
    colorName: 'MOVIY QUTI',
    binType: 'paper',
    bgGradient: 'from-blue-50 via-sky-50 to-blue-100/70',
    borderColor: 'border-blue-400 hover:border-blue-500',
    shadowColor: '#1d4ed8',
    buttonBg: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white',
    textColor: 'text-blue-950',
    icon3d: '🔵'
  },
  {
    category: 'organic',
    labelUz: 'Meva & Oziq-ovqat',
    tag: 'Olma po‘chog‘i, ovqat, barg',
    colorName: 'YASHIL QUTI',
    binType: 'organic',
    bgGradient: 'from-emerald-50 via-green-50 to-emerald-100/70',
    borderColor: 'border-emerald-400 hover:border-emerald-500',
    shadowColor: '#047857',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white',
    textColor: 'text-emerald-950',
    icon3d: '🟢'
  },
  {
    category: 'glass',
    labelUz: 'Shisha idishlar',
    tag: 'Banka, butilka, oyna siniqlari',
    colorName: 'KUMUSH QUTI',
    binType: 'glass',
    bgGradient: 'from-cyan-50 via-teal-50 to-cyan-100/70',
    borderColor: 'border-cyan-400 hover:border-cyan-500',
    shadowColor: '#0e7490',
    buttonBg: 'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white',
    textColor: 'text-cyan-950',
    icon3d: '⚪'
  },
  {
    category: 'hazardous',
    labelUz: 'Xavfli buyumlar',
    tag: 'Batareya, dori, simob, lampa',
    colorName: 'QIZIL QUTI',
    binType: 'hazardous',
    bgGradient: 'from-rose-50 via-red-50 to-rose-100/70',
    borderColor: 'border-rose-400 hover:border-rose-500',
    shadowColor: '#be123c',
    buttonBg: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white',
    textColor: 'text-rose-950',
    icon3d: '🔴'
  }
];

export const WasteSortingGame: React.FC = () => {
  const { awardStars } = useApp();
  const [items] = useState<WasteItem[]>(WASTE_GAME_ITEMS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
    tip: string;
    years: string;
    chosenBinLabel: string;
    targetBinLabel: string;
  } | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [selectedBinCategory, setSelectedBinCategory] = useState<WasteCategory | null>(null);

  const currentItem = items[currentIndex];

  const playAudio = (action: () => void) => {
    if (soundEnabled) {
      action();
    }
  };

  const handleSelectBin = (targetBin: WasteCategory) => {
    if (!currentItem || feedback) return;

    playAudio(() => sounds.playPop());
    setSelectedBinCategory(targetBin);

    const result = validateWasteSorting(currentItem.category, targetBin);
    const chosenBinObj = BINS.find(b => b.category === targetBin);
    const correctBinObj = BINS.find(b => b.category === currentItem.category);

    if (result.isCorrect) {
      playAudio(() => sounds.playSuccess());
      const currentMult = streak >= 4 ? 3 : streak >= 2 ? 2 : 1;
      const points = 15 * currentMult;

      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setMultiplier(currentMult);

      setFeedback({
        isCorrect: true,
        message: `Ofarin, to‘g‘ri topding! +${points} ball qo‘shildi!`,
        tip: currentItem.tipUz,
        years: currentItem.decompositionYears,
        chosenBinLabel: chosenBinObj?.colorName || '',
        targetBinLabel: correctBinObj?.colorName || ''
      });

      awardStars(5, `To‘g‘ri saralandi: ${currentItem.nameUz}`);
    } else {
      playAudio(() => sounds.playError());
      setStreak(0);
      setMultiplier(1);

      setFeedback({
        isCorrect: false,
        message: `Xavotir olma, kel birga o‘rganamiz! Bu buyum aslida ${correctBinObj?.colorName || ''}ga tushadi.`,
        tip: currentItem.tipUz,
        years: currentItem.decompositionYears,
        chosenBinLabel: chosenBinObj?.colorName || '',
        targetBinLabel: correctBinObj?.colorName || ''
      });
    }
  };

  const handleNext = () => {
    playAudio(() => sounds.playPop());
    setFeedback(null);
    setSelectedBinCategory(null);
    setImageLoaded(false);
    setImageError(false);

    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      playAudio(() => sounds.playFanfare());
      setGameOver(true);
      awardStars(30, "Chiqindilarni saralash o‘yinini a’lo darajada yakunladi!");
    }
  };

  const handleRestart = () => {
    playAudio(() => sounds.playPop());
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMultiplier(1);
    setFeedback(null);
    setSelectedBinCategory(null);
    setImageLoaded(false);
    setImageError(false);
    setGameOver(false);
  };

  const botMood = gameOver
    ? 'celebrating'
    : feedback
    ? feedback.isCorrect
      ? 'celebrating'
      : 'sad'
    : 'thinking';

  return (
    <div className="bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/40 rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200/90 max-w-4xl mx-auto space-y-6">
      {/* Playful Top Header for Kids */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-green-500 flex items-center justify-center text-2xl shadow-md border-2 border-white animate-bounce-subtle">
            ♻️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Quvnoq Chiqindilar Saralash O‘yini
              </h2>
              <span className="hidden sm:inline-flex text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 border border-amber-500 shadow-xs">
                3-Sinf Bolajonlari Uchun
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              EkoBotvoy bilan tabiatni tozalaymiz va rangli qutilarni to‘g‘ri tanlaymiz!
            </p>
          </div>
        </div>

        {/* Kids Scoreboard & Audio Toggle */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            title={soundEnabled ? "Ovozni o‘chirish" : "Ovozni yoqish"}
            className="w-9 h-9 rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-transform active:scale-90 shadow-xs"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Combo Badge */}
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-md font-black text-xs animate-pulse">
              <Flame className="w-4 h-4 fill-white" />
              <span>x{multiplier} COMBO!</span>
            </div>
          )}

          {/* Stars / Ball */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 border-2 border-amber-300 rounded-2xl text-amber-950 shadow-xs">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="text-sm font-black font-mono">{score}</div>
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="space-y-6">
          {/* Playful Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-black text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Savol: {currentIndex + 1} / {items.length}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                {Math.round(((currentIndex + 1) / items.length) * 100)}% tozalash bo‘ldi!
              </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 transition-all duration-300 rounded-full shadow-inner"
                style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Mascot Speech Bubble & Item Card for Kids */}
          <div className="relative bg-white border-3 border-emerald-300/80 rounded-3xl p-5 sm:p-6 shadow-lg overflow-hidden">
            {/* Background decorative bubbles */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-50 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-6">
              {/* Left: Animated Mascot + Speech Bubble */}
              <div className="flex flex-col items-center shrink-0">
                <EkoBotMascot mood={botMood} size="lg" />
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mt-1 border border-emerald-200">
                  EkoBotvoy do‘stingiz
                </span>
              </div>

              {/* Center: The Waste Item Visual Card (100% Reliable, Never Broken!) */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-emerald-50 border-3 border-amber-300 shadow-md p-2 flex items-center justify-center shrink-0 group">
                {/* 100% guaranteed kid-friendly illustration */}
                <div className="w-full h-full flex items-center justify-center">
                  <KidWasteItemGraphic itemId={currentItem.id} nameUz={currentItem.nameUz} />
                </div>

                {/* Optional photographic overlay with graceful error handling */}
                {currentItem.imageUrl && !imageError && (
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.nameUz}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={`absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-2xl transition-opacity duration-300 pointer-events-none ${
                      imageLoaded ? 'opacity-85 hover:opacity-10' : 'opacity-0'
                    }`}
                  />
                )}

                {/* Decomposition Time Badge */}
                <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center gap-1 shadow-md border-2 border-amber-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentItem.decompositionYears}</span>
                </div>
              </div>

              {/* Right: Friendly Child-Directed Question & Mascot Message */}
              <div className="flex-1 text-center md:text-left space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                  <span>{currentItem.emoji}</span>
                  <span>Savol: Bu chiqindini qayerga tashlaymiz?</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentItem.nameUz}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Agar bu buyum yerda tashlab ketilsa, <span className="font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">{currentItem.decompositionYears}</span> davomida tabiatda parchalanmay atrof-muhitga zarar yetkazadi!
                </p>

                <div className="p-3 bg-amber-50/80 rounded-2xl border-2 border-amber-200/90 text-xs font-bold text-amber-900 flex items-center gap-2">
                  <span className="text-lg">👉</span>
                  <span>Quyidagi 5 ta rangli qutidan to‘g‘risini bosib, ichiga tashlang!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Card (when child selects a bin) */}
          {feedback && (
            <div
              className={`p-5 rounded-3xl border-3 shadow-lg transition-all animate-in zoom-in-95 duration-200 ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                    feedback.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}>
                    {feedback.isCorrect ? <CheckCircle2 className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
                  </div>

                  <div className="space-y-1">
                    <div className="font-black text-base sm:text-lg">{feedback.message}</div>
                    <div className="text-xs text-slate-700 font-medium leading-relaxed">
                      💡 <strong>Eko-Qoida:</strong> {feedback.tip}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-[0_5px_0_#0f172a] hover:shadow-[0_2px_0_#0f172a] active:translate-y-1 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Keyingi buyum</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* The 5 Chunky 3D Cartoon Recycling Bins for Kids */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>🎨</span>
                <span>Maxsus Rangli Qutilar (To‘g‘ri qutiga bosing):</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700">
                Tugmani bosing va ichiga tashlang! 📥
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {BINS.map(bin => {
                const isSelected = selectedBinCategory === bin.category;
                const isDisabled = feedback !== null;

                return (
                  <button
                    key={bin.category}
                    disabled={isDisabled}
                    onClick={() => handleSelectBin(bin.category)}
                    style={{
                      boxShadow: isSelected
                        ? 'none'
                        : `0 6px 0 ${bin.shadowColor}, 0 10px 15px -3px rgba(0, 0, 0, 0.1)`
                    }}
                    className={`relative p-3.5 rounded-3xl border-3 text-center transition-all flex flex-col items-center justify-between group cursor-pointer bg-gradient-to-b ${
                      bin.bgGradient
                    } ${bin.borderColor} ${
                      isSelected
                        ? 'translate-y-1.5 ring-4 ring-slate-900 border-slate-900'
                        : 'hover:-translate-y-1 active:translate-y-1 active:shadow-none'
                    } ${isDisabled ? 'opacity-85 cursor-not-allowed' : ''}`}
                  >
                    {/* Top Color Badge */}
                    <div className="w-full flex items-center justify-between mb-1">
                      <span className="text-sm font-black font-mono px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-slate-800 shadow-2xs">
                        {bin.colorName}
                      </span>
                      <span className="text-lg">{bin.icon3d}</span>
                    </div>

                    {/* 3D Cartoon Bin Illustration */}
                    <div className="my-1 py-1">
                      <KidBinIcon type={bin.binType} size="md" />
                    </div>

                    {/* Bin Title and Subtitle */}
                    <div className="w-full space-y-0.5 my-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                        {bin.labelUz}
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium line-clamp-1">
                        {bin.tag}
                      </div>
                    </div>

                    {/* Big Tactile 3D Action Push Button */}
                    <div
                      className={`w-full mt-2 py-2 px-3 rounded-2xl font-black text-[11px] shadow-sm transition-transform group-hover:scale-102 flex items-center justify-center gap-1 ${
                        bin.buttonBg
                      }`}
                    >
                      <span>Tashlash</span>
                      <span className="text-sm">👉</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Celebratory Victory Screen for Kids */
        <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 flex items-center justify-center text-5xl shadow-2xl border-4 border-white animate-bounce">
              🏆
            </div>
            <div className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '3s' }}>
              ✨
            </div>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Qoyilmaqom, Haqiqiy Eko-Chempion! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Siz {items.length} ta chiqindining barchasini to‘g‘ri qutilarga ajratib, o‘z maktabingiz va tabiatni tozalashga katta hissa qo‘shdingiz!
            </p>
          </div>

          <div className="inline-flex items-center gap-8 p-5 rounded-3xl bg-amber-50 border-3 border-amber-300 shadow-md">
            <div>
              <div className="text-[10px] font-black text-amber-800 uppercase tracking-wider">To‘plangan Ball:</div>
              <div className="text-3xl font-black text-amber-950 font-mono">{score} ball</div>
            </div>
            <div className="h-10 w-0.5 bg-amber-300" />
            <div>
              <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Qozonilgan Yulduzlar:</div>
              <div className="text-3xl font-black text-emerald-700 font-mono">+30 ⭐</div>
            </div>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="px-8 py-4 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-[0_6px_0_#047857] hover:shadow-[0_2px_0_#047857] active:translate-y-1 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Qaytadan o‘ynash va yangi rekord o‘rnatish!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
