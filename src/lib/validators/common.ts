import { z } from "zod";

export const uuidSchema = z.string().uuid("Identifiant invalide");

export function validateUUID(id: string): { valid: true } | { valid: false; error: string } {
  const result = uuidSchema.safeParse(id);
  if (!result.success) {
    return { valid: false, error: result.error.errors[0]?.message ?? "Identifiant invalide" };
  }
  return { valid: true };
}
