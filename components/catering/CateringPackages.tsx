import Link from "next/link";
import { ArrowRight, Check, PartyPopper, Utensils, Users } from "lucide-react";

const packages = [
  {
    title: "Stay & Share",
    label: "FOR VILLA GUESTS",
    description: "Arrange meals to enjoy during your overnight villa stay.",
    icon: Utensils,
    details: ["Discuss meal choices", "Plan around your stay dates", "Share your group size"],
  },
  {
    title: "Gather & Celebrate",
    label: "FOR SPECIAL OCCASIONS",
    description: "Talk through catering for birthdays, reunions, and family gatherings.",
    icon: PartyPopper,
    details: ["Ask about menu options", "Discuss buffet or serving style", "Coordinate event timing"],
    featured: true,
  },
  {
    title: "Custom Event Catering",
    label: "MADE FOR YOUR EVENT",
    description: "Start a conversation about a menu and service plan for your event.",
    icon: Users,
    details: ["For groups with specific needs", "Plan around your event schedule", "Request a tailored quote"],
  },
];

export default function CateringPackages() {
  return (
    <section id="packages" className="bg-[var(--sand)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--clay)]">Made for sharing</p>
          <h2 className="font-heading mt-3 text-4xl font-semibold text-[var(--brown)] md:text-5xl">
            Find a package to start with.
          </h2>
          <p className="mt-4 text-[var(--ink)]/80 md:text-lg">
            Tell us your date and group size. We’ll confirm the menu, availability, and quote with you directly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((item) => {
            const Icon = item.icon;
            const contactHref = `/contact?topic=catering&package=${encodeURIComponent(item.title)}`;

            return (
              <article
                key={item.title}
                className={`flex h-full flex-col rounded-2xl bg-[var(--cream)] p-7 shadow-md ring-1 ${
                  item.featured ? "ring-[var(--gold)] md:-translate-y-2" : "ring-[var(--brown)]/10"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--linen)] px-3 py-1.5 text-[11px] font-bold tracking-wider text-[var(--brown)]">
                    {item.label}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brown)] text-[var(--gold)]">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-heading mt-6 text-3xl font-semibold text-[var(--brown)]">{item.title}</h3>
                <p className="mt-2 min-h-[72px] text-sm leading-relaxed text-[var(--ink)]/75">{item.description}</p>
                <p className="mt-4 border-y border-[var(--brown)]/10 py-4 text-lg font-bold text-[var(--brown)]">
                  Request a quote
                  <span className="mt-0.5 block text-xs font-normal text-[var(--ink)]/65">
                    Menu and pricing confirmed for your group.
                  </span>
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[var(--ink)]/85">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 shrink-0 text-[var(--clay)]" size={17} aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={contactHref}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--gold)] px-4 py-3 text-center font-semibold text-[var(--ink)] transition hover:bg-[var(--brown)] hover:text-white"
                >
                  Ask about this package <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-[var(--ink)]/65">
          Package names and service details are starting points; confirm the final menu and inclusions with Villa Konsuela.
        </p>
      </div>
    </section>
  );
}