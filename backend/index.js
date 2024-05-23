const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/restaurant-delivery', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Restaurant model
const restaurantSchema = new mongoose.Schema({
  name: String,
  category: String,
  menu: [{ name: String, price: Number }]
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Seed database with sample data (for demonstration purposes)
const seedData = async () => {
  await Restaurant.deleteMany({});
  const restaurants = [
    { name: 'Cafe 1', category: 'Cafe', menu: [{ name: 'Coffee', price: 2.5 }, { name: 'Cake', price: 3.0 }] },
    { name: 'Asian Restaurant', category: 'Asian food', menu: [{ name: 'Sushi', price: 5.0 }, { name: 'Ramen', price: 8.0 }] }
  ];
  await Restaurant.insertMany(restaurants);
};
seedData();

// Routes
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/restaurant/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});