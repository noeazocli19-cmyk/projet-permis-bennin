import { COMPANY } from "./constants";

/**
 * Build a wa.me link with a prefilled, URL-encoded message.
 * @param message text body to prefill in WhatsApp
 * @returns https://wa.me/{number}?text=...
 */
export function buildWhatsAppLink(message: string): string {
  const number = COMPANY.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Open WhatsApp in a new tab. */
export function openWhatsApp(message: string): void {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
}
