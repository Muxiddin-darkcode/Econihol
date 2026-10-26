export type UserRole = 'student' | 'teacher' | 'researcher' | 'admin' | 'parent';

export type GradeLevel = 1 | 2 | 3 | 4;

export interface User {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  gradeLevel?: GradeLevel;
  className?: string; // e.g., "3-«A» sinf"
  schoolName: string;
  avatar: string;
  stars?: number;
  completedLessonsCount?: number;
  studentId?: string; // e.g., "UZ-EDU-2024-84920"
  shift?: string; // e.g., "1-smena"
  advisorName?: string; // e.g., "Dilnoza Karimova"
  position?: string; // e.g., "Boshlang'ich sinf oliy toifali o'qituvchisi"
  assignedClasses?: string[]; // e.g., ["1-A", "2-B", "3-A", "4-A"]
}

export type EcoDimension = 'knowledge' | 'attitude' | 'skill' | 'behavior';

export interface EcoDimensionScore {
  dimension: EcoDimension;
  titleUz: string;
  score: number; // 0 - 100
  maxScore: number;
  level: string; // "Boshlang'ich" | "O'rta" | "Yuqori" | "Yetakchi"
}

export interface Lesson {
  id: string;
  gradeLevel: GradeLevel;
  topicCode: string;
  title: string;
  subject: string; // "Tabiiy fanlar"
  durationMinutes: number;
  objectives: string[];
  coverEmoji: string;
  coverImage?: string;
  themeColor: string;
  summary: string;
  storyContent: string;
  glossary: { term: string; definition: string }[];
  reflectionQuestion: string;
  interactiveCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  status: 'draft' | 'review' | 'published';
  author: string;
  expertReviewer: string;
  version: string;
}

export type WasteCategory = 'plastic' | 'organic' | 'paper' | 'glass' | 'hazardous';

export interface WasteItem {
  id: string;
  name: string;
  nameUz: string;
  category: WasteCategory;
  emoji: string;
  imageUrl?: string;
  decompositionYears: string;
  tipUz: string;
}

export interface PracticalTask {
  id: string;
  gradeLevel: GradeLevel;
  title: string;
  category: string;
  shortDesc: string;
  instructions: string[];
  verificationType: 'photo_or_notes' | 'checklist' | 'journal';
  rubricCriteria: string;
  dueDays: number;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  studentId: string;
  studentName: string;
  className: string;
  submittedAt: string;
  notes: string;
  evidenceType: string;
  evidenceUrl?: string;
  status: 'pending' | 'graded';
  score?: number; // 0, 1, 2, 3
  rubricLevel?: string;
  feedback?: string;
  gradedBy?: string;
}

export interface RubricLevel {
  score: number; // 0, 1, 2, 3
  labelUz: string;
  descriptionUz: string;
  concreteExampleUz: string;
}

export interface ResearchStudy {
  id: string;
  title: string;
  protocolVersion: string;
  approvedDate: string;
  targetGrades: string;
  sampleSize: number;
  experimentalCount: number;
  controlCount: number;
  status: 'active' | 'completed';
  hypothesis: string;
  t0Date: string;
  t1Date: string;
}

export interface StudyParticipant {
  participantCode: string; // e.g. "P-042"
  groupType: 'experimental' | 'control';
  gradeLevel: GradeLevel;
  t0Knowledge: number;
  t0Attitude: number;
  t0Skill: number;
  t0Behavior: number;
  t1Knowledge: number;
  t1Attitude: number;
  t1Skill: number;
  t1Behavior: number;
  overallT0: number;
  overallT1: number;
}

export type BadgeCategory = 'water' | 'waste' | 'plants' | 'planet' | 'habits';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'emerald';

export interface AchievementBadge {
  id: string;
  code: string;
  title: string;
  description: string;
  category: BadgeCategory;
  tier: BadgeTier;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  currentProgress: number;
  targetProgress: number;
  unit: string;
  starReward: number;
  actionTargetView?: string;
  actionLabelUz?: string;
  ecoLoreUz: string;
}

export interface AuditLogItem {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  resourceType: string;
  resourceId: string;
  eventTime: string;
  result: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  details: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  safetyFlag?: boolean;
}
