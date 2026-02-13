import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        paddingRight: "20px",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
     <h3>Разом: {total}грн.</h3>
    </div>
  );
};

export default CartSummary;
