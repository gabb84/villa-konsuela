import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminEnabled, makeToken, passwordOk } from "@/lib/adminAuth";

export async function POST(request: Request) {
  if (!adminEnabled())
    return NextResponse.json(
      { error: "Admin is off. Set ADMIN_PASSWORD in .env.local (6+ characters)." },
      { status: 503 }
    );
  const body = await request.json().catch(() => ({}));
  if (!passwordOk(String(body.password ?? "")))
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true, sameSite: "lax", path: "/",
    secure: process.env.NODE_ENV === "production", maxAge: 8 * 60 * 60,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
