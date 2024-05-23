import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [distance, setDistance] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants', {
      params: { category, keyword, distance, rating }
    })
      .then(response => setRestaurants(response.data))
      .catch(error => console.error(error));
  }, [category, keyword, distance, rating]);

  return (
    <div>
      <h1>Restaurants</h1>
      <div>
        <input type="text" placeholder="Search by keyword" onChange={e => setKeyword(e.target.value)} />
        <select onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Cafe">Cafe</option>
          <option value="Club">Club</option>
          <option value="Asian">Asian Food</option>
        </select>
        <input type="number" placeholder="Max Distance (km)" onChange={e => setDistance(e.target.value)} />
        <input type="number" placeholder="Min Rating" onChange={e => setRating(e.target.value)} />
      </div>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant._id}>
            <Link to={`/restaurant/${restaurant._id}`}>{restaurant.name}</Link>
            <p>Location: {restaurant.location}</p>
            <p>Distance: {restaurant.distance} km</p>
            <p>Rating: {restaurant.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;