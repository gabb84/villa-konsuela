import type { Metadata } from "next";
import RoomsHero from "@/components/rooms/RoomsHero";
import RoomsBrowser from "@/components/rooms/RoomsBrowser";

export const metadata: Metadata = {
  title: "Rooms | Villa Konsuela",
  description:
    "Explore the air-conditioned rooms and villa stays at Villa Konsuela in Concepcion, Tarlac.",
};

export default function RoomsPage() {
  return (
    <>
      <RoomsHero />
      <RoomsBrowser />
    </>
  );
}
