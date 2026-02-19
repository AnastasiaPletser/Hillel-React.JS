import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../graphql/mutations";
import "./addProduct.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [imgUrls, setImgUrls] = useState([""]);
  const [isAdded, setIsAdded] = useState(false);

  const navigate = useNavigate();

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const resetForm = () => {
    setName("");
    setDescription("");
    setYear("");
    setPrice("");
    setAuthorName("");
    setImgUrls([""]);
  };

  const handleImgChange = (index, value) => {
    const newImgs = [...imgUrls];
    newImgs[index] = value;
    setImgUrls(newImgs);
  };

  const handleRemoveImg = (indexToRemove) => {
    setImgUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const addImageField = () => {
    setImgUrls([...imgUrls, ""]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const images = imgUrls.map((url) => url.trim()).filter(Boolean);

      const input = {
        name,
        price: parseFloat(price),
        ...(description && { description }),
        ...(year && { year: parseInt(year) }),
        ...(authorName && { authorName }),
        imgUrl: images.length > 0 ? images : [NO_IMAGE_PLACEHOLDER],
      };

      await createProduct({ variables: { input } });
      setIsAdded(true);
    } catch (err) {
      console.error("Помилка при додаванні товару:", err);
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="add-product">
      {!isAdded ? (
        <form onSubmit={handleSubmitForm} className="form">
          <button className="go-back" onClick={handleGoBack}>
            ✕
          </button>

          <h1 className="addNewProduct">Додати новий товар</h1>
          {error && <p className="error">❌ {error.message}</p>}

          <label> Назва</label>
          <input
            type="text"
            placeholder="Назва"
            value={name}
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label> Автор</label>
          <input
            type="text"
            placeholder="Автор"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <label> Ціна, грн</label>
          <input
            type="number"
            placeholder="Ціна"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label> Рік видання</label>
          <input
            type="number"
            placeholder="Рік видання"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <label> Опис</label>
          <textarea
            type="text"
            placeholder="Опис"
            value={description}
            maxlength={2000}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label> Наявність</label>
          <select name="availability" defaultValue="Уточнюйте">
            <option value="Є в наявності">Є в наявності</option>
            <option value="Немає в наявності">Немає в наявності</option>
            <option value="Під замовлення">Під замовлення</option>
          </select>

          <div className="images-inputs">
            {imgUrls.map((url, index) => (
              <div key={index} className="image-input">
                <div className="image-input__field">
                  <input
                    type="text"
                    placeholder={`Зображення ${index + 1}`}
                    value={url}
                    onChange={(e) => handleImgChange(index, e.target.value)}
                  />

                  {imgUrls.length > 1 && (
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={() => handleRemoveImg(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <img
                  src={url || NO_IMAGE_PLACEHOLDER}
                  alt="preview"
                  className="product-card__image"
                  onError={(e) => {
                    e.target.src = NO_IMAGE_PLACEHOLDER;
                  }}
                />
              </div>
            ))}

            <button type="button" onClick={addImageField}>
              + Додати ще картинку
            </button>
          </div>
          <button className="buttonAddProduct" type="submit" disabled={loading}>
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

export default AddProduct;
