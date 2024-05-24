import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import Feedback from './Feedback';

function Checkout({ cart, handleOrder }) { // Receive handleOrder as a prop
  const navigate = useNavigate();
  const [membership, setMembership] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [membershipNumber, setMembershipNumber] = useState('');
  const [isValidMembership, setIsValidMembership] = useState(true);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const discountedPrice = totalPrice * 0.9; 

  const handleCheckout = () => {
    if (membership && membershipNumber.length !== 10) {
      setIsValidMembership(false);
      return;
    }

    const order = {
      id: 'order123', // Generate a unique ID for the order
      customerName: 'John Doe', // Replace with actual customer data
      distance: 10, // Replace with actual distance
      totalAmount: membership ? discountedPrice : totalPrice,
      membership
    };

    axios.post('http://localhost:5000/api/orders', order)
      .then(response => {
        setOrderId(response.data._id);
        handleOrder(order); // Call handleOrder to set the order in App.js and navigate to ETA
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total price: ${membership ? discountedPrice.toFixed(2) : totalPrice.toFixed(2)}</p>
      <label>
        <input type="checkbox" checked={membership} onChange={() => setMembership(!membership)} />
        Membership (10% discount)
      </label>
      {membership && (
        <div>
          <label>
            Enter Membership Number:
            <input
              type="text"
              value={membershipNumber}
              onChange={(e) => setMembershipNumber(e.target.value)}
            />
          </label>
          {!isValidMembership && <p style={{ color: 'red' }}>Please enter a valid 10-digit membership number.</p>}
        </div>
      )}
      <button onClick={handleCheckout}>Proceed to Payment</button>
      {orderId && <Feedback orderId={orderId} />}
    </div>
  );
}

export default Checkout;
