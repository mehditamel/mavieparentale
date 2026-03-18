import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FiscalEvent {
  date: string;
  label: string;
  description: string;
  category: "declaration" | "paiement" | "reception" | "action";
}

const FISCAL_EVENTS_2025_2026: FiscalEvent[] = [
  {
    date: "2026-01-01",
    label: "Mise à jour du taux PAS",
    description: "Nouveau taux de prélèvement à la source appliqué sur les revenus de janvier",
    category: "action",
  },
  {
    date: "2026-01-15",
    label: "Acomptes PAS trimestriels",
    description: "Premier acompte trimestriel de prélèvement à la source (si applicable)",
    category: "paiement",
  },
  {
    date: "2026-04-10",
    label: "Ouverture déclaration revenus 2025",
    description: "Début de la période de déclaration en ligne sur impots.gouv.fr",
    category: "declaration",
  },
  {
    date: "2026-05-22",
    label: "Date limite zone 1",
    description: "Départements 01 à 19 et non-résidents",
    category: "declaration",
  },
  {
    date: "2026-05-29",
    label: "Date limite zone 2",
    description: "Départements 20 à 54 (y compris Corse)",
    category: "declaration",
  },
  {
    date: "2026-06-05",
    label: "Date limite zone 3",
    description: "Départements 55 à 976",
    category: "declaration",
  },
  {
    date: "2026-07-25",
    label: "Avis d'imposition",
    description: "Réception de l'avis d'imposition et du montant définitif",
    category: "reception",
  },
  {
    date: "2026-09-01",
    label: "Ajustement taux PAS",
    description: "Nouveau taux de prélèvement à la source basé sur la déclaration 2025",
    category: "action",
  },
  {
    date: "2026-09-15",
    label: "Solde IR (si reste à payer)",
    description: "Paiement du solde si l'impôt prélevé à la source était insuffisant",
    category: "paiement",
  },
  {
    date: "2026-12-15",
    label: "Acompte décembre PAS",
    description: "Dernier prélèvement à la source de l'année",
    category: "paiement",
  },
];

const CATEGORY_CONFIG = {
  declaration: {
    color: "bg-accent-blue/10 text-accent-blue border-accent-blue/30",
    label: "Déclaration",
  },
  paiement: {
    color: "bg-accent-warm/10 text-accent-warm border-accent-warm/30",
    label: "Paiement",
  },
  reception: {
    color: "bg-accent-teal/10 text-accent-teal border-accent-teal/30",
    label: "Réception",
  },
  action: {
    color: "bg-accent-purple/10 text-accent-purple border-accent-purple/30",
    label: "Action",
  },
};

function getEventStatus(dateStr: string): "past" | "next" | "future" {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);

  if (eventDate < today) return "past";

  const upcomingEvents = FISCAL_EVENTS_2025_2026
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcomingEvents.length > 0 && upcomingEvents[0].date === dateStr) {
    return "next";
  }

  return "future";
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function FiscalSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Échéancier fiscal 2025-2026
        </CardTitle>
        <CardDescription>
          Dates clés pour votre déclaration de revenus et vos paiements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {FISCAL_EVENTS_2025_2026.map((event, index) => {
            const status = getEventStatus(event.date);
            const categoryConfig = CATEGORY_CONFIG[event.category];
            const days = daysUntil(event.date);
            const isLast = index === FISCAL_EVENTS_2025_2026.length - 1;

            return (
              <div key={event.date + event.label} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                      status === "past"
                        ? "border-muted bg-muted"
                        : status === "next"
                          ? "border-accent-warm bg-accent-warm/10"
                          : "border-muted-foreground/20 bg-background"
                    )}
                  >
                    {status === "past" ? (
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    ) : status === "next" ? (
                      <AlertCircle className="h-4 w-4 text-accent-warm" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground/50" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 grow",
                        status === "past" ? "bg-muted" : "bg-muted-foreground/10"
                      )}
                    />
                  )}
                </div>

                <div className={cn("pb-6", status === "past" && "opacity-60")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn(
                      "text-sm font-medium",
                      status === "next" && "text-accent-warm"
                    )}>
                      {event.label}
                    </span>
                    <Badge variant="outline" className={cn("text-xs", categoryConfig.color)}>
                      {categoryConfig.label}
                    </Badge>
                    {status === "next" && (
                      <Badge className="bg-accent-warm text-white text-xs">
                        Dans {days} jour{days > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatEventDate(event.date)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
