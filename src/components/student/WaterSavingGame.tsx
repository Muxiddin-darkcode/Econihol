import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Droplet,
  Award,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Waves,
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  situationUz: string;
  emoji: string;
  imageUrl: string;
  optionA: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    litersSaved: number;
  };
  optionB: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    litersSaved: number;
  };
}

const WATER_SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Ertalabki Tish Tozalash',
    emoji: '🪥',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    situationUz: 'Ertalab uyg‘onib tishlaringizni yuvyapsiz. Qaysi harakat suvni isrof qilmaslikka yordam beradi?',
    optionA: {
      text: 'Jo‘mrakni oxirigacha ochib qo‘yib, tishlarni 3 daqiqa yuvish',
      isCorrect: false,
      explanation: 'Jo‘mrak ochiq tursa, 3 daqiqada 15-20 litr toza ichimlik suvi bekorga oqib ketadi!',
      litersSaved: 0
    },
    optionB: {
      text: 'Maxsus stakanchaga suv quyib olib, jo‘mrakni yopib qo‘yish',
      isCorrect: true,
      explanation: 'Barakalla! Stakandagi yarim litr suv yetarli bo‘ladi va 15 litr toza ichimlik suvi tejaladi.',
      litersSaved: 15
    }
  },
  {
    id: 2,
    title: 'Tomchilab Oqayotgan Jo‘mrak',
    emoji: '🚰',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
    situationUz: 'Oshxonadagi kran yopiq bo‘lsa ham, sekundiga bitta tomchi suv tomchilab turibdi. Nima qilasiz?',
    optionA: {
      text: '"Hech qisi yo‘q, shunchaki kichik tomchi-ku" deb e’tibor bermaslik',
      isCorrect: false,
      explanation: 'Bir kunda tomchilardan 30 litr, bir oyda esa butun boshli hovuz toza suv isrof bo‘ladi!',
      litersSaved: 0
    },
    optionB: {
      text: 'Ota-onamga aytib, jo‘mrak rezinachasini almashtirishga yordam berish',
      isCorrect: true,
      explanation: 'To‘g‘ri qaror! Kranni tuzatish orqali bir kunda 30 litr qimmatbaho suv saqlab qolinadi.',
      litersSaved: 30
    }
  },
  {
    id: 3,
    title: 'Hovlidagi Gullarni Sug‘orish',
    emoji: '🌻',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    situationUz: 'Hovlidagi chiroyli gullarni sug‘ormoqchisiz. Qaysi vaqtda sug‘orish eng to‘g‘ri?',
    optionA: {
      text: 'Kechki payt yoki erta tongda salqinda sug‘orish',
      isCorrect: true,
      explanation: 'Ajoyib bilim! Salqin vaqtda suv darhol bug‘lanib ketmaydi va o‘simlik tomiriga to‘liq yetib boradi.',
      litersSaved: 25
    },
    optionB: {
      text: 'Peshinda quyosh eng qizdirgan vaqtda shlang bilan sepish',
      isCorrect: false,
      explanation: 'Issiqda suvning yarmi havoga bug‘lanib ketadi, barglar esa quyoshda kuyib qolishi mumkin.',
      litersSaved: 0
    }
  },
  {
    id: 4,
    title: 'Avtomashinani Tozalash',
    emoji: '🚗',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80',
    situationUz: 'Oila avtomashinasini yuvish kerak bo‘lib qoldi. Qaysi usul ekologik jihatdan to‘g‘ri?',
    optionA: {
      text: 'Suv shlangini ulab, 30 daqiqa tinimsiz suv purkab yuvish',
      isCorrect: false,
      explanation: 'Shlang orqali mashina yuvilganda 250 litrdan ortiq toza ichimlik suvi isrof qilinadi!',
      litersSaved: 0
    },
    optionB: {
      text: 'Chelak va yumshoq latta bilan tartibli yuvish',
      isCorrect: true,
      explanation: 'Super! Ikki chelak (20 litr) suv bilan mashina toza bo‘ladi va 200 litrdan ko‘p suv tejaladi!',
      litersSaved: 200
    }
  }
];

