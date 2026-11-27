import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vk_admin";
const secret = () => process.env.ADMIN_PASSWORD ?? "";

// Admin stays off until ADMIN_PASSWORD (6+ characters) is set in .env.local
export const adminEnabled = () => secret().length >= 6;

const sign = (payload: string) =>
  createHmac("sha256", secret() + "|villa").update(payload).digest("hex");

const digest = (s: string) => createHash("sha256").update(s).digest();

export function passwordOk(input: string) {
  return adminEnabled() && timingSafeEqual(digest(input), digest(secret()));
}

export function makeToken() {
  const exp = String(Date.now() + 8 * 60 * 60 * 1000); // 8 hours
  return `${exp}.${sign(exp)}`;
}

function tokenOk(token?: string) {
  if (!token || !adminEnabled()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !(Number(exp) > Date.now())) return false;
  const a = Buffer.from(sign(exp));
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  return tokenOk((await cookies()).get(ADMIN_COOKIE)?.value);
}
