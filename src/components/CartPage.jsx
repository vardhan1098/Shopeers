import React from "react";
import { useCart } from "./CartContext";
import "../styles/CartPage.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartState, removeFromCart } = useCart();
  const cartItems = cartState.items;

  console.log("cartItems:", cartItems);
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      // Check if the item has the quantity property
      if (item.quantity !== undefined) {
        return total + item.price * item.quantity;
      } else {
        console.error(`Item ${item.id} is missing the quantity property.`);
        return total;
      }
    }, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <p>Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
          </div>
          <Link to="/checkout" className="check">
            <button>CheckOut</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
