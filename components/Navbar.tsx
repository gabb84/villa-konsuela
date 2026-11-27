"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/amenities", label: "Amenities" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Contact" },
];

const subscribeToScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const getScrolledSnapshot = () => window.scrollY > 40;
const getServerSnapshot = () => false;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolledSnapshot,
    getServerSnapshot
  );

  const linkClass = (href: string) => {
    const active = pathname === href;
    if (scrolled) {
      return active
        ? "border-b-2 border-[var(--clay)] pb-1 font-semibold text-[var(--ink)]"
        : "text-[var(--ink)]/80 transition-colors hover:text-[var(--clay)]";
    }
    return active
      ? "border-b-2 border-[var(--gold)] pb-1 text-[var(--gold)]"
      : "text-white transition-colors hover:text-[var(--gold)]";
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className={`font-heading text-3xl font-semibold transition-colors ${
            scrolled ? "text-[var(--ink)]" : "text-white"
          }`}
        >
          Villa Konsuela
        </Link>

        <ul className="hidden items-center gap-8 text-xs font-medium tracking-wider uppercase md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`rounded px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors ${
                scrolled
                  ? "bg-[var(--clay)] hover:bg-[var(--brown)]"
                  : "bg-[var(--brown)] hover:bg-[var(--clay)]"
              }`}
            >
              Book Now
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className={`transition-colors md:hidden ${
            scrolled ? "text-[var(--ink)]" : "text-white"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <ul
          className={`mx-4 flex flex-col gap-1 rounded p-4 shadow-lg md:hidden ${
            scrolled
              ? "border border-[var(--sand)] bg-white text-[var(--ink)]"
              : "bg-[var(--brown)] text-white"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === l.href
                    ? scrolled
                      ? "font-semibold text-[var(--clay)]"
                      : "text-[var(--gold)]"
                    : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`mt-2 block rounded px-4 py-2 text-center text-sm font-semibold ${
                scrolled
                  ? "bg-[var(--clay)] text-white"
                  : "bg-[var(--gold)] text-[var(--ink)]"
              }`}
            >
              Book Now
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
