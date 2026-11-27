import { PartyPopper, Utensils, Users } from "lucide-react";

const steps = [
  { icon: Utensils, title: "Choose a starting point", copy: "Pick a stay, celebration, or custom event package." },
  { icon: Users, title: "Share your details", copy: "Tell us your preferred date and approximate group size." },
  { icon: PartyPopper, title: "Confirm together", copy: "Discuss menu choices, service style, and the final quote." },
];

export default function CateringProcess() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--clay)]">A simple first step</p>
          <h2 className="font-heading mt-3 text-4xl font-semibold text-[var(--brown)] md:text-5xl">
            How catering inquiries work
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="rounded-xl border border-[var(--brown)]/10 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--linen)] text-[var(--brown)]">
                <Icon size={20} aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-bold tracking-widest text-[var(--clay)]">STEP 0{index + 1}</p>
              <h3 className="font-heading mt-1 text-2xl font-semibold text-[var(--brown)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--ink)]/75">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}