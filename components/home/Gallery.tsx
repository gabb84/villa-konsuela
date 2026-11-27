import Image from "next/image";

// TODO: replace the images in /public/images/gallery with the client's original photos
const tiles = [
  { image: "pool", alt: "Pool with floaters and poolside lounge", span: "md:col-span-3" },
  { image: "room", alt: "Room with two full beds", span: "md:col-span-2" },
  { image: "gatherings", alt: "Open event hall set up for a gathering", span: "md:col-span-2" },
  { image: "villa", alt: "Aerial view of the villa grounds", span: "md:col-span-2" },
  { image: "stay", alt: "Lounge chairs and dining set beside the pool", span: "md:col-span-5" },
];

export default function Gallery() {
  return (
    <section className="bg-[var(--cream)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[var(--clay)]">
            A LOOK AROUND
          </p>
          <h2 className="font-heading mt-3 text-4xl font-semibold text-[var(--navy)] md:text-5xl">
            A glimpse of villa life.
          </h2>
          <p className="mt-3 text-[var(--navy)]">
            Explore the rooms, pool, and spaces made for gathering.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-7">
          {tiles.map((t) => (
            <li
              key={t.image}
              className={`overflow-hidden rounded-sm shadow-md ${t.span}`}
            >
              <div className="relative h-56 bg-[var(--sand)] md:h-64">
                <Image
                  src={`/images/gallery/${t.image}.jpg`}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
