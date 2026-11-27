"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Loader2, Upload } from "lucide-react";
import { rooms } from "@/components/rooms/roomsData";
import Calendar from "./Calendar";
import {
  DOWNPAYMENT_PERCENT, GCASH_NAME, GCASH_NUMBER, RATES, getRoom, priceFor,
} from "@/lib/bookingConfig";
import { eachNight, formatDate, formatPeso, nightsBetween } from "@/lib/dates";

const field =
  "w-full rounded-lg border border-[var(--sand)] bg-white px-4 py-3 text-base text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/30";
const label = "mb-1.5 block text-sm font-semibold text-[var(--brown)]";
const primary =
  "rounded-lg bg-[var(--brown)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[var(--clay)] disabled:cursor-not-allowed disabled:opacity-40";
const STEPS = ["Dates", "Your details", "Pay with GCash", "Done"];

export default function BookingFlow({ today, initialRoom }: { today: string; initialRoom: string }) {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState(getRoom(initialRoom) ? initialRoom : rooms[0].id);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [avail, setAvail] = useState<{ roomId: string; set: Set<string> } | null>(null);
  const [d, setD] = useState({ name: "", email: "", phone: "" });
  const [pay, setPay] = useState({ amount: "", refNo: "" });
  const [proof, setProof] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let live = true;
    fetch(`/api/availability?room=${roomId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!live) return;
        const set = new Set<string>();
        for (const r of data.ranges ?? []) for (const n of eachNight(r.checkIn, r.checkOut)) set.add(n);
        setAvail({ roomId, set });
      })
      .catch(() => {});
    return () => { live = false; };
  }, [roomId]);

  const blocked = avail?.roomId === roomId ? avail.set : new Set<string>();
  const room = getRoom(roomId)!;
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const { total, downpayment } = priceFor(roomId, nights);

  const chooseRoom = (id: string) => {
    setRoomId(id);
    setCheckIn(""); setCheckOut("");
    setGuests((g) => Math.min(g, getRoom(id)!.maxGuests));
  };

  const detailsOk =
    d.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) && d.phone.replace(/\D/g, "").length >= 10;

  const submit = async () => {
    setError("");
    if (!proof) return setError("Please upload your GCash screenshot.");
    setBusy(true);
    const f = new FormData();
    f.set("roomId", roomId); f.set("checkIn", checkIn); f.set("checkOut", checkOut);
    f.set("guests", String(guests)); f.set("name", d.name); f.set("email", d.email);
    f.set("phone", d.phone); f.set("amountPaid", pay.amount || String(downpayment));
    f.set("refNo", pay.refNo); f.set("proof", proof);
    try {
      const res = await fetch("/api/bookings", { method: "POST", body: f });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else { setCode(data.code); setStep(4); }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <ol className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 font-semibold ${step >= i + 1 ? "text-[var(--brown)]" : "text-[var(--ink)]/40"}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${step > i + 1 ? "bg-[var(--gold)] text-[var(--ink)]" : step === i + 1 ? "bg-[var(--brown)] text-white" : "bg-[var(--linen)]"}`}>
              {step > i + 1 ? <Check size={14} /> : i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-[var(--brown)]">1. Choose a room</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {rooms.map((r) => (
                  <button key={r.id} type="button" onClick={() => chooseRoom(r.id)}
                    className={`rounded-xl border-2 p-4 text-left transition ${r.id === roomId ? "border-[var(--brown)] bg-white shadow-md" : "border-[var(--sand)] bg-[var(--cream)] hover:border-[var(--clay)]"}`}>
                    <p className="font-heading text-xl font-semibold text-[var(--brown)]">{r.name}</p>
                    <p className="text-xs text-[var(--ink)]/75">{r.beds} · up to {r.maxGuests} guests</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--clay)]">{formatPeso(RATES[r.id] ?? 0)} / night</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-semibold text-[var(--brown)]">2. Pick your dates</h2>
              <p className="mb-4 mt-1 text-sm text-[var(--ink)]/75">Tap your check-in day, then your check-out day.</p>
              <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-[var(--sand)]">
                <Calendar checkIn={checkIn} checkOut={checkOut} blocked={blocked} today={today}
                  onChange={(a, b) => { setCheckIn(a); setCheckOut(b); }} />
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-5 rounded-2xl bg-[var(--linen)] p-6 ring-1 ring-[var(--sand)] lg:sticky lg:top-6">
            <h3 className="font-heading text-2xl font-semibold text-[var(--brown)]">Your stay</h3>
            <div>
              <label htmlFor="guests" className={label}>Guests</label>
              <select id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
                {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                ))}
              </select>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt>Room</dt><dd className="font-semibold">{room.name}</dd></div>
              <div className="flex justify-between"><dt>Check-in</dt><dd className="font-semibold">{checkIn ? formatDate(checkIn) : "-"}</dd></div>
              <div className="flex justify-between"><dt>Check-out</dt><dd className="font-semibold">{checkOut ? formatDate(checkOut) : "-"}</dd></div>
              <div className="flex justify-between"><dt>Nights</dt><dd className="font-semibold">{nights || "-"}</dd></div>
              <div className="flex justify-between border-t border-[var(--sand)] pt-2 text-base"><dt>Total</dt><dd className="font-bold">{nights ? formatPeso(total) : "-"}</dd></div>
              <div className="flex justify-between text-[var(--clay)]"><dt>Pay now ({DOWNPAYMENT_PERCENT}%)</dt><dd className="font-bold">{nights ? formatPeso(downpayment) : "-"}</dd></div>
            </dl>
            <button type="button" disabled={!nights} onClick={() => setStep(2)} className={`${primary} w-full`}>Continue</button>
          </aside>
        </div>
      )}

      {step === 2 && (
        <div className="mx-auto max-w-xl space-y-5 rounded-2xl bg-white p-8 shadow-md ring-1 ring-[var(--sand)]">
          <h2 className="font-heading text-3xl font-semibold text-[var(--brown)]">Your details</h2>
          <div><label htmlFor="name" className={label}>Full name</label>
            <input id="name" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} placeholder="Juan Dela Cruz" className={field} /></div>
          <div><label htmlFor="email" className={label}>Email</label>
            <input id="email" type="email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} placeholder="you@email.com" className={field} /></div>
          <div><label htmlFor="phone" className={label}>Mobile number</label>
            <input id="phone" type="tel" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} placeholder="09XX XXX XXXX" className={field} /></div>
          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-[var(--brown)] underline">Back</button>
            <button type="button" disabled={!detailsOk} onClick={() => { setPay((p) => ({ ...p, amount: String(downpayment) })); setStep(3); }} className={primary}>Continue to payment</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 rounded-2xl bg-[var(--navy)] p-8 text-white shadow-xl">
            <h2 className="font-heading text-3xl font-semibold">Pay with GCash</h2>
            <p className="text-3xl font-bold text-[var(--gold)]">{formatPeso(downpayment)}</p>
            <div className="rounded-lg bg-white/10 p-4 text-sm">
              <p className="text-white/70">Send to</p>
              <p className="text-xl font-bold tracking-wide">{GCASH_NUMBER}</p>
              <p>{GCASH_NAME}</p>
            </div>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-white/90">
              <li>Open GCash and tap <b>Send Money</b>.</li>
              <li>Send {formatPeso(downpayment)} to the number above.</li>
              <li>Take a screenshot of the receipt. It shows the <b>Ref No.</b></li>
              <li>Type the Ref No. and upload the screenshot here.</li>
            </ol>
            <p className="text-xs text-white/70">Your dates are held while we check your payment. The balance ({formatPeso(total - downpayment)}) is paid at the villa.</p>
          </div>

          <div className="space-y-5 rounded-2xl bg-white p-8 shadow-md ring-1 ring-[var(--sand)]">
            <h3 className="font-heading text-2xl font-semibold text-[var(--brown)]">Payment proof</h3>
            <div><label htmlFor="amount" className={label}>Amount you sent (₱)</label>
              <input id="amount" type="number" min={downpayment} max={total} value={pay.amount} onChange={(e) => setPay({ ...pay, amount: e.target.value })} className={field} /></div>
            <div><label htmlFor="ref" className={label}>GCash reference number</label>
              <input id="ref" inputMode="numeric" value={pay.refNo} onChange={(e) => setPay({ ...pay, refNo: e.target.value })} placeholder="e.g. 1234 567 890123" className={field} /></div>
            <div><label htmlFor="proof" className={label}>Screenshot of receipt</label>
              <label htmlFor="proof" className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-[var(--sand)] px-4 py-4 text-sm text-[var(--ink)]/80 hover:border-[var(--clay)]">
                <Upload size={20} /> {proof ? proof.name : "Choose image (JPG, PNG, WEBP, max 5 MB)"}
              </label>
              <input id="proof" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => setProof(e.target.files?.[0] ?? null)} /></div>
            {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{error}</p>}
            <div className="flex items-center justify-between pt-1">
              <button type="button" onClick={() => setStep(2)} className="text-sm font-semibold text-[var(--brown)] underline">Back</button>
              <button type="button" disabled={busy || !pay.refNo || !proof} onClick={submit} className={`${primary} flex items-center gap-2`}>
                {busy && <Loader2 size={16} className="animate-spin" />} Submit reservation
              </button>
            </div>
            {error.toLowerCase().includes("dates") && (
              <button type="button" onClick={() => { setError(""); setStep(1); }} className="text-sm font-semibold text-[var(--clay)] underline">Pick other dates</button>
            )}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="mx-auto max-w-xl space-y-5 rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-[var(--sand)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--ink)]"><Check size={30} /></span>
          <h2 className="font-heading text-4xl font-semibold text-[var(--brown)]">Reservation received</h2>
          <p className="text-sm text-[var(--ink)]/80">We are now checking your GCash payment. Your dates are held. Save this code:</p>
          <p className="rounded-lg bg-[var(--linen)] py-4 text-3xl font-bold tracking-widest text-[var(--brown)]">{code}</p>
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--clay)] underline"><Copy size={16} /> {copied ? "Copied" : "Copy code"}</button>
          <p className="text-sm text-[var(--ink)]/80">{room.name} · {formatDate(checkIn)} to {formatDate(checkOut)} · {nights} {nights === 1 ? "night" : "nights"}</p>
          <Link href={`/booking/status?code=${code}`} className={`${primary} inline-block`}>Check my reservation status</Link>
        </div>
      )}
    </div>
  );
}
