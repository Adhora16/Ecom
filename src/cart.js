import React from 'react';
import './cart.css';

const Cart = ({ cartItems, handleRemoveFromCart, handlePayment }) => {
  // Group cart items by product and calculate quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calculate total price
  const totalPrice = groupedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle removing one quantity at a time
  const handleRemoveSingleItem = (id) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      handleRemoveFromCart(itemIndex); // Remove only one item at a time
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {groupedItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {groupedItems.map((item, index) => (
              <li key={index}>
                {item.name} - BDT: {item.price} x {item.quantity} = BDT {(item.price * item.quantity).toFixed(2)}
                <button
                  onClick={() => handleRemoveSingleItem(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Display total items and total price */}
          <div className="cart-summary">
            <p>Total Items: {groupedItems.reduce((total, item) => total + item.quantity, 0)}</p>
            <p>Total Price: BDT {totalPrice.toFixed(2)}</p>
          </div>
          {/* Add Pay Now button */}
          <div className="payment-section">
            <button
              onClick={() => handlePayment(totalPrice)}
              className="pay-button"
              disabled={groupedItems.length === 0}
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
