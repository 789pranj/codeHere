const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Booking = require('./models/booking');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bookingDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const port = 5000;

app.post('/api/checkout', async (req, res) => {
  try {
    const { products } = req.body;
    let totalPrice = 0;
    products.forEach(product => {
      let productTotal = product.price;
      if (product.addons && product.addons.length > 0) {
        product.addons.forEach(addon => {
          productTotal += addon.price;
        });
      }
      totalPrice += productTotal;
    });

    const newBooking = new Booking({
      products,
      totalPrice
    });

    await newBooking.save();

    res.status(200).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during booking process', error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
