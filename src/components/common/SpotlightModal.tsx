import React, { useState, useEffect, useRef } from 'react';
import { useApp, AppView } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import {
  Search,
  BookOpen,
  Gamepad2,
  CheckSquare,
  Sparkles,
  Award,
  ArrowRight,
  X,
  Compass,
  FileText
} from 'lucide-react';

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotlightModal: React.FC<SpotlightModalProps> = ({ isOpen, onClose }) => {
  const { setActiveView, lessons } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      sounds.playAppleClick();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search items index
  const quickNav = [
    { label: 'Bosh sahifa (Dashboard)', view: 'student-home', icon: '🏠', category: 'Navigatsiya' },
    { label: 'Tabiiy fanlar darslari (68 soat)', view: 'student-lessons', icon: '📘', category: 'Darslar' },
    { label: 'Chiqindilarni saralash o‘yini', view: 'student-games', icon: '♻️', category: 'O‘yinlar' },
    { label: 'Suvni tejash posboni o‘yini', view: 'student-games', icon: '💧', category: 'O‘yinlar' },
    { label: 'Ekologik nishonlar & yutuqlar', view: 'student-badges', icon: '🎖️', category: 'Yutuqlar' },
    { label: 'Amaliy laboratoriya topshiriqlari', view: 'student-tasks', icon: '📝', category: 'Amaliyot' },
    { label: 'EkoDo‘st AI maslahatchi', view: 'student-ai', icon: '🤖', category: 'Yordamchi' },
    { label: 'Eko-Indeks ilmiy diagnostikasi', view: 'student-progress', icon: '📊', category: 'Analitika' }
  ];

  const ecoGlossary = [
    { term: 'Fotosintez', def: 'Yashil barglarning quyosh nuri orqali kislorod va ozuqa ishlab chiqarish mo‘jizasi.' },
    { term: 'Kompost', def: 'Organik meva-sabzavot qoldiqlaridan hosil bo‘ladigan unumdor tabiiy o‘g‘it.' },
    { term: 'Qayta ishlash', def: 'Plastik, shisha va qog‘oz chiqindilarni ikkinchi marta foydali buyumga aylantirish.' },
    { term: 'Yashil energiya', def: 'Quyosh va shamol quvvati — havoga zararli tutun chiqarmaydigan toza manba.' },
    { term: 'Oziq zanjiri', def: 'Quyoshdan boshlanib o‘simlik, o‘txo‘r va yirtqichgacha bo‘lgan tiriklik halqasi.' }
  ];

  const filteredNav = quickNav.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLessons = lessons.filter(l =>
    l.title.toLowerCase().includes(query.toLowerCase()) ||
    l.topicCode.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGlossary = ecoGlossary.filter(g =>
    g.term.toLowerCase().includes(query.toLowerCase()) ||
    g.def.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectNav = (view: string) => {
    sounds.playAppleClick();
    setActiveView(view as AppView);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white/95 backdrop-blur-2xl w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Spotlight Search Input */}
        <div className="p-4 border-b border-slate-200/70 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Darslar, o‘yinlar, atamalar yoki bo‘limlarni qidiring..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Nav Matches */}
          {filteredNav.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Tezkor Bo‘limlar
              </div>
              <div className="space-y-0.5">
                {filteredNav.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectNav(item.view)}
                    className="w-full px-3 py-2.5 rounded-2xl hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-400">{item.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Matches */}
          {filteredLessons.length > 0 && (
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                DTS Darslari
              </div>
              <div className="space-y-0.5">
                {filteredLessons.slice(0, 4).map(les => (
                  <button
                    key={les.id}
                    onClick={() => handleSelectNav('student-lessons')}
                    className="w-full px-3 py-2.5 rounded-2xl hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{les.coverEmoji}</span>
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                          {les.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {les.topicCode} • {les.gradeLevel}-sinf • {les.durationMinutes} daqiqa
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Ochish
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Matches */}
          {filteredGlossary.length > 0 && (
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Ekologik Tushunchalar Lug‘ati
              </div>
              <div className="space-y-1">
                {filteredGlossary.map((gloss, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs">
                    <span className="font-bold text-slate-900 block">{gloss.term}</span>
                    <span className="text-[11px] text-slate-600 mt-0.5 block leading-relaxed">{gloss.def}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Zero results */}
          {filteredNav.length === 0 && filteredLessons.length === 0 && filteredGlossary.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              «{query}» bo‘yicha hech narsa topilmadi. Qidiruv so‘zini o‘zgartirib ko‘ring.
            </div>
          )}
        </div>

        {/* Spotlight Footer */}
        <div className="p-3 bg-slate-50/80 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Eco Nihol Spotlight Qidiruv</span>
          <span>Bo‘limga o‘tish uchun bosing ↵</span>
        </div>
      </div>
    </div>
  );
};
