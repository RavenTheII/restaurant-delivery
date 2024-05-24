const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define restaurant schema and model
const restaurantSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  distance: Number,
  rating: Number,
  menu: [
    {
      name: String,
      price: Number
    }
  ]
});

const orderSchema = new mongoose.Schema({
  customerId: String,
  customerContact: String,
  restaurantId: String,
  items: [
    {
      name: String,
      price: Number
    }
  ],
  totalAmount: Number,
  membership: Boolean,
  status: { type: String, default: 'Pending' },
  feedback: {
    rating: Number,
    comment: String
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Order = mongoose.model('Order', orderSchema);

// Route to get all restaurants
app.get('/api/restaurants', async (req, res) => {
  const { category, keyword, distance, rating } = req.query;
  let query = {};
  
  if (category) query.category = category;
  if (keyword) query.name = { $regex: keyword, $options: 'i' };
  if (distance) query.distance = { $lte: distance };
  if (rating) query.rating = { $gte: rating };

  try {
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a specific restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to handle orders
app.post('/api/orders', async (req, res) => {
  const { customerId, customerContact, restaurantId, items, membership } = req.body;
  const totalAmount = membership ? calculateDiscountedTotal(items) : calculateTotal(items);
  const order = new Order({
    customerId,
    customerContact,
    restaurantId,
    items,
    totalAmount,
    membership
  });

  try {
    const savedOrder = await order.save();
    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get all orders for a restaurant
app.get('/api/orders', async (req, res) => {
  const { restaurantId } = req.query;

  try {
    const orders = await Order.find({ restaurantId });
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/orders/:id/accept', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Accepted' }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/orders/:id/reject', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    // Process refund logic here
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Export functions or models for testing
module.exports = {
  Restaurant,
  Order,
  calculateTotal,
  calculateDiscountedTotal
};

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

function calculateDiscountedTotal(items) {
  return items.reduce((total, item) => total + item.price * 0.9, 0); // Example 10% discount
}

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
