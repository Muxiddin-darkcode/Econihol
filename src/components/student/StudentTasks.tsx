import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { PracticalTask, TaskSubmission } from '../../types/index.ts';
import { CheckCircle2, Clock, Upload, Send, Sparkles, AlertCircle, FileText, Check } from 'lucide-react';

export const StudentTasks: React.FC = () => {
  const { tasks, submissions, submitTaskWork, selectedGrade, currentUser } = useApp();
  const [selectedTask, setSelectedTask] = useState<PracticalTask | null>(null);
  const [notes, setNotes] = useState('');
  const [evidenceType, setEvidenceType] = useState('Matnli hisobot va kuzatuv');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const gradeTasks = tasks.filter(t => t.gradeLevel === (currentUser.gradeLevel || selectedGrade));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !notes.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitTaskWork(selectedTask.id, notes, evidenceType);
      setIsSubmitting(false);
      setSuccessToast(true);
      setNotes('');
      setTimeout(() => {
        setSuccessToast(false);
        setSelectedTask(null);
      }, 1500);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              🇺🇿 MMTB Davlat Ta’lim Mezonlari
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {currentUser.className || '3-«A» sinf'} • 0–3 Ballik Rubrika
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 mt-2">
            {currentUser.className || `${selectedGrade}-sinf`}: Amaliy Ekologik Vazifalar va Kuzatuvlar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tabiatni asrash bo‘yicha uyda va maktabda bajargan ishlaringizni yuboring va ustozingizdan davlat rubrikasi bo‘yicha ball oling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Task Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Sinfingiz uchun belgilangan topshiriqlar ({gradeTasks.length} ta):
          </div>

          <div className="grid grid-cols-1 gap-4">
            {gradeTasks.map(task => {
              const mySub = submissions.find(s => s.taskId === task.id);

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {task.category}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          {task.gradeLevel}-sinf uchun
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-800">{task.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{task.shortDesc}</p>
                    </div>

                    {mySub ? (
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                          mySub.status === 'graded'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {mySub.status === 'graded' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Baholandi ({mySub.rubricLevel})</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Tekshiruvda</span>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        Kutilmoqda ({task.dueDays} kun muddat)
                      </span>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                    <div className="text-xs font-bold text-slate-700">Topshiriq ko‘rsatmalari:</div>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      {task.instructions.map((ins, i) => (
                        <li key={i}>{ins}</li>
                      ))}
                    </ul>
                  </div>

                  {/* If Graded, Show Teacher Feedback with 0-3 Rubric Result */}
                  {mySub && mySub.status === 'graded' && (
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>O‘qituvchi bahosi ({mySub.gradedBy}):</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-950">
                          {mySub.score} / 3 ball
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900 font-medium italic">
                        "{mySub.feedback}"
                      </p>
                    </div>
                  )}

                  {/* Action */}
                  {!mySub && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Javob / Dalil yuborish</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Submission Form / Guidelines */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Vazifani topshirish oynasi:
          </div>

          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4">
            {selectedTask ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase">
                    Tanlangan vazifa:
                  </div>
                  <h4 className="text-sm font-black text-slate-800">{selectedTask.title}</h4>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dalil turi (Hisobot shakli):
                  </label>
                  <select
                    value={evidenceType}
                    onChange={e => setEvidenceType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Matnli hisobot va kuzatuv">Matnli hisobot va kuzatuv</option>
                    <option value="Fotosurat va tavsif">Fotosurat va tavsif</option>
                    <option value="Kundalik daftari">Kuzatuv kundaligi yozuvi</option>
                    <option value="Ijodiy buyum namunasi">Ijodiy buyum (ikkinchi hayot)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kuzatuvlaringiz va bajargan ishingiz haqida yozing:
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Masalan: Uyimizdagi jo‘mraklarni tekshirdim, tish tozalaganda stakandan foydalandim..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Topshirgan ishingiz o‘qituvchi tomonidan 4 bosqichli rubrika asosida tekshiriladi va sizga +20 yulduz taqdim etiladi!
                  </span>
                </div>

                {successToast && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2">
                    <Check className="w-4 h-4" /> Ish muvaffaqiyatli topshirildi!
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex-1"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !notes.trim()}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 flex-1 shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Yuborilmoqda...' : 'Topshirish'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-3 text-slate-400">
                <FileText className="w-10 h-10 mx-auto text-slate-300" />
                <div className="text-xs font-medium max-w-xs mx-auto">
                  Vazifa topshirish uchun chap tomondagi ro‘yxatdan topshiriq ostidagi "Javob yuborish" tugmasini bosing.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
