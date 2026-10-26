import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Lesson, GradeLevel } from '../../types/index.ts';
import { LessonDetailModal } from './LessonDetailModal.tsx';
import { BookOpen, Clock, CheckCircle2, Sparkles, Filter, ChevronRight } from 'lucide-react';

export const StudentLessons: React.FC = () => {
  const { lessons, selectedGrade, currentUser } = useApp();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | '1' | '2' | '3' | '4'>('all');

  // Filter lessons for student's assigned grade
  const gradeLessons = lessons.filter(l => l.gradeLevel === (currentUser.gradeLevel || selectedGrade));

  // State school quarters simulation
  const quarters = [
    { id: 'all', label: 'Barcha darslar (68 soat)' },
    { id: '1', label: '1-chorak (18 soat)' },
    { id: '2', label: '2-chorak (16 soat)' },
    { id: '3', label: '3-chorak (18 soat)' },
    { id: '4', label: '4-chorak (16 soat)' }
  ];

  return (
    <div className="space-y-6">
      {/* State Curriculum Header */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100/90 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                🇺🇿 O‘zbekiston DTS Davlat O‘quv Dasturi
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentUser.className || '3-«A» sinf'} • {currentUser.schoolName}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 mt-2">
              {currentUser.className || `${selectedGrade}-sinf`}: Tabiiy Fanlar va Ekologik Ta’lim
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Vazirlik tomonidan tasdiqlangan boshlang‘ich sinf davlat darsliklari va amaliy ekologik kompetensiyalar majmuasi.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-right">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Sinfdagi darslar:</div>
            <div className="text-lg font-black text-emerald-800">{gradeLessons.length} ta dars rejasi</div>
          </div>
        </div>

        {/* State Quarter Filter Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
          {quarters.map(q => (
            <button
              key={q.id}
              onClick={() => setSelectedQuarter(q.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedQuarter === q.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {gradeLessons.map(lesson => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl p-6 border border-emerald-100/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-0.5"
          >
            <div>
              {/* Real Photography Cover Image */}
              {lesson.coverImage && (
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4 border border-slate-200 shadow-2xs">
                  <img
                    src={lesson.coverImage}
                    alt={lesson.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1.5">
                    <span>{lesson.coverEmoji}</span>
                    <span>{lesson.topicCode}</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                    DTS Darslik
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {!lesson.coverImage && (
                    <span className="text-4xl p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      {lesson.coverEmoji}
                    </span>
                  )}
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      {lesson.topicCode} • {lesson.gradeLevel}-sinf
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {lesson.title}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Nashr qilingan
                </span>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {lesson.summary}
              </p>

              {/* Objectives preview */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1 mb-4">
                <div className="text-[11px] font-bold text-slate-700">O‘rganiladigan tushunchalar:</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">
                  • {lesson.objectives[0]}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lesson.durationMinutes} daqiqa
              </span>

              <button
                onClick={() => setActiveLesson(lesson)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
              >
                <span>Darsni boshlash</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <LessonDetailModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </div>
  );
};
