import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment here
    // On successful payment, navigate to the manage orders page
    alert(`Payment of $${location.state.total} successful!`);
    navigate(`/restaurant/exampleRestaurantId/orders`); // Navigate to orders page
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} required />
        </label>
        <label>
          Expiry Date:
          <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} required />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleChange} required />
        </label>
        <button type="submit">Pay ${location.state.total.toFixed(2)}</button>
      </form>
    </div>
  );
}

export default Payment;
