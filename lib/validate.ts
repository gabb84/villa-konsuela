export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// Accepts 09xx xxx xxxx, +63 9xx xxx xxxx, 639xxxxxxxxx. Returns 09xxxxxxxxx.
export function normalizePhone(s: string) {
  let d = s.replace(/\D/g, "");
  if (d.startsWith("63")) d = "0" + d.slice(2);
  return /^09\d{9}$/.test(d) ? d : "";
}

// GCash reference numbers are digits only (shown with spaces in the app).
export function normalizeRef(s: string) {
  const d = s.replace(/\s/g, "");
  return /^\d{10,16}$/.test(d) ? d : "";
}
