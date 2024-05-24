import React from 'react';
import { useNavigate } from 'react-router-dom';

const ETA = ({ order }) => {
  const navigate = useNavigate();
  const distance = 10; // Replace with actual distance logic
  const estimatedTime = ((distance / 25) * 60).toFixed(1); // Convert to minutes and round to 1 decimal place

  const handleNext = () => {
    navigate('/receipt', { state: { order } });
  };

  return (
    <div className="eta-container">
      <h1>Estimated Time of Arrival</h1>
      <p>Your order will arrive in approximately {estimatedTime} minutes.</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ETA;
