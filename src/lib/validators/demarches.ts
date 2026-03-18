import { z } from "zod";

const taskCategories = [
  "grossesse",
  "naissance",
  "garde",
  "scolarite",
  "fiscal",
  "caf",
  "sante",
  "identite",
  "autre",
] as const;

const taskPriorities = ["low", "normal", "high", "urgent"] as const;

export const administrativeTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .max(200, "Maximum 200 caractères"),
  description: z.string().max(1000, "Maximum 1000 caractères").nullable().default(null),
  category: z.enum(taskCategories, {
    required_error: "La catégorie est requise",
  }),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (AAAA-MM-JJ)")
    .nullable()
    .default(null),
  memberId: z.string().uuid("Membre invalide").nullable().default(null),
  priority: z.enum(taskPriorities).default("normal"),
  url: z.string().url("URL invalide").nullable().default(null),
  completed: z.boolean().default(false),
});

export type AdministrativeTaskFormData = z.infer<typeof administrativeTaskSchema>;
