
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[80vh] min-h-[550px] items-center justify-center overflow-hidden bg-[var(--brown)] text-center text-white">

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

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="font-heading text-4xl font-semibold leading-tight md:text-6xl">
          Welcome to Villa Konsuela
        </h1>

        <p className="mt-4 text-base text-white/90 md:text-lg">
          A resort for relaxing stays, family gatherings and catered celebrations.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/rooms"
            className="rounded bg-[var(--gold)] px-6 py-3 font-semibold text-[var(--ink)] transition-colors hover:bg-white"
          >
            View rooms
          </Link>

          <Link
            href="/catering"
            className="rounded border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[var(--ink)]"
          >
            See catering
          </Link>
        </div>
      </div>
    </section>
  );
}
