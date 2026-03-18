export type ChildcareStructureType =
  | "creche"
  | "micro_creche"
  | "assistante_maternelle"
  | "mam"
  | "accueil_loisirs"
  | "relais_pe";

export type FavoriteStatus =
  | "shortlisted"
  | "contacted"
  | "visited"
  | "enrolled"
  | "rejected";

export interface ChildcareStructure {
  id: string;
  externalId: string | null;
  name: string;
  structureType: ChildcareStructureType;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  capacity: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hourlyRate: number | null;
  openingHours: Record<string, string> | null;
  activities: string[];
  rating: number | null;
  lastUpdated: string;
  createdAt: string;
}

export interface ChildcareFavorite {
  id: string;
  householdId: string;
  structureId: string;
  notes: string | null;
  status: FavoriteStatus;
  createdAt: string;
  structure?: ChildcareStructure;
}

export interface GardeCostSimulationInput {
  modeGarde: "creche" | "assistante_maternelle" | "garde_domicile";
  coutMensuelBrut: number;
  revenuAnnuel: number;
  nbEnfantsGardes: number;
}

export interface GardeCostSimulationResult {
  coutBrut: number;
  cmg: number;
  creditImpotMensuel: number;
  resteACharge: number;
  details: GardeCostDetail[];
}

export interface GardeCostDetail {
  label: string;
  montant: number;
  description: string;
}

export const STRUCTURE_TYPE_LABELS: Record<ChildcareStructureType, string> = {
  creche: "Cr\u00e8che",
  micro_creche: "Micro-cr\u00e8che",
  assistante_maternelle: "Assistante maternelle",
  mam: "MAM",
  accueil_loisirs: "Accueil de loisirs",
  relais_pe: "Relais petite enfance",
};

export const STRUCTURE_TYPE_COLORS: Record<ChildcareStructureType, string> = {
  creche: "#4A7BE8",
  micro_creche: "#2BA89E",
  assistante_maternelle: "#E8734A",
  mam: "#7B5EA7",
  accueil_loisirs: "#D4A843",
  relais_pe: "#4CAF50",
};

export const FAVORITE_STATUS_LABELS: Record<FavoriteStatus, string> = {
  shortlisted: "Pr\u00e9s\u00e9lectionn\u00e9",
  contacted: "Contact\u00e9",
  visited: "Visit\u00e9",
  enrolled: "Inscrit",
  rejected: "Refus\u00e9",
};

export const FAVORITE_STATUS_COLORS: Record<FavoriteStatus, string> = {
  shortlisted: "#4A7BE8",
  contacted: "#D4A843",
  visited: "#7B5EA7",
  enrolled: "#4CAF50",
  rejected: "#E8534A",
};

export const MODE_GARDE_OPTIONS = [
  { value: "creche" as const, label: "Cr\u00e8che / Micro-cr\u00e8che" },
  { value: "assistante_maternelle" as const, label: "Assistante maternelle" },
  { value: "garde_domicile" as const, label: "Garde \u00e0 domicile" },
] as const;
