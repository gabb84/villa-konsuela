import { NextResponse } from "next/server";
import { findByCode } from "@/lib/bookingStore";
import { normalizePhone } from "@/lib/validate";

// Guest checks a reservation with the code AND the email or phone used.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const code = String(body.code ?? "");
  const contact = String(body.contact ?? "").trim().toLowerCase();
  const b = code ? await findByCode(code) : undefined;
  const phone = normalizePhone(contact);
  const match = b && (b.email === contact || (phone !== "" && b.phone === phone));
  if (!b || !match)
    return NextResponse.json(
      { error: "We could not find that reservation. Check your code and email or phone." },
      { status: 404 }
    );
  return NextResponse.json({
    code: b.code, status: b.status, roomName: b.roomName, checkIn: b.checkIn,
    checkOut: b.checkOut, nights: b.nights, guests: b.guests, total: b.total,
    amountPaid: b.amountPaid, adminNote: b.adminNote,
  });
}
