import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AchievementBadge,
  AuditLogItem,
  EcoDimensionScore,
  GradeLevel,
  Lesson,
  PracticalTask,
  ResearchStudy,
  StudyParticipant,
  TaskSubmission,
  User,
  UserRole
} from '../types/index.ts';
import {
  INITIAL_AUDIT_LOGS,
  INITIAL_BADGES,
  INITIAL_LESSONS,
  INITIAL_SUBMISSIONS,
  INITIAL_USERS,
  MOCK_PARTICIPANTS,
  PRACTICAL_TASKS,
  RESEARCH_STUDY
} from '../data/mockData.ts';
import { calculateCompositeEcoIndex, getEcoLevelLabel } from '../utils/ecoLogic.ts';

export type AppView =
  | 'landing'
  | 'student-home'
  | 'student-lessons'
  | 'student-games'
  | 'student-tasks'
  | 'student-ai'
  | 'student-progress'
  | 'student-badges'
  | 'teacher-dashboard'
  | 'teacher-classes'
  | 'teacher-submissions'
  | 'teacher-ai-planner'
  | 'teacher-reports'
  | 'research-overview'
  | 'research-analytics'
  | 'research-export'
  | 'admin-users'
  | 'admin-content'
  | 'admin-ai-settings'
  | 'admin-audit'
  | 'parent-portal'
  | 'privacy'
  | 'help';

interface GardenState {
  stage: number; // 1 to 5
  waterCount: number;
  flowersCount: number;
  healthyTrees: number;
}

