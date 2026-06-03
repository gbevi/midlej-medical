// Server-only by convention: only imported by `lib/actions.ts` (a "use server"
// file). Don't import from client components or zod will be bundled there.
import { z } from "zod";
import { BR_UFS } from "./leadConstants";

export { CONSENT_TEXT } from "./leadConstants";

export const LeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome muito curto")
    .max(80, "Nome muito longo")
    .regex(/^[\p{L}\s'.-]+$/u, "Use apenas letras"),
  estado: z.enum(BR_UFS, { message: "Selecione seu estado" }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()\-+]+$/, "Telefone inválido")
    .refine((s) => {
      const digits = s.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 11;
    }, "Use DDD + número"),
});

export type LeadInput = z.infer<typeof LeadSchema>;
