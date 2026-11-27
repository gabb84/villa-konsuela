import type { Metadata } from "next";
import CateringContent from "@/components/catering/CateringContent";

export const metadata: Metadata = {
  title: "Catering Packages | Villa Konsuela",
  description:
    "Ask Villa Konsuela about catering options for your villa stay, celebration, or event in Concepcion, Tarlac.",
};

export default function CateringPage() {
  return <CateringContent />;
}