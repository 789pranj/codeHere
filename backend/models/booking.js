const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  addons: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ]
});

const bookingSchema = new mongoose.Schema({
  products: [productSchema],
  totalPrice: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
