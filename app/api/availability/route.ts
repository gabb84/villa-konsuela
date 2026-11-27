import { NextRequest, NextResponse } from "next/server";
import { bookedRanges } from "@/lib/bookingStore";
import { getRoom } from "@/lib/bookingConfig";

// Only dates are returned, never guest information.
export async function GET(request: NextRequest) {
  const room = request.nextUrl.searchParams.get("room") ?? "";
  if (!getRoom(room))
    return NextResponse.json({ error: "Unknown room." }, { status: 400 });
  return NextResponse.json({ ranges: await bookedRanges(room) });
}
