// Server-only storage. Bookings live in data/bookings.json and payment
// screenshots in data/uploads/. Works on your computer or a normal server,
// NOT on Vercel (its disk is read-only). Use a real database for Vercel.
import { promises as fs } from "fs";
import path from "path";
import { randomInt, randomUUID } from "crypto";

export type BookingStatus = "pending" | "approved" | "rejected";

export interface Booking {
  id: string;
  code: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  name: string;
  email: string;
  phone: string;
  total: number;
  downpayment: number;
  amountPaid: number;
  refNo: string;
  proofFile: string;
  status: BookingStatus;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
}

export class BookingError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "bookings.json");
const UPLOADS = path.join(DATA_DIR, "uploads");

// One write at a time, so two guests can never take the same dates.
let queue: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

export async function readAll(): Promise<Booking[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Booking[];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e; // never treat a damaged file as empty, we would erase bookings
  }
}

async function writeAll(list: Booking[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  await fs.rename(tmp, FILE);
}

const overlaps = (
  a: { checkIn: string; checkOut: string },
  b: { checkIn: string; checkOut: string }
) => a.checkIn < b.checkOut && b.checkIn < a.checkOut;

// Pending and approved bookings both hold the dates.
const holds = (b: Booking) => b.status !== "rejected";

export async function bookedRanges(roomId: string) {
  return (await readAll())
    .filter((b) => b.roomId === roomId && holds(b))
    .map((b) => ({ checkIn: b.checkIn, checkOut: b.checkOut }));
}

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const makeCode = () =>
  "VK-" +
  Array.from({ length: 6 }, () => CODE_CHARS[randomInt(CODE_CHARS.length)]).join("");

type NewBooking = Omit<
  Booking,
  "id" | "code" | "proofFile" | "status" | "adminNote" | "createdAt" | "updatedAt"
>;

export function createBooking(
  input: NewBooking,
  proof: { buffer: Buffer; ext: string }
) {
  return withLock(async () => {
    const list = await readAll();

    if (list.some((b) => b.roomId === input.roomId && holds(b) && overlaps(b, input)))
      throw new BookingError(
        "Sorry, those dates were just taken. Please pick other dates.",
        409
      );
    if (list.some((b) => b.refNo === input.refNo))
      throw new BookingError(
        "This GCash reference number was already used for another booking.",
        409
      );

    const id = randomUUID();
    const proofFile = `${id}.${proof.ext}`;
    await fs.mkdir(UPLOADS, { recursive: true });
    await fs.writeFile(path.join(UPLOADS, proofFile), proof.buffer);

    let code = makeCode();
    while (list.some((b) => b.code === code)) code = makeCode();

    const now = new Date().toISOString();
    const booking: Booking = {
      ...input,
      id,
      code,
      proofFile,
      status: "pending",
      adminNote: "",
      createdAt: now,
      updatedAt: now,
    };
    await writeAll([...list, booking]);
    return booking;
  });
}

export function setStatus(id: string, status: BookingStatus, note: string) {
  return withLock(async () => {
    const list = await readAll();
    const b = list.find((x) => x.id === id);
    if (!b) throw new BookingError("Booking not found.", 404);
    if (
      status === "approved" &&
      list.some(
        (o) =>
          o.id !== b.id &&
          o.roomId === b.roomId &&
          o.status === "approved" &&
          overlaps(o, b)
      )
    )
      throw new BookingError(
        "Cannot approve: another approved booking has these dates.",
        409
      );
    b.status = status;
    b.adminNote = note;
    b.updatedAt = new Date().toISOString();
    await writeAll(list);
    return b;
  });
}

export async function findByCode(code: string) {
  return (await readAll()).find((b) => b.code === code.trim().toUpperCase());
}

export async function readProof(b: Booking) {
  return fs.readFile(path.join(UPLOADS, path.basename(b.proofFile)));
}
