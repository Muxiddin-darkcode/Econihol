import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { getEcoLevelLabel } from '../../utils/ecoLogic.ts';
import { Award, CheckCircle2, Sparkles, TrendingUp, Compass, BookOpen, Heart, Wrench, Shield } from 'lucide-react';

export const StudentProgress: React.FC = () => {
  const { studentDimensionScores, studentOverallScore, badges, currentUser, awardStars, setActiveView } = useApp();
  const [showDiagnosticQuiz, setShowDiagnosticQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const levelInfo = getEcoLevelLabel(studentOverallScore);

  const dimensionIcons = {
    knowledge: <BookOpen className="w-5 h-5 text-blue-600" />,
    attitude: <Heart className="w-5 h-5 text-rose-600" />,
    skill: <Wrench className="w-5 h-5 text-amber-600" />,
    behavior: <Shield className="w-5 h-5 text-emerald-600" />
  };

  const sampleDiagnosticQuestions = [
    {
      id: 1,
      dim: 'knowledge',
      question: 'Bitta plastik butilka tabiatda qancha vaqt parchalanmasdan saqlanadi?',
      options: ['1 yil', '10 yil', '450 yildan ortiq'],
      correct: 2
    },
    {
      id: 2,
      dim: 'attitude',
      question: 'Daraxt shoxlarini bekorga sindirayotgan odamni ko‘rsangiz, qanday munosabat bildirasiz?',
      options: [
        'E’tibor bermayman',
        'Daraxtlar toza havo berishini aytib, xushmuomalalik bilan to‘xtataman',
        'Men ham shox sindiraman'
      ],
      correct: 1
    },
    {
      id: 3,
      dim: 'skill',
      question: 'Qog‘oz va banan po‘chog‘ini qanday qilib to‘g‘ri saralaysiz?',
      options: [
        'Ikkalasini bitta sumkaga solaman',
        'Banan po‘stini organik idishga, qog‘ozni moviy idishga solaman',
        'Ko‘chaga tashlab ketaman'
      ],
      correct: 1
    },
    {
      id: 4,
      dim: 'behavior',
      question: 'Tish tozalayotganda kran suvi qanday holatda bo‘ladi?',
      options: [
        'Doimo ochiq turadi',
        'Stakanga suv quyib, kranni yopib qo‘yaman',
        'Kran biroz oqib tursin'
      ],
      correct: 1
    }
  ];

  const handleSelectQuizAnswer = (qId: number, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitDiagnostic = () => {
    setQuizFinished(true);
    awardStars(30, 'Ekologik madaniyat diagnostikasini muvaffaqiyatli topshirdi');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h1 className="text-2xl font-black text-slate-800">
              Ekologik Madaniyat Diagnostikasi va Yutuqlarim
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            4 ta mezon asosida shaxsiy ekologik rivojlanishingiz va nishonlaringiz
          </p>
        </div>

        <button
          onClick={() => {
            setShowDiagnosticQuiz(true);
            setQuizFinished(false);
            setQuizAnswers({});
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
        >
          <Compass className="w-4 h-4" />
          <span>Diagnostika testini topshirish (T1)</span>
        </button>
      </div>

      {/* Main Score Card & Overall Status */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                {currentUser.displayName} • {currentUser.className}
              </span>
              <span className="text-xs font-black bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full">
                {levelInfo.badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Umumiy Ekologik Madaniyat Indeksi: {studentOverallScore}%
            </h2>
            <p className="text-xs text-white/90 max-w-lg leading-relaxed">
              Daraja: <strong className="underline">{levelInfo.level}</strong>. Siz tabiatni sevuvchi, bilimli va kundalik hayotda resurslarni tejovchi o‘quvchisiz!
            </p>
          </div>

          <div className="w-28 h-28 rounded-3xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex flex-col items-center justify-center text-center p-3 shrink-0 shadow-inner">
            <span className="text-3xl font-black">{studentOverallScore}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 mt-0.5">
              / 100 ball
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Dimensions Breakdown (Section 6 of PDF) */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Ekologik madaniyatning 4 o‘lchovi (Ilmiy model):
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentDimensionScores.map(dim => (
            <div
              key={dim.dimension}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {dimensionIcons[dim.dimension]}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">{dim.titleUz}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{dim.level}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-black text-slate-800">{dim.score}%</div>
                  <div className="text-[10px] text-slate-400 font-semibold">100 balldan</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dim.dimension === 'knowledge'
                      ? 'bg-blue-500'
                      : dim.dimension === 'attitude'
                      ? 'bg-rose-500'
                      : dim.dimension === 'skill'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Collection (M08) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Mening ekologik nishonlarim (Gamifikatsiya):
          </div>
          <button
            onClick={() => setActiveView('student-badges')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1"
          >
            <span>Barcha 12 nishon & bosqichlarni ko‘rish</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {badges.map(b => (
            <div
              key={b.id}
              className={`p-4 rounded-3xl border-2 text-center transition-all flex flex-col items-center justify-between min-h-[160px] ${
                b.earned
                  ? 'border-emerald-200 bg-white shadow-xs'
                  : 'border-dashed border-slate-200 bg-slate-50/70 opacity-60'
              }`}
            >
              <div className="text-4xl mb-2 filter drop-shadow-xs">{b.icon}</div>
              <div>
                <div className="text-xs font-extrabold text-slate-800 leading-tight mb-1">
                  {b.title}
                </div>
                <div className="text-[10px] text-slate-500 leading-snug">{b.description}</div>
              </div>
              <div className="mt-2">
                {b.earned ? (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Qo‘lga kiritildi ✅
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400">
                    Hali olinmagan
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Modal Quiz */}
      {showDiagnosticQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <h3 className="text-lg font-black text-slate-800">
                  Ekologik Madaniyat Diagnostika So‘rovnomasi
                </h3>
              </div>
              <button
                onClick={() => setShowDiagnosticQuiz(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {!quizFinished ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {sampleDiagnosticQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="text-xs font-extrabold text-slate-800">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizAnswer(q.id, oIdx)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                            quizAnswers[q.id] === oIdx
                              ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50/50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmitDiagnostic}
                  disabled={Object.keys(quizAnswers).length < sampleDiagnosticQuestions.length}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-40"
                >
                  Javoblarni tasdiqlash va natijani saqlash
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-3xl">
                  🌟
                </div>
                <h4 className="text-xl font-black text-slate-800">
                  Diagnostika muvaffaqiyatli topshirildi!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Sizning javoblaringiz T1 oraliq tadqiqot bazasiga yozildi. Ekologik madaniyat indeksi yangilandi (+30 ⭐).
                </p>
                <button
                  onClick={() => setShowDiagnosticQuiz(false)}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
