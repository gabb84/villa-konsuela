import Image from "next/image";

export default function About() {
  return (
    <section className="bg-[var(--cream)] py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        <div className="relative h-80 md:h-[26rem]">
          <div className="absolute left-0 top-0 h-3/4 w-3/4 overflow-hidden rounded bg-[var(--sand)]">
            <Image
              src="/images/about-1.jpg"
              alt="Villa exterior"
              fill
              sizes="(min-width: 768px) 35vw, 70vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-3/4 w-3/4 overflow-hidden rounded border-4 border-[var(--cream)] bg-[var(--clay)] shadow-xl">
            <Image
              src="/images/about-2.jpg"
              alt="Villa grounds"
              fill
              sizes="(min-width: 768px) 35vw, 70vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-[var(--clay)]">
            ABOUT US
          </p>
          <h2 className="font-heading mt-3 text-4xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
            Built for Rest. Made to Be Remembered.
          </h2>
          {/* TODO: replace with the client's own words */}
          <p className="mt-5 max-w-prose text-[var(--ink)]/80">
            Villa Konsuela is a private resort made for easy stays and
            gatherings with the people who matter. Spend the day by the pool,
            settle into a comfortable room, or let our team cater your next
            celebration.
          </p>
          <p className="mt-4 max-w-prose text-[var(--ink)]/80">
            Whether it is a weekend getaway, a family reunion or a birthday,
            everything is set up so you can simply arrive and enjoy.
          </p>
        </div>
      </div>
    </section>
  );
}