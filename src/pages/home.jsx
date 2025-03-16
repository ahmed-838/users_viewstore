import HelloBanner from "@/components/HelloBanner/page";
import Categories from "@/components/Categories/page";
import Offers from "@/components/Offers/page";
import Footer from "@/components/Footer/page";

export default function Home() {
  return (
    <div>
      <HelloBanner />
      <Categories />
      <Offers />
      <Footer />
    </div>
  );
}