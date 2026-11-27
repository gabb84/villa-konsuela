import Image from "next/image";
import Link from "next/link";

export default function CateringHero() {
  return (
    <section className="relative flex min-h-[440px] items-end overflow-hidden bg-[var(--brown)] text-white md:min-h-[500px]">
      <Image
        src="/images/catering.jpg"
        alt="Villa Konsuela event space prepared for a gathering"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--brown)]/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-36 md:pb-20">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--gold)] md:text-sm">
          Villa Konsuela · Resort &amp; Events Place
        </p>
        <h1 className="font-heading mt-4 max-w-3xl text-5xl font-semibold leading-[1.04] md:text-7xl">
          Catering for time together.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">
          Add a meal to your villa stay or ask us about catering for your celebration in Concepcion, Tarlac.
        </p>
        <Link
          href="#packages"
          className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--gold)] px-6 py-3 font-semibold text-[var(--ink)] transition hover:bg-white"
        >
          Explore packages <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}