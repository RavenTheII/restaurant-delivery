import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import RestaurantOrders from './components/RestaurantOrders';
import ETA from './components/ETA';
import Receipt from './components/Receipt';
import './App.css';

function App() {
  const [cart, setCart] = React.useState([]);
  const [order, setOrder] = React.useState(null);
  const restaurantId = 'exampleRestaurantId'; // Replace with the actual restaurant ID logic

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleOrder = (newOrder) => {
    setOrder(newOrder);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {cart.length > 0 && (
            <Link to="/checkout">Checkout ({cart.length} items)</Link>
          )}
          <Link to={`/restaurant/${restaurantId}/orders`}>Manage Orders</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/restaurant/:id" element={<Restaurant addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} handleOrder={handleOrder} />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/restaurant/:id/orders" element={<RestaurantOrders />} />
          <Route path="/eta" element={<ETA order={order} />} />
          <Route path="/receipt" element={<Receipt order={order} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
