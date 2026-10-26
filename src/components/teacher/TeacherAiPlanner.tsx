import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { GradeLevel } from '../../types/index.ts';
import { Bot, Sparkles, Send, Copy, Check, FileDown, BookOpen, Layers, CheckCircle } from 'lucide-react';

export const TeacherAiPlanner: React.FC = () => {
  const { addAuditLog } = useApp();
  const [grade, setGrade] = useState<GradeLevel>(3);
  const [topic, setTopic] = useState("O'zbekistonning shifobaxsh o'simliklari va ularni asrash");
  const [duration, setDuration] = useState('45 daqiqa');
  const [focusArea, setFocusArea] = useState('Amaliy ko‘nikma va resurslarni tejash');

  const [isGenerating, setIsGenerating] = useState(false);
  const [planDraft, setPlanDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [approvedToast, setApprovedToast] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generatedPlan = `## 📋 DARS ISHLANMASI QORALAMASI (AI Metodist Tavsiyasi)
**Mavzu:** ${topic}
**Sinf:** ${grade}-sinf | **Vaqt me’yori:** ${duration}
**Ustuvor yo‘nalish:** ${focusArea}

---
### 1. Darsning ta’limiy va tarbiyaviy maqsadlari:
- **Bilim berish:** O‘quvchilarga mavzu bo‘yicha asosiy tabiiy tushunchalarni (ekologik qoidalar, o‘simlik va suv ahamiyati) tushuntirish.
- **Ko‘nikma hosil qilish:** Chiqindilarni saralash va kundalik hayotda suv/elektrni tejash odatlarini mustahkamlash.
- **Tarbiyaviy maqsad:** Ona tabiatga nisbatan qadriyatli va ehtiromli munosabatni shakllantirish.

---
### 2. Bloom taksonomiyasi bo‘yicha 4 darajali savollar:
1. **Eslab qolish (Oddiy tushuncha):** 
   * Savol: "Yashil o‘simliklar Quyosh nuridan foydalanib havoga qanday gaz chiqaradi?"
2. **Tushunish (Sabab-oqibat):** 
   * Savol: "Agar biror hududdagi barcha daraxtlar kesilsa, tuproq va qushlarga nima bo‘ladi?"
3. **Qo‘llash (Hayotiy vaziyat):** 
   * Savol: "Do‘konga borganingizda har safar yangi polietilen paket olish o‘rniga nima qilishni maslahat berasiz?"
4. **Vaziyatli tahlil (Ijodiy yechim):** 
   * Savol: "Sinf xonangizda chiqindi miqdorini 2 barobar kamaytirish uchun qanday qoida taklif qilasiz?"

---
### 3. Tavsiya etiladigan amaliy topshiriq va 0-3 Rubrikasi:
- **Topshiriq:** "Bir haftalik o‘simlik kuzatuvi va barglarini changdan tozalash"
- **Baholash rubrikasi:**
  - *0 ball (Hali namoyon bo‘lmadi):* Vazifa boshlanmagan yoki o‘simlik parvarish qilinmagan.
  - *1 ball (Yordam bilan):* O‘qituvchi yoki ota-ona eslatmasi bilan suv quyilgan.
  - *2 ball (Mustaqil bajaradi):* Belgilangan vaqtda o‘z vaqtida parvarishlab, natijani yozgan.
  - *3 ball (Qo‘llaydi va izohlaydi):* Muntazam parvarishlab, o‘simlikka suvning ta’sirini sinfdoshlariga tushuntirib bera olgan.

---
*Eslatma: Ushbu dars loyihasi AI qoralamasidir. Darsda qo‘llashdan oldin o‘qituvchi tomonidan ko‘rib chiqilib tasdiqlanishi shart.*`;

      setPlanDraft(generatedPlan);
      setIsGenerating(false);
      addAuditLog('AI_TEACHER_DRAFT', 'lesson_plan', `draft-${grade}-${Date.now()}`, 'SUCCESS', `AI dars rejasi yaratildi: ${topic}`);
    }, 900);
  };

  const handleCopy = () => {
    if (!planDraft) return;
    navigator.clipboard.writeText(planDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApprove = () => {
    setApprovedToast(true);
    addAuditLog('TEACHER_APPROVE_DRAFT', 'lesson_plan', `approved-${grade}`, 'SUCCESS', `O'qituvchi AI loyihasini tasdiqladi.`);
    setTimeout(() => setApprovedToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h1 className="text-2xl font-black text-slate-800">
            AI Dars Loyihasi va Metodik Yordamchi
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Davlat o‘quv standartlari, Bloom taksonomiyasi va 0-3 rubrika mezonlari asosida tezkor dars ishlanmasi qoralamasini tayyorlash
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Generator Input Settings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Dars Parametrlarini Belgilang:</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Maqsadli sinf:</label>
              <div className="grid grid-cols-4 gap-2">
                {([1, 2, 3, 4] as GradeLevel[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      grade === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g}-sinf
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dars mavzusi:</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dars vaqti:</label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              >
                <option value="45 daqiqa">45 daqiqa (Standart akademik soat)</option>
                <option value="30 daqiqa">30 daqiqa (Qisqa interaktiv modul)</option>
                <option value="20 daqiqa">20 daqiqa (Mini-amaliyot)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Asosiy e’tibor:</label>
              <select
                value={focusArea}
                onChange={e => setFocusArea(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              >
                <option value="Amaliy ko‘nikma va resurslarni tejash">Amaliy ko‘nikma va resurslarni tejash</option>
                <option value="Ekologik bilim va oziq zanjiri">Ekologik bilim va oziq zanjiri</option>
                <option value="Tabiatga qadriyatli munosabat">Tabiatga qadriyatli munosabat</option>
                <option value="Kundalik ekologik xulq-atvor">Kundalik ekologik xulq-atvor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'AI loyiha tayyorlamoqda...' : 'Dars Loyihasini Yaratish'}</span>
            </button>
          </form>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed">
            <strong>Human-in-the-loop tamoyili:</strong> AI tomonidan chiqarilgan barcha natijalar qoralama bo‘lib, o‘qituvchi tekshirib tasdiqlagach sinfga biriktiriladi.
          </div>
        </div>

        {/* Right 2 Cols: Generated Lesson Plan Draft */}
        <div className="lg:col-span-2">
          {planDraft ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Tayyorlangan Dars Ishlanmasi
                  </span>
                  <h3 className="text-base font-black text-slate-800">{topic}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                  </button>

                  <button
                    onClick={handleApprove}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Tasdiqlash & Biriktirish</span>
                  </button>
                </div>
              </div>

              {approvedToast && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4" /> Dars loyihasi tasdiqlandi va sinf dasturiga qo‘shildi!
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                {planDraft}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center space-y-3 text-slate-400">
              <Bot className="w-12 h-12 mx-auto text-slate-300 animate-pulse" />
              <div className="text-sm font-bold text-slate-600">
                AI Dars Rejalashtiruvchi tayyor
              </div>
              <p className="text-xs max-w-sm mx-auto">
                Chap tomondagi maydonlarga mavzuni kiriting va "Dars Loyihasini Yaratish" tugmasini bosing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
