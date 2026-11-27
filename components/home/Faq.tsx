import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How do I check availability?",
    a: "Open the Rooms page, enter your check-in and check-out dates and the number of guests, then send us a message through the Contact page. We will confirm your dates.",
  },
  {
    q: "Can I add catering to my villa rental?",
    a: "Yes. Catering packages can be added to your stay. Tell us your group size and date and we will go over the options with you.",
  },
  {
    q: "Can I ask about hosting an event?",
    a: "Of course. Villa Konsuela has space for birthdays, reunions and other gatherings. Contact us with your plans and we will help you set it up.",
  },
];

export default function Faq() {
  return (
    <section className="bg-[var(--linen)] py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-[var(--clay)]">
            GOOD TO KNOW
          </p>
          <h2 className="font-heading mt-4 text-4xl font-semibold leading-tight text-[var(--navy)] md:text-5xl">
            Questions before your stay.
          </h2>
          <p className="mt-6 text-[var(--ink)]/85">
            Contact us and we&rsquo;ll help with dates, rooms, and packages
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-sm bg-[var(--cream)] shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 font-semibold text-[var(--navy)] [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  aria-hidden
                  size={22}
                  className="shrink-0 text-[var(--clay)] transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="px-7 pb-6 text-sm text-[var(--ink)]/80">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
