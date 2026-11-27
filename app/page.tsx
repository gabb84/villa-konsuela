import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Highlights from "@/components/home/Highlights";
import Amenities from "@/components/home/Amenities";
import SharedMeals from "@/components/home/SharedMeals";
import Gallery from "@/components/home/Gallery";
import Faq from "@/components/home/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Amenities />
      <SharedMeals />
      <Gallery />
      <Faq />
    </>
  );
}
