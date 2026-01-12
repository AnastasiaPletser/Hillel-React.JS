import React, { useContext } from "react";
// import { useMutation } from "@apollo/client";
// import { REMOVE_PRODUCT } from "../../graphql/mutations";
import { CartContext } from "../../context/CartContext";
import { PRODUCT_DETAILS_ROUTE } from "../../utils/consts";
import "../../index.css";

const Product = ({ product, refetch }) => {
  const { name, description, year, price, author } = product;
  const { addToCart } = useContext(CartContext);
 
  return (
    <div className="product-card">
      <div className="product-content">
        <a
          href={PRODUCT_DETAILS_ROUTE + "/" + product.id}
          className="products__image"
        >
          <img
            src={product.imgUrl[0]}
            alt={name}
            className="product-card__image"
          />
        </a>
        <div className="product-info">
          <h4>{name}</h4>
          <p>Автор: {author}</p>
          <p>Опис: {description}</p>
          <p>Рік видання: {year}</p>
          <h6>Ціна: {price} грн.</h6>
        </div>
        <div className="product-buttons">
          <button className="add-cart-btn" onClick={() => addToCart(product)}>
            Додати у кошик 1
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

