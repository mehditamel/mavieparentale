import { z } from "zod";

export const taxSimulationSchema = z.object({
  revenuNetImposable: z
    .number({ required_error: "Le revenu net imposable est requis" })
    .min(0, "Le revenu ne peut pas être négatif"),
  nbParts: z
    .number({ required_error: "Le nombre de parts est requis" })
    .min(1, "Minimum 1 part")
    .max(20, "Maximum 20 parts"),
  numChildren: z
    .number()
    .int("Nombre entier requis")
    .min(0, "Minimum 0")
    .default(0),
  gardeEnfantExpenses: z
    .number()
    .min(0, "Montant positif requis")
    .default(0),
  emploiDomicileExpenses: z
    .number()
    .min(0, "Montant positif requis")
    .default(0),
  donsOrganismes: z
    .number()
    .min(0, "Montant positif requis")
    .default(0),
  donsAidePersonnes: z
    .number()
    .min(0, "Montant positif requis")
    .default(0),
});

export type TaxSimulationFormData = z.infer<typeof taxSimulationSchema>;

export const fiscalYearSaveSchema = z.object({
  year: z.number().int().min(2020).max(2030),
  nbParts: z.number().min(1).max(20),
  revenuNetImposable: z.number().min(0),
  impotBrut: z.number().min(0),
  creditsImpot: z.record(z.string(), z.number()),
  impotNet: z.number().min(0),
  tmi: z.number().min(0).max(45),
  tauxEffectif: z.number().min(0).max(100),
  notes: z.string().max(500).optional(),
});

export type FiscalYearSaveData = z.infer<typeof fiscalYearSaveSchema>;
