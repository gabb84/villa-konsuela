import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { BookingError, setStatus, type BookingStatus } from "@/lib/bookingStore";

const STATUSES: BookingStatus[] = ["pending", "approved", "rejected"];

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const status = body.status as BookingStatus;
  if (!STATUSES.includes(status))
    return NextResponse.json({ error: "Bad status." }, { status: 400 });
  try {
    const b = await setStatus(id, status, String(body.note ?? "").slice(0, 300));
    return NextResponse.json({ status: b.status });
  } catch (e) {
    if (e instanceof BookingError)
      return NextResponse.json({ error: e.message }, { status: e.status });
    throw e;
  }
}
