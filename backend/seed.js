require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bakerydb';

const products = [
  {
    name: "Classic Chocolate Cake",
    description: "Rich chocolate sponge with chocolate ganache.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1544033529-2e699f0b2ad5?w=800&q=80",
    category: "cakes"
  },
  {
    name: "Blueberry Cheesecake",
    description: "Creamy cheesecake topped with fresh blueberries.",
    price: 900,
    image: "https://images.unsplash.com/photo-1602612164640-19b5b4273a4f?w=800&q=80",
    category: "cakes"
  },
  {
    name: "Chocolate Chip Cookies",
    description: "Crispy edges, soft center, loaded with chips.",
    price: 180,
    image: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=800&q=80",
    category: "cookies"
  },
  {
    name: "Sourdough Loaf",
    description: "Handmade sourdough with a crunchy crust.",
    price: 250,
    image: "https://images.unsplash.com/photo-1540420773422-813dbf8a4f8b?w=800&q=80",
    category: "bread"
  }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to DB, seeding...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
