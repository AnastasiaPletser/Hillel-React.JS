import React, { useState, useContext } from "react";
import { CartContext } from '../../context/CartContext';
import "../../index.css";

const Product = (props) => {
  const { product, onUpdate } = props;
  const { imgUrl, name, description, category, price, brand, id } = product;

  const { addToCart } = useContext(CartContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name,
    description,
    category,
    price,
    brand,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditToggle = () => {
    setEditData({ name, description, category, price });
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(
        `https://64b70476df0839c97e165d10.mockapi.io/api/id/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      const data = await res.json();
      console.log("Updated product:", data);
      await onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `https://64b70476df0839c97e165d10.mockapi.io/api/id/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      const data = await res.json();
      console.log("Deleted product:", data);
      await onUpdate();
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
       
    <div className="product">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="category"
            value={editData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
           <input
            type="text"
            name="brand"
            value={editData.brand}
            onChange={handleInputChange}
            placeholder="Brand"
          />
          <input
            type="number"
            name="price"
            value={editData.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <button onClick={handleSaveChanges}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      ) : (
        <div>
          <img src={imgUrl} alt={name} />
          <h4>{name}</h4>
          <p>Опис: {description}</p>
          <p>Категорія: {category}</p>
          <p>Бренд: {brand}</p>
          <h6>Ціна: {price} $</h6>
          <button onClick={() => addToCart(product)}>Додати у кошик</button>
          <button onClick={handleEditToggle}>Pедагувати</button>
          <button onClick={handleDeleteProduct} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Видалити"}
          </button>
        </div>
      )}
    </div>
 
   
  );
};

export default Product;
