import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation} from "@apollo/client";
import { CREATE_PRODUCT } from "../../graphql/mutations";
import "./AddProduct.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const AddProduct = () => {
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
      const images = imgUrls
        .map((url) => url.trim())
        .filter(Boolean);

      const input = {
        name,
        price: parseFloat(price),
        ...(description && { description }),
        ...(year && { year: parseInt(year) }),
        ...(author && { author }),
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

         {!isAdded && (
  <button className="go-back-button" onClick={handleGoBack}>
    ← Повернутись назад
  </button>
)}

      <h1>Додати новий товар</h1>

      {error && <p className="error">❌ {error.message}</p>}

      {!isAdded ? (
        <form onSubmit={handleSubmitForm} className="form">
<div className="images-inputs">
            {imgUrls.map((url, index) => (
              <div key={index} className="image-input">
                <input
                  type="text"
                  placeholder={`ImgUrl ${index + 1}`}
                  value={url}
                  onChange={(e) =>
                    handleImgChange(index, e.target.value)
                  }
                />

                 

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

          Назва
          <input
            type="text"
            placeholder="Назва"
            value={name}
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            required
          />
          Автор
          <input
            type="text"
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          Ціна, грн
          <input
            type="number"
            placeholder="Ціна"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          Рік видання
          <input
            type="number"
            placeholder="Рік видання"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          Опис
          <textarea 
            type="text"
            placeholder="Опис"
            value={description}
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
          />

          
              Наявність
              <select  
            name="availability" 
            defaultValue="Уточнюйте" 
            >
<option value="Є в наявності">Є в наявності</option>
<option value="Немає в наявності">Немає в наявності</option>
<option value="Під замовлення">Під замовлення</option>
</select>
   

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
          <button onClick={() => navigate("/")}>
            Повернутися на головну
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
