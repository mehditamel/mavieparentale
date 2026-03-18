// Re-export types shared with health module
export type { MilestoneCategory, Mood, DevelopmentMilestone, ParentJournalEntry } from "./health";
export { MILESTONE_CATEGORY_LABELS, MOOD_LABELS } from "./health";

// Activity types
export type ActivityCategory = "sport" | "musique" | "art" | "langue" | "eveil" | "nature" | "autre";

export interface Activity {
  id: string;
  memberId: string;
  name: string;
  category: string | null;
  provider: string | null;
  schedule: string | null;
  costMonthly: number | null;
  startDate: string | null;
  endDate: string | null;
  active: boolean;
  notes: string | null;
  createdAt: string;
}

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  sport: "Sport",
  musique: "Musique",
  art: "Art",
  langue: "Langue",
  eveil: "Éveil",
  nature: "Nature",
  autre: "Autre",
};

// Schooling types
export type SchoolingLevel =
  | "creche"
  | "tps"
  | "ps"
  | "ms"
  | "gs"
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6eme"
  | "5eme"
  | "4eme"
  | "3eme"
  | "seconde"
  | "premiere"
  | "terminale";

export interface Schooling {
  id: string;
  memberId: string;
  schoolYear: string;
  level: string;
  establishment: string | null;
  teacher: string | null;
  className: string | null;
  notes: string | null;
  createdAt: string;
}

export const SCHOOLING_LEVEL_LABELS: Record<SchoolingLevel, string> = {
  creche: "Crèche",
  tps: "TPS (Toute Petite Section)",
  ps: "PS (Petite Section)",
  ms: "MS (Moyenne Section)",
  gs: "GS (Grande Section)",
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
  cm1: "CM1",
  cm2: "CM2",
  "6eme": "6ème",
  "5eme": "5ème",
  "4eme": "4ème",
  "3eme": "3ème",
  seconde: "Seconde",
  premiere: "Première",
  terminale: "Terminale",
};

export const SCHOOLING_LEVELS_ORDERED: SchoolingLevel[] = [
  "creche",
  "tps",
  "ps",
  "ms",
  "gs",
  "cp",
  "ce1",
  "ce2",
  "cm1",
  "cm2",
  "6eme",
  "5eme",
  "4eme",
  "3eme",
  "seconde",
  "premiere",
  "terminale",
];

// Age at which each level typically starts (in years, September of that year)
export const SCHOOLING_LEVEL_START_AGE: Record<SchoolingLevel, number> = {
  creche: 0,
  tps: 2,
  ps: 3,
  ms: 4,
  gs: 5,
  cp: 6,
  ce1: 7,
  ce2: 8,
  cm1: 9,
  cm2: 10,
  "6eme": 11,
  "5eme": 12,
  "4eme": 13,
  "3eme": 14,
  seconde: 15,
  premiere: 16,
  terminale: 17,
};
