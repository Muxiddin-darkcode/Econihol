import type { EcoDimension, RubricLevel, WasteCategory } from '../types/index.ts';

/**
 * Standard 0-3 Rubric Definition from Eco Nihol Specification (Section 6.1)
 */
export const STANDARD_ECO_RUBRICS: RubricLevel[] = [
  {
    score: 0,
    labelUz: "Hali namoyon bo'lmadi",
    descriptionUz: "Vazifani bajarmadi yoki asosiy harakatni aniqlay olmadi.",
    concreteExampleUz: "Chiqindilarni saralashga mos idishni tanlay olmadi yoki vazifaga kirishmadi."
  },
  {
    score: 1,
    labelUz: "Yordam bilan",
    descriptionUz: "Ko'rsatma yoki eslatma bilan qisman bajardi.",
    concreteExampleUz: "Bir necha chiqindini o'qituvchi/maslahatchi yordami bilan saraladi."
  },
  {
    score: 2,
    labelUz: "Mustaqil bajaradi",
    descriptionUz: "Vazifani to'g'ri va mustaqil bajaradi.",
    concreteExampleUz: "Berilgan namunadagi chiqindilarni to'g'ri idishlarga xatosiz joyladi."
  },
  {
    score: 3,
    labelUz: "Qo'llaydi va izohlaydi",
    descriptionUz: "Mustaqil bajaradi, sababini tushuntiradi yoki yangi vaziyatga ko'chiradi.",
    concreteExampleUz: "Tanlovini izohlab berdi, boshqa yangi misolda ham saralashni to'g'ri qo'lladi."
  }
];

export function getRubricLevel(score: number): RubricLevel {
  const boundedScore = Math.max(0, Math.min(3, Math.round(score)));
  return STANDARD_ECO_RUBRICS.find(r => r.score === boundedScore) || STANDARD_ECO_RUBRICS[0];
}

/**
 * Calculates Composite Ecological Culture Score (0 - 100)
 * Weighted across 4 core dimensions:
 * - Knowledge (Bilim): 25%
 * - Attitude (Munosabat): 25%
 * - Skill (Amaliy ko'nikma): 25%
 * - Behavior (Xulq-atvor): 25%
 */
export function calculateCompositeEcoIndex(scores: {
  knowledge: number;
  attitude: number;
  skill: number;
  behavior: number;
}): number {
  const k = Math.max(0, Math.min(100, scores.knowledge));
  const a = Math.max(0, Math.min(100, scores.attitude));
  const s = Math.max(0, Math.min(100, scores.skill));
  const b = Math.max(0, Math.min(100, scores.behavior));
  return Math.round((k + a + s + b) / 4);
}

export function getEcoLevelLabel(score: number): { level: string; color: string; badge: string } {
  if (score >= 85) {
    return { level: "Yetakchi (Tabiat Posboni)", color: "text-emerald-700 bg-emerald-100", badge: "🌟 A'lo" };
  } else if (score >= 70) {
    return { level: "Yuqori (Faol Himoyachi)", color: "text-teal-700 bg-teal-100", badge: "🌿 Yaxshi" };
  } else if (score >= 50) {
    return { level: "O'rta (Qiziquvchan O'quvchi)", color: "text-amber-700 bg-amber-100", badge: "🌱 O'rta" };
  } else {
    return { level: "Boshlang'ich (Shakllanmoqda)", color: "text-blue-700 bg-blue-100", badge: "💧 Yangi" };
  }
}

/**
 * Waste Sorting Rules Engine
 */
export function validateWasteSorting(itemCategory: WasteCategory, targetBin: WasteCategory): {
  isCorrect: boolean;
  messageUz: string;
} {
  if (itemCategory === targetBin) {
    return {
      isCorrect: true,
      messageUz: "To'ppa-to'g'ri! Ushbu chiqindi aynan shu idishga tashlanishi kerak."
    };
  }

  const categoryNamesUz: Record<WasteCategory, string> = {
    plastic: "Plastik",
    organic: "Organik (oziq-ovqat)",
    paper: "Qog'oz",
    glass: "Shisha",
    hazardous: "Xavfli chiqindi (Batareya/elektronika)"
  };

  return {
    isCorrect: false,
    messageUz: `Noto'g'ri idish. Bu chiqindi "${categoryNamesUz[itemCategory]}" idishiga solinishi kerak edi.`
  };
}

/**
 * Statistical calculations for Scientific Research (Section 13)
 */
export function calculateMean(values: number[]): number {
  if (!values.length) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return Number((sum / values.length).toFixed(2));
}

export function calculateStdDev(values: number[]): number {
  if (values.length <= 1) return 0;
  const mean = calculateMean(values);
  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (values.length - 1);
  return Number(Math.sqrt(variance).toFixed(2));
}

/**
 * Cohen's d effect size for comparing experimental vs control groups or T0 vs T1:
 * d = (mean1 - mean2) / pooled_std_dev
 */
