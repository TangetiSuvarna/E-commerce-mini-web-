import React from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const styles = {
  pageTitle: { textAlign: 'center', color: '#5C3317', fontSize: '2.5em', marginBottom: '40px', borderBottom: '3px solid #D2B48C', paddingBottom: '10px' },
  categoryTitle: { color: '#A0522D', fontSize: '1.8em', borderBottom: '1px solid #D2B48C', paddingBottom: '5px', marginBottom: '20px', marginTop: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }
};

export default function Menu() {
  const { products, loading, error } = useCart();
  const categories = [...new Set(products.map(p => p.category))];
  
  if (loading) return <h1 style={{textAlign: 'center', marginTop: '50px', color: '#8B4513'}}>Loading Menu... ⏳</h1>;
  if (error) return <h1 style={{textAlign: 'center', marginTop: '50px', color: '#CC0000'}}>Error loading data. Is the backend running?</h1>;

  return (
    <div>
      <h1 style={styles.pageTitle}>Our Dezzert Creations</h1>
      
      {categories.map(category => (
        <div key={category}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.grid}>
            {products
              .filter(p => p.category === category)
              .map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}