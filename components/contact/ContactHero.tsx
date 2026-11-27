import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative flex h-[70vh] min-h-[460px] items-end overflow-hidden bg-[var(--brown)] text-white">
      {/* TODO: replace with the dining area photo from the design */}
      <Image
        src="/images/rooms.jpg"
        alt="Villa Konsuela room"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark layer so the words are easy to read */}
      <div className="absolute inset-0 bg-[var(--brown)]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
      {/* Fade into the page color at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--cream)] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)] md:text-sm">
          We are here to serve
        </p>
        <h1 className="font-heading mt-3 text-5xl font-semibold uppercase leading-none tracking-wide drop-shadow-lg md:text-8xl">
          Contact Us
        </h1>
        <div className="mt-6 h-1 w-24 rounded bg-[var(--gold)]" />
      </div>
    </section>
  );
}
