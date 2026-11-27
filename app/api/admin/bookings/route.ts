import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { readAll } from "@/lib/bookingStore";

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const list = (await readAll())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((b) => ({ ...b, proofFile: undefined, proofUrl: `/api/admin/proof/${b.id}` }));
  return NextResponse.json({ bookings: list });
}
