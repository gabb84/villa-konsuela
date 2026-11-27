import CateringHero from "@/components/catering/CateringHero";
import CateringPackages from "@/components/catering/CateringPackages";
import CateringProcess from "@/components/catering/CateringProcess";
import CateringContactCTA from "@/components/catering/CateringContactCTA";

export default function CateringContent() {
  return (
    <>
      <CateringHero />
      <CateringPackages />
      <CateringProcess />
      <CateringContactCTA />
    </>
  );
}