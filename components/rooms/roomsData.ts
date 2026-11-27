export interface Room {
  id: string;
  name: string;
  beds: string;
  maxGuests: number;
  cooling: string;
  highlight: string;
  image: string;
  alt: string;
}


export const rooms: Room[] = [
  {
    id: "room-1",
    name: "Room 1",
    beds: "2 Full Bed & 1 Double Deck",
    maxGuests: 4,
    cooling: "Air Conditioned",
    highlight: "Poolside View",
    image: "/images/rooms.jpg",
    alt: "Room 1 with two full beds and poolside access",
  },
  {
    id: "room-2",
    name: "Room 2",
    beds: "3 Double Deck Bed",
    maxGuests: 6,
    cooling: "Air Conditioned",
    highlight: "Poolside View",
    image: "/images/rooms.jpg",
    alt: "Room 2 group room with double deck beds",
  },
  {
    id: "room-3",
    name: "Room 3",
    beds: "2 Full Bed",
    maxGuests: 4,
    cooling: "Air Conditioned",
    highlight: "Smart TV",
    image: "/images/rooms.jpg",
    alt: "Room 3 loft bedroom with two full beds and arched windows",
  },
  {
    id: "room-4",
    name: "Room 4",
    beds: "2 Full Bed & 1 Double Deck",
    maxGuests: 4,
    cooling: "Air Conditioned",
    highlight: "Poolside View",
    image: "/images/rooms.jpg",
    alt: "Room 4 with two full beds and poolside view",
  },
  {
    id: "room-5",
    name: "Room 5",
    beds: "3 Double Deck Bed",
    maxGuests: 6,
    cooling: "Air Conditioned",
    highlight: "Poolside View",
    image: "/images/rooms.jpg",
    alt: "Room 5 group room with double deck beds",
  },
  {
    id: "room-6",
    name: "Room 6",
    beds: "2 Full Bed",
    maxGuests: 4,
    cooling: "Air Conditioned",
    highlight: "Smart TV",
    image: "/images/rooms.jpg",
    alt: "Room 6 loft bedroom with two full beds and Smart TV",
  },
];
