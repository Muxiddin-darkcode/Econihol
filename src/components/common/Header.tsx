import React from 'react';
import { useApp, AppView } from '../../context/AppContext.tsx';
import { UserRole, GradeLevel } from '../../types/index.ts';
import { 
  Sparkles, 
  GraduationCap, 
  FlaskConical, 
  ShieldCheck, 
  HeartHandshake, 
  BookOpen, 
  Gamepad2, 
  CheckSquare, 
  Bot, 
  BarChart3, 
  Layers, 
  Users, 
  FileText, 
  Info, 
  Home
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    selectedGrade,
    setSelectedGrade,
    activeView,
    setActiveView
  } = useApp();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'student', label: "O'quvchi", icon: <Sparkles className="w-4 h-4 text-emerald-500" />, desc: '1-4 sinf kabineti' },
    { role: 'teacher', label: "O'qituvchi", icon: <GraduationCap className="w-4 h-4 text-blue-500" />, desc: 'Sinf & Baholash' },
    { role: 'researcher', label: 'Tadqiqotchi', icon: <FlaskConical className="w-4 h-4 text-purple-500" />, desc: 'T0/T1 Analitika' },
    { role: 'admin', label: 'Administrator', icon: <ShieldCheck className="w-4 h-4 text-amber-500" />, desc: 'Kontent & Xavfsizlik' },
    { role: 'parent', label: 'Ota-ona', icon: <HeartHandshake className="w-4 h-4 text-rose-500" />, desc: 'Kuzatuv' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner: Role Switcher & System Bar */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase tracking-wider text-[10px]">
              Eco Nihol v1.0
            </span>
            <span className="hidden sm:inline text-slate-300">
              Boshlang‘ich sinflar (1–4) uchun ekologik ta’lim va ilmiy tadqiqot tizimi
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-slate-400 font-medium mr-1 hidden md:inline">Rolni tanlang:</span>
            {roles.map(r => (
              <button
                key={r.role}
                onClick={() => setCurrentRole(r.role)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  currentRole === r.role
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={r.desc}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView(currentRole === 'student' ? 'student-home' : currentRole === 'teacher' ? 'teacher-dashboard' : currentRole === 'researcher' ? 'research-overview' : currentRole === 'admin' ? 'admin-users' : 'parent-portal')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-800">
                  Eco<span className="text-emerald-600"> Nihol</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                  Tabiiy fanlar
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Ekologik madaniyatni shakllantirish platformasi
              </p>
            </div>
          </button>
        </div>

        {/* Grade Selector (for Student/Teacher contexts) */}
        {(currentRole === 'student' || currentRole === 'teacher') && (
          <div className="flex items-center bg-emerald-50 border border-emerald-200 p-1 rounded-xl">
            <span className="text-xs font-semibold text-emerald-900 px-2 hidden sm:inline">
              Sinf:
            </span>
            {([1, 2, 3, 4] as GradeLevel[]).map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  selectedGrade === grade
                    ? 'bg-emerald-600 text-white shadow-xs scale-105'
                    : 'text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                {grade}-sinf
              </button>
            ))}
          </div>
        )}

        {/* User Info & HUD */}
        <div className="flex items-center gap-3">
          {currentRole === 'student' && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-amber-900">
              <span className="text-amber-500 text-base">⭐</span>
              <span className="font-extrabold text-sm">{currentUser.stars || 125}</span>
              <span className="text-[11px] text-amber-700 font-medium hidden md:inline">yulduz</span>
            </div>
          )}

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-800">{currentUser.displayName}</div>
              <div className="text-[11px] text-slate-500 font-medium capitalize">
                {currentRole === 'student' ? `${selectedGrade}-sinf o‘quvchisi` : currentRole === 'teacher' ? "Tabiiy fanlar o'qituvchisi" : currentRole === 'researcher' ? 'Ilmiy tadqiqotchi' : currentRole === 'admin' ? 'Tizim administratori' : 'Farzand kuzatuvchisi'}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-lg shadow-xs">
              {currentUser.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific Navigation Tabs */}
      <nav className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 py-1.5">
            {currentRole === 'student' && (
              <>
                <NavButton
                  active={activeView === 'student-home'}
                  onClick={() => setActiveView('student-home')}
                  icon={<Home className="w-4 h-4" />}
                  label="Bosh sahifa"
                />
                <NavButton
                  active={activeView === 'student-lessons'}
                  onClick={() => setActiveView('student-lessons')}
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Darslar"
                />
                <NavButton
                  active={activeView === 'student-games'}
                  onClick={() => setActiveView('student-games')}
                  icon={<Gamepad2 className="w-4 h-4" />}
                  label="Ekologik O‘yinlar"
                  badge="Yangi"
                />
                <NavButton
                  active={activeView === 'student-tasks'}
                  onClick={() => setActiveView('student-tasks')}
                  icon={<CheckSquare className="w-4 h-4" />}
                  label="Amaliy Vazifalar"
                />
                <NavButton
                  active={activeView === 'student-ai'}
                  onClick={() => setActiveView('student-ai')}
                  icon={<Bot className="w-4 h-4 text-emerald-600" />}
                  label="EkoDo‘st AI"
                  badge="Xavfsiz"
                />
                <NavButton
                  active={activeView === 'student-progress'}
                  onClick={() => setActiveView('student-progress')}
                  icon={<BarChart3 className="w-4 h-4" />}
                  label="Mening Yutuqlarim"
                />
              </>
            )}

            {currentRole === 'teacher' && (
              <>
                <NavButton
                  active={activeView === 'teacher-dashboard'}
                  onClick={() => setActiveView('teacher-dashboard')}
                  icon={<Layers className="w-4 h-4" />}
                  label="Boshqaruv Paneli"
                />
                <NavButton
                  active={activeView === 'teacher-classes'}
                  onClick={() => setActiveView('teacher-classes')}
                  icon={<Users className="w-4 h-4" />}
                  label="Sinflar & O‘quvchilar"
                />
                <NavButton
                  active={activeView === 'teacher-submissions'}
                  onClick={() => setActiveView('teacher-submissions')}
                  icon={<CheckSquare className="w-4 h-4" />}
                  label="Ishlarni Tekshirish (Rubrika)"
                  badge="3 ta kutilmoqda"
                />
                <NavButton
                  active={activeView === 'teacher-ai-planner'}
                  onClick={() => setActiveView('teacher-ai-planner')}
                  icon={<Bot className="w-4 h-4 text-blue-600" />}
                  label="AI Dars Rejalashtiruvchi"
                />
                <NavButton
                  active={activeView === 'teacher-reports'}
                  onClick={() => setActiveView('teacher-reports')}
                  icon={<BarChart3 className="w-4 h-4" />}
                  label="Diagnostika & Hisobotlar"
                />
              </>
            )}

            {currentRole === 'researcher' && (
              <>
                <NavButton
                  active={activeView === 'research-overview'}
                  onClick={() => setActiveView('research-overview')}
                  icon={<FlaskConical className="w-4 h-4" />}
                  label="Tadqiqot Protokoli & Guruhlar"
                />
                <NavButton
                  active={activeView === 'research-analytics'}
                  onClick={() => setActiveView('research-analytics')}
                  icon={<BarChart3 className="w-4 h-4" />}
                  label="T0 / T1 Taqqoslash (Effekt d)"
                />
                <NavButton
                  active={activeView === 'research-export'}
                  onClick={() => setActiveView('research-export')}
                  icon={<FileText className="w-4 h-4" />}
                  label="Eksport & Data Dictionary"
                />
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <NavButton
                  active={activeView === 'admin-users'}
                  onClick={() => setActiveView('admin-users')}
                  icon={<Users className="w-4 h-4" />}
                  label="Foydalanuvchilar & Rollar"
                />
                <NavButton
                  active={activeView === 'admin-content'}
                  onClick={() => setActiveView('admin-content')}
                  icon={<BookOpen className="w-4 h-4" />}
                  label="Kontent Ekspertizasi"
                />
                <NavButton
                  active={activeView === 'admin-ai-settings'}
                  onClick={() => setActiveView('admin-ai-settings')}
                  icon={<Bot className="w-4 h-4" />}
                  label="AI Xavfsizlik & Promptlar"
                />
                <NavButton
                  active={activeView === 'admin-audit'}
                  onClick={() => setActiveView('admin-audit')}
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Audit Jurnali (Logs)"
                />
              </>
            )}

            {currentRole === 'parent' && (
              <NavButton
                active={activeView === 'parent-portal'}
                onClick={() => setActiveView('parent-portal')}
                icon={<HeartHandshake className="w-4 h-4" />}
                label="Farzandimning Ekologik Kundaligi"
              />
            )}
          </div>

          {/* Quick links to Info & Privacy */}
          <div className="flex items-center gap-1.5 py-1.5 text-xs text-slate-500">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-2 py-1 rounded hover:text-emerald-700 flex items-center gap-1 ${
                activeView === 'landing' ? 'text-emerald-700 font-bold bg-emerald-100/60' : ''
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Loyiha haqida</span>
            </button>
            <button
              onClick={() => setActiveView('privacy')}
              className={`px-2 py-1 rounded hover:text-emerald-700 ${
                activeView === 'privacy' ? 'text-emerald-700 font-bold bg-emerald-100/60' : ''
              }`}
            >
              Maxfiylik (O‘zR Qonuni)
            </button>
            <button
              onClick={() => setActiveView('help')}
              className={`px-2 py-1 rounded hover:text-emerald-700 ${
                activeView === 'help' ? 'text-emerald-700 font-bold bg-emerald-100/60' : ''
              }`}
            >
              Qo‘llanma
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
      active
        ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge && (
      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
);
