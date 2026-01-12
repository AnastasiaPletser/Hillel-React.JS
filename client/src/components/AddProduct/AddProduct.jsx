import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import "./AddProduct2.css";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      year
      price
      author
      imgUrl
      authorId
    }
  }
`;

const AddProduct2 = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");

  const [imgUrls, setImgUrls] = useState([""]);

  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const resetForm = () => {
    setName("");
    setDescription("");
    setYear("");
    setPrice("");
    setAuthor("");
    setImgUrls([""]);
  };

  const handleImgChange = (index, value) => {
    const newImgs = [...imgUrls];
    newImgs[index] = value;
    setImgUrls(newImgs);
  };

  const addImageField = () => {
    setImgUrls([...imgUrls, ""]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const placeholderImg = "https://via.placeholder.com/150";
      const input = {
        name,
        price: price ? parseFloat(price) : 0,
        ...(description && { description }),
        ...(year && { year: parseInt(year) }),
        ...(author && { author }),
        imgUrl:
          imgUrls.filter((url) => url.trim() !== "").length > 0
            ? imgUrls.filter((url) => url.trim() !== "")
            : [placeholderImg],
      };

      await createProduct({ variables: { input } });
      setIsAdded(true);
    } catch (err) {
      console.error("Помилка при додаванні товару:", err);
    }
  };

  return (
    <div className="add-product">
      <h1>Додати новий товар</h1>

      {error && <p style={{ color: "red" }}>❌ {error.message}</p>}

      {!isAdded ? (
        <form onSubmit={handleSubmitForm} className="form">
          <input
            type="text"
            placeholder="Назва"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="Ціна"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Рік видання"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />

          <div className="images-inputs">
            {imgUrls.map((url, index) => (
              <div key={index} className="image-input">
                <input
                  type="text"
                  placeholder={`ImgUrl ${index + 1}`}
                  value={url}
                  onChange={(e) => handleImgChange(index, e.target.value)}
                />
                {url && (
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    className="product-card__image"
                  />
                )}
              </div>
            ))}

            <button type="button" onClick={addImageField}>
              + Додати ще картинку
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Додаємо..." : "Додати товар"}
          </button>
        </form>
      ) : (
        <div className="after-submit">
          <p>✅ Товар успішно додано!</p>
          <button
            onClick={() => {
              resetForm();
              setIsAdded(false);
            }}
          >
            Додати ще
          </button>
          <button onClick={() => navigate("/")}>Повернутися на головну</button>
        </div>
      )}
    </div>
  );
};

export default AddProduct2;
