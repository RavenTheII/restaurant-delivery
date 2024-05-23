import React from 'react';

function Cart({ cart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      <p>Number of items: {cart.length}</p>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
