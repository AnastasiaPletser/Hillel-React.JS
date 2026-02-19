import { useState, useEffect } from "react";
import Products from "../Product/ProductList.jsx";
import "./PaginatedProducts.css";

export default function PaginatedProducts({ products, productsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [productsPerPage]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginated-products">
      <div className="products-grid">
        <Products products={currentProducts} />
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
}
