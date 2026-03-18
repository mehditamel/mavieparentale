"use client";

import { useState } from "react";
import { Heart, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import type { ChildcareFavorite, FavoriteStatus } from "@/types/garde";
import {
  FAVORITE_STATUS_LABELS,
  FAVORITE_STATUS_COLORS,
  STRUCTURE_TYPE_LABELS,
} from "@/types/garde";
import {
  updateChildcareFavorite,
  removeChildcareFavorite,
} from "@/lib/actions/garde";

interface ChildcareFavoritesListProps {
  initialFavorites: ChildcareFavorite[];
}

export function ChildcareFavoritesList({
  initialFavorites,
}: ChildcareFavoritesListProps) {
  const [favorites, setFavorites] =
    useState<ChildcareFavorite[]>(initialFavorites);

  const handleStatusChange = async (id: string, status: FavoriteStatus) => {
    const result = await updateChildcareFavorite(id, { status });
    if (result.success) {
      setFavorites((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      );
    }
  };

  const handleRemove = async (id: string) => {
    const result = await removeChildcareFavorite(id);
    if (result.success) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    }
  };

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Aucun favori"
        description="Ajoutez des structures en favoris depuis l'onglet Recherche pour les comparer facilement."
      />
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {favorites.length} favori{favorites.length > 1 ? "s" : ""}
      </p>

      {favorites.map((fav) => (
        <Card key={fav.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold">
                    {fav.structure?.name ?? "Structure inconnue"}
                  </h3>
                  {fav.structure && (
                    <Badge variant="outline" className="text-[10px]">
                      {STRUCTURE_TYPE_LABELS[fav.structure.structureType]}
                    </Badge>
                  )}
                </div>

                {fav.structure?.address && (
                  <p className="mb-2 text-xs text-muted-foreground">
                    {fav.structure.address}
                  </p>
                )}

                {fav.structure?.phone && (
                  <p className="mb-1 text-xs text-muted-foreground">
                    {fav.structure.phone}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <Select
                    value={fav.status}
                    onValueChange={(val) =>
                      handleStatusChange(fav.id, val as FavoriteStatus)
                    }
                  >
                    <SelectTrigger className="h-8 w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FAVORITE_STATUS_LABELS).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            <span className="flex items-center gap-2">
                              <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    FAVORITE_STATUS_COLORS[
                                      value as FavoriteStatus
                                    ],
                                }}
                              />
                              {label}
                            </span>
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  {fav.structure?.website && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a
                        href={fav.structure.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Voir le site web"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(fav.id)}
                aria-label="Retirer des favoris"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
