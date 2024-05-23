import React from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    // Payment logic here
    alert('Payment Successful');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;