"use client";

import { Baby } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ChildcareStructureCard } from "@/components/garde/childcare-structure-card";
import type { ChildcareStructure } from "@/types/garde";

interface ChildcareStructureListProps {
  structures: ChildcareStructure[];
  favoriteIds: Set<string>;
  onToggleFavorite: (structureId: string) => void;
  hasSearched: boolean;
}

export function ChildcareStructureList({
  structures,
  favoriteIds,
  onToggleFavorite,
  hasSearched,
}: ChildcareStructureListProps) {
  if (!hasSearched) {
    return (
      <EmptyState
        icon={Baby}
        title="Recherchez un mode de garde"
        description="Saisissez une ville ou un code postal pour trouver les structures de garde autour de vous."
      />
    );
  }

  if (structures.length === 0) {
    return (
      <EmptyState
        icon={Baby}
        title="Aucun résultat"
        description="Aucune structure trouvée pour cette recherche. Essayez avec une autre ville ou un autre type de structure."
      />
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {structures.length} structure{structures.length > 1 ? "s" : ""}{" "}
        trouvée{structures.length > 1 ? "s" : ""}
      </p>
      {structures.map((structure) => (
        <ChildcareStructureCard
          key={structure.id}
          structure={structure}
          isFavorite={favoriteIds.has(structure.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
