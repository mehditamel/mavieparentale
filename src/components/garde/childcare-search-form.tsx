"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  childcareSearchSchema,
  type ChildcareSearchFormData,
} from "@/lib/validators/garde";
import { STRUCTURE_TYPE_LABELS } from "@/types/garde";
import type { ChildcareStructureType } from "@/types/garde";

interface ChildcareSearchFormProps {
  onSearch: (data: ChildcareSearchFormData) => void;
  isLoading?: boolean;
}

export function ChildcareSearchForm({
  onSearch,
  isLoading,
}: ChildcareSearchFormProps) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChildcareSearchFormData>({
    resolver: zodResolver(childcareSearchSchema),
    defaultValues: {
      query: "",
      rayonKm: 10,
    },
  });

  const currentStructureType = watch("structureType");

  const onSubmit = useCallback(
    (data: ChildcareSearchFormData) => {
      onSearch(data);
    },
    [onSearch]
  );

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="query" className="sr-only">
                Ville ou code postal
              </Label>
              <Input
                id="query"
                placeholder="Rechercher par ville, adresse ou code postal..."
                {...register("query")}
              />
              {errors.query && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.query.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isLoading}>
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Filtres"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Type de structure</Label>
                <Select
                  value={currentStructureType ?? "all"}
                  onValueChange={(val) =>
                    setValue(
                      "structureType",
                      val === "all"
                        ? undefined
                        : (val as ChildcareStructureType),
                      { shouldValidate: true }
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {Object.entries(STRUCTURE_TYPE_LABELS).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
