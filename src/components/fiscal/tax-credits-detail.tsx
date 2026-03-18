import { Baby, Home, Heart, HandHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TAX_CREDITS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { TaxSimulationResult } from "@/types/fiscal";

interface TaxCreditsDetailProps {
  result?: TaxSimulationResult | null;
}

const CREDIT_CARDS = [
  {
    key: "gardeEnfant" as const,
    title: "Garde d'enfant",
    icon: Baby,
    color: "text-accent-teal",
    bgColor: "bg-accent-teal/10",
    description: "Enfant de moins de 6 ans gardé hors du domicile (crèche, assistante maternelle, etc.)",
    rate: `${TAX_CREDITS.gardeEnfant.rate * 100}%`,
    maxExpenses: TAX_CREDITS.gardeEnfant.maxExpenses,
    maxCredit: TAX_CREDITS.gardeEnfant.maxCredit,
    conditions: [
      "Enfant à charge de moins de 6 ans au 1er janvier",
      "Garde hors du domicile uniquement",
      "Plafond de 3 500 € de dépenses par enfant",
    ],
  },
  {
    key: "emploiDomicile" as const,
    title: "Emploi à domicile",
    icon: Home,
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
    description: "Services à la personne : ménage, garde d'enfant à domicile, soutien scolaire, etc.",
    rate: `${TAX_CREDITS.emploiDomicile.rate * 100}%`,
    maxExpenses: TAX_CREDITS.emploiDomicile.maxExpenses,
    maxCredit: TAX_CREDITS.emploiDomicile.maxExpenses * TAX_CREDITS.emploiDomicile.rate,
    conditions: [
      `Plafond de ${formatCurrency(TAX_CREDITS.emploiDomicile.maxExpenses)} de dépenses`,
      `+ ${formatCurrency(TAX_CREDITS.emploiDomicile.extraPerChild)} par enfant à charge`,
      "Applicable que vous soyez employeur ou client d'un organisme",
    ],
  },
  {
    key: "dons" as const,
    title: "Dons aux organismes",
    icon: Heart,
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    description: "Dons aux associations, fondations ou organismes d'intérêt général.",
    rate: `${TAX_CREDITS.donsOrganismes.rate * 100}%`,
    maxExpenses: null,
    maxCredit: null,
    conditions: [
      `Réduction de ${TAX_CREDITS.donsOrganismes.rate * 100}% du montant des dons`,
      `Plafond : ${TAX_CREDITS.donsOrganismes.maxRateOfIncome * 100}% du revenu imposable`,
      "Reçu fiscal obligatoire",
    ],
  },
  {
    key: "donsAide" as const,
    title: "Dons aide aux personnes",
    icon: HandHeart,
    color: "text-accent-warm",
    bgColor: "bg-accent-warm/10",
    description: "Dons aux organismes d'aide aux personnes en difficulté (Restos du Cœur, Secours populaire, etc.)",
    rate: `${TAX_CREDITS.donsAidePersonnes.rate * 100}%`,
    maxExpenses: TAX_CREDITS.donsAidePersonnes.maxAmount,
    maxCredit: TAX_CREDITS.donsAidePersonnes.maxAmount * TAX_CREDITS.donsAidePersonnes.rate,
    conditions: [
      `Réduction de ${TAX_CREDITS.donsAidePersonnes.rate * 100}% du montant`,
      `Plafond de ${formatCurrency(TAX_CREDITS.donsAidePersonnes.maxAmount)} de dons`,
      "Aide aux personnes en difficulté uniquement",
    ],
  },
];

function getCreditAmount(
  result: TaxSimulationResult | null | undefined,
  key: string
): number {
  if (!result) return 0;
  if (key === "dons") return result.creditsImpot.dons;
  if (key === "donsAide") return result.creditsImpot.donsAide;
  if (key === "gardeEnfant") return result.creditsImpot.gardeEnfant;
  if (key === "emploiDomicile") return result.creditsImpot.emploiDomicile;
  return 0;
}

export function TaxCreditsDetail({ result }: TaxCreditsDetailProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {CREDIT_CARDS.map((credit) => {
        const amount = getCreditAmount(result, credit.key);
        const maxCredit = credit.maxCredit;
        const progressPercent = maxCredit && maxCredit > 0
          ? Math.min((amount / maxCredit) * 100, 100)
          : 0;

        return (
          <Card key={credit.key}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${credit.bgColor}`}>
                  <credit.icon className={`h-5 w-5 ${credit.color}`} />
                </div>
                <div>
                  <CardTitle className="text-base">{credit.title}</CardTitle>
                  <CardDescription className="text-xs">
                    Taux : {credit.rate}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{credit.description}</p>

              {result && amount > 0 && (
                <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Crédit obtenu</span>
                    <Badge variant="secondary" className="font-mono">
                      {formatCurrency(amount)}
                    </Badge>
                  </div>
                  {maxCredit && maxCredit > 0 && (
                    <>
                      <Progress value={progressPercent} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {formatCurrency(amount)} / {formatCurrency(maxCredit)} max
                      </p>
                    </>
                  )}
                </div>
              )}

              {result && amount === 0 && (
                <div className="rounded-lg border border-dashed p-3">
                  <p className="text-sm text-muted-foreground">
                    Non utilisé dans votre simulation
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Conditions</p>
                <ul className="space-y-1">
                  {credit.conditions.map((condition, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
