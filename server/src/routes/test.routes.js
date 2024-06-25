import express from 'express';
import CoffeeShop from '../models/coffeeShop.js';
import coffeeProduct from '../models/CoffeeProduct.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const newCoffeeShop = await CoffeeShop.insertMany(payload.data);
    res.json(newCoffeeShop);
  } catch (error) {
    console.error('Error creating coffee shop:', error);
    res.status(500).json({ error: 'Failed to create coffee shop' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const payload = req.body;
    const newCoffeeProducts = await coffeeProduct.insertMany(payload.data);

    // Update CoffeeShop documents with new product IDs
    for (const product of newCoffeeProducts) {
      await CoffeeShop.findByIdAndUpdate(
        product.coffeeShop,
        { $push: { products: product._id } },
        { new: true },
      );
    }

    res.json(newCoffeeProducts);
  } catch (error) {
    console.error('Error creating coffee product:', error);
    res.status(500).json({ error: 'Failed to create coffee product' });
  }
});

router.post('/create-products-for-non-featured', async (req, res) => {
  try {
    // Generate 20 sample products
    const sampleProducts = [
      { name: 'Espresso', category: 'Coffee', description: 'Strong, concentrated shot of coffee' },
      {
        name: 'Cappuccino',
        category: 'Coffee',
        description: 'Espresso with steamed milk and foam',
      },
      { name: 'Latte', category: 'Coffee', description: 'Espresso with steamed milk' },
      { name: 'Americano', category: 'Coffee', description: 'Espresso diluted with hot water' },
      {
        name: 'Mocha',
        category: 'Coffee',
        description: 'Espresso with chocolate and steamed milk',
      },
      {
        name: 'Cold Brew',
        category: 'Coffee',
        description: 'Coffee steeped in cold water for 12-24 hours',
      },
      {
        name: 'Macchiato',
        category: 'Coffee',
        description: 'Espresso with a small amount of milk',
      },
      {
        name: 'Flat White',
        category: 'Coffee',
        description: 'Espresso with steamed milk, similar to a latte',
      },
      {
        name: 'Affogato',
        category: 'Coffee',
        description: 'Espresso poured over a scoop of vanilla ice cream',
      },
      { name: 'Iced Coffee', category: 'Coffee', description: 'Chilled coffee served over ice' },
      { name: 'Croissant', category: 'Food', description: 'Buttery, flaky pastry' },
      {
        name: 'Blueberry Muffin',
        category: 'Food',
        description: 'Muffin filled with fresh blueberries',
      },
      { name: 'Avocado Toast', category: 'Food', description: 'Toast topped with mashed avocado' },
      {
        name: 'Chocolate Chip Cookie',
        category: 'Food',
        description: 'Classic cookie with chocolate chips',
      },
      { name: 'Banana Bread', category: 'Food', description: 'Moist bread made with ripe bananas' },
      {
        name: 'Breakfast Sandwich',
        category: 'Food',
        description: 'Egg, cheese, and meat on a bagel or English muffin',
      },
      {
        name: 'Greek Yogurt Parfait',
        category: 'Food',
        description: 'Layered yogurt with granola and fresh fruit',
      },
      {
        name: 'Cinnamon Roll',
        category: 'Food',
        description: 'Sweet roll with cinnamon-sugar filling and frosting',
      },
      {
        name: 'Quiche',
        category: 'Food',
        description: 'Savory tart with eggs, cheese, and various fillings',
      },
      {
        name: 'Fruit and Cheese Plate',
        category: 'Food',
        description: 'Assorted fruits and cheeses',
      },
    ];

    // Fetch all coffee shops with isFeatured set to false
    const coffeeShops = await CoffeeShop.find({ isFeatured: false });

    const allNewProducts = [];

    for (const shop of coffeeShops) {
      // Randomly select 10 products for each coffee shop
      const shopProducts = [];
      for (let i = 0; i < 10; i++) {
        const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
        const product = {
          name: randomProduct.name,
          price: Math.floor(Math.random() * (300 - 100 + 1)) + 100,
          category: randomProduct.category,
          image: `https://picsum.photos/${270 + i}/${180 + i}`,
          description: randomProduct.description,
          rating: (Math.random() * (5 - 3) + 3).toFixed(1),
          coffeeShop: shop._id,
        };
        shopProducts.push(product);
      }

      // Insert the new products into the database
      const insertedProducts = await coffeeProduct.insertMany(shopProducts);
      allNewProducts.push(...insertedProducts);

      // Update the coffee shop with the new product IDs
      const productIds = insertedProducts.map((product) => product._id);
      await CoffeeShop.findByIdAndUpdate(
        shop._id,
        { $push: { products: { $each: productIds } } },
        { new: true },
      );
    }

    res.json({
      message: `Created products for ${coffeeShops.length} non-featured coffee shops`,
      totalProductsCreated: allNewProducts.length,
      products: allNewProducts,
    });
  } catch (error) {
    console.error('Error creating products for non-featured coffee shops:', error);
    res.status(500).json({ error: 'Failed to create products for non-featured coffee shops' });
  }
});

