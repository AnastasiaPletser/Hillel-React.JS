import ImageSlider from "../components/ImageSlider/ImageSlider";
import PaginatedProducts from "../components/PaginatedProducts/PaginatedProducts";

import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../graphql/query.js";

import "../index.css";
// import SideBar from "../components/SideBar/SideBar.jsx";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... :</p>;

  const { products = [] } = data;

  return (
    <div className="home">
      <ImageSlider />
      <div className="main-content">
        <div className="aside">ddddddddddddddddddddd</div>
        {/* <div className="sideBar"><SideBar /></div> */}
      </div>

      <div className="products-list">
        <PaginatedProducts products={products} productsPerPage={10} />
      </div>
    </div>
  );
}
