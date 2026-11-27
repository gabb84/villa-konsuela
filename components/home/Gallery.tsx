import Image from "next/image";

// TODO: replace the images in /public/images/gallery with the client's original photos
const tiles = [
  { label: "Pool & Outdoor Lounge", image: "pool", alt: "Pool with floaters and poolside lounge", bar: "bg-[#6b92a6] text-white", span: "md:col-span-3" },
  { label: "Room", image: "room", alt: "Room with two full beds", bar: "bg-[#c5d6da] text-[var(--navy)]", span: "md:col-span-2" },
  { label: "Gatherings", image: "gatherings", alt: "Open event hall set up for a gathering", bar: "bg-[#d9c3ab] text-[var(--navy)]", span: "md:col-span-2" },
  { label: "Villa Details", image: "villa", alt: "Aerial view of the villa grounds", bar: "bg-[var(--sand)] text-[var(--navy)]", span: "md:col-span-2" },
  { label: "Your Stay at Villa Konsuela", image: "stay", alt: "Lounge chairs and dining set beside the pool", bar: "bg-[#93a89a] text-white", span: "md:col-span-5" },
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
              key={t.label}
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
              <p
                className={`px-3.5 py-1.5 text-[11px] font-bold tracking-wide uppercase ${t.bar}`}
              >
                {t.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
