"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormErrorProps {
  message: string | null;
  onRetry?: () => void;
  id?: string;
}

export function FormError({ message, onRetry, id }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-auto px-2 py-1 text-destructive hover:text-destructive"
          onClick={onRetry}
        >
          <RotateCcw className="mr-1 h-3 w-3" />
          Réessayer
        </Button>
      )}
    </div>
  );
}
