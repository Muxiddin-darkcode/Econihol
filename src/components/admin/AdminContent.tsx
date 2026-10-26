import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BookOpen, CheckCircle2, AlertCircle, Clock, Eye, Layers } from 'lucide-react';

export const AdminContent: React.FC = () => {
  const { lessons, toggleLessonPublished } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-2xl font-black text-slate-800">
              O‘quv Kontenti va Ekspertiza Moderatsiyasi
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Section 3 (M01): Kontentni yaratish ➔ ekspert ko‘rigi ➔ nashr ➔ sinfga biriktirish oqimi
          </p>
        </div>

        <div className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Jami darslar: <strong>{lessons.length} ta modul</strong>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold">
                <th className="py-3 px-3">Kod</th>
                <th className="py-3 px-3">Sinf</th>
                <th className="py-3 px-3">Dars mavzusi</th>
                <th className="py-3 px-3">Muallif & Ekspert</th>
                <th className="py-3 px-3">Versiya</th>
                <th className="py-3 px-3">Holati</th>
                <th className="py-3 px-3">Boshqarish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lessons.map(lesson => (
                <tr key={lesson.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                    {lesson.topicCode}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-700">{lesson.gradeLevel}-sinf</td>
                  <td className="py-3 px-3">
                    <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <span>{lesson.coverEmoji}</span>
                      <span>{lesson.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{lesson.summary}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-700">{lesson.author}</div>
                    <div className="text-[10px] text-slate-400">Taqrizchi: {lesson.expertReviewer}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">v{lesson.version}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black inline-flex items-center gap-1 ${
                        lesson.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {lesson.status === 'published' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{lesson.status === 'published' ? 'Nashr qilingan' : 'Ko‘rikda'}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleLessonPublished(lesson.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        lesson.status === 'published'
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                      }`}
                    >
                      {lesson.status === 'published' ? 'Ko‘rikka qaytarish' : 'Nashr qilish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
