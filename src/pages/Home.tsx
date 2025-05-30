import { HeroBanner } from "@/components/HeroBanner";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { TrendingProducts } from "@/components/TrendingProducts";
import { NewArrivals } from "@/components/NewArrivals";
import { Testimonials } from "@/components/Testimonials";
import { ArtisanCTA } from "@/components/ArtisanCTA";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <TrendingProducts />
      <NewArrivals />
      <Testimonials />
      <ArtisanCTA />
      <div id="google_translate_element"></div>
    </>
  );
} 