import { z } from "zod";

export const inscriptionSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(60, "Le nom est trop long."),
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères.")
    .max(60, "Le prénom est trop long."),
  telephone: z
    .string()
    .min(8, "Numéro de téléphone invalide.")
    .regex(/^[0-9+\s().-]+$/, "Numéro de téléphone invalide."),
  ville: z.string().min(2, "Veuillez indiquer votre ville."),
  categorie: z.enum(["A1", "A2", "A3", "B", "C", "C1", "D"], {
    message: "Veuillez choisir une catégorie de permis.",
  }),
  langue: z.enum(["francais", "fongbe"], {
    message: "Veuillez choisir une langue de formation.",
  }),
  message: z.string().max(500, "Le message est trop long.").optional().or(z.literal("")),
});

export type InscriptionValues = z.infer<typeof inscriptionSchema>;

export const contactSchema = z.object({
  nom: z.string().min(2).max(60),
  telephone: z.string().min(8).regex(/^[0-9+\s().-]+$/, "Numéro invalide."),
  message: z.string().min(5).max(500),
});

export type ContactValues = z.infer<typeof contactSchema>;
