import mongoose from 'mongoose';

// Define schema for coffee products
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Coffee', 'Drinks', 'Food'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  coffeeShop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoffeeShop',
    required: true,
  },
});

// Custom toJSON method to format product data
productSchema.methods.toJSON = function () {
  const product = this.toObject();
  product.id = product._id;
  delete product._id;
  return product;
};

// Create and export the CoffeeProduct model
const coffeeProduct = new mongoose.model('CoffeeProduct', productSchema);

export default coffeeProduct;
