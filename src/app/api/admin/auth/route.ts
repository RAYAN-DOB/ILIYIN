import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "iliyin-admin-2025";
const COOKIE_NAME = "iliyin_admin";
const COOKIE_VALUE = "1";
const MAX_AGE = 60 * 60 * 24; // 24h

/**
 * POST /api/admin/auth — Vérifie le mot de passe et pose un cookie de session.
 */
export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({}));
  if (password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
}
