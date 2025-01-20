import React, { useState } from "react";

export default function AddProduct({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Name and price are required!");
      return;
    }
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h3>Add New Product</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        maxLength={50}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        maxLength={200}
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        maxLength={50}
      />
      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Brand"
        maxLength={50}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        min="0"
        step="0.01"
        required
      />
      <input
        type="text"
        name="imgUrl"
        value={formData.imgUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
