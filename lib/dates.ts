// Dates are plain "YYYY-MM-DD" strings. All math is done in UTC so the
// visitor's time zone can never shift a date by one day.

export const toKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const parse = (k: string) => {
  const [y, m, d] = k.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

export function isDateKey(s: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(parse(s));
  return toKey(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) === s;
}

export const nightsBetween = (a: string, b: string) =>
  Math.round((parse(b) - parse(a)) / 86400000);

export function addDays(k: string, n: number) {
  const d = new Date(parse(k) + n * 86400000);
  return toKey(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

// Every night of a stay: check-in day up to (not including) check-out day.
export function eachNight(checkIn: string, checkOut: string) {
  const out: string[] = [];
  for (let k = checkIn; k < checkOut; k = addDays(k, 1)) out.push(k);
  return out;
}

export const todayManila = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(
    new Date()
  );

export const formatDate = (k: string) =>
  new Date(parse(k)).toLocaleDateString("en-PH", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatPeso = (n: number) => `₱${n.toLocaleString("en-PH")}`;
