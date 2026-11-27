import Image from "next/image";
import Link from "next/link";

const highlights = [
  {
    title: "Rooms and Villa",
    text: "Comfortable rooms for couples, families and groups.",
    image: "/images/rooms.jpg",
    href: "/rooms",
  },
  {
    title: "Events and Catering",
    text: "Food and setup for birthdays, weddings and gatherings.",
    image: "/images/catering.jpg",
    href: "/catering",
  },
  {
    title: "Amenities",
    text: "Pool, cabanas and spaces for the whole group to enjoy.",
    image: "/images/amenities.jpg",
    href: "/amenities",
  },
];

export default function Highlights() {
  return (
    <section className="bg-[var(--linen)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-semibold text-[var(--ink)] md:text-5xl">
            Your next great memory starts here.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/75">
            Overnight stays, outdoor events and catered meals, all in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 bg-[var(--sand)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-2xl font-semibold text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--ink)]/75">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}