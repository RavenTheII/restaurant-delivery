import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Restaurant({ addToCart }) {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>Category: {restaurant.category}</p>
      <p>Location: {restaurant.location}</p>
      <p>Distance: {restaurant.distance} km</p>
      <p>Rating: {restaurant.rating}</p>
      <ul>
        {restaurant.menu.map(item => (
          <li key={item.name}>
            {item.name} - ${item.price}
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurant;
