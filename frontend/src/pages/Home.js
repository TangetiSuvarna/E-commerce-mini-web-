// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext'; // Assuming this provides product data

// --- FIX: DEFINING THE MISSING STYLES OBJECT ---
const styles = {
    hero: {
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: '#f8f8f8',
        marginBottom: '40px',
    },
    // Add other styles referenced in the original file here (e.g., container, heading, etc.)
};
// --------------------------------------------------

export default function Home() {
    // Note: useCart should be in a CartContextProvider wrapping the app
    const { products, loading, error } = useCart();
    const featured = products.slice(0, 3);
    
    // 1. New state to manage the button visibility
    const [isSeeded, setIsSeeded] = React.useState(false); 

    // 2. Function to execute the POST request
    const handleSeed = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/seed', {
                method: 'POST', // This is the crucial part: sending a POST request
            });
            if (response.ok) {
                setIsSeeded(true); 
                alert('Database Seeded Successfully! Refreshing the menu now.');
                window.location.reload(); // Reloads the page to fetch the new data
            } else {
                alert('Seeding failed. Check your backend terminal for errors.');
            }
        } catch (err) {
            alert('Error connecting to the backend. Is "node server.js" running?');
        }
    };


    if (loading) return <h1 style={{textAlign: 'center', color: '#555'}}>Loading Menu... ⏳</h1>;
    if (error) return <h1 style={{textAlign: 'center', color: 'red'}}>Error loading data. Is the backend running?</h1>;


    return (
        <div>
            {/* 3. The TEMPORARY Seeding Button */}
            {products.length === 0 && !isSeeded && (
                <div style={{textAlign: 'center', margin: '20px', padding: '15px', border: '2px dashed #FF4500', backgroundColor: '#FFF0F0'}}>
                    <p>⚠️ **Developer Alert:** The menu is currently empty. Click this button to load the initial data into MongoDB.</p>
                    <button 
                        onClick={handleSeed}
                        style={{padding: '10px 20px', backgroundColor: '#FF4500', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}
                    >
                        CLICK TO SEED DATABASE NOW
                    </button>
                </div>
            )}
            
            {/* Rest of the Home Page JSX (Hero, Featured Products, etc.) */}
            <section style={styles.hero}>
                <h1>Welcome to the Bakery!</h1>
                <p>Freshly baked goods, made with love.</p>
                <Link to="/menu">
                    <button style={{padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px'}}>
                        View Full Menu
                    </button>
                </Link>
            </section>

            <h2>Featured Treats</h2>
            <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                {featured.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

        </div>
    );
}   