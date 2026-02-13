import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import "../ProductDetails/ProductDetails.scss";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_PRODUCT_WITH_AUTHOR } from "../../graphql/query.js";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const { loading, error, data } = useQuery(GET_PRODUCT, {
  //   variables: { id },
  // });

  const { loading, error, data } = useQuery(GET_PRODUCT_WITH_AUTHOR, {
    variables: { id },
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">Помилка завантаження товару</p>;

  console.log(data)
  const { product } = data;
  if (!product) return <p>Товар не найден</p>;

  const images =
  Array.isArray(product.imgUrl) && product.imgUrl.length > 0
    ? product.imgUrl
    : product.imgUrl
    ? [product.imgUrl]
    : [];

  const handleGoBack = () => navigate(-1);
  const handleThumbnailClick = (index) => setCurrentImageIndex(index);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-details">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Повернутись до товарів
      </button>

      <div className="product-gallery">
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${
                index === currentImageIndex ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>

        <div className="main-image-container">
          <button className="nav-button left" onClick={handlePrevImage}>
            ❮
          </button>

          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="product-details__image"
          />

          <button className="nav-button right" onClick={handleNextImage}>
            ❯
          </button>
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p>Автор: {product.authorName}</p>
        <p>Автор: {product.authorId}</p>
        <p>Рік видання: {product.year}</p>

        <p className="product-details__description">
          {product.description}
        </p>

        <p className="product-details__price">
          {product.price} грн.
        </p>

        <button className="buy-button" onClick={() => addToCart(product)}>
          Додати у кошик
        </button>
      </div>
    </div>
  );
}

// import React, { useEffect, useState, useContext } from "react";
// import { CartContext } from "../../context/CartContext";
// import { useParams, useNavigate } from "react-router-dom";
// import "../ProductDetails/ProductDetails.scss";
// import { useQuery } from "@apollo/client";
// import { GET_PRODUCT } from "../../graphql/query.js";
// import EditProduct from "../../components/EditProduct/EditProduct.js";

// export default function ProductDetails() {
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [editing, setEditing] = useState(false);

//   const { id } = useParams();

//   const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
//     variables: { id },
//   });

//   if (loading) return <p>Загрузка...</p>;
//   if (error) return <p className="error">Ошибка загрузки</p>;

//   const product = data?.product;
//   if (!product) return <p>Товар не найден</p>;

//   const handleGoBack = () => navigate(-1);

//   /** ❗ ВРЕМЕННО: замени на реальную проверку роли */
//   const isAdmin = true;

//   return (
//     <div className="product-details">
//       <button className="go-back-button" onClick={handleGoBack}>
//         ← Повернутись до товарів
//       </button>

//       {/* 🔧 Режим редактирования */}
//       {editing ? (
//         <EditProduct
//           product={product}
//           onUpdated={() => {
//             setEditing(false);
//             refetch();
//           }}
//           onHide={() => setEditing(false)}
//         />
//       ) : (
//         <>
//           <div className="product-info">
//             <h1>{product.name}</h1>
//             <p>Автор: {product.author}</p>
//             <p>Рік видання: {product.year}</p>

//             <p className="product-details__description">
//               {product.description}
//             </p>

//             <p className="product-details__price">
//               {product.price} грн.
//             </p>

//             <button
//               className="buy-button"
//               onClick={() => addToCart(product)}
//             >
//               Додати у кошик
//             </button>

//             {/* ✏️ Кнопка редактирования */}
//             {isAdmin && (
//               <button
//                 className="edit-button"
//                 onClick={() => setEditing(true)}
//               >
//                 ✏️ Редагувати товар
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
