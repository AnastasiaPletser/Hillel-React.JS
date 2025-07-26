import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CreateAddProduct from "../../components/AddProduct/AddProduct";
import Home from "../Home";

const Admin = () => {
  const [addProductVisible, setAddProductVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <p>Admin.js</p>
      <Home />

      <CreateAddProduct
        show={addProductVisible}
        onHide={() => setAddProductVisible(false)}
      />
    </Container>
  );
};

export default Admin;
