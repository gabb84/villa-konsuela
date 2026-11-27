const amenities = [
  { title: "Sparkling Pool", text: "Clean pool for kids and adults." },
  { title: "Poolside Cabana", text: "Shaded seating beside the water." },
  { title: "Night Swimming", text: "Lit pool for evening dips." },
  { title: "Grilling Area", text: "Space to cook and eat together." },
  { title: "Event Space", text: "Room for large groups and parties." },
  { title: "Videoke", text: "Sing along with family and friends." },
  { title: "Cozy Rooms", text: "Air-conditioned rooms with beds for groups." },
  { title: "Parking", text: "On-site parking for guests." },
];

export default function Amenities() {
  return (
    <section className="bg-[var(--cream)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-[var(--clay)]">
            AMENITIES
          </p>
          <h2 className="font-heading mt-3 text-4xl font-semibold text-[var(--ink)] md:text-5xl">
            Comforts Waiting for Your Stay.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/75">
            Everything you need for a relaxed stay or a well-run event.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {amenities.map(({ title, text }) => (
            <li
              key={title}
              className="rounded-lg bg-[var(--linen)] p-6 text-center"
            >
              <h3 className="font-heading text-xl font-semibold text-[var(--ink)]">
                {title}
              </h3>
              <p className="mt-1 text-sm text-[var(--ink)]/75">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}