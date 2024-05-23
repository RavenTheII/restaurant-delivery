import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const restaurantId = 'exampleRestaurantId'; // Replace with actual logic to get the restaurant ID

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders?restaurantId=${restaurantId}`)
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, [restaurantId]);

  const handleAccept = (orderId) => {
    axios.put(`http://localhost:5000/api/orders/${orderId}/accept`)
      .then(response => {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Accepted' } : order));
      })
      .catch(error => console.error(error));
  };

  const handleReject = (orderId) => {
    axios.put(`http://localhost:5000/api/orders/${orderId}/reject`)
      .then(response => {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Rejected' } : order));
        alert('Order rejected. Refund processed.');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Customer ID: {order.customerId}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            {order.status === 'Pending' && (
              <div>
                <button onClick={() => handleAccept(order._id)}>Accept</button>
                <button onClick={() => handleReject(order._id)}>Reject</button>
              </div>
            )}
            {order.feedback && (
              <div>
                <p>Rating: {order.feedback.rating}</p>
                <p>Comment: {order.feedback.comment}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantOrders;
