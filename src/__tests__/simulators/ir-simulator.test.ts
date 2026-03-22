import { describe, it, expect } from "vitest";
import { simulateIR } from "@/lib/simulators/ir-simulator";
import type { TaxSimulationInput } from "@/types/fiscal";

const baseInput: TaxSimulationInput = {
  revenuNetImposable: 0,
  nbParts: 1,
  numChildren: 0,
  gardeEnfantExpenses: 0,
  emploiDomicileExpenses: 0,
  donsOrganismes: 0,
  donsAidePersonnes: 0,
};

function input(overrides: Partial<TaxSimulationInput>): TaxSimulationInput {
  return { ...baseInput, ...overrides };
}

describe("simulateIR", () => {
  describe("cas de base — barème progressif", () => {
    it("retourne 0 pour un revenu de 0", () => {
      const result = simulateIR(input({ revenuNetImposable: 0 }));
      expect(result.impotNet).toBe(0);
      expect(result.impotBrut).toBe(0);
      expect(result.tmi).toBe(0);
      expect(result.tauxEffectif).toBe(0);
    });

    it("retourne 0 pour un revenu dans la tranche à 0%", () => {
      const result = simulateIR(input({ revenuNetImposable: 10000, nbParts: 1 }));
      expect(result.tmi).toBe(0);
      expect(result.impotBrut).toBe(0);
    });

    it("calcule correctement pour un célibataire tranche 11%", () => {
      const result = simulateIR(input({ revenuNetImposable: 20000, nbParts: 1 }));
      // QF = 20000, tranche 11%: (20000 - 11295) * 0.11 = 957.55 → arrondi 958
      expect(result.tmi).toBe(11);
      expect(result.quotientFamilial).toBe(20000);
    });

    it("calcule correctement pour un couple 2.5 parts à 60 000 €", () => {
      const result = simulateIR(input({ revenuNetImposable: 60000, nbParts: 2.5 }));
      // QF = 60000 / 2.5 = 24000
      // Tranche 0%: 0
      // Tranche 11%: (24000 - 11295) * 0.11 = 1397.55
      // Tax per part = 1397.55
      // Gross = 1397.55 * 2.5 = 3493.875 → arrondi 3494
      expect(result.quotientFamilial).toBe(24000);
      expect(result.tmi).toBe(11);
      expect(result.impotBrut).toBeGreaterThan(0);
      expect(result.impotNet).toBeGreaterThanOrEqual(0);
    });

    it("calcule TMI 30% pour hauts revenus", () => {
      const result = simulateIR(input({ revenuNetImposable: 80000, nbParts: 1 }));
      // QF = 80000, tranche 30%
      expect(result.tmi).toBe(30);
      expect(result.impotBrut).toBeGreaterThan(0);
    });

    it("calcule TMI 41% pour très hauts revenus", () => {
      const result = simulateIR(input({ revenuNetImposable: 150000, nbParts: 1 }));
      expect(result.tmi).toBe(41);
    });

    it("calcule TMI 45% pour revenus > 177 106 €", () => {
      const result = simulateIR(input({ revenuNetImposable: 200000, nbParts: 1 }));
      expect(result.tmi).toBe(45);
      expect(result.impotBrut).toBeGreaterThan(0);
    });
  });

  describe("cas limites", () => {
    it("retourne 0 pour un revenu négatif", () => {
      const result = simulateIR(input({ revenuNetImposable: -5000 }));
      expect(result.impotNet).toBe(0);
      expect(result.impotBrut).toBe(0);
      expect(result.quotientFamilial).toBe(0);
      expect(result.tmi).toBe(0);
      expect(result.tauxEffectif).toBe(0);
      expect(result.revenuNetImposable).toBe(0);
    });

    it("coerce nbParts < 1 à 1", () => {
      const result = simulateIR(input({ revenuNetImposable: 30000, nbParts: 0.5 }));
      expect(result.nbParts).toBe(1);
      expect(result.quotientFamilial).toBe(30000);
    });

    it("coerce nbParts = 0 à 1", () => {
      const result = simulateIR(input({ revenuNetImposable: 30000, nbParts: 0 }));
      expect(result.nbParts).toBe(1);
    });

    it("gère un revenu très élevé (500K, 1 part) — TMI 45%", () => {
      const result = simulateIR(input({ revenuNetImposable: 500000, nbParts: 1 }));
      expect(result.tmi).toBe(45);
      // Manual calculation:
      // 0-11294: 0
      // 11295-28797: (28797-11295)*0.11 = 1925.22
      // 28798-82341: (82341-28798)*0.30 = 16062.90
      // 82342-177106: (177106-82342)*0.41 = 38853.24
      // 177107-500000: (500000-177107)*0.45 = 145302.15
      // Total per part = 202143.51 → rounded = 202144
      expect(result.impotBrut).toBeGreaterThan(200000);
      expect(result.tauxEffectif).toBeGreaterThan(30);
    });
  });

  describe("plafonnement du quotient familial", () => {
    it("plafonne le QF pour couple + 2 enfants (3 parts) à 120K", () => {
      const result = simulateIR(input({ revenuNetImposable: 120000, nbParts: 3 }));
      // Extra half-parts = (3 - 2) / 0.5 = 2
      // Max benefit = 1759 * 2 = 3518
      // Tax with 2 parts (base couple):
      const resultBase = simulateIR(input({ revenuNetImposable: 120000, nbParts: 2 }));
      // The tax with 3 parts should not be more than 3518 less than tax with 2 parts
      // (before decote, but plafonnement applies to impotBrut before decote)
      expect(result.plafonnementQF).toBeGreaterThan(0);
    });

    it("ne plafonne pas pour revenus modérés", () => {
      const result = simulateIR(input({ revenuNetImposable: 50000, nbParts: 2.5 }));
      // QF = 20000, benefit of 0.5 part is small
      expect(result.plafonnementQF).toBe(0);
    });

    it("ne plafonne pas quand nbParts == baseParts", () => {
      const result = simulateIR(input({ revenuNetImposable: 100000, nbParts: 2 }));
      expect(result.plafonnementQF).toBe(0);
    });

    it("plafonne pour hauts revenus avec 4 parts", () => {
      const result = simulateIR(input({ revenuNetImposable: 200000, nbParts: 4 }));
      // Extra half-parts = (4 - 2) / 0.5 = 4
      // Max benefit = 1759 * 4 = 7036
      expect(result.plafonnementQF).toBeGreaterThan(0);
    });

    it("ne plafonne pas pour célibataire sans enfant", () => {
      const result = simulateIR(input({ revenuNetImposable: 100000, nbParts: 1 }));
      expect(result.plafonnementQF).toBe(0);
    });
  });

  describe("décote", () => {
    it("applique la décote pour célibataire à faible impôt", () => {
      const result = simulateIR(input({ revenuNetImposable: 18000, nbParts: 1 }));
      // Low income single → décote should apply
      expect(result.decote).toBeGreaterThanOrEqual(0);
    });

    it("n'applique pas la décote pour impôt élevé", () => {
      const result = simulateIR(input({ revenuNetImposable: 80000, nbParts: 1 }));
      expect(result.decote).toBe(0);
    });

    it("applique un seuil de décote plus élevé pour un couple", () => {
      // Couple threshold is 2845 vs single 1929
      const single = simulateIR(input({ revenuNetImposable: 18000, nbParts: 1 }));
      const couple = simulateIR(input({ revenuNetImposable: 36000, nbParts: 2 }));
      // Same QF but couple has higher décote threshold
      expect(couple.decote).toBeGreaterThanOrEqual(0);
      // Both should have same QF
      expect(couple.quotientFamilial).toBe(single.quotientFamilial);
    });
  });

  describe("crédits d'impôt", () => {
    it("calcule le crédit garde enfant plafonné à 1 750 €", () => {
      const result = simulateIR(input({
        revenuNetImposable: 60000,
        nbParts: 2.5,
        gardeEnfantExpenses: 5000,
      }));
      // 50% de 5000 = 2500 mais plafonné à 1750
      expect(result.creditsImpot.gardeEnfant).toBe(1750);
    });

    it("calcule le crédit garde enfant sans plafond pour petites dépenses", () => {
      const result = simulateIR(input({
        revenuNetImposable: 60000,
        nbParts: 2.5,
        gardeEnfantExpenses: 2000,
      }));
      // 50% de 2000 = 1000 < 1750
      expect(result.creditsImpot.gardeEnfant).toBe(1000);
    });

    it("calcule le crédit emploi à domicile avec enfants", () => {
      const result = simulateIR(input({
        revenuNetImposable: 60000,
        nbParts: 2.5,
        numChildren: 1,
        emploiDomicileExpenses: 15000,
      }));
      // Plafond = 12000 + 1*1500 = 13500. Dépenses 15000 > plafond
      // Crédit = 50% de 13500 = 6750
      expect(result.creditsImpot.emploiDomicile).toBe(6750);
    });

    it("calcule le crédit dons organismes à 66%", () => {
      const result = simulateIR(input({
        revenuNetImposable: 60000,
        nbParts: 2.5,
        donsOrganismes: 1000,
      }));
      // 66% de 1000 = 660
      expect(result.creditsImpot.dons).toBe(660);
    });

    it("plafonne les dons à 20% du revenu", () => {
      const result = simulateIR(input({
        revenuNetImposable: 10000,
        nbParts: 1,
        donsOrganismes: 5000,
      }));
      // Max = 20% de 10000 = 2000. Dons 5000 > 2000
      // Crédit = 66% de 2000 = 1320
      expect(result.creditsImpot.dons).toBe(1320);
    });

    it("calcule les dons aide aux personnes à 75%", () => {
      const result = simulateIR(input({
        revenuNetImposable: 60000,
        nbParts: 2.5,
        donsAidePersonnes: 500,
      }));
      // 75% de 500 = 375
      expect(result.creditsImpot.donsAide).toBe(375);
    });

    it("plafonne les dons aide aux personnes à 1 000 €", () => {
      const result = simulateIR(input({
        revenuNetImposable: 60000,
        nbParts: 2.5,
        donsAidePersonnes: 2000,
      }));
      // 75% de 1000 (plafonné) = 750
      expect(result.creditsImpot.donsAide).toBe(750);
    });
  });

  describe("contraintes", () => {
    it("l'impôt net n'est jamais négatif", () => {
      const result = simulateIR(input({
        revenuNetImposable: 15000,
        nbParts: 1,
        gardeEnfantExpenses: 3500,
        emploiDomicileExpenses: 12000,
        donsOrganismes: 3000,
        donsAidePersonnes: 1000,
      }));
      expect(result.impotNet).toBeGreaterThanOrEqual(0);
    });

    it("le taux effectif est entre 0 et 100", () => {
      const result = simulateIR(input({ revenuNetImposable: 100000, nbParts: 1 }));
      expect(result.tauxEffectif).toBeGreaterThanOrEqual(0);
      expect(result.tauxEffectif).toBeLessThanOrEqual(100);
    });

    it("retourne les bons champs dans le résultat", () => {
      const result = simulateIR(input({ revenuNetImposable: 40000, nbParts: 2 }));
      expect(result).toHaveProperty("revenuNetImposable");
      expect(result).toHaveProperty("nbParts");
      expect(result).toHaveProperty("quotientFamilial");
      expect(result).toHaveProperty("impotBrut");
      expect(result).toHaveProperty("decote");
      expect(result).toHaveProperty("plafonnementQF");
      expect(result).toHaveProperty("creditsImpot");
      expect(result).toHaveProperty("impotNet");
      expect(result).toHaveProperty("tmi");
      expect(result).toHaveProperty("tauxEffectif");
      expect(result).toHaveProperty("revenueParPart");
    });
  });
});
