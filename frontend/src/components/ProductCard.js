import React from 'react';
import { useCart } from '../context/CartContext';

const styles = {
  card: { border: '1px solid #D2B48C', borderRadius: '10px', padding: '20px', textAlign: 'center', backgroundColor: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' },
  name: { color: '#8B4513', fontSize: '1.5em' },
  price: { fontWeight: 'bold', color: '#B8860B', fontSize: '1.2em', margin: '10px 0' },
  button: { backgroundColor: '#A0522D', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px', fontWeight: 'bold' },
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div style={styles.card}>
      {/* Note: In a real project, you would add actual images to your public/images folder */}
      <img src={`/images/${product.image}`} alt={product.name} style={styles.image} />
      <h3 style={styles.name}>{product.name}</h3>
      <p>{product.description}</p>
      <p style={styles.price}>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product._id)} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
}   