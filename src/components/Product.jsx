import React from "react";
import "../index.css";

const Product = (props) => {
  const { product, onUpdate } = props;
  const { imgUrl, name, description, category, price, id } = product;

  const handleDeleteProduct = async () => {
    const res = await fetch(
      `https://64b70476df0839c97e165d10.mockapi.io/api/id/products/${id}`,
      {
        method: "DELETE"
      }
    );
    const data = await res.json();
    console.log(data);
    await onUpdate();
  };

  return (
    <div className="product">
      <img src={imgUrl} alt={name} />
      <h4>{name}</h4>
      <p>{description}</p>
      <p>Category: {category}</p>

      <h6>{price} $</h6>
      <button onClick={handleDeleteProduct}>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default Product;

