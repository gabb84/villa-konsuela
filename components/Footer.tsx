import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--brown)] text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
        <p className="font-heading text-2xl font-semibold text-white">
            Villa Konsuela
        </p> 

        <p className="text-sm">Sampaguita 4 Brgy. Talimundoc SM Concepcion Tarlac, Tarlac, Philippines, 2316</p>
        </div>

        <div>
          <p className="font-semibold text-white">Plan your stay</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/rooms" className="hover:text-[var(--gold)]">Rooms</Link></li>
            <li><Link href="/amenities" className="hover:text-[var(--gold)]">Amenities</Link></li>
            <li><Link href="/catering" className="hover:text-[var(--gold)]">Catering</Link></li>
            <li><Link href="/gallery" className="hover:text-[var(--gold)]">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Get in touch</p>
          {/* TODO: replace with the client's real phone and email */}
          <ul className="mt-3 space-y-2 text-sm">
            <li>0981 666 9906</li>
            <li>mallarianiramae@gmail.com</li>
          </ul>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded bg-[var(--clay)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--gold)] hover:text-[var(--ink)]"
          >
            Book Now
          </Link>
        </div>

        <div>
          <p className="font-semibold text-white">Follow us</p>

          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://www.facebook.com/profile.php?id=100082354120696" className="hover:text-[var(--gold)]">Facebook</a></li>
            <li><a href="https://www.google.com/maps/place/Villa+Konsuela+Resort+and+Event+Place/@15.350803,120.6554986,936m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3396c30010bc1f1d:0xf09c6476e7075a76!8m2!3d15.350803!4d120.6580735!16s%2Fg%2F11xgqzg5pq?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D" className="hover:text-[var(--gold)]">Google Maps</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>&copy; 2026 Villa Konsuela. All rights reserved.</p>
          <p>Philippines</p>
        </div>
      </div>
    </footer>
  );
}