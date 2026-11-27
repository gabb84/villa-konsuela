import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Villa Konsuela",
  description:
    "Contact Villa Konsuela in Concepcion, Tarlac for room rates, pool hours and event bookings.",
};

// TODO: replace with the client's real phone and email
const PHONE = "0981 666 9906";
const EMAIL = "mallarianiramae@gmail.com";
const MAPS_LINK =
  "https://www.google.com/maps/place/Villa+Konsuela+Resort+and+Event+Place/@15.350803,120.6554986,936m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3396c30010bc1f1d:0xf09c6476e7075a76!8m2!3d15.350803!4d120.6580735!16s%2Fg%2F11xgqzg5pq";

const infoCard =
  "flex items-start gap-5 rounded-2xl bg-[var(--cream)] p-6 shadow-md ring-1 ring-[var(--brown)]/10";
const iconBox =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--brown)] text-[var(--gold)]";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-[var(--sand)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-5xl font-semibold text-[var(--brown)] md:text-6xl">
              Get In Touch
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded bg-[var(--gold)]" />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink)]/85 md:text-lg">
              Have questions about room rates, pool hours, or event bookings?
              Send us a message and our team will gladly help you plan your
              stay.
            </p>
          </div>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-5">
              <div className={infoCard}>
                <span className={iconBox}>
                  <MapPin size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-[var(--brown)]">
                    Villa Location
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-[var(--ink)]">
                    Sampaguita 4 Brgy. Talimundoc, SM Concepcion, Tarlac,
                    Philippines, 2316
                  </p>
                </div>
              </div>

              <div className={infoCard}>
                <span className={iconBox}>
                  <Phone size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-[var(--brown)]">
                    Contact Number
                  </h3>
                  <p className="mt-1 text-base text-[var(--ink)]">Mobile No.</p>
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="text-lg font-semibold text-[var(--ink)] hover:text-[var(--clay)]"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

              <div className={infoCard}>
                <span className={iconBox}>
                  <Mail size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-[var(--brown)]">
                    Email Address
                  </h3>
                  <p className="mt-1 text-base text-[var(--ink)]">
                    We reply as soon as we can.
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-lg font-semibold text-[var(--ink)] hover:text-[var(--clay)]"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-4xl font-semibold text-[var(--brown)] md:text-5xl">
              Find Us
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded bg-[var(--gold)]" />
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl">
            <iframe
              title="Map to Villa Konsuela"
              src="https://www.google.com/maps?q=15.350803,120.6580735&z=16&output=embed"
              className="h-[380px] w-full border-0 md:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--brown)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[var(--clay)]"
            >
              Open in Google Maps <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
