import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ManageOrders() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [refundAmount, setRefundAmount] = useState(0);

  useEffect(() => {
    const orderId = location.state?.orderId;
    if (orderId) {
      axios.get(`http://localhost:5000/api/orders/${orderId}`)
        .then(response => {
          setOrder(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [location.state]);

  const handleAcceptOrder = () => {
    // Your logic for accepting the order
    navigate('/accepted-order');
  };

  const handleCancelOrder = () => {
    // Your logic for canceling the order and calculating refund amount
    setRefundAmount(order.totalAmount);
  };

  return (
    <div>
      {order ? (
        <div>
          <h2>Manage Order</h2>
          <p>Order ID: {order._id}</p>
          <p>Customer ID: {order.customerId}</p>
          <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
          <button onClick={handleAcceptOrder}>Accept Order</button>
          <button onClick={handleCancelOrder}>Cancel Order</button>
          {refundAmount > 0 && (
            <p>Your order has been cancelled. Refund: ${refundAmount.toFixed(2)}</p>
          )}
        </div>
      ) : (
        <p>No order found</p>
      )}
    </div>
  );
}

export default ManageOrders;
