import type { Metadata } from "next";
import AdminPanel from "@/components/booking/AdminPanel";

export const metadata: Metadata = {
  title: "Admin | Villa Konsuela",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <section className="bg-[var(--brown)] pb-12 pt-32 text-center text-white">
        <h1 className="font-heading text-5xl font-semibold">Reservations</h1>
      </section>
      <div className="px-6 py-12">
        <AdminPanel />
      </div>
    </>
  );
}
