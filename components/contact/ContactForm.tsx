"use client";

import { useState } from "react";
import { Send } from "lucide-react";

// TODO: replace with the client's real email
const CLIENT_EMAIL = "mallarianiramae@gmail.com";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white px-4 py-3.5 text-base text-[var(--ink)] placeholder:text-[var(--ink)]/45 transition focus:border-[var(--gold)] focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/30";

const labelClass =
  "mb-1.5 block text-sm font-semibold tracking-wide text-white/90";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  // No backend yet: opens the visitor's email app with the message filled in.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Inquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    setSent(true);
    window.location.href = `mailto:${CLIENT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[#142a42] p-8 shadow-2xl ring-1 ring-white/10 md:p-10"
    >
      <h3 className="font-heading text-4xl font-semibold text-white md:text-5xl">
        Send us a message
      </h3>
      <div className="mt-3 h-1 w-16 rounded bg-[var(--gold)]" />

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Juan Dela Cruz"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="you@email.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="09XX XXX XXXX"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={update("message")}
            placeholder="Tell us what you need…"
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gold)] px-4 py-4 text-sm font-bold uppercase tracking-widest text-[var(--ink)] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
        >
          <Send size={18} aria-hidden="true" /> Send now
        </button>

        {sent && (
          <p role="status" className="text-center text-sm text-white/85">
            Opening your email app. Please press send there to finish.
          </p>
        )}
      </div>
    </form>
  );
}
