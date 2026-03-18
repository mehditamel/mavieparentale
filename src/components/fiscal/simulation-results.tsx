"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingDown,
  Percent,
  DivideSquare,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/shared/stat-card";
import { formatCurrency } from "@/lib/utils";
import { saveFiscalYear } from "@/lib/actions/fiscal";
import type { TaxSimulationResult, TaxSimulationInput } from "@/types/fiscal";

interface SimulationResultsProps {
  result: TaxSimulationResult;
  input: TaxSimulationInput;
}

export function SimulationResults({ result, input }: SimulationResultsProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);

    const res = await saveFiscalYear({
      year: 2025,
      nbParts: result.nbParts,
      revenuNetImposable: result.revenuNetImposable,
      impotBrut: result.impotBrut,
      creditsImpot: result.creditsImpot,
      impotNet: result.impotNet,
      tmi: result.tmi,
      tauxEffectif: result.tauxEffectif,
    });

    setSaving(false);
    if (res.success) {
      setSaved(true);
    } else {
      setSaveError(res.error ?? "Erreur lors de la sauvegarde");
    }
  };

  const tmiColor = result.tmi <= 11
    ? "bg-green-100 text-green-800"
    : result.tmi <= 30
      ? "bg-amber-100 text-amber-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Impôt net"
          value={formatCurrency(result.impotNet)}
          icon={Calculator}
          color="bg-accent-gold/10 text-accent-gold"
        />
        <StatCard
          label="TMI"
          value={`${result.tmi}%`}
          icon={TrendingDown}
          color="bg-accent-warm/10 text-accent-warm"
        />
        <StatCard
          label="Taux effectif"
          value={`${result.tauxEffectif}%`}
          icon={Percent}
          color="bg-accent-blue/10 text-accent-blue"
        />
        <StatCard
          label="Quotient familial"
          value={formatCurrency(result.quotientFamilial)}
          icon={DivideSquare}
          color="bg-accent-teal/10 text-accent-teal"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Décomposition du calcul</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetail(!showDetail)}
            >
              {showDetail ? (
                <ChevronUp className="mr-1 h-4 w-4" />
              ) : (
                <ChevronDown className="mr-1 h-4 w-4" />
              )}
              {showDetail ? "Masquer" : "Détail"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <FlowRow label="Revenu net imposable" value={formatCurrency(result.revenuNetImposable)} />
            <FlowRow label={`÷ ${result.nbParts} parts`} value={formatCurrency(result.quotientFamilial)} muted />
            <FlowRow label="Impôt brut (avant décote)" value={formatCurrency(result.impotBrut + result.decote)} />
            {result.decote > 0 && (
              <FlowRow label="Décote (bas revenus)" value={`- ${formatCurrency(result.decote)}`} positive />
            )}
            <FlowRow label="Impôt après décote" value={formatCurrency(result.impotBrut)} />
            {result.creditsImpot.total > 0 && (
              <FlowRow
                label="Crédits d'impôt"
                value={`- ${formatCurrency(result.creditsImpot.total)}`}
                positive
              />
            )}
            <div className="border-t pt-2">
              <FlowRow
                label="Impôt net à payer"
                value={formatCurrency(result.impotNet)}
                bold
              />
            </div>
          </div>

          {showDetail && result.creditsImpot.total > 0 && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-medium">Détail des crédits d&apos;impôt</p>
              {result.creditsImpot.gardeEnfant > 0 && (
                <FlowRow
                  label="Garde d'enfant"
                  value={formatCurrency(result.creditsImpot.gardeEnfant)}
                  muted
                />
              )}
              {result.creditsImpot.emploiDomicile > 0 && (
                <FlowRow
                  label="Emploi à domicile"
                  value={formatCurrency(result.creditsImpot.emploiDomicile)}
                  muted
                />
              )}
              {result.creditsImpot.dons > 0 && (
                <FlowRow
                  label="Dons organismes"
                  value={formatCurrency(result.creditsImpot.dons)}
                  muted
                />
              )}
              {result.creditsImpot.donsAide > 0 && (
                <FlowRow
                  label="Dons aide personnes"
                  value={formatCurrency(result.creditsImpot.donsAide)}
                  muted
                />
              )}
            </div>
          )}

          {showDetail && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">Tranche marginale :</span>
              <Badge className={tmiColor}>{result.tmi}%</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving || saved} variant="outline">
          <Save className="mr-2 h-4 w-4" />
          {saved ? "Sauvegardé" : saving ? "Sauvegarde..." : "Sauvegarder cette simulation"}
        </Button>
        {saveError && <p className="text-sm text-destructive">{saveError}</p>}
      </div>
    </div>
  );
}

function FlowRow({
  label,
  value,
  bold,
  muted,
  positive,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={muted ? "text-muted-foreground" : bold ? "font-semibold" : ""}>
        {label}
      </span>
      <span
        className={
          positive
            ? "text-green-600 font-medium"
            : bold
              ? "font-bold text-lg"
              : muted
                ? "text-muted-foreground"
                : "font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}
