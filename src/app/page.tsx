import HeroSlider from "../sections/HeroSlider";
import AllProducts from "../sections/AllProducts";

export default async function HomePage() {
  return (
    <main className="px-4 md:px-0">
      <HeroSlider />
      <AllProducts />
    </main>
  );
}
