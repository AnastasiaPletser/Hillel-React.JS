import HeroBanner from "./HeroBanner/HeroBanner.jsx"
import InfoSection from "./InfoSection/InfoSection.jsx"
import ProductCatalog from "./ProductCatalog/ProductCatalog.jsx";

export default function Home() {
  return (
    <div className="home">
      <HeroBanner/>
      <InfoSection/>
      <ProductCatalog/>
    </div>
  );
}