router.post('/add-images-to-featured-shops', async (req, res) => {
  try {
    const imageLinks = [
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Contemplation+at+the+Cozy+Cafe%CC%81-min.jpg',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/cozy+cafe.jpg',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Rustic+Morning+Coffee+Break-min.jpg ',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Serene+Coffee+Shop+Scene-min.jpg',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Solitude+in+Warmth_+A+Quiet+Moment+at+the+Cafe-min.jpg',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Sunlit+Cafe%CC%81+Conversation-min.jpg',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Sunlit+Quaint+Cafe+Interior-min.jpg',
      'https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/cafes/Urban+Cafe+Tranquility-min.jpg',
    ];

    // Fetch all featured coffee shops
    const featuredShops = await CoffeeShop.find({ isFeatured: false });

    const updatedShops = [];
    let imageIndex = 0;

    for (const shop of featuredShops) {
      // If the images array is empty, add the next image from the imageLinks array
      const image = imageLinks[imageIndex];
      imageIndex = (imageIndex + 1) % imageLinks.length; // Cycle through images

      const updatedShop = await CoffeeShop.findByIdAndUpdate(
        shop._id,
        { $set: { images: [image] } },
        { new: true },
      );

      updatedShops.push(updatedShop);
    }

    res.json({
      message: `Updated ${updatedShops.length} featured coffee shops with new images`,
      updatedShops: updatedShops,
    });
  } catch (error) {
    console.error('Error adding images to featured coffee shops:', error);
    res.status(500).json({ error: 'Failed to add images to featured coffee shops' });
  }
});

router.get('/products', async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.query.id);
  const products = await coffeeProduct.find({ coffeeShop: id }).lean();
  const productIds = products.map((product) => product._id);
  await CoffeeShop.updateOne({ _id: id }, { $set: { products: productIds } });
  res.json({ products });
});

router.post('/amenities', async (req, res) => {
  try {
    const amenities = ['smoking', 'wifi', 'outdoor_seating', 'pet_friendly', 'power_outlets'];
    const coffeeShops = await CoffeeShop.find();

    const updatedShops = await Promise.all(
      coffeeShops.map(async (shop) => {
        const shopAmenities = amenities.reduce((acc, amenity) => {
          acc[amenity] = Math.random() < 0.5;
          return acc;
        }, {});

        shop.amenities = shopAmenities;
        return shop.save();
      }),
    );

    res.json(updatedShops);
  } catch (error) {
    console.error('Error updating amenities:', error);
    res.status(500).json({ error: 'Failed to update amenities' });
  }
});

router.get('/update-to-rupees', async (req, res) => {
  try {
    const products = await coffeeProduct.find();

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        product.price = Math.floor(Math.random() * (500 - 100 + 1) + 100);
        return product.save();
      }),
    );

    res.json(updatedProducts);
  } catch (error) {
    console.error('Error updating prices:', error);
    res.status(500).json({ error: 'Failed to update prices' });
  }
});

router.post('/update-coffee-product-images', async (req, res) => {
  try {
    // Fetch all products with category "Coffee"
    const coffeeProducts = await coffeeProduct.find({ category: 'Food' });

    let imageNumber = 1;
    const updatedProducts = [];

    for (const product of coffeeProducts) {
      // Construct the new image URL
      const newImageUrl = `https://mdncoffeeshop.s3.ap-south-1.amazonaws.com/coffee/food/${imageNumber}.jpg`;

      // Update the product's image
      const updatedProduct = await coffeeProduct.findByIdAndUpdate(
        product._id,
        { $set: { image: newImageUrl } },
        { new: true },
      );

      updatedProducts.push(updatedProduct);

      // Increment the image number, reset to 1 if it exceeds 13
      imageNumber = (imageNumber % 8) + 1;
    }

    res.json({
      message: `Updated ${updatedProducts.length} coffee products with new images`,
      updatedProducts: updatedProducts,
    });
  } catch (error) {
    console.error('Error updating coffee product images:', error);
    res.status(500).json({ error: 'Failed to update coffee product images' });
  }
});

router.post('/switch-coordinates', async (req, res) => {
  try {
    // Fetch all coffee shops
    const coffeeShops = await CoffeeShop.find();

    const updatedShops = [];

    for (const shop of coffeeShops) {
      if (shop.location && shop.location.coordinates && shop.location.coordinates.length === 2) {
        // Switch the coordinates
        const [longitude, latitude] = shop.location.coordinates;
        
        // Update the shop with switched coordinates
        const updatedShop = await CoffeeShop.findByIdAndUpdate(
          shop._id,
          { 
            $set: { 
              'location.coordinates': [latitude, longitude] 
            } 
          },
          { new: true }
        );

        updatedShops.push(updatedShop);
      }
    }

    res.json({
      message: `Updated coordinates for ${updatedShops.length} coffee shops`,
      updatedShops: updatedShops
    });
  } catch (error) {
    console.error('Error switching coordinates:', error);
    res.status(500).json({ error: 'Failed to switch coordinates' });
  }
});

export default router;
