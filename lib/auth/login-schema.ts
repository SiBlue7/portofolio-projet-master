import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Veuillez renseigner votre adresse email.")
    .email("Veuillez saisir une adresse email valide.")
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(1, "Veuillez renseigner votre mot de passe.")
    .max(128, "Le mot de passe est trop long."),
});

export type LoginInput = z.infer<typeof loginSchema>;
