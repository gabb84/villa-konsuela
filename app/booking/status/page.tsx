import type { Metadata } from "next";
import StatusLookup from "@/components/booking/StatusLookup";

export const metadata: Metadata = { title: "Reservation Status | Villa Konsuela" };

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  return (
    <>
      <section className="bg-[var(--brown)] pb-12 pt-32 text-center text-white">
        <h1 className="font-heading text-5xl font-semibold md:text-6xl">Reservation Status</h1>
      </section>
      <StatusLookup initialCode={code ?? ""} />
    </>
  );
}
