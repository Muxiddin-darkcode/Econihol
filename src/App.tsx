import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';

// Public Views
import { LandingPage } from './components/public/LandingPage.tsx';
import { PrivacyPolicyModal } from './components/public/PrivacyPolicyModal.tsx';
import { MethodologyHelpModal } from './components/public/MethodologyHelpModal.tsx';

// Student Views
import { StudentHome } from './components/student/StudentHome.tsx';
import { StudentLessons } from './components/student/StudentLessons.tsx';
import { StudentGames } from './components/student/StudentGames.tsx';
import { StudentTasks } from './components/student/StudentTasks.tsx';
import { StudentAiChat } from './components/student/StudentAiChat.tsx';
import { StudentProgress } from './components/student/StudentProgress.tsx';
import { BadgeAchievementSystem } from './components/student/BadgeAchievementSystem.tsx';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard.tsx';
import { ClassManagement } from './components/teacher/ClassManagement.tsx';
import { TeacherSubmissions } from './components/teacher/TeacherSubmissions.tsx';
import { TeacherAiPlanner } from './components/teacher/TeacherAiPlanner.tsx';
import { TeacherReports } from './components/teacher/TeacherReports.tsx';

// Researcher Views
import { ResearchOverview } from './components/researcher/ResearchOverview.tsx';
import { ResearchAnalytics } from './components/researcher/ResearchAnalytics.tsx';
import { ResearchExport } from './components/researcher/ResearchExport.tsx';

// Admin Views
import { AdminUsers } from './components/admin/AdminUsers.tsx';
import { AdminContent } from './components/admin/AdminContent.tsx';
import { AdminAiSettings } from './components/admin/AdminAiSettings.tsx';
import { AdminAuditLogs } from './components/admin/AdminAuditLogs.tsx';

// Parent View
import { ParentPortal } from './components/parent/ParentPortal.tsx';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <AppLayout>
      {activeView === 'landing' && <LandingPage />}
      {activeView === 'privacy' && <PrivacyPolicyModal />}
      {activeView === 'help' && <MethodologyHelpModal />}

      {/* Student Views */}
      {activeView === 'student-home' && <StudentHome />}
      {activeView === 'student-lessons' && <StudentLessons />}
      {activeView === 'student-games' && <StudentGames />}
      {activeView === 'student-tasks' && <StudentTasks />}
      {activeView === 'student-ai' && <StudentAiChat />}
      {activeView === 'student-progress' && <StudentProgress />}
      {activeView === 'student-badges' && <BadgeAchievementSystem />}

      {/* Teacher Views */}
      {activeView === 'teacher-dashboard' && <TeacherDashboard />}
      {activeView === 'teacher-classes' && <ClassManagement />}
      {activeView === 'teacher-submissions' && <TeacherSubmissions />}
      {activeView === 'teacher-ai-planner' && <TeacherAiPlanner />}
      {activeView === 'teacher-reports' && <TeacherReports />}

      {/* Researcher Views */}
      {activeView === 'research-overview' && <ResearchOverview />}
      {activeView === 'research-analytics' && <ResearchAnalytics />}
      {activeView === 'research-export' && <ResearchExport />}

      {/* Admin Views */}
      {activeView === 'admin-users' && <AdminUsers />}
      {activeView === 'admin-content' && <AdminContent />}
      {activeView === 'admin-ai-settings' && <AdminAiSettings />}
      {activeView === 'admin-audit' && <AdminAuditLogs />}

      {/* Parent View */}
      {activeView === 'parent-portal' && <ParentPortal />}
    </AppLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
