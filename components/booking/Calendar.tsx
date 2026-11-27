"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, eachNight, toKey } from "@/lib/dates";
import { MAX_NIGHTS } from "@/lib/bookingConfig";

interface Props {
  checkIn: string;
  checkOut: string;
  blocked: Set<string>;
  today: string;
  onChange: (checkIn: string, checkOut: string) => void;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar({ checkIn, checkOut, blocked, today, onChange }: Props) {
  const [ty, tm] = today.split("-").map(Number);
  const [cursor, setCursor] = useState({ y: ty, m: tm - 1 });

  const move = (n: number) =>
    setCursor((c) => {
      const d = new Date(Date.UTC(c.y, c.m + n, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });
  const atStart = cursor.y === ty && cursor.m === tm - 1;

  const rangeFree = (from: string, to: string) =>
    eachNight(from, to).every((n) => !blocked.has(n));

  const isDisabled = (k: string) => {
    if (k < today) return true;
    if (checkIn && !checkOut && k > checkIn)
      return k > addDays(checkIn, MAX_NIGHTS) || !rangeFree(checkIn, k);
    return blocked.has(k);
  };

  const pick = (k: string) => {
    if (!checkIn || checkOut || k <= checkIn) onChange(k, "");
    else onChange(checkIn, k);
  };

  const renderMonth = (offset: number, extra = "") => {
    const d = new Date(Date.UTC(cursor.y, cursor.m + offset, 1));
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const lead = d.getUTCDay();
    const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    return (
      <div className={`min-w-0 flex-1 ${extra}`}>
        <p className="font-heading mb-3 text-center text-xl font-semibold text-[var(--brown)]">
          {MONTHS[m]} {y}
        </p>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {DOW.map((w) => (
            <span key={w} className="pb-1 font-semibold text-[var(--clay)]">{w}</span>
          ))}
          {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: days }, (_, i) => {
            const k = toKey(y, m, i + 1);
            const disabled = isDisabled(k);
            const start = k === checkIn;
            const end = k === checkOut;
            const inside = checkIn && checkOut && k > checkIn && k < checkOut;
            const booked = blocked.has(k) && k >= today;
            let cls = "text-[var(--ink)] hover:bg-[var(--gold)]/40";
            if (disabled) cls = booked
              ? "cursor-not-allowed bg-[var(--linen)] text-[var(--ink)]/35 line-through"
              : "cursor-not-allowed text-[var(--ink)]/25";
            if (inside) cls = "bg-[var(--sand)]/70 text-[var(--ink)]";
            if (start || end) cls = "bg-[var(--brown)] font-bold text-white";
            return (
              <button
                key={k}
                type="button"
                disabled={disabled && !start && !end}
                onClick={() => pick(k)}
                aria-label={k}
                className={`mx-auto h-10 w-10 rounded-full text-sm transition-colors ${cls}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} disabled={atStart}
          aria-label="Previous month"
          className="rounded-full p-2 text-[var(--brown)] hover:bg-[var(--linen)] disabled:opacity-30">
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next month"
          className="rounded-full p-2 text-[var(--brown)] hover:bg-[var(--linen)]">
          <ChevronRight size={22} />
        </button>
      </div>
      <div className="-mt-10 flex gap-8">
        {renderMonth(0)}
        {renderMonth(1, "hidden md:block")}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--ink)]/75">
        <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-[var(--brown)]" /> Your dates</span>
        <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-[var(--linen)] ring-1 ring-[var(--sand)]" /> Already booked</span>
      </div>
    </div>
  );
}
