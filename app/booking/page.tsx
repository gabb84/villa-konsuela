import type { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";
import { todayManila } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Book Your Stay | Villa Konsuela",
  description: "Choose your dates, pay the downpayment with GCash and reserve your room at Villa Konsuela.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;
  return (
    <>
      <section className="bg-[var(--brown)] pb-12 pt-32 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">Reservation</p>
        <h1 className="font-heading mt-2 text-5xl font-semibold md:text-6xl">Book Your Stay</h1>
      </section>
      <BookingFlow today={todayManila()} initialRoom={room ?? ""} />
    </>
  );
}
