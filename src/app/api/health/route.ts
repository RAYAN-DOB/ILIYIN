import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/health — Vérifie que l'app et la base sont joignables (pour Vercel).
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: "ok",
        database: "disconnected",
        error: process.env.NODE_ENV === "development" ? String(e) : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
