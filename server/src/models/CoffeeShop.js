import mongoose from 'mongoose';

// Define schema for coffee shops
const coffeeShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: [String],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CoffeeProduct',
    },
  ],
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  amenities: {
    type: Object,
    default: {},
  },
});

// Custom toJSON method to format coffee shop data
coffeeShopSchema.methods.toJSON = function () {
  const coffeeShop = this.toObject();
  coffeeShop.id = coffeeShop._id;
  delete coffeeShop._id;
  return coffeeShop;
};

// Create and export the CoffeeShop model
const CoffeeShop = new mongoose.model('CoffeeShop', coffeeShopSchema);

export default CoffeeShop;