interface AppContextType {
  currentUser: User;
  users: User[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedGrade: GradeLevel;
  setSelectedGrade: (grade: GradeLevel) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  tasks: PracticalTask[];
  submissions: TaskSubmission[];
  badges: AchievementBadge[];
  study: ResearchStudy;
  participants: StudyParticipant[];
  auditLogs: AuditLogItem[];
  
  gardenState: GardenState;
  waterGarden: () => void;
  plantFlower: () => void;
  
  studentDimensionScores: EcoDimensionScore[];
  studentOverallScore: number;
  
  submitTaskWork: (taskId: string, notes: string, evidenceType: string) => void;
  gradeSubmission: (subId: string, score: number, feedback: string) => void;
  toggleLessonPublished: (lessonId: string) => void;
  addAuditLog: (action: string, resourceType: string, resourceId: string, result: 'SUCCESS' | 'DENIED' | 'FLAGGED', details: string) => void;
  awardStars: (amount: number, reason: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentRole, setCurrentRoleState] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(3);
  const [activeView, setActiveView] = useState<AppView>('student-home');

  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [tasks] = useState<PracticalTask[]>(PRACTICAL_TASKS);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(INITIAL_SUBMISSIONS);
  const [badges, setBadges] = useState<AchievementBadge[]>(INITIAL_BADGES);
  const [study] = useState<ResearchStudy>(RESEARCH_STUDY);
  const [participants, setParticipants] = useState<StudyParticipant[]>(MOCK_PARTICIPANTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  const [gardenState, setGardenState] = useState<GardenState>({
    stage: 3,
    waterCount: 18,
    flowersCount: 4,
    healthyTrees: 2
  });

  // Calculate 4-dimension score for Ali Valiyev (current student)
  const studentDimensionScores: EcoDimensionScore[] = [
    {
      dimension: 'knowledge',
      titleUz: '1. Ekologik bilim',
      score: 85,
      maxScore: 100,
      level: "Yuqori (Nazariy tushunchalar mustahkam)"
    },
    {
      dimension: 'attitude',
      titleUz: '2. Ekologik munosabat',
      score: 90,
      maxScore: 100,
      level: "Yetakchi (Tabiatga g'amxo'r va mas'uliyatli)"
    },
    {
      dimension: 'skill',
      titleUz: "3. Amaliy ko'nikma",
      score: 80,
      maxScore: 100,
      level: "Yuqori (Saralash va parvarish ko'nikmalari)"
    },
    {
      dimension: 'behavior',
      titleUz: '4. Ekologik xulq-atvor',
      score: 85,
      maxScore: 100,
      level: "Yuqori (Kundalik odatlarda suv va energiyani tejash)"
    }
  ];

  const studentOverallScore = calculateCompositeEcoIndex({
    knowledge: 85,
    attitude: 90,
    skill: 80,
    behavior: 85
  });

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    const matchedUser = users.find(u => u.role === role) || users[0];
    setCurrentUser(matchedUser);

    if (role === 'student') {
      if (matchedUser.gradeLevel) {
        setSelectedGrade(matchedUser.gradeLevel);
      }
      setActiveView('student-home');
    } else if (role === 'teacher') {
      setActiveView('teacher-dashboard');
    } else if (role === 'researcher') {
      setActiveView('research-overview');
    } else if (role === 'admin') {
      setActiveView('admin-users');
    } else if (role === 'parent') {
      setActiveView('parent-portal');
    }
  };

  const addAuditLog = (
    action: string,
    resourceType: string,
    resourceId: string,
    result: 'SUCCESS' | 'DENIED' | 'FLAGGED',
    details: string
  ) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now().toString().slice(-4)}`,
      actorName: currentUser.displayName,
      actorRole: currentRole,
      action,
      resourceType,
      resourceId,
      eventTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      result,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const awardStars = (amount: number, reason: string) => {
    setCurrentUser(prev => ({
      ...prev,
      stars: (prev.stars || 0) + amount
    }));
    addAuditLog('AWARD_STARS', 'gamification', currentUser.id, 'SUCCESS', `+${amount} yulduz berildi: ${reason}`);
  };

  const waterGarden = () => {
    setGardenState(prev => {
      const newWater = prev.waterCount + 1;
      const newStage = Math.min(5, Math.floor(newWater / 5) + 1);
      return {
        ...prev,
        waterCount: newWater,
        stage: newStage
      };
    });
    awardStars(5, "Virtual bog'ga suv quyildi 💧");
  };

  const plantFlower = () => {
    setGardenState(prev => ({
      ...prev,
      flowersCount: prev.flowersCount + 1,
      healthyTrees: prev.healthyTrees + 1
    }));
    awardStars(10, "Yangi gul ekildi 🌸");
  };

  const submitTaskWork = (taskId: string, notes: string, evidenceType: string) => {
    const task = tasks.find(t => t.id === taskId);
    const newSub: TaskSubmission = {
      id: `sub-${Date.now().toString().slice(-4)}`,
      taskId,
      taskTitle: task ? task.title : 'Amaliy vazifa',
      studentId: currentUser.id,
      studentName: currentUser.displayName,
      className: currentUser.className || '3-A sinf',
      submittedAt: 'Hozirgina',
      notes,
      evidenceType,
      status: 'pending'
    };

    setSubmissions(prev => [newSub, ...prev]);
    awardStars(20, `Vazifa topshirildi: ${newSub.taskTitle}`);
    addAuditLog('SUBMIT_TASK', 'submission', newSub.id, 'SUCCESS', `O'quvchi vazifa javobini yubordi.`);
  };

  const gradeSubmission = (subId: string, score: number, feedback: string) => {
    const rubricMap: Record<number, string> = {
      0: "0 — hali namoyon bo'lmadi",
      1: "1 — yordam bilan",
      2: "2 — mustaqil bajaradi",
      3: "3 — qo'llaydi va izohlaydi"
    };

    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === subId) {
          return {
            ...sub,
            status: 'graded',
            score,
            rubricLevel: rubricMap[score] || '2 — mustaqil bajaradi',
            feedback,
            gradedBy: currentUser.displayName
          };
        }
        return sub;
      })
    );

    addAuditLog(
      'GRADE_SUBMISSION',
      'submission',
      subId,
      'SUCCESS',
      `O'qituvchi ${currentUser.displayName} rubrika bo'yicha ${score} ball qo'ydi.`
    );
  };

  const toggleLessonPublished = (lessonId: string) => {
    setLessons(prev =>
      prev.map(l => {
        if (l.id === lessonId) {
          const nextStatus = l.status === 'published' ? 'review' : 'published';
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
    addAuditLog('UPDATE_LESSON_STATUS', 'lesson', lessonId, 'SUCCESS', 'Dars nashr holati yangilandi.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        currentRole,
        setCurrentRole,
        selectedGrade,
        setSelectedGrade,
        activeView,
        setActiveView,
        lessons,
        setLessons,
        tasks,
        submissions,
        badges,
        study,
        participants,
        auditLogs,
        gardenState,
        waterGarden,
        plantFlower,
        studentDimensionScores,
        studentOverallScore,
        submitTaskWork,
        gradeSubmission,
        toggleLessonPublished,
        addAuditLog,
        awardStars
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
