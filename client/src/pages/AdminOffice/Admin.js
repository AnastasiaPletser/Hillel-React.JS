import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import SideBar from "../../components/SideBar/SideBar.jsx";
import ProductList from "../../components/Product/ProductList";
// import CreateAddProduct from "../../components/AddProduct/AddProduct";
import EditProduct from "../../components/EditProduct/EditProduct";
import { GET_ALL_PRODUCTS } from "../../graphql/query.js";

const Admin = () => {
  // const [addProductVisible, setAddProductVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { products = [] } = data;
  console.log("dsdfsfsdfsfsfsdf", products)

  return (
    <Container className="d-flex flex-column">
      <SideBar />

      {editingProduct ? (
        <EditProduct
          product={editingProduct}
          onUpdated={() => {
            setEditingProduct(null);
            refetch();
          }}
        />
      ) : (
        <>
          <ProductList products={products} />
          

          {/* <ul>
            {products.map((prod) => (
              <li key={prod.id} style={{ marginBottom: "10px" }}>
                <strong>{prod.name}</strong> — {prod.authorId} — {prod.price}₴
                <button onClick={() => setEditingProduct(prod)}>
                  ✏️ Редагувати
                </button>
              </li>
            ))}
          </ul> */}
        </>
      )}

      {/* <CreateAddProduct
        show={addProductVisible}
        onHide={() => setAddProductVisible(false)}
        onCreated={() => refetch()}
      /> */}

      {/* <button onClick={() => setAddProductVisible(true)}>Додати товар</button> */}
    </Container>
  );
};

export default Admin;


