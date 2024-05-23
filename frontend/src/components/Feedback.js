import React, { useState } from 'react';
import axios from 'axios';

function Feedback({ orderId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/orders/${orderId}/feedback`, { rating, comment })
      .then(response => {
        alert('Feedback submitted successfully!');
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <label>
        Rating:
        <input type="number" value={rating} onChange={e => setRating(e.target.value)} min="1" max="5" required />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={e => setComment(e.target.value)} required></textarea>
      </label>
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default Feedback;
