import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import RestaurantOrders from './components/RestaurantOrders';
import './App.css';

function App() {
  const [cart, setCart] = React.useState([]);
  const restaurantId = 'exampleRestaurantId'; // Replace with the actual restaurant ID logic

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {cart.length > 0 && (
            <Link to="/checkout">Checkout ({cart.length} items)</Link>
          )}
          <Link to={`/restaurant/${restaurantId}/orders`}>Manage Orders</Link> {/* Add link for restaurant owners */}
        </nav>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/restaurant/:id" element={<Restaurant addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/restaurant/:id/orders" element={<RestaurantOrders />} /> {/* Add route for managing orders */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;