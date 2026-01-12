import React from "react";
import Product from "./Product";
import "./ProductList.css";

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

// import React from "react";

// const ProductsList = ({ products, onEdit }) => {
//   if (!products.length) {
//     return <p>Товари відсутні</p>;
//   }

//   return (
//     <ul>
//       {products.map((prod) => (
//         <li key={prod.id} style={{ marginBottom: "10px" }}>
//           <strong>{prod.name}</strong> — {prod.author} — {prod.price}₴
//           <button onClick={() => onEdit(prod)}>✏️ Редагувати</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ProductsList;


