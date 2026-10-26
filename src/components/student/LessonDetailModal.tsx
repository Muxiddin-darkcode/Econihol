import React, { useState } from 'react';
import { Lesson } from '../../types/index.ts';
import { useApp } from '../../context/AppContext.tsx';
import { X, CheckCircle2, BookOpen, Clock, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonDetailModal: React.FC<Props> = ({ lesson, onClose }) => {
  const { awardStars } = useApp();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);

    if (idx === lesson.interactiveCheck.correctIndex) {
      awardStars(15, `Dars testini xatosiz yechdi: ${lesson.title}`);
    }
  };

  const handleCompleteLesson = () => {
    setCompleted(true);
    awardStars(20, `Dars to‘liq o‘rganildi: ${lesson.title}`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6 max-h-[90vh] flex flex-col animate-scaleIn">
        {/* Modal Top Banner */}
        <div className={`p-6 bg-gradient-to-r ${lesson.themeColor} text-white flex items-start justify-between relative`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl p-2.5 rounded-2xl bg-white/20 backdrop-blur-xs shadow-inner">
              {lesson.coverEmoji}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-[11px] font-bold">
                  {lesson.gradeLevel}-sinf • {lesson.topicCode}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium bg-black/20 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" /> {lesson.durationMinutes} daqiqa
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black leading-tight">{lesson.title}</h2>
              <p className="text-xs text-white/90 mt-1">{lesson.summary}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 flex-1">
          {/* Objectives */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dars maqsadlari (Kutiladigan natijalar):</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-950 font-medium list-disc list-inside">
              {lesson.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Story & Conceptual Content */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Qiziqarli tabiat hikoyasi:</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-sm leading-relaxed text-slate-800 whitespace-pre-line font-normal">
              {lesson.storyContent}
            </div>
          </div>

          {/* Glossary (Lug'at) */}
          {lesson.glossary && lesson.glossary.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Yangi ekologik tushunchalar lug‘ati:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lesson.glossary.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <span className="font-extrabold text-amber-950 block">{item.term}</span>
                    <span className="text-amber-800 text-[11px] mt-0.5 block">{item.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflection Question */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
            <div className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>Siz nima deb o‘ylaysiz? (Fikrlash savoli)</span>
            </div>
            <p className="text-xs font-semibold text-sky-950">{lesson.reflectionQuestion}</p>
          </div>

          {/* Interactive Check Quiz */}
          <div className="border-t border-slate-200 pt-5 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Bilimingizni sinab ko‘ring:</span>
              <span className="text-emerald-600 font-extrabold text-[11px]">+15 yulduz</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="text-sm font-extrabold text-slate-800">
                {lesson.interactiveCheck.question}
              </div>

              <div className="space-y-2">
                {lesson.interactiveCheck.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-200 bg-white hover:border-emerald-300 text-slate-700';
                  if (answered) {
                    if (idx === lesson.interactiveCheck.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      btnStyle = 'border-slate-200 opacity-50 bg-slate-100';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={answered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {answered && idx === lesson.interactiveCheck.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700">
                  <span className="font-bold text-emerald-800">Izoh: </span>
                  {lesson.interactiveCheck.explanation}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500">
            Muallif: {lesson.author} • Ekspert: {lesson.expertReviewer}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Yopish
            </button>
            <button
              onClick={handleCompleteLesson}
              disabled={completed}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{completed ? 'O‘zlashtirildi! ✅' : 'Darsni tamomlash (+20 ⭐)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
