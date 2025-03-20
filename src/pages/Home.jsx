import { useState, useCallback, useEffect } from "react";
import Product from "../components/Product/Product";
import ImageSlider from "../components/ImageSlider/ImageSlider";
// import ProductList from '../components/Product/ProductList';
import Input from "../components/Input/Input"; 

import "../index.css";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState(null);

  const fetchAllProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const url = new URL(
      "https://64b70476df0839c97e165d10.mockapi.io/api/id/products"
    );
    url.searchParams.append("limit", "10");
    url.searchParams.append("page", page);
    url.searchParams.append("sortBy", sort);
    url.searchParams.append("order", order);
  

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again later.");
        
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); 
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);  
    } finally {
      setIsLoading(false);
    }
  }, [page, sort, order]);

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
      setFilteredProducts((prevProducts) => [data, ...prevProducts]); 
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
    <div className="home">
    <ImageSlider />
    <div className="main-content"> 
    <div className="aside">
    <div>
    <div className="add-product">
        <button
          onClick={() => setIsAdding(true)}
          disabled={isLoading}
        >
          Додати товар
        </button>
      </div>

      <div className="search-container">
       <Input 
       type="text"
       value={searchQuery} 
       onChange={handleSearchChange} 
       placeholder="Пошук..."
       className="search-input"/>       
      </div>
      <div>
           <div className="search-container">
          <p>Фільтри:</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Назва</option>
            <option value="year">Рік видання</option>
            <option value="price">Ціна</option>
            <option value="author">Автор</option>
          </select>
        
        <div>
        <p>Сортування:</p>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">За зростанням</option>
            <option value="desc">За спаданням</option>
          </select>
         </div> 
        </div>
      </div>
     
      </div>
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
          filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              onUpdate={fetchAllProducts}
              product={product}
            />
          ))}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}
      </div>
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
   </div>
    </>
  );
}

function AddProductForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    author: "",
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
      <h3>Додати товар</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Назва"
        maxLength={50}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Опис"
        maxLength={200}
      />
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Рік видання"
        maxLength={50}
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Автор"
        maxLength={50}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Ціна"
        min="0"
        step="0.01"
        required
      />
      <input
        type="text"
        name="imgUrl"
        value={formData.imgUrl}
        onChange={handleChange}
        placeholder="Посилання на картинку"
      />
      <button type="submit">Додати</button>
      <button type="button" onClick={onCancel}>
        Скасувати
      </button>
    </form>
  );
}

