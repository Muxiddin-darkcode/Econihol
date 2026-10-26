import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { TaskSubmission } from '../../types/index.ts';
import { STANDARD_ECO_RUBRICS } from '../../utils/ecoLogic.ts';
import { CheckCircle2, Clock, Check, MessageSquare, Award, ArrowLeft } from 'lucide-react';

export const TeacherSubmissions: React.FC = () => {
  const { submissions, gradeSubmission, currentUser } = useApp();
  const [selectedSubmission, setSelectedSubmission] = useState<TaskSubmission | null>(
    submissions.find(s => s.status === 'pending') || submissions[0] || null
  );

  const [selectedScore, setSelectedScore] = useState<number>(2);
  const [feedbackText, setFeedbackText] = useState<string>(
    "Vazifani o‘z vaqtida va to‘g‘ri bajarganingiz uchun rahmat! Amaliy ko‘nikmalaringiz yanada mustahkamlanib bormoqda."
  );
  const [gradedSuccess, setGradedSuccess] = useState<boolean>(false);

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    gradeSubmission(selectedSubmission.id, selectedScore, feedbackText);
    setGradedSuccess(true);

    setTimeout(() => {
      setGradedSuccess(false);
      // find next pending or keep current
      const nextPending = submissions.find(s => s.status === 'pending' && s.id !== selectedSubmission.id);
      if (nextPending) setSelectedSubmission(nextPending);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📝</span>
          <h1 className="text-2xl font-black text-slate-800">
            O‘quvchilar Amaliy Ishlarini Baholash
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Eco Nihol 4 bosqichli ilmiy rubrikasi (0 dan 3 ballgacha) asosida tekshirish va shaxsiy qayta aloqa berish
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Submissions List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Yuborilgan ishlar ({submissions.length})</span>
            <span className="text-amber-600 font-bold">
              {submissions.filter(s => s.status === 'pending').length} ta kutilmoqda
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {submissions.map(sub => {
              const isSelected = selectedSubmission?.id === sub.id;

              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubmission(sub);
                    if (sub.score !== undefined) setSelectedScore(sub.score);
                    if (sub.feedback) setFeedbackText(sub.feedback);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-xs text-slate-800">{sub.studentName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === 'graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sub.status === 'graded' ? `${sub.score}/3 ball` : 'Kutilmoqda'}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-blue-900 line-clamp-1">{sub.taskTitle}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-1">"{sub.notes}"</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Review & Rubric Grading Panel */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              {/* Submission info header */}
              <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-900">
                      {selectedSubmission.studentName}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {selectedSubmission.className}
                    </span>
                    <span className="text-xs text-slate-400">
                      Yuborildi: {selectedSubmission.submittedAt}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-blue-800 mt-1">
                    {selectedSubmission.taskTitle}
                  </h3>
                </div>

                <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  Dalil turi: <strong>{selectedSubmission.evidenceType}</strong>
                </div>
              </div>

              {/* Student's answer and notes */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  O‘quvchi taqdim etgan dalil va izohi:
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal">
                  {selectedSubmission.notes}
                </div>

                {selectedSubmission.evidenceUrl && (
                  <div className="mt-3">
                    <div className="text-[11px] font-bold text-slate-500 mb-1">Biriktirilgan fotosurat dalili:</div>
                    <img
                      src={selectedSubmission.evidenceUrl}
                      alt="O'quvchi dalili"
                      className="rounded-2xl max-h-56 w-full object-cover border border-slate-200"
                    />
                  </div>
                )}
              </div>

              {/* Rubric Selection Form */}
              <form onSubmit={handleSaveGrade} className="space-y-5 border-t border-slate-100 pt-5">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>0–3 Baholash Rubrikasidan darajani tanlang:</span>
                    <span className="text-blue-700 font-extrabold text-xs">
                      Tanlangan ball: {selectedScore} / 3
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STANDARD_ECO_RUBRICS.map(r => {
                      const isChosen = selectedScore === r.score;

                      return (
                        <button
                          key={r.score}
                          type="button"
                          onClick={() => setSelectedScore(r.score)}
                          className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                            isChosen
                              ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-xs text-slate-900">
                              {r.score} ball — {r.labelUz}
                            </span>
                            {isChosen && (
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{r.descriptionUz}</p>
                          <div className="text-[10px] text-slate-400 mt-1 italic">
                            Misol: {r.concreteExampleUz}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    O‘quvchiga pedagogik rag‘bat va izoh:
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    required
                  />
                </div>

                {gradedSuccess && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2">
                    <Check className="w-4 h-4" /> Bajarilgan ish muvaffaqiyatli baholandi va o‘quvchiga yetkazildi!
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Bahoni tasdiqlash va saqlash</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 text-xs border border-slate-200">
              Chap tomondagi ro‘yxatdan o‘quvchi ishini tanlang.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
