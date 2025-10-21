const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Sample seed data route (run once)
router.get("/seed", async (req, res) => {
  const items = [
    { name: "Chocolate Cake", category: "Cakes", flavour: "Chocolate", price: 500, image: "/images/cake1.jpg" },
    { name: "Vanilla Cupcake", category: "Cupcakes", flavour: "Vanilla", price: 120, image: "/images/cupcake1.jpg" },
    { name: "Blueberry Cheesecake", category: "Cheesecakes", flavour: "Blueberry", price: 600, image: "/images/cheesecake1.jpg" },
    { name: "Strawberry Bento Cake", category: "Bento Cakes", flavour: "Strawberry", price: 350, image: "/images/bento1.jpg" },
    { name: "Hazelnut Chocolate Box", category: "Chocolates", flavour: "Hazelnut", price: 250, image: "/images/choco1.jpg" },
  ];
  await Product.deleteMany();
  const saved = await Product.insertMany(items);
  res.json(saved);
});

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
