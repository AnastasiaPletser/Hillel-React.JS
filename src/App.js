import { useState, useCallback, useEffect } from "react";
import Product from "./components/Product";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchAllProducts = useCallback(async () => {
    const url = new URL(
      "https://64b70476df0839c97e165d10.mockapi.io/api/id/products"
    );
    url.searchParams.append("limit", "10");
    url.searchParams.append("page", page);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed fetch data");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [page]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
     
      <div className="products-list">
        {products.length > 0 &&
          products.map((product) => (
            <Product
              key={product.id}
              onUpdate={fetchAllProducts}
              product={product}
            />
          ))}
      </div>

      <div className="navigation">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev page
        </button>
        <button
          disabled={products.length < 10}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>

    </>
  );
}
