import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client.
 *
 * Configured for Neon (serverless PostgreSQL).
 * - On Vercel, each serverless function reuses the global instance across warm invocations.
 * - Query logging is disabled in production to avoid noise / cost.
 *
 * DATABASE_URL must be the Neon pooled connection (pgbouncer, port 6543)
 * for runtime usage. DIRECT_URL (non-pooled) is used only by the Prisma CLI.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
