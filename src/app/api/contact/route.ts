import { NextResponse } from "next/server";
import { Resend } from "resend";

import { COMPANY } from "@/lib/constants";
import { inscriptionSchema } from "@/lib/validations";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Detect whether the configured DATABASE_URL is a real Postgres connection
 * (Neon). When false, the route skips DB persistence and only sends email.
 */
function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL ?? "";
  return url.startsWith("postgresql://") || url.startsWith("postgres://");
}

/**
 * POST /api/contact
 * Handles an inscription request:
 *   1. Validates the payload (Zod).
 *   2. Persists it to Neon (Postgres) when DATABASE_URL is configured.
 *   3. Sends an email notification via Resend when RESEND_API_KEY is set.
 *
 * Graceful degradation:
 *   - No DB?  → skips persistence, still tries email.
 *   - No email? → skips email, still persists.
 *   - Neither? → returns 503 so the frontend falls back to WhatsApp.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = inscriptionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const v = parsed.data;
  const dbConfigured = isDatabaseConfigured();
  const emailConfigured = Boolean(COMPANY.resendApiKey && COMPANY.contactEmail);

  if (!dbConfigured && !emailConfigured) {
    return NextResponse.json(
      { error: "Neither database nor email is configured", configured: false },
      { status: 503 },
    );
  }

  // 1. Persist to Neon (best-effort — never blocks the email).
  let inscriptionId: string | null = null;
  if (dbConfigured) {
    try {
      const created = await db.inscription.create({
        data: {
          nom: v.nom,
          prenom: v.prenom,
          telephone: v.telephone,
          ville: v.ville,
          categorie: v.categorie,
          langue: v.langue,
          message: v.message ?? null,
          source: "web",
          status: "nouveau",
        },
        select: { id: true },
      });
      inscriptionId = created.id;
    } catch (err) {
      console.error("[contact] DB persist failed:", err);
      // Continue — email can still be sent.
    }
  }

  // 2. Email notification via Resend (best-effort).
  if (emailConfigured) {
    try {
      const resend = new Resend(COMPANY.resendApiKey!);

      const subject = `Nouvelle inscription — ${v.prenom} ${v.nom} (${v.categorie})`;
      const body = [
        `Nouvelle demande d'inscription reçue sur le site PROJET PERMIS BÉNIN.`,
        ...(inscriptionId ? [`Référence : ${inscriptionId}`] : []),
        ``,
        `Nom : ${v.nom}`,
        `Prénom : ${v.prenom}`,
        `Téléphone : ${v.telephone}`,
        `Ville : ${v.ville}`,
        `Catégorie : ${v.categorie}`,
        `Langue de formation : ${v.langue}`,
        ``,
        `Message :`,
        v.message?.trim() || "—",
      ].join("\n");

      const { error } = await resend.emails.send({
        from: "PROJET PERMIS BÉNIN <onboarding@resend.dev>",
        to: COMPANY.contactEmail!,
        subject,
        text: body,
      });

      if (error) {
        console.error("[contact] Resend error:", error);
        // Still return success if DB persisted; otherwise surface the error.
        if (!inscriptionId) {
          return NextResponse.json({ error: error.message }, { status: 502 });
        }
      }
    } catch (err) {
      console.error("[contact] Email sending failed:", err);
      if (!inscriptionId) {
        return NextResponse.json(
          { error: err instanceof Error ? err.message : "Email sending failed" },
          { status: 502 },
        );
      }
    }
  }

  return NextResponse.json({ ok: true, id: inscriptionId });
}
