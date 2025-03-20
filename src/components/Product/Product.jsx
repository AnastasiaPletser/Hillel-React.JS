import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../../index.css";
// import "../Product/Product.scss";

const Product = ({ product, onUpdate }) => {
  const { imgUrl, name, description, year, price, author, id } = product;
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ imgUrl, name, description, year, price, author });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleEditToggle = () => {
    setEditData({ imgUrl, name, description, year, price, author });
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`https://64b70476df0839c97e165d10.mockapi.io/api/id/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Помилка оновлення товару");
      await res.json();
      await onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Помилка оновлення:", error.message);
      alert("Не вдалося зберегти зміни. Спробуйте ще раз.");
    }
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`https://64b70476df0839c97e165d10.mockapi.io/api/id/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Помилка видалення товару");
      await res.json();
      await onUpdate();
    } catch (error) {
      console.error("Помилка видалення:", error.message);
      alert("Не вдалося видалити товар. Спробуйте ще раз.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <div className="edit-form">
          <img src={editData.imgUrl} alt="Preview" className="edit-image-preview" />
          <input
            type="text"
            name="imgUrl"
            value={editData.imgUrl}
            onChange={handleInputChange}
            placeholder="URL зображення"  
          />
          <input type="text" name="name" value={editData.name} onChange={handleInputChange} placeholder="Назва" />
          <textarea name="description" value={editData.description} onChange={handleInputChange} placeholder="Опис" />
          <input type="text" name="year" value={editData.year} onChange={handleInputChange} placeholder="Рік видання" />
          <input type="text" name="author" value={editData.author} onChange={handleInputChange} placeholder="Автор" />
          <input type="number" name="price" value={editData.price} onChange={handleInputChange} placeholder="Ціна" />
          <div className="edit-buttons">
            <button onClick={handleSaveChanges}>Зберегти</button>
            <button onClick={handleEditToggle}>Скасувати</button>
          </div>
        </div>
      ) : (
        <div className="product-content">
          <img src={imgUrl} alt={name} className="product-card__image" onClick={handleClick} />
          <div className="product-info">
            {/* <h4>{name}</h4> */}
            <p>Автор: {author}</p>
            {/* <p>Опис: {description}</p> */}
            <p>Рік видання: {year}</p>
            <h6>Ціна: {price} грн.</h6>
          </div>
          <div className="product-buttons">
            <button className="add-cart-btn" onClick={() => addToCart(product)}>Додати у кошик</button>
            <button className="edit-btn" onClick={handleEditToggle}>Редагувати</button>
            <button className="delete-btn" onClick={handleDeleteProduct} disabled={isDeleting}>
              {isDeleting ? "Видаляю..." : "Видалити"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
