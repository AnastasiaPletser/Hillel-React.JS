import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import EditProduct from "../../../components/EditProduct/EditProduct.js";
import { GET_ALL_PRODUCTS } from "../../../graphql/query.js";
import { REMOVE_PRODUCT } from "../../../graphql/mutations.js";
import { useNavigate } from "react-router-dom";
import { ADD_PRODUCT_ROUTE } from "../../../utils/consts.js";

import "./manageProducts.scss";

const ManageProducts = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);

  const [removeProduct] = useMutation(REMOVE_PRODUCT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.products || [];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.id));
    }
  };

  const onDeleteProduct = async (id) => {
    if (!window.confirm("Видалити товар?")) return;

    try {
      await removeProduct({
        variables: { id },
      });

      refetch();
      setSelected((prev) => prev.filter((x) => x !== id));
    } catch (err) {
      console.error(err);
      alert("Потрібна авторизація для видалення товару");
    }
  };

  const onDeleteSelected = async () => {
    if (!selected.length) return;

    const confirmed = window.confirm(
      `Ви впевнені, що хочете видалити ${selected.length} товар(и)?`,
    );
    if (!confirmed) return;

    try {
      await Promise.all(
        selected.map((id) =>
          removeProduct({
            variables: { id },
          }),
        ),
      );

      refetch();
      setSelected([]);

      alert(`Товар(и) успішно видалено`);
    } catch (err) {
      console.error(err);
      alert("Потрібна авторизація для видалення товарів");
    }
  };

  if (editingProduct) {
    return (
      <Container className="manage-products">
        <EditProduct
          productId={editingProduct}
          onUpdated={() => {
            setEditingProduct(null);
          }}
          onClose={() => setEditingProduct(null)}
        />
      </Container>
    );
  }

  return (
    <Container fluid className="manage-products">
      <div className="top-actions">
        <div className="delete-selected" onClick={onDeleteSelected}>
          Видалити вибране {selected.length > 0 && `(${selected.length})`}
        </div>

        <button
          onClick={() => navigate(ADD_PRODUCT_ROUTE)}
          className="add-product"
        >
          + Додати продукт
        </button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th className="checkbox">
              <input
                type="checkbox"
                checked={
                  selected.length === products.length && products.length > 0
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th>Назва товару</th>
            <th>Ціна</th>
            <th>Автор</th>
            <th>Наявність</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>

        <tbody>
          {products.map((prod) => {
            const img = prod.imgUrl?.[0] || "/placeholder.jpg";

            return (
              <tr key={prod.id}>
                <td className="checkbox">
                  <input
                    type="checkbox"
                    checked={selected.includes(prod.id)}
                    onChange={() => toggleSelect(prod.id)}
                  />
                </td>

                <td>
                  <div className="product-cell">
                    <img src={img} alt={prod.name} />
                    <span className="name">{prod.name}</span>
                  </div>
                </td>

                <td className="price">
                  {prod.price} грн
                  {prod.oldPrice && (
                    <div className="old-price">{prod.oldPrice} грн</div>
                  )}
                </td>

                <td>
                  <div className="product-author">
                    <span className="name">{prod.authorName}</span>
                  </div>
                </td>

                <td>{prod.quantity || "В наявності"} </td>

                <td>
                  <span
                    className={`status ${
                      prod.status === "PUBLISHED" ? "published" : "rejected"
                    }`}
                  >
                    {prod.status === "PUBLISHED" ? "Опубліковано" : "Відхилено"}
                  </span>
                </td>

                <td className="actions">
                  <button
                    title="Редагувати"
                    onClick={() => setEditingProduct(prod.id)}
                  >
                    ✏️
                  </button>
                  <button
                    title="Видалити"
                    onClick={() => onDeleteProduct(prod.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export default ManageProducts;
