import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/restaurant/${id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleCheckout = () => {
    history.push('/checkout', { cart });
  };

  return (
    restaurant && (
      <div>
        <h1>{restaurant.name}</h1>
        <ul>
          {restaurant.menu.map(item => (
            <li key={item.name}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </li>
          ))}
        </ul>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    )
  );
}

export default Restaurant;