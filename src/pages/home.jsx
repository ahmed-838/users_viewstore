import HelloBanner from "@/components/HelloBanner/page";
import Categories from "@/components/Categories/page";
import Offers from "@/components/Offers/page";
import Footer from "@/components/Footer/page";
import SectionDivider from "@/components/SectionDivider/page";
// import Testimonials from "@/components/Testimonials/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HelloBanner />
      
      <SectionDivider title="العروض المميزة" />
      <Offers />
        
      <SectionDivider title="تصنيفات المنتجات" />
      <Categories />
      
      {/* <SectionDivider title="آراء العملاء" />
      <Testimonials /> */}
      
      <Footer />
    </div>
  );
}