export function calculateCohenD(group1: number[], group2: number[]): number {
  if (!group1.length || !group2.length) return 0;
  const mean1 = calculateMean(group1);
  const mean2 = calculateMean(group2);
  const s1 = calculateStdDev(group1);
  const s2 = calculateStdDev(group2);

  const n1 = group1.length;
  const n2 = group2.length;
  if (n1 + n2 <= 2) return 0;

  const pooledVariance = ((n1 - 1) * Math.pow(s1, 2) + (n2 - 1) * Math.pow(s2, 2)) / (n1 + n2 - 2);
  const pooledStdDev = Math.sqrt(pooledVariance);

  if (pooledStdDev === 0) return 0;
  return Number(((mean1 - mean2) / pooledStdDev).toFixed(2));
}

/**
 * Child AI Safety Guardrail (Section 9.4 and UNICEF Guidelines)
 * Scans input text for sensitive personal data (phone numbers, addresses, passwords)
 * or non-ecological off-topic attempts.
 */
export function sanitizeChildAiPrompt(input: string): {
  isSafe: boolean;
  warningUz?: string;
  sanitizedText: string;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isSafe: false, warningUz: "Iltimos, ekologiya haqida savolingizni yozing.", sanitizedText: "" };
  }

  // Check for telephone numbers (e.g. +998901234567, 90 123 45 67)
  const phoneRegex = /(?:\+?998[\s-]?)?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/;
  if (phoneRegex.test(trimmed)) {
    return {
      isSafe: false,
      warningUz: "Xavfsizlik eslatmasi: O'z telefon raqamingiz yoki shaxsiy ma'lumotlaringizni yozmang! Tabiat va ekologiya haqida so'rang.",
      sanitizedText: "[REDACTED PHONE NUMBER]"
    };
  }

  // Check for address / location queries asking for home address
  const addressKeywords = ["uyimning manzili", "manzilim", "qayerda yashaysan", "parol", "familyam", "telefonim"];
  const lower = trimmed.toLowerCase();
  for (const kw of addressKeywords) {
    if (lower.includes(kw)) {
      return {
        isSafe: false,
        warningUz: "EkoDo'st sizning shaxsiy ma'lumotingizni so'ramaydi va saqlamaydi. Faqat tabiiy fanlar va atrof-muhit haqida savol bering.",
        sanitizedText: "[REDACTED PERSONAL QUERY]"
      };
    }
  }

  return {
    isSafe: true,
    sanitizedText: trimmed
  };
}

/**
 * Calculates badge completion percentage
 */
export function calculateBadgePercentage(current: number, target: number): number {
  if (target <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}

/**
 * Tier styling and Uzbek labels for Achievement Badges
 */
export function getBadgeTierDetails(tier: 'bronze' | 'silver' | 'gold' | 'emerald'): {
  labelUz: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
} {
  switch (tier) {
    case 'emerald':
      return {
        labelUz: 'Zumrad (Oliy)',
        badgeBg: 'bg-emerald-500/20 text-emerald-400',
        textColor: 'text-emerald-800',
        borderColor: 'border-emerald-500',
        glowColor: 'shadow-emerald-500/20'
      };
    case 'gold':
      return {
        labelUz: 'Oltin (Usta)',
        badgeBg: 'bg-amber-500/20 text-amber-400',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-400',
        glowColor: 'shadow-amber-500/20'
      };
    case 'silver':
      return {
        labelUz: 'Kumush (Faol)',
        badgeBg: 'bg-slate-300/30 text-slate-300',
        textColor: 'text-slate-800',
        borderColor: 'border-slate-400',
        glowColor: 'shadow-slate-400/20'
      };
    case 'bronze':
    default:
      return {
        labelUz: 'Bronza (Boshlang‘ich)',
        badgeBg: 'bg-orange-600/20 text-orange-400',
        textColor: 'text-orange-900',
        borderColor: 'border-orange-400',
        glowColor: 'shadow-orange-500/10'
      };
  }
}

/**
 * Calculates overall Student Ecological Milestone Rank
 */
export function getStudentMilestoneRank(earnedCount: number, totalCount: number): {
  rankLevel: number;
  rankTitleUz: string;
  nextThreshold: number;
  progressPercent: number;
  icon: string;
  diplomaUz: string;
} {
  const percent = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

  if (earnedCount >= 10) {
    return {
      rankLevel: 4,
      rankTitleUz: "Sayyora Qahramoni (Master Defender)",
      nextThreshold: 12,
      progressPercent: percent,
      icon: "🌍",
      diplomaUz: "Oliy Darajali 'Ona Tabiat Posboni' Milliy Diplomi"
    };
  } else if (earnedCount >= 7) {
    return {
      rankLevel: 3,
      rankTitleUz: "Yashil Sayyora Posboni",
      nextThreshold: 10,
      progressPercent: percent,
      icon: "🌳",
      diplomaUz: "'Ekologik Yetakchi O‘quvchi' Faxriy Sertifikati"
    };
  } else if (earnedCount >= 4) {
    return {
      rankLevel: 2,
      rankTitleUz: "Faol Tabiatshunos Izquvar",
      nextThreshold: 7,
      progressPercent: percent,
      icon: "🌱",
      diplomaUz: "'Faol Ekolog' Yoshlar Shahodatnomasi"
    };
  } else {
    return {
      rankLevel: 1,
      rankTitleUz: "Yosh Tabiat Do‘sti (Boshlang‘ich)",
      nextThreshold: 4,
      progressPercent: percent,
      icon: "💧",
      diplomaUz: "'Tabiatga Birinchi Qadam' Rag‘bat Qog‘ozi"
    };
  }
}
