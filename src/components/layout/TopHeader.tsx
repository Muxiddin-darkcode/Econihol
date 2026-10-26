import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { sounds } from '../../utils/soundEffects.ts';
import { SpotlightModal } from '../common/SpotlightModal.tsx';
import {
  Menu,
  Sparkles,
  Award,
  Bot,
  Flame,
  Star,
  Search,
  ShieldCheck,
  Command
} from 'lucide-react';

interface TopHeaderProps {
  onOpenMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileSidebar }) => {
  const {
    currentUser,
    currentRole,
    selectedGrade,
    activeView,
    setActiveView,
    badges
  } = useApp();

  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const earnedBadgesCount = badges.filter(b => b.earned).length;

  // Global Keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getViewTitle = () => {
    switch (activeView) {
      case 'student-home':
        return { title: 'Bosh sahifa', category: `${selectedGrade}-sinf · Tabiiy fanlar` };
      case 'student-badges':
        return { title: 'Ekologik nishonlar', category: 'Gamifikatsiya & rag‘bat' };
      case 'student-lessons':
        return { title: 'Tabiiy fanlar darslari', category: `${selectedGrade}-sinf dasturi` };
      case 'student-games':
        return { title: 'Ekologik o‘yinlar', category: 'Interaktiv mashg‘ulot' };
      case 'student-tasks':
        return { title: 'Amaliy topshiriqlar', category: 'Kuzatuv va dalillar' };
      case 'student-ai':
        return { title: 'EkoDo‘st AI', category: 'Bolalar uchun xavfsiz AI' };
      case 'student-progress':
        return { title: 'Ekologik diagnostika', category: '4 o‘lchovli ilmiy indeks' };
      case 'teacher-dashboard':
        return { title: 'O‘qituvchi boshqaruvi', category: 'Pedagogik monitoring' };
      case 'teacher-classes':
        return { title: 'Sinflar & O‘quvchilar', category: 'Sinf ro‘yxati' };
      case 'teacher-submissions':
        return { title: 'Baholash', category: '0–3 ballik rubrika' };
      case 'teacher-ai-planner':
        return { title: 'AI Dars Rejalashtiruvchi', category: 'Bloom taksonomiyasi' };
      case 'teacher-reports':
        return { title: 'Diagnostika hisoboti', category: 'Mavzular dinamikasi' };
      case 'research-overview':
        return { title: 'Tadqiqot protokoli', category: 'PROT-ECO-2026-v2' };
      case 'research-analytics':
        return { title: 'T0 / T1 Analitika', category: 'Statistik qiyoslash' };
      case 'research-export':
        return { title: 'Ma’lumotlar eksporti', category: 'SPSS / R tayyor baza' };
      case 'admin-users':
        return { title: 'Foydalanuvchilar', category: 'Tizim boshqaruvi' };
      case 'admin-content':
        return { title: 'Kontent ekspertizasi', category: 'Moderatsiya va nashr' };
      case 'admin-ai-settings':
        return { title: 'AI xavfsizlik', category: 'UNICEF me’yorlari' };
      case 'admin-audit':
        return { title: 'Audit jurnali', category: 'Xavfsizlik monitoringi' };
      case 'parent-portal':
        return { title: 'Farzandim taraqqiyoti', category: 'Ota-ona monitoringi' };
      case 'landing':
        return { title: 'Loyiha konsepsiyasi', category: 'Texnik spetsifikatsiya' };
      case 'privacy':
        return { title: 'Maxfiylik siyosati', category: 'O‘zR qonunchiligi' };
      case 'help':
        return { title: 'Metodik qo‘llanma', category: 'Savol-javoblar' };
      default:
        return { title: 'Eco Nihol', category: 'Ta’lim platformasi' };
    }
  };

  const { title, category } = getViewTitle();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-2xl border-b border-slate-200/50 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 transition-all">
        {/* Left: Mobile Toggle & Page Title (Apple Breadcrumb Style) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
            title="Menyuni ochish"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {category}
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Center: Apple Spotlight Search Trigger Capsule */}
        <button
          onClick={() => setSpotlightOpen(true)}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/60 text-slate-500 hover:text-slate-800 text-xs font-medium transition-all cursor-pointer shadow-2xs group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
          <span>Qidiruv...</span>
          <span className="flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.2 rounded border border-slate-200 ml-2">
            ⌘K
          </span>
        </button>

        {/* Right: Apple-Style Status Capsules */}
        <div className="flex items-center gap-2">
          {/* Mobile search trigger */}
          <button
            onClick={() => setSpotlightOpen(true)}
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 md:hidden cursor-pointer"
            title="Qidiruv"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* e-Maktab State Integration Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/60 text-slate-600 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>e-Maktab:</span>
            <span className="text-emerald-700 font-semibold">Sinxron</span>
          </div>

          {currentRole === 'student' && (
            <>
              {/* Apple-style Streak Flame Capsule */}
              <div className="hidden sm:flex items-center gap-1 bg-amber-50/80 border border-amber-200/70 px-2.5 py-1 rounded-full text-amber-900 text-xs font-semibold shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>3 kun streak</span>
              </div>

              {/* Apple-style Star Balance Capsule */}
              <div className="flex items-center gap-1 bg-emerald-50/80 border border-emerald-200/70 px-3 py-1 rounded-full text-emerald-900 text-xs font-semibold shadow-2xs">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="font-mono font-bold">{currentUser.stars}</span>
              </div>

              {/* Quick AI Help Capsule */}
              <button
                onClick={() => setActiveView('student-ai')}
                className="hidden md:flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 px-3.5 py-1 rounded-full text-xs font-medium transition-all active:scale-95 cursor-pointer shadow-2xs"
                title="EkoDo‘stga savol berish"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>EkoDo‘st</span>
              </button>
            </>
          )}

          {/* Minimal User Profile Capsule */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200/60">
            <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-sm shadow-2xs">
              {currentUser.avatar}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                {currentUser.displayName}
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[130px]">
                {currentRole === 'student'
                  ? (currentUser.className ? `${currentUser.className}` : '3-«A» sinf')
                  : (currentUser.position || currentUser.schoolName)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spotlight Search Modal */}
      <SpotlightModal isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </>
  );
};
