import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sanitizeChildAiPrompt } from '../../utils/ecoLogic.ts';
import { PRESET_STUDENT_AI_QUESTIONS } from '../../data/mockData.ts';
import { AiChatMessage } from '../../types/index.ts';
import { Bot, Send, Sparkles, Volume2, ShieldAlert, ShieldCheck, RefreshCw, Trash2, HelpCircle } from 'lucide-react';

export const StudentAiChat: React.FC = () => {
  const { addAuditLog } = useApp();
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Salom, aziz yosh tabiatshunos! Men EkoDo‘stman — sizning ekologiya va tabiiy fanlar bo‘yicha xavfsiz yordamchingizman. 🌱\n\nTabiat, hayvonlar, o‘simliklar yoki sayyoramizni asrash haqida nima bilmoqchisiz? Quyidagi tayyor savollardan birini tanlashingiz yoki o‘z savolingizni yozishingiz mumkin!",
      timestamp: '10:00'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const speakText = (text: string) => {
    if (!isAudioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 200));
    utterance.lang = 'uz-UZ';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend || input;
    if (!rawText.trim()) return;

    setWarningMessage(null);

    // Run Child AI Safety Guardrail
    const safetyResult = sanitizeChildAiPrompt(rawText);
    if (!safetyResult.isSafe) {
      setWarningMessage(safetyResult.warningUz || "Xavfsizlik qoidasi: Shaxsiy ma'lumot kiritish mumkin emas.");
      addAuditLog('AI_SAFETY_BLOCK', 'ai_session', 'student_chat', 'FLAGGED', `Bloklandi: ${rawText}`);
      return;
    }

    const userMsg: AiChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: safetyResult.sanitizedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Generate responsive educational hint-based AI response
    setTimeout(() => {
      let aiReply = '';
      const lower = rawText.toLowerCase();

      if (lower.includes('barg') || lower.includes('sarg')) {
        aiReply = "Qiziq savol! 🍂 Kuzda quyosh nuri kamayadi va daraxt barglaridagi yashil rang beruvchi xlorofill moddasi kamayadi. Uning o‘rniga sariq va qizil rangli moddalar (karotinlar) ko‘zga tashlanadi. Keyin daraxt qishki sovuqqa tayyorlanib, barglarini to‘kadi. Qarang, tabiat qanday aqlli!";
      } else if (lower.includes('butilka') || lower.includes('plastik')) {
        aiReply = "Plastik butilka tabiatda 400 yildan 500 yilgacha parchalanmaydi! 🧴 U tuproq va suvdagi baliqlarga katta zarar yetkazadi. Shuning uchun uni sariq qutiga saralashimiz va iloji boricha qayta ishlatiladigan shisha yoki metall idishlardan foydalanishimiz lozim.";
      } else if (lower.includes('suv') || lower.includes('tejash')) {
        aiReply = "Suvni tejash uchun eng oddiy 3 ta sehrli qoida bor: 💧\n1. Tish tozalaganda kranni ochiq qoldirmaslik, stakandan foydalanish.\n2. Yuvinishda dush tagida uzoq turmaslik.\n3. Tomchilab turgan jo‘mraklarni darhol kattalarga aytib tuzatish!";
      } else if (lower.includes('orol')) {
        aiReply = "Orol dengizi bir paytlar juda katta ko‘l bo‘lgan. Insonlar Amudaryo va Sirdaryo suvlarini me’yoridan ortiq ishlatishi oqibatida uning katta qismi qurib qoldi. Hozirda O‘zbekiston olimlari Orol tubiga millionlab saksovul daraxtlarini ekib, tabiatni qayta tiklashga urinmoqdalar!";
      } else if (lower.includes('batareya')) {
        aiReply = "Bitta kichik barmoq batareya tarkibida simob va qo‘rg‘oshin kabi xavfli moddalar bor. 🔋 Agar u yerga tashlansa, 20 metr tuproq va 400 litr suvni zaharlaydi! Shuning uchun ularni faqat xavfli chiqindilar qutisiga topshirish shart.";
      } else {
        aiReply = `Juda qiziqarli savol berdingiz! Tabiatda hamma narsa bir-biri bilan chambarchas bog‘langan. Siz qanday fikrdasiz: insonlar tabiatga ko‘proq qanday yordam berishi mumkin? Masalan, ko‘chat ekishmi yoki chiqindilarni saralashmi? 🌱`;
      }

      const aiMsg: AiChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(aiReply);
      addAuditLog('AI_CHAT_REPLY', 'ai_session', 'student_chat', 'SUCCESS', `AI javobi berildi: ${rawText.slice(0, 30)}...`);
    }, 700);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'ai',
        text: "Suhbat tozalandi. Tabiiy fanlar va ekologiya haqida yangi savolingiz bormi? 🌱",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl text-white shadow-md shadow-emerald-600/20">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-800">EkoDo‘st — O‘quvchi AI Yordamchisi</h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> UNICEF 2025 Xavfsizlik Filtri
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Faqat ekologiya va tabiiy fanlar bo‘yicha bolalarga mos, do‘stona yo‘naltiruvchi tushuntirishlar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isAudioEnabled
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Ovozli o‘qish"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isAudioEnabled ? 'Ovoz yoniq' : 'Ovoz o‘chiq'}</span>
          </button>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            title="Suhbatni tozalash"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Questions Chips */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tezkor qiziqarli savollar (bosing):</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PRESET_STUDENT_AI_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-white hover:bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-slate-700 hover:text-emerald-900 font-semibold whitespace-nowrap shadow-2xs transition-all active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Warning Box if Child Safety Filter Triggered */}
      {warningMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 flex items-start gap-3 text-xs animate-shake">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold mb-0.5">Xavfsizlik ogohlantirishi:</div>
            <div>{warningMessage}</div>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-xs ${
                m.sender === 'user'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {m.sender === 'user' ? '👦🏻' : '🌱'}
            </div>

            <div
              className={`max-w-[80%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-xs'
                  : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs whitespace-pre-line'
              }`}
            >
              {m.text}
              <div
                className={`text-[10px] mt-1.5 font-medium ${
                  m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-lg">
              🌱
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>EkoDo‘st javob yozmoqda...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-3xl p-3 border border-emerald-200 shadow-xs flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ekologiya yoki tabiat haqida savolingizni yozing..."
          className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim()}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
        >
          <span>Yuborish</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-[11px] text-center text-slate-400">
        EkoDo‘st faqat ta’limiy yordamchi bo‘lib, shaxsiy ma’lumotlarni talab qilmaydi va saqlamaydi.
      </div>
    </div>
  );
};
