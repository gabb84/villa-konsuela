"use client";

import { useState } from "react";
import { formatDate, formatPeso } from "@/lib/dates";

interface Result {
  code: string; status: "pending" | "approved" | "rejected"; roomName: string;
  checkIn: string; checkOut: string; nights: number; guests: number;
  total: number; amountPaid: number; adminNote: string;
}

const MESSAGES = {
  pending: ["Checking your payment", "bg-amber-100 text-amber-900", "We are comparing your GCash receipt with our records. Your dates are held."],
  approved: ["Payment confirmed", "bg-green-100 text-green-900", "Your payment is verified and your dates are reserved. See you at the villa!"],
  rejected: ["Payment not confirmed", "bg-red-100 text-red-900", "We could not confirm your payment and the dates were released. Please contact us."],
} as const;

const field =
  "w-full rounded-lg border border-[var(--sand)] bg-white px-4 py-3 text-base focus:border-[var(--gold)] focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/30";

export default function StatusLookup({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const look = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(""); setResult(null);
    const res = await fetch("/api/bookings/lookup", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, contact }),
    }).catch(() => null);
    const data = res ? await res.json() : { error: "Could not connect." };
    if (res?.ok) setResult(data); else setError(data.error);
    setBusy(false);
  };

  const m = result && MESSAGES[result.status];

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <form onSubmit={look} className="space-y-5 rounded-2xl bg-white p-8 shadow-md ring-1 ring-[var(--sand)]">
        <div><label htmlFor="code" className="mb-1.5 block text-sm font-semibold text-[var(--brown)]">Reservation code</label>
          <input id="code" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="VK-XXXXXX" className={field} /></div>
        <div><label htmlFor="contact" className="mb-1.5 block text-sm font-semibold text-[var(--brown)]">Email or mobile number you used</label>
          <input id="contact" required value={contact} onChange={(e) => setContact(e.target.value)} className={field} /></div>
        <button disabled={busy} className="w-full rounded-lg bg-[var(--brown)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[var(--clay)] disabled:opacity-50">Check status</button>
        {error && <p role="alert" className="text-sm font-medium text-red-800">{error}</p>}
      </form>

      {result && m && (
        <div className="mt-6 space-y-3 rounded-2xl bg-white p-8 shadow-md ring-1 ring-[var(--sand)]">
          <span className={`inline-block rounded-full px-4 py-1 text-sm font-bold ${m[1]}`}>{m[0]}</span>
          <p className="text-sm">{m[2]}</p>
          {result.status === "rejected" && result.adminNote && <p className="text-sm"><b>Note:</b> {result.adminNote}</p>}
          <p className="text-sm text-[var(--ink)]/80">{result.roomName} · {formatDate(result.checkIn)} to {formatDate(result.checkOut)} · {result.guests} guests</p>
          <p className="text-sm text-[var(--ink)]/80">Total {formatPeso(result.total)} · Paid {formatPeso(result.amountPaid)}</p>
        </div>
      )}
    </div>
  );
}
