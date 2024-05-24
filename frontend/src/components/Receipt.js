import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Receipt = () => {
  const { state } = useLocation();
  const { order } = state || { order: {} };
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission logic here
    console.log('Feedback submitted:', { rating, feedback });
    // Navigate to another page if needed
    navigate('/thank-you'); // Assuming you will create a Thank You page
  };

  return (
    <div className="receipt-container">
      <h1>Order Receipt</h1>
      <div className="receipt-details">
        <p>Order ID: {order.id}</p>
        <p>Customer Name: {order.customerName}</p>
        <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
      </div>
      <h2>Rate Your Experience</h2>
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index)}
            style={{ cursor: 'pointer', color: rating > index ? '#FFD700' : '#ccc' }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <textarea
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows="4"
        cols="50"
      />
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>
    </div>
  );
};

export default Receipt;