export const WaterSavingGame: React.FC = () => {
  const { awardStars } = useApp();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [totalLitersSaved, setTotalLitersSaved] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [completed, setCompleted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const scenario = WATER_SCENARIOS[currentScenarioIndex];

  const handleChoose = (choice: 'A' | 'B') => {
    if (selectedOption) return;
    setSelectedOption(choice);

    const chosen = choice === 'A' ? scenario.optionA : scenario.optionB;
    if (chosen.isCorrect) {
      sounds.playWaterDrop();
      setTimeout(() => sounds.playSuccess(), 120);
      setTotalLitersSaved(prev => prev + chosen.litersSaved);
      awardStars(10, `Suv tejaldi (+${chosen.litersSaved} litr)`);
    } else {
      sounds.playError();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setSelectedOption(null);
    setImgError(false);
    if (currentScenarioIndex + 1 < WATER_SCENARIOS.length) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      sounds.playFanfare();
      setCompleted(true);
      awardStars(30, "Suvni tejash posboni o‘yinini a’lo yakunladi!");
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentScenarioIndex(0);
    setTotalLitersSaved(0);
    setSelectedOption(null);
    setImgError(false);
    setCompleted(false);
  };

  return (
    <div className="bg-gradient-to-b from-cyan-50/70 via-white to-blue-50/50 rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-cyan-200/90 max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-2xl shadow-md border-2 border-white animate-bounce-subtle">
            💧
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Tomchivoy Bilan Suv Posboni O‘yini
              </h2>
              <span className="hidden sm:inline-flex text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-cyan-400 text-cyan-950 border border-cyan-500 shadow-xs">
                3-Sinf Bolajonlari Uchun
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Har bir tomchi — bu hayot! To‘g‘ri qaror qabul qilib, minglab litr toza suvni asraymiz!
            </p>
          </div>
        </div>

        {/* 3D Water Reservoir Tank Gauge */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-300 px-4 py-2 rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-xs">
            <Droplet className="w-5 h-5 fill-white animate-bounce" />
          </div>
          <div>
            <div className="text-[9px] font-black text-cyan-900 uppercase tracking-wider">
              Tejalgan toza suv:
            </div>
            <div className="text-xl font-black text-blue-950 font-mono">
              {totalLitersSaved} litr 🌊
            </div>
          </div>
        </div>
      </div>

      {!completed ? (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-black text-slate-700">
            <span>Savol: {currentScenarioIndex + 1} / {WATER_SCENARIOS.length}</span>
            <span className="text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full font-mono">
              {Math.round(((currentScenarioIndex + 1) / WATER_SCENARIOS.length) * 100)}% yakunlandi
            </span>
          </div>

          {/* Scenario Card with Resilient Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-5 sm:p-6 rounded-3xl border-3 border-cyan-200 shadow-md">
            <div className="md:col-span-5 relative w-full h-48 rounded-2xl overflow-hidden shadow-inner border-2 border-cyan-100 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={scenario.imageUrl}
                  alt={scenario.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <span className="text-6xl drop-shadow">{scenario.emoji}</span>
                  <span className="text-xs font-black text-cyan-900 mt-2">{scenario.title}</span>
                </div>
              )}
              <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-xs font-black flex items-center gap-1.5 shadow-md">
                <span>{scenario.emoji}</span>
                <span>{scenario.title}</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-black border border-cyan-300">
                <span>💧</span>
                <span>Vaziyat #{scenario.id}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {scenario.situationUz}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Qaysi yo‘lni tanlaysiz? Bolajon, eng tejamkor va to‘g‘ri javobga bosing:
              </p>
            </div>
          </div>

          {/* 3D Tactile Choice Cards for Kids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A */}
            <button
              disabled={selectedOption !== null}
              onClick={() => handleChoose('A')}
              style={{
                boxShadow: selectedOption === 'A' ? 'none' : '0 6px 0 #cbd5e1'
              }}
              className={`p-5 rounded-3xl border-3 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                selectedOption === 'A'
                  ? scenario.optionA.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300/60 translate-y-1.5'
                    : 'bg-rose-50 border-rose-400 ring-4 ring-rose-300/60 translate-y-1.5'
                  : 'bg-white border-slate-200 hover:border-cyan-400 hover:-translate-y-0.5 active:translate-y-1.5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-900 flex items-center justify-center font-black text-sm border border-cyan-300">
                    A
                  </span>
                  {selectedOption === 'A' && (
                    <span className="text-xs font-black">
                      {scenario.optionA.isCorrect ? '✅ Ofarin, to‘g‘ri!' : '❌ Isrofgarchilik!'}
                    </span>
                  )}
                </div>
                <div className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                  {scenario.optionA.text}
                </div>
              </div>

              {selectedOption && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs font-bold text-slate-700 leading-relaxed">
                  💡 {scenario.optionA.explanation}
                </div>
              )}
            </button>

            {/* Option B */}
            <button
              disabled={selectedOption !== null}
              onClick={() => handleChoose('B')}
              style={{
                boxShadow: selectedOption === 'B' ? 'none' : '0 6px 0 #cbd5e1'
              }}
              className={`p-5 rounded-3xl border-3 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                selectedOption === 'B'
                  ? scenario.optionB.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300/60 translate-y-1.5'
                    : 'bg-rose-50 border-rose-400 ring-4 ring-rose-300/60 translate-y-1.5'
                  : 'bg-white border-slate-200 hover:border-cyan-400 hover:-translate-y-0.5 active:translate-y-1.5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-900 flex items-center justify-center font-black text-sm border border-cyan-300">
                    B
                  </span>
                  {selectedOption === 'B' && (
                    <span className="text-xs font-black">
                      {scenario.optionB.isCorrect ? '✅ Ofarin, to‘g‘ri!' : '❌ Isrofgarchilik!'}
                    </span>
                  )}
                </div>
                <div className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                  {scenario.optionB.text}
                </div>
              </div>

              {selectedOption && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs font-bold text-slate-700 leading-relaxed">
                  💡 {scenario.optionB.explanation}
                </div>
              )}
            </button>
          </div>

          {/* Next Button */}
          {selectedOption && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-7 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm shadow-[0_5px_0_#0e7490] active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Keyingi vaziyat</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Victory Screen */
        <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center text-5xl shadow-xl border-4 border-white animate-bounce">
            🌊
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Siz Haqiqiy Suv Posbonisiz! 🌟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Siz o‘z oqilona qarorlaringiz bilan jami <strong className="text-cyan-700 font-black text-base">{totalLitersSaved} litr</strong> toza ichimlik suvini isrof bo‘lishdan saqlab qoldingiz!
            </p>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="px-8 py-4 rounded-3xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm shadow-[0_6px_0_#0e7490] active:translate-y-1 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Qaytadan o‘ynash</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
