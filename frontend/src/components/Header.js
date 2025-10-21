import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const styles = {
  header: { padding: '20px', backgroundColor: '#F7E7C5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #D2B48C' },
  logo: { color: '#8B4513', fontSize: '2em', textDecoration: 'none', fontWeight: 'bold' },
  link: { margin: '0 15px', color: '#8B4513', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.2s' },
  cartLink: { color: '#FF4500' },
};

export default function Header() {
  const { cartItemCount } = useCart();
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>The Dezzert Studio 🍰</Link>
      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/menu" style={styles.link}>Menu</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/cart" style={{...styles.link, ...styles.cartLink}}>
          🛒 Cart ({cartItemCount})
        </Link>
      </nav>
    </header>
  );
}