import React from "react";
import Product from "./Product";
import "./productList.css";

const ProductList = ({ products }) => {
  return (
    <div className="product_list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      
    </div>
  );
};

export default ProductList;




