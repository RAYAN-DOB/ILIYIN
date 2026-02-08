import { PrismaClient } from "@prisma/client";

/**
 * Client Prisma singleton pour éviter trop de connexions en serverless (Vercel).
 * En dev, le client est réutilisé ; en prod chaque fonction peut avoir son instance
 * mais le singleton évite les connexions multiples dans la même invocation.
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
