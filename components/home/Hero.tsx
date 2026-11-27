import Image from "next/image";
import Link from "next/link";

const highlights = [
  { label: "A place to stay", value: "Private villa rental" },
  { label: "A place to gather", value: "Resorts & events place" },
  { label: "A little extra", value: "Catering packages" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[620px] flex-col justify-between overflow-hidden bg-[var(--brown)] text-white md:min-h-[85vh]">
      {/* HERO VIDEO */}
      {/*
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      */}

      {/* IMAGE - Currently displayed */}
      <Image
        src="/images/hero.jpg"
        alt="Villa Konsuela pool and villa at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pt-28 pb-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/85 uppercase">
            A private villa experience
          </p>

          <h1 className="font-heading mt-3 text-5xl font-semibold leading-[1.08] md:text-7xl">
            Your stay,
            <br />
            beautifully remembered.
          </h1>

          <p className="mt-5 max-w-lg text-base text-white/90 md:text-lg">
            Unwind in your own private escape, with thoughtful catering to make
            it complete.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/rooms"
              className="rounded bg-[var(--clay)] px-6 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-[var(--brown)]"
            >
              Explore the villa
            </Link>

            <Link
              href="/contact"
              className="rounded border border-white/80 px-6 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-[var(--ink)]"
            >
              Check availability
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[var(--navy)]">
        <dl className="mx-auto grid max-w-6xl divide-y divide-white/20 px-6 py-5 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          {highlights.map((item) => (
            <div key={item.label} className="py-3 md:px-6 md:py-1">
              <dt className="text-[11px] font-semibold tracking-[0.22em] text-white/75 uppercase">
                {item.label}
              </dt>
              <dd className="mt-1 text-base font-medium text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
