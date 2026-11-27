"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/amenities", label: "Amenities" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    pathname === href
      ? "text-[var(--gold)]"
      : "text-white transition-colors hover:text-[var(--gold)]";

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
      >
        <Link
          href="/"
          className="font-heading text-3xl font-semibold text-white"
        >
          Villa Konsuela
        </Link>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              className="rounded bg-[var(--brown)] px-4 py-2 text-white transition-colors hover:bg-[var(--clay)]"
            >
              Book Now
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <ul className="mx-4 flex flex-col gap-1 rounded bg-[var(--brown)] p-4 text-white shadow-lg md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-2 ${linkClass(l.href)}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded bg-[var(--gold)] px-4 py-2 text-center font-semibold text-[var(--ink)]"
            >
              Book Now
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}