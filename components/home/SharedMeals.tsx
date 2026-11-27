import Image from "next/image";
import Link from "next/link";

export default function SharedMeals() {
  return (
    <section className="bg-[var(--navy)] py-20 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-white/80">
            SHARED MEALS
          </p>
          <h2 className="font-heading mt-5 text-4xl font-semibold leading-tight md:text-5xl">
            Gather around
            <br />
            the table
          </h2>
          <p className="mt-6 max-w-md text-white/90">
            Add a catering package to your villa rental and make birthdays,
            reunions, and shared meals easier to plan. Ask us about the options
            for your group.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded bg-[var(--clay)] px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-[var(--gold)] hover:text-[var(--ink)]"
          >
            Ask about catering
          </Link>
        </div>

        <div className="relative aspect-[5/3] overflow-hidden rounded-sm border-[8px] border-[var(--sand)] bg-[var(--sand)] shadow-2xl">
          {/* TODO: replace with the client's original event hall photo */}
          <Image
            src="/images/shared-meals.jpg"
            alt="Event hall set up with draped ceiling and round tables"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
