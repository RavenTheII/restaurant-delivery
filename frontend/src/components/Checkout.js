import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import Feedback from './Feedback';

function Checkout({ cart }) {
  const navigate = useNavigate();
  const [membership, setMembership] = useState(false);
  const [membershipNumber, setMembershipNumber] = useState('');
  const [orderId, setOrderId] = useState(null);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const discountedPrice = totalPrice * 0.9; 

  const handleCheckout = () => {
    const order = {
      customerId: 'exampleCustomerId',
      customerContact: 'exampleCustomerContact',
      restaurantId: 'exampleRestaurantId',
      items: cart,
      membership
    };
    axios.post('http://localhost:5000/api/orders', order)
      .then(response => {
        setOrderId(response.data._id);
        navigate('/payment', { state: { total: membership ? discountedPrice : totalPrice } });
      })
      .catch(error => console.error(error));
  };

  const handleMembershipNumberChange = (event) => {
    const { value } = event.target;
    if (value.length <= 10) {
      setMembershipNumber(value);
    }
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
            Membership Number (10 digits):
            <input type="text" value={membershipNumber} onChange={handleMembershipNumberChange} />
          </label>
        </div>
      )}
      <button onClick={handleCheckout}>Proceed to Payment</button>
      {orderId && <Feedback orderId={orderId} />}
    </div>
  );
}

export default Checkout;
