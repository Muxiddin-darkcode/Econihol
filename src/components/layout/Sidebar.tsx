import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext.tsx';
import { UserRole, GradeLevel } from '../../types/index.ts';
import { getStudentMilestoneRank } from '../../utils/ecoLogic.ts';
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  CheckSquare,
  Sparkles,
  BarChart3,
  Users,
  FlaskConical,
  FileText,
  ShieldCheck,
  ChevronDown,
  X,
  Award,
  Flame,
  Check,
  Star,
  ArrowRight,
  GraduationCap,
  Building2,
  Heart,
  Bot,
  Compass,
  Settings,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    selectedGrade,
    setSelectedGrade,
    activeView,
    setActiveView,
    submissions,
    badges
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const pendingSubCount = submissions.filter(s => s.status === 'pending').length;
  const earnedBadgesCount = badges.filter(b => b.earned).length;
  const totalBadgesCount = badges.length;
  const milestone = getStudentMilestoneRank(earnedBadgesCount, totalBadgesCount);

  const roles: { role: UserRole; label: string; desc: string; icon: string }[] = [
    { role: 'student', label: "O‘quvchi", desc: "Shaxsiy darslar & nishonlar", icon: "👦🏻" },
    { role: 'teacher', label: "O‘qituvchi", desc: "Sinf & rubrika monitoringi", icon: "👩🏻‍🏫" },
    { role: 'researcher', label: 'Tadqiqotchi', desc: "T0/T1 ilmiy diagnostika", icon: "👨🏻‍🔬" },
    { role: 'admin', label: 'Administrator', desc: "Maktab boshqaruvi & audit", icon: "🛡️" },
    { role: 'parent', label: 'Ota-ona', desc: "Farzand taraqqiyoti", icon: "👩🏻" }
  ];

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setMobileOpen(false);
  };

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
  };

  const currentRoleInfo = roles.find(r => r.role === currentRole) || roles[0];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Modern Apple-Style Sidebar (Cupertino Aesthetic) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-2xl flex flex-col border-r border-slate-200/60 shadow-[1px_0_20px_rgba(0,0,0,0.03)] transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ONE SINGLE UNIFIED SMOOTH SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col justify-between py-4 px-3 space-y-4">
          <div className="space-y-4">
            {/* Apple-style Brand Header */}
            <div className="px-2 pt-1 pb-2">
              <div className="flex items-center justify-between mb-3">
                {/* Official State Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/90 text-slate-600 text-[10px] font-medium border border-slate-200/60">
                  <span>🇺🇿</span>
                  <span>MMTB • DTS-2024</span>
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 md:hidden transition-colors"
                  aria-label="Menyuni yopish"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Logo / App Name */}
              <button
                onClick={() =>
                  handleNavClick(
                    currentRole === 'student'
                      ? 'student-home'
                      : currentRole === 'teacher'
                      ? 'teacher-dashboard'
                      : currentRole === 'researcher'
                      ? 'research-overview'
                      : 'admin-users'
                  )
                }
                className="flex items-center gap-3 text-left w-full group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[15px] font-bold tracking-tight text-slate-900 leading-none">
                    Eco<span className="text-emerald-600 font-extrabold"> Nihol</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium tracking-normal mt-0.5">
                    Ta’lim & Monitoring Portali
                  </div>
                </div>
              </button>
            </div>

            {/* Apple User Profile Capsule & Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="w-full flex items-center justify-between p-2 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 shadow-2xs text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                    {currentRoleInfo.icon}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-900 leading-tight truncate">
                      {currentUser.displayName}
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal truncate flex items-center gap-1 mt-0.5">
                      <span className="text-emerald-700 font-medium">{currentRoleInfo.label}</span>
                      <span>·</span>
                      <span className="text-slate-400">Rolni almashtirish</span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ml-1.5 ${
                    roleDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Apple-style Floating Dropdown Sheet */}
              {roleDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Foydalanuvchi roli:
                  </div>
                  {roles.map(r => {
                    const isSelected = currentRole === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => handleRoleSelect(r.role)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white font-medium shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-base">{r.icon}</span>
                          <div className="truncate">
                            <div className={`font-medium ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {r.label}
                            </div>
                            <div className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                              {r.desc}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Student Class Info Capsule */}
              {currentRole === 'student' && (
                <div className="mt-2 px-3 py-1.5 rounded-xl bg-white/70 border border-slate-200/50 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {currentUser.className || '3-«A» sinf'}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                    {currentUser.studentId || 'UZ-84920'}
                  </span>
                </div>
              )}

              {/* Teacher Class Switcher (Apple Segmented Control Style) */}
              {currentRole === 'teacher' && (
                <div className="mt-2 p-0.5 bg-slate-100 rounded-xl border border-slate-200/60 flex gap-0.5">
                  {[
                    { grade: 1, label: '1-A' },
                    { grade: 2, label: '2-B' },
                    { grade: 3, label: '3-A' },
                    { grade: 4, label: '4-A' }
                  ].map(item => {
                    const isSelected = selectedGrade === item.grade;
                    return (
                      <button
                        key={item.grade}
                        onClick={() => setSelectedGrade(item.grade as GradeLevel)}
                        className={`flex-1 py-1 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Researcher Grade Selector (Apple Segmented Control) */}
              {currentRole === 'researcher' && (
                <div className="mt-2 p-0.5 bg-slate-100 rounded-xl border border-slate-200/60 flex gap-0.5">
                  {([1, 2, 3, 4] as GradeLevel[]).map(g => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`flex-1 py-1 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedGrade === g
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {g}-sinf
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apple-Style Navigation Menu Groups */}
            <div className="space-y-4">
              {/* STUDENT ROLE MENU */}
              {currentRole === 'student' && (
                <>
                  <div className="space-y-1">
                    <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                      Asosiy
                    </div>
                    <nav className="space-y-1">
                      <AppleSidebarLink
                        active={activeView === 'student-home'}
                        onClick={() => handleNavClick('student-home')}
                        icon={<LayoutDashboard className="w-4 h-4" />}
                        squircleColor="bg-emerald-500"
                        label="Bosh sahifa"
                      />
                      <AppleSidebarLink
                        active={activeView === 'student-lessons'}
                        onClick={() => handleNavClick('student-lessons')}
                        icon={<BookOpen className="w-4 h-4" />}
                        squircleColor="bg-blue-500"
                        label="Tabiiy fanlar darslari"
                        badge="68 soat"
                      />
                      <AppleSidebarLink
                        active={activeView === 'student-tasks'}
                        onClick={() => handleNavClick('student-tasks')}
                        icon={<CheckSquare className="w-4 h-4" />}
                        squircleColor="bg-indigo-500"
                        label="Amaliy topshiriqlar"
                        badge="0–3 ball"
                      />
                    </nav>
                  </div>

                  <div className="space-y-1">
                    <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                      O‘yinlar & Yutuqlar
                    </div>
                    <nav className="space-y-1">
                      <AppleSidebarLink
                        active={activeView === 'student-games'}
                        onClick={() => handleNavClick('student-games')}
                        icon={<Gamepad2 className="w-4 h-4" />}
                        squircleColor="bg-amber-500"
                        label="Ekologik o‘yinlar"
                        badge="4 ta o‘yin"
                      />
                      <AppleSidebarLink
                        active={activeView === 'student-badges'}
                        onClick={() => handleNavClick('student-badges')}
                        icon={<Award className="w-4 h-4" />}
                        squircleColor="bg-rose-500"
                        label="Ekologik nishonlar"
                        badge={`${earnedBadgesCount}/${totalBadgesCount}`}
                      />
                      <AppleSidebarLink
                        active={activeView === 'student-progress'}
                        onClick={() => handleNavClick('student-progress')}
                        icon={<BarChart3 className="w-4 h-4" />}
                        squircleColor="bg-cyan-500"
                        label="Eko-Indeks tahlili"
                      />
                    </nav>
                  </div>

                  <div className="space-y-1">
                    <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                      Yordamchi
                    </div>
                    <nav className="space-y-1">
                      <AppleSidebarLink
                        active={activeView === 'student-ai'}
                        onClick={() => handleNavClick('student-ai')}
                        icon={<Sparkles className="w-4 h-4" />}
                        squircleColor="bg-teal-500"
                        label="EkoDo‘st AI"
                        badge="Xavfsiz"
                      />
                    </nav>
                  </div>
                </>
              )}

              {/* TEACHER ROLE MENU */}
              {currentRole === 'teacher' && (
                <>
                  <div className="space-y-1">
                    <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                      Pedagogik Nazorat
                    </div>
                    <nav className="space-y-1">
                      <AppleSidebarLink
                        active={activeView === 'teacher-dashboard'}
                        onClick={() => handleNavClick('teacher-dashboard')}
                        icon={<LayoutDashboard className="w-4 h-4" />}
                        squircleColor="bg-blue-600"
                        label="O‘qituvchi boshqaruvi"
                      />
                      <AppleSidebarLink
                        active={activeView === 'teacher-classes'}
                        onClick={() => handleNavClick('teacher-classes')}
                        icon={<Users className="w-4 h-4" />}
                        squircleColor="bg-indigo-500"
                        label="Sinflar & O‘quvchilar"
                      />
                      <AppleSidebarLink
                        active={activeView === 'teacher-submissions'}
                        onClick={() => handleNavClick('teacher-submissions')}
                        icon={<CheckSquare className="w-4 h-4" />}
                        squircleColor="bg-amber-500"
                        label="Baholash (Rubrika)"
                        badge={pendingSubCount > 0 ? `${pendingSubCount} ta` : undefined}
                      />
                    </nav>
                  </div>

                  <div className="space-y-1">
                    <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                      AI & Hisobot
                    </div>
                    <nav className="space-y-1">
                      <AppleSidebarLink
                        active={activeView === 'teacher-ai-planner'}
                        onClick={() => handleNavClick('teacher-ai-planner')}
                        icon={<Sparkles className="w-4 h-4" />}
                        squircleColor="bg-emerald-500"
                        label="AI Dars Rejalashtiruvchi"
                      />
                      <AppleSidebarLink
                        active={activeView === 'teacher-reports'}
                        onClick={() => handleNavClick('teacher-reports')}
                        icon={<BarChart3 className="w-4 h-4" />}
                        squircleColor="bg-teal-500"
                        label="Diagnostika Hisoboti"
                      />
                    </nav>
                  </div>
                </>
              )}

              {/* RESEARCHER ROLE MENU */}
              {currentRole === 'researcher' && (
                <div className="space-y-1">
                  <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                    Ilmiy Diagnostika
                  </div>
                  <nav className="space-y-1">
                    <AppleSidebarLink
                      active={activeView === 'research-overview'}
                      onClick={() => handleNavClick('research-overview')}
                      icon={<FlaskConical className="w-4 h-4" />}
                      squircleColor="bg-purple-600"
                      label="Tadqiqot Protokoli"
                    />
                    <AppleSidebarLink
                      active={activeView === 'research-analytics'}
                      onClick={() => handleNavClick('research-analytics')}
                      icon={<BarChart3 className="w-4 h-4" />}
                      squircleColor="bg-indigo-600"
                      label="T0 / T1 Analitika"
                    />
                    <AppleSidebarLink
                      active={activeView === 'research-export'}
                      onClick={() => handleNavClick('research-export')}
                      icon={<FileText className="w-4 h-4" />}
                      squircleColor="bg-slate-700"
                      label="Eksport (SPSS / R)"
                    />
                  </nav>
                </div>
              )}

              {/* ADMIN ROLE MENU */}
              {currentRole === 'admin' && (
                <div className="space-y-1">
                  <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                    Tizim Boshqaruvi
                  </div>
                  <nav className="space-y-1">
                    <AppleSidebarLink
                      active={activeView === 'admin-users'}
                      onClick={() => handleNavClick('admin-users')}
                      icon={<Users className="w-4 h-4" />}
                      squircleColor="bg-blue-600"
                      label="Foydalanuvchilar"
                    />
                    <AppleSidebarLink
                      active={activeView === 'admin-content'}
                      onClick={() => handleNavClick('admin-content')}
                      icon={<BookOpen className="w-4 h-4" />}
                      squircleColor="bg-emerald-600"
                      label="Kontent Ekspertizasi"
                    />
                    <AppleSidebarLink
                      active={activeView === 'admin-ai-settings'}
                      onClick={() => handleNavClick('admin-ai-settings')}
                      icon={<ShieldCheck className="w-4 h-4" />}
                      squircleColor="bg-rose-600"
                      label="AI Xavfsizlik"
                    />
                    <AppleSidebarLink
                      active={activeView === 'admin-audit'}
                      onClick={() => handleNavClick('admin-audit')}
                      icon={<FileCheck className="w-4 h-4" />}
                      squircleColor="bg-slate-800"
                      label="Audit Jurnali"
                    />
                  </nav>
                </div>
              )}

              {/* PARENT ROLE MENU */}
              {currentRole === 'parent' && (
                <div className="space-y-1">
                  <div className="px-2.5 pb-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                    Farzandim Nazorati
                  </div>
                  <nav className="space-y-1">
                    <AppleSidebarLink
                      active={activeView === 'parent-portal'}
                      onClick={() => handleNavClick('parent-portal')}
                      icon={<Heart className="w-4 h-4" />}
                      squircleColor="bg-rose-500"
                      label="Farzandim Rivojlanishi"
                    />
                  </nav>
                </div>
              )}
            </div>
          </div>

          {/* Apple-style Bottom Capsule Widget */}
          <div className="pt-2 border-t border-slate-200/50 space-y-2.5">
            {currentRole === 'student' ? (
              <button
                onClick={() => handleNavClick('student-badges')}
                className="w-full p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/60 transition-all text-left space-y-1.5 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base">{milestone.icon}</span>
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {milestone.rankTitleUz.split('(')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60 shrink-0">
                    ⭐ {currentUser.stars}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${milestone.progressPercent}%` }}
                  />
                </div>
              </button>
            ) : (
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-[11px] space-y-0.5">
                <div className="font-semibold text-slate-800 flex items-center justify-between">
                  <span>e-Maktab Tizimi</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-slate-400">
                  110-maktab bazasi bilan sinxronlangan
                </div>
              </div>
            )}

            {/* Apple-style Minimalist Links */}
            <div className="flex items-center justify-between px-2 text-[11px] text-slate-400">
              <button
                onClick={() => handleNavClick('landing')}
                className={`hover:text-slate-900 transition-colors cursor-pointer ${
                  activeView === 'landing' ? 'font-semibold text-emerald-700' : ''
                }`}
              >
                Loyiha
              </button>
              <span>·</span>
              <button
                onClick={() => handleNavClick('privacy')}
                className={`hover:text-slate-900 transition-colors cursor-pointer ${
                  activeView === 'privacy' ? 'font-semibold text-emerald-700' : ''
                }`}
              >
                Maxfiylik
              </button>
              <span>·</span>
              <button
                onClick={() => handleNavClick('help')}
                className={`hover:text-slate-900 transition-colors cursor-pointer ${
                  activeView === 'help' ? 'font-semibold text-emerald-700' : ''
                }`}
              >
                Qo‘llanma
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Apple-style Sidebar Link Component with SF Squircle Icons
interface AppleSidebarLinkProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  squircleColor: string;
  label: string;
  badge?: string;
}

const AppleSidebarLink: React.FC<AppleSidebarLinkProps> = ({
  active,
  onClick,
  icon,
  squircleColor,
  label,
  badge
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer group select-none ${
        active
          ? 'bg-slate-900 text-white font-semibold shadow-xs'
          : 'text-slate-700 hover:bg-black/[0.04] hover:text-slate-900 font-medium'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        {/* Apple Squircle Icon Box */}
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${
            active ? 'bg-white/20' : squircleColor
          }`}
        >
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: 'w-3.5 h-3.5 text-white'
          })}
        </div>

        <span className="truncate">{label}</span>
      </div>

      {badge && (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium tabular-nums ${
            active
              ? 'bg-white/20 text-white'
              : 'bg-black/[0.05] text-slate-500 group-hover:text-slate-700'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
};
