import { z } from "zod";

export const activitySchema = z.object({
  memberId: z.string().uuid("Membre invalide"),
  name: z.string().min(1, "Le nom est requis").max(100, "100 caractères maximum"),
  category: z.string().max(50, "50 caractères maximum").optional(),
  provider: z.string().max(100, "100 caractères maximum").optional(),
  schedule: z.string().max(200, "200 caractères maximum").optional(),
  costMonthly: z
    .union([z.number().min(0, "Le coût doit être positif"), z.nan()])
    .optional()
    .transform((v) => (Number.isNaN(v) ? undefined : v)),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional().default(true),
  notes: z.string().max(500, "500 caractères maximum").optional(),
});

export type ActivityFormData = z.infer<typeof activitySchema>;

export const schoolingSchema = z.object({
  memberId: z.string().uuid("Membre invalide"),
  schoolYear: z.string().min(1, "L'année scolaire est requise").max(20, "20 caractères maximum"),
  level: z.string().min(1, "Le niveau est requis"),
  establishment: z.string().max(200, "200 caractères maximum").optional(),
  teacher: z.string().max(100, "100 caractères maximum").optional(),
  className: z.string().max(50, "50 caractères maximum").optional(),
  notes: z.string().max(500, "500 caractères maximum").optional(),
});

export type SchoolingFormData = z.infer<typeof schoolingSchema>;

export const milestoneSchema = z.object({
  memberId: z.string().uuid("Membre invalide"),
  category: z.enum(["motricite", "langage", "cognition", "social", "autonomie"], {
    required_error: "La catégorie est requise",
  }),
  milestoneName: z.string().min(1, "Le nom du jalon est requis").max(200, "200 caractères maximum"),
  expectedAgeMonths: z
    .union([z.number().int().min(0, "L'âge doit être positif"), z.nan()])
    .optional()
    .transform((v) => (Number.isNaN(v) ? undefined : v)),
  achievedDate: z.string().optional(),
  notes: z.string().max(500, "500 caractères maximum").optional(),
});

export type MilestoneFormData = z.infer<typeof milestoneSchema>;

export const journalEntrySchema = z.object({
  memberId: z.string().uuid("Membre invalide"),
  entryDate: z.string().min(1, "La date est requise"),
  content: z.string().min(1, "Le contenu est requis").max(5000, "5000 caractères maximum"),
  mood: z.enum(["great", "good", "neutral", "difficult", "tough"]).optional(),
  tags: z.array(z.string().max(30, "30 caractères max par tag")).optional().default([]),
});

export type JournalEntryFormData = z.infer<typeof journalEntrySchema>;
