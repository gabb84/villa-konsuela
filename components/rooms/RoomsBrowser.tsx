"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { rooms } from "./roomsData";

export default function RoomsBrowser() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [appliedFilter, setAppliedFilter] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (checkIn && checkOut && checkOut <= checkIn) {
      setError("Check-out date must be after the check-in date.");
      return;
    }

    const parsedGuests = Math.max(1, Number.parseInt(guests, 10) || 1);
    setAppliedFilter({
      checkIn,
      checkOut,
      guests: parsedGuests,
    });
  };

  const handleReset = () => {
    setCheckIn("");
    setCheckOut("");
    setGuests("2");
    setAppliedFilter(null);
    setError("");
  };

  const visibleRooms = appliedFilter
    ? rooms.filter((room) => room.maxGuests >= appliedFilter.guests)
    : rooms;

  return (
    <>
      <section className="border-b border-[var(--sand)]/70 bg-[var(--linen)] py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-5 text-center md:text-left">
            <p className="text-xs font-semibold tracking-widest text-[var(--clay)]">
              PLAN YOUR STAY
            </p>
            <h2 className="font-heading mt-1 text-2xl font-semibold text-[var(--ink)] md:text-3xl">
              Find a room for your dates
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-label="Check room availability"
            className="overflow-hidden rounded-xl border border-[var(--sand)] bg-white p-2 shadow-sm"
          >
            <div className="grid divide-y divide-[var(--sand)]/60 md:grid-cols-[1fr_1fr_0.75fr_auto] md:items-center md:divide-x md:divide-y-0">
              <div className="px-4 py-3">
                <label
                  htmlFor="check-in"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-[var(--clay)] uppercase"
                >
                 
                  Check-in
                </label>
                <input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none"
                />
              </div>

              <div className="px-4 py-3">
                <label
                  htmlFor="check-out"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-[var(--clay)] uppercase"
                >
                  
                  Check-out
                </label>
                <input
                  id="check-out"
                  type="date"
                  min={checkIn || undefined}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none"
                />
              </div>

              <div className="px-4 py-3">
                <label
                  htmlFor="guests"
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-[var(--clay)] uppercase"
                >
                  
                  Guests
                </label>
                <input
                  id="guests"
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none"
                />
              </div>

              <div className="p-2 md:pl-4">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-[var(--brown)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--clay)] md:w-auto"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </form>

          {error && (
            <p
              role="alert"
              className="mt-3 text-sm font-medium text-[var(--brown)]"
            >
              {error}
            </p>
          )}
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-semibold text-[var(--ink)] md:text-5xl">
              Available Rooms
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--ink)]/75 md:text-base">
              Rates, Capacity, and Availability
            </p>
          </div>

          {appliedFilter && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--sand)] bg-[var(--linen)] px-5 py-3 text-sm text-[var(--ink)]">
              <p>
                Showing{" "}
                <span className="font-semibold">{visibleRooms.length}</span>{" "}
                {visibleRooms.length === 1 ? "room" : "rooms"} for{" "}
                <span className="font-semibold">{appliedFilter.guests}</span>{" "}
                {appliedFilter.guests === 1 ? "guest" : "guests"}
                {appliedFilter.checkIn && appliedFilter.checkOut
                  ? ` (${appliedFilter.checkIn} to ${appliedFilter.checkOut})`
                  : ""}
                .
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer font-semibold text-[var(--brown)] underline underline-offset-4 hover:text-[var(--clay)]"
              >
                Show all rooms
              </button>
            </div>
          )}

          {visibleRooms.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRooms.map((room) => (
                <article
                  key={room.id}
                  className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-52 bg-[var(--sand)]">
                    <Image
                      src={room.image}
                      alt={room.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-2xl font-semibold text-[var(--ink)]">
                      {room.name}
                    </h3>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[var(--ink)]/80">
                      <div>
                        <dt className="sr-only">Bed setup</dt>
                        <dd>{room.beds}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Climate control</dt>
                        <dd>{room.cooling}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Capacity</dt>
                        <dd>Up to {room.maxGuests} Guests</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Feature</dt>
                        <dd>{room.highlight}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-[var(--sand)] bg-[var(--linen)] p-8 text-center">
              <p className="font-heading text-2xl font-semibold text-[var(--ink)]">
                Planning a larger group stay?
              </p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--ink)]/80">
                Individual rooms accommodate up to 6 guests. Reach out to
                reserve multiple rooms or book the private villa for your whole
                group.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded bg-[var(--brown)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--clay)]"
                >
                  Inquire for Group Stays
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="cursor-pointer rounded border border-[var(--brown)] px-5 py-2.5 text-sm font-semibold text-[var(--brown)] transition-colors hover:bg-white"
                >
                  View All Rooms
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
