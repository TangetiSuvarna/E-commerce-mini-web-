// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. MIDDLEWARE ---
app.use(cors()); // ✅ Allow all origins during local development
app.use(express.json());

// --- 2. MONGODB CONNECTION ---
const MONGO_URI = "mongodb+srv://tangetisuvarna:suvarnadb@cluster0.uvtoxet.mongodb.net/bakerydb?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB successfully connected! 🥭'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 3. SCHEMAS AND MODELS ---
// Product Schema (for the Menu)
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String }
});
const Product = mongoose.model('Product', ProductSchema);

// Order Schema (for Checkout)
const OrderSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalAmount: { type: Number, required: true },
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String }
    },
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// --- 4. API ROUTES ---

// ✅ A. GET ALL PRODUCTS (Menu Route)
app.get('/api/products', async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*'); // extra safety header
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
});

// ✅ B. POST PLACE ORDER (Checkout Route)
app.post('/api/orders', async (req, res) => {
    try {
        const { cartItems, totalAmount, customerInfo } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Cannot place order.' });
        }

        const orderItems = cartItems.map(item => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const newOrder = new Order({
            items: orderItems,
            totalAmount: totalAmount,
            customerInfo: customerInfo
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully! We will contact you shortly.',
            orderId: savedOrder._id
        });

    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
});

// --- 5. START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
