import { rooms } from "@/components/rooms/roomsData";

// ====== TODO: PALITAN ANG MGA ITO BAGO I-LAUNCH ======
// Ang GCash details ng may-ari. Dito magpapadala ng bayad ang guests.
export const GCASH_NUMBER = "09XX XXX XXXX";
export const GCASH_NAME = "Villa Konsuela (TODO: ilagay ang pangalan sa GCash)";

// SAMPLE na presyo kada gabi. Palitan ng totoong rates ng villa.
export const RATES: Record<string, number> = {
  "room-1": 3500,
  "room-2": 4500,
  "room-3": 3000,
  "room-4": 3500,
  "room-5": 4500,
  "room-6": 3000,
};
// =====================================================

export const DOWNPAYMENT_PERCENT = 50;
export const MAX_NIGHTS = 14;

export const getRoom = (id: string) => rooms.find((r) => r.id === id);

export function priceFor(roomId: string, nights: number) {
  const total = (RATES[roomId] ?? 0) * nights;
  const downpayment = Math.ceil((total * DOWNPAYMENT_PERCENT) / 100);
  return { total, downpayment };
}
