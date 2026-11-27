import Image from "next/image";

export default function RoomsHero() {
  return (
    <section className="relative flex h-[80vh] min-h-[550px] items-center justify-center overflow-hidden bg-[var(--brown)] text-center text-white">
      {/* TODO: replace with the client's villa lounge / living area photo */}
      <Image
        src="/images/about-1.jpg"
        alt="Villa Konsuela guest villas beside the pool"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="font-heading text-4xl font-semibold leading-tight md:text-6xl">
          Rooms in the Villa
        </h1>

        <p className="mt-4 text-base text-white/90 md:text-lg">
          Explore the rooms and villas waiting for your stay.
        </p>
      </div>
    </section>
  );
}
