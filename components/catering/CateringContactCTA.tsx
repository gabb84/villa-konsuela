import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CateringContactCTA() {
  return (
    <section className="bg-[var(--linen)] py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--clay)]">One place to get in touch</p>
          <h2 className="font-heading mt-3 text-4xl font-semibold text-[var(--brown)] md:text-5xl">
            Ready to plan a meal?
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--ink)]/75">
            Use our Contact page to share your preferred date, group size, and package. We’ll follow up about menus and pricing.
          </p>
        </div>
        <Link
          href="/contact?topic=catering"
          className="inline-flex items-center justify-center gap-2 rounded bg-[var(--gold)] px-6 py-3.5 font-semibold text-[var(--ink)] transition hover:bg-[var(--brown)] hover:text-white"
        >
          Contact us about catering <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}