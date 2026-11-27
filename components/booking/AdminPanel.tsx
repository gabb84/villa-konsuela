"use client";

import { useCallback, useEffect, useState } from "react";
import { formatDate, formatPeso } from "@/lib/dates";

interface Row {
  id: string; code: string; roomName: string; checkIn: string; checkOut: string;
  nights: number; guests: number; name: string; email: string; phone: string;
  total: number; downpayment: number; amountPaid: number; refNo: string;
  status: "pending" | "approved" | "rejected"; adminNote: string;
  createdAt: string; proofUrl: string;
}

const TABS = ["pending", "approved", "rejected", "all"] as const;
const COLORS = { pending: "bg-amber-100 text-amber-900", approved: "bg-green-100 text-green-900", rejected: "bg-red-100 text-red-900" };
const field = "w-full rounded-lg border border-[var(--sand)] bg-white px-4 py-3 text-base focus:border-[var(--gold)] focus:outline-none";

export default function AdminPanel() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [needLogin, setNeedLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("pending");
  const [rejecting, setRejecting] = useState("");
  const [note, setNote] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/bookings");
    if (res.status === 401) { setNeedLogin(true); return; }
    setNeedLogin(false);
    setRows((await res.json()).bookings);
  }, []);

  useEffect(() => {
    let live = true;
    fetch("/api/admin/bookings").then(async (res) => {
      if (!live) return;
      if (res.status === 401) setNeedLogin(true);
      else setRows((await res.json()).bookings);
    });
    return () => { live = false; };
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) { setMsg(""); setPassword(""); load(); } else setMsg((await res.json()).error);
  };

  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); setRows(null); setNeedLogin(true); };

  const update = async (id: string, status: string, n = "") => {
    const res = await fetch(`/api/admin/bookings/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, note: n }) });
    if (!res.ok) setMsg((await res.json()).error); else setMsg("");
    setRejecting(""); setNote(""); load();
  };

  if (needLogin)
    return (
      <form onSubmit={login} className="mx-auto max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-md ring-1 ring-[var(--sand)]">
        <h2 className="font-heading text-3xl font-semibold text-[var(--brown)]">Admin login</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={field} />
        {msg && <p role="alert" className="text-sm font-medium text-red-800">{msg}</p>}
        <button className="w-full rounded-lg bg-[var(--brown)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[var(--clay)]">Log in</button>
      </form>
    );

  if (!rows) return <p className="text-center">Loading...</p>;
  const shown = rows.filter((r) => tab === "all" || r.status === tab);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-[var(--brown)] text-white" : "bg-[var(--linen)] text-[var(--brown)]"}`}>
              {t} ({t === "all" ? rows.length : rows.filter((r) => r.status === t).length})
            </button>
          ))}
        </div>
        <button onClick={logout} className="text-sm font-semibold text-[var(--brown)] underline">Log out</button>
      </div>
      {msg && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{msg}</p>}
      {shown.length === 0 && <p className="py-10 text-center text-[var(--ink)]/70">No reservations here.</p>}

      <div className="space-y-5">
        {shown.map((r) => (
          <article key={r.id} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-[var(--sand)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading text-2xl font-semibold text-[var(--brown)]">{r.code} · {r.roomName}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${COLORS[r.status]}`}>{r.status}</span>
            </div>
            <div className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
              <p><b>Guest:</b> {r.name} ({r.guests} guests)</p>
              <p><b>Contact:</b> {r.phone} · {r.email}</p>
              <p><b>Stay:</b> {formatDate(r.checkIn)} to {formatDate(r.checkOut)} ({r.nights} nights)</p>
              <p><b>Total:</b> {formatPeso(r.total)} · <b>Downpayment due:</b> {formatPeso(r.downpayment)}</p>
              <p><b>Guest says paid:</b> {formatPeso(r.amountPaid)}</p>
              <p><b>GCash Ref No.:</b> <span className="font-mono">{r.refNo}</span></p>
            </div>
            <p className="mt-3 rounded-lg bg-[var(--linen)] px-4 py-2 text-xs text-[var(--ink)]/80">
              Before approving: open your GCash app, find this Ref No., and check that the amount, date and sender match the screenshot.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href={r.proofUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[var(--brown)] px-4 py-2 text-sm font-semibold text-[var(--brown)] hover:bg-[var(--linen)]">View screenshot</a>
              {r.status !== "approved" && <button onClick={() => update(r.id, "approved")} className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">Payment is real: Approve</button>}
              {r.status !== "rejected" && <button onClick={() => setRejecting(r.id)} className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">Reject</button>}
            </div>
            {rejecting === r.id && (
              <div className="mt-4 flex flex-wrap gap-3">
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reason (guest will see this)" className={`${field} flex-1`} />
                <button onClick={() => update(r.id, "rejected", note)} className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white">Confirm reject</button>
              </div>
            )}
            {r.adminNote && <p className="mt-3 text-sm"><b>Note:</b> {r.adminNote}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
