"use client";

import { useState } from "react";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { simulateIR } from "@/lib/simulators/ir-simulator";
import type { TaxSimulationResult, TaxSimulationInput } from "@/types/fiscal";

const PARTS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "1.5", label: "1,5" },
  { value: "2", label: "2" },
  { value: "2.5", label: "2,5" },
  { value: "3", label: "3" },
  { value: "3.5", label: "3,5" },
  { value: "4", label: "4" },
];

interface FiscalComparatorProps {
  baseResult: TaxSimulationResult;
  baseInput: TaxSimulationInput;
}

export function FiscalComparator({ baseResult, baseInput }: FiscalComparatorProps) {
  const [scenario2Input, setScenario2Input] = useState<TaxSimulationInput>({
    ...baseInput,
  });
  const [scenario2Result, setScenario2Result] = useState<TaxSimulationResult | null>(null);

  const handleCompare = () => {
    const result = simulateIR(scenario2Input);
    setScenario2Result(result);
  };

  const updateField = (field: keyof TaxSimulationInput, value: number) => {
    setScenario2Input((prev) => ({ ...prev, [field]: value }));
  };

  const delta = scenario2Result ? baseResult.impotNet - scenario2Result.impotNet : null;
  const isPositive = delta !== null && delta > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Comparateur avant / après</CardTitle>
        <CardDescription>
          Modifiez les paramètres pour voir l&apos;impact sur votre impôt
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="font-medium text-sm">Situation actuelle</h4>
            <div className="space-y-2 text-sm">
              <CompareRow label="Revenu" value={formatCurrency(baseResult.revenuNetImposable)} />
              <CompareRow label="Parts" value={String(baseResult.nbParts)} />
              <CompareRow label="Crédits" value={formatCurrency(baseResult.creditsImpot.total)} />
              <div className="border-t pt-2">
                <CompareRow label="Impôt net" value={formatCurrency(baseResult.impotNet)} bold />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-accent-blue/30 bg-accent-blue/5 p-4 space-y-3">
            <h4 className="font-medium text-sm text-accent-blue">Scénario optimisé</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Revenu (€)</Label>
                <Input
                  type="number"
                  min={0}
                  step={1000}
                  value={scenario2Input.revenuNetImposable}
                  onChange={(e) => updateField("revenuNetImposable", Number(e.target.value))}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Parts</Label>
                <Select
                  value={String(scenario2Input.nbParts)}
                  onValueChange={(val) => updateField("nbParts", parseFloat(val))}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PARTS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Garde enfant (€)</Label>
                <Input
                  type="number"
                  min={0}
                  step={100}
                  value={scenario2Input.gardeEnfantExpenses}
                  onChange={(e) => updateField("gardeEnfantExpenses", Number(e.target.value))}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Emploi domicile (€)</Label>
                <Input
                  type="number"
                  min={0}
                  step={100}
                  value={scenario2Input.emploiDomicileExpenses}
                  onChange={(e) => updateField("emploiDomicileExpenses", Number(e.target.value))}
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <Button onClick={handleCompare} size="sm" className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              Comparer
            </Button>
          </div>
        </div>

        {scenario2Result && delta !== null && (
          <div
            className={`rounded-lg p-4 text-center ${
              isPositive
                ? "bg-green-50 border border-green-200"
                : delta < 0
                  ? "bg-red-50 border border-red-200"
                  : "bg-muted"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {isPositive ? (
                <TrendingDown className="h-5 w-5 text-green-600" />
              ) : delta < 0 ? (
                <TrendingUp className="h-5 w-5 text-red-600" />
              ) : null}
              <span className="text-lg font-bold">
                {isPositive ? "Économie de " : delta < 0 ? "Surcoût de " : "Pas de changement"}
                {delta !== 0 && formatCurrency(Math.abs(delta))}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Avant : {formatCurrency(baseResult.impotNet)}</span>
              <ArrowRight className="h-4 w-4" />
              <span>Après : {formatCurrency(scenario2Result.impotNet)}</span>
            </div>
            {scenario2Result.tmi !== baseResult.tmi && (
              <div className="mt-2">
                <Badge variant="outline">
                  TMI : {baseResult.tmi}% → {scenario2Result.tmi}%
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CompareRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-medium" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
