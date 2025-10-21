// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. MIDDLEWARE ---
app.use(cors()); // Allow all origins
app.use(express.json());

// --- 2. MONGODB CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not set in environment variables!');
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB successfully connected! 🥭'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 2b. HEALTH ENDPOINT ---
app.get('/health', (req, res) => {
    const state = mongoose.connection.readyState; // 0 disconnected, 1 connected
    res.json({ mongoState: state, message: state === 1 ? 'MongoDB connected' : 'MongoDB NOT connected' });
});

// --- 3. SCHEMAS AND MODELS ---
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String
});
const Product = mongoose.model('Product', ProductSchema);

const OrderSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,
    customerInfo: {
        name: String,
        email: String,
        phone: String
    },
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// --- 4. API ROUTES ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { cartItems, totalAmount, customerInfo } = req.body;
        if (!cartItems || cartItems.length === 0)
            return res.status(400).json({ message: 'Cart is empty. Cannot place order.' });

        const orderItems = cartItems.map(item => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const newOrder = new Order({ items: orderItems, totalAmount, customerInfo });
        const savedOrder = await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully!', orderId: savedOrder._id });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
});

// --- 5. START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
