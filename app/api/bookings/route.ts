import { NextResponse } from "next/server";
import { BookingError, createBooking } from "@/lib/bookingStore";
import { MAX_NIGHTS, getRoom, priceFor } from "@/lib/bookingConfig";
import { isDateKey, nightsBetween, todayManila } from "@/lib/dates";
import { isEmail, normalizePhone, normalizeRef } from "@/lib/validate";

const MAX_PROOF = 5 * 1024 * 1024;

function sniff(b: Buffer): "jpg" | "png" | "webp" | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.subarray(0, 4).toString("hex") === "89504e47") return "png";
  if (b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP")
    return "webp";
  return null;
}

const bad = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Invalid form.");
  }
  const s = (k: string) => String(form.get(k) ?? "").trim();

  const room = getRoom(s("roomId"));
  if (!room) return bad("Please choose a room.");

  const checkIn = s("checkIn");
  const checkOut = s("checkOut");
  if (!isDateKey(checkIn) || !isDateKey(checkOut)) return bad("Please choose your dates.");
  if (checkIn < todayManila()) return bad("Check-in cannot be in the past.");
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1 || nights > MAX_NIGHTS)
    return bad(`You can book 1 to ${MAX_NIGHTS} nights.`);

  const guests = Number(s("guests"));
  if (!Number.isInteger(guests) || guests < 1 || guests > room.maxGuests)
    return bad(`${room.name} fits 1 to ${room.maxGuests} guests.`);

  const name = s("name");
  const email = s("email").toLowerCase();
  const phone = normalizePhone(s("phone"));
  if (name.length < 2 || name.length > 80) return bad("Please enter your full name.");
  if (!isEmail(email)) return bad("Please enter a valid email.");
  if (!phone) return bad("Please enter a valid PH mobile number (09XX XXX XXXX).");

  const { total, downpayment } = priceFor(room.id, nights);
  const amountPaid = Number(s("amountPaid"));
  if (!Number.isFinite(amountPaid) || amountPaid < downpayment)
    return bad(`The amount paid must be at least the downpayment of ₱${downpayment}.`);
  if (amountPaid > total) return bad(`The amount paid cannot be more than the total of ₱${total}.`);

  const refNo = normalizeRef(s("refNo"));
  if (!refNo) return bad("Please enter the GCash reference number (digits only, from your receipt).");

  const file = form.get("proof");
  if (!(file instanceof File) || file.size === 0) return bad("Please upload your GCash screenshot.");
  if (file.size > MAX_PROOF) return bad("The screenshot must be 5 MB or smaller.");
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = sniff(buffer);
  if (!ext) return bad("The screenshot must be a JPG, PNG or WEBP image.");

  try {
    const b = await createBooking(
      {
        roomId: room.id, roomName: room.name, checkIn, checkOut, nights, guests,
        name, email, phone, total, downpayment, amountPaid, refNo,
      },
      { buffer, ext }
    );
    return NextResponse.json({ code: b.code, status: b.status });
  } catch (e) {
    if (e instanceof BookingError) return bad(e.message, e.status);
    console.error(e);
    return bad("Something went wrong. Please try again.", 500);
  }
}
