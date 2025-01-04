import { useState, useCallback, useEffect } from "react";
import Product from "./components/Product";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const url = new URL(
      "https://64b70476df0839c97e165d10.mockapi.io/api/id/products"
    );
    url.searchParams.append("limit", "10");
    url.searchParams.append("page", page);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again later.");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleAddProduct = async (newProduct) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://64b70476df0839c97e165d10.mockapi.io/api/id/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to add product. Please try again.");
      }
      const data = await res.json();
      setProducts((prevProducts) => [data, ...prevProducts]);
      setIsAdding(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="add-product">
        <button onClick={() => setIsAdding(true)}>Add Product</button>
      </div>

      {isAdding && (
        <div className="modal">
          <AddProductForm
            onAdd={handleAddProduct}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      {isLoading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      <div className="products-list">
        {!isLoading &&
          !error &&
          products.length > 0 &&
          products.map((product) => (
            <Product
              key={product.id}
              onUpdate={fetchAllProducts}
              product={product}
            />
          ))}
        {!isLoading && !error && products.length === 0 && (
          <p>No products found.</p>
        )}
      </div>

      <div className="navigation">
        <button
          disabled={page === 1 || isLoading}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev page
        </button>
        <button
          disabled={products.length < 10 || isLoading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>
    </>
  );
}

function AddProductForm({ onAdd, onCancel }) {
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
        placeholder="Name (optional)"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category (optional)"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (optional)"
      />
      <input
        type="text"
        name="imgUrl"
        value={formData.imgUrl}
        onChange={handleChange}
        placeholder="Image URL (optional)"
      />
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
