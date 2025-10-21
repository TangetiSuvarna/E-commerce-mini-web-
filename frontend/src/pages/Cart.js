import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const styles = {
    pageTitle: { textAlign: 'center', color: '#5C3317', fontSize: '2.5em', marginBottom: '40px' },
    cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px dashed #D2B48C' },
    qtyButton: { backgroundColor: '#D2B48C', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontWeight: 'bold' },
    removeButton: { backgroundColor: '#CC0000', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', marginLeft: '20px' },
    summary: { borderTop: '3px solid #8B4513', paddingTop: '20px', marginTop: '30px', textAlign: 'right' },
    checkoutButton: { padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#FF4500', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold', width: '100%' },
    formContainer: { padding: '20px', backgroundColor: '#FFF8DC', borderRadius: '10px', marginBottom: '20px', textAlign: 'left' },
    input: { width: '100%', padding: '10px', margin: '5px 0 15px 0', borderRadius: '5px', border: '1px solid #D2B48C', boxSizing: 'border-box' },
};

export default function Cart() {
  // Use setCartItems to clear the cart after a successful order
  const { cartItems, removeFromCart, updateQuantity, cartTotal, setCartItems } = useCart(); 
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [checkoutStatus, setCheckoutStatus] = useState(null); 

  const handleInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      alert('Please fill out your Name and Email for pickup.');
      return;
    }
    
    setCheckoutStatus('loading');

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cartItems: cartItems, 
          totalAmount: cartTotal, 
          customerInfo: customerInfo 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order failed.');
      }

      setCheckoutStatus('success');
      setCartItems([]); // Clear the cart state 
      
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutStatus('error');
    }
  };


  if (cartItems.length === 0) {
    if (checkoutStatus === 'success') {
         return (
             <div style={{textAlign: 'center', padding: '100px', backgroundColor: '#E8F5E9', borderRadius: '10px', marginTop: '50px'}}>
                 <h1 style={{color: '#4CAF50'}}>Order Placed Successfully! 🎉</h1>
                 <p style={{fontSize: '1.2em'}}>Thank you for choosing The Dezzert Studio. Your order has been placed and confirmed.</p>
             </div>
         );
    }
    return <h1 style={{ ...styles.pageTitle, marginTop: '50px' }}>Your Dezzert Bag is Empty 🥺</h1>;
  }
  
  // Status messages
  if (checkoutStatus === 'loading') return <h1 style={{ ...styles.pageTitle, marginTop: '50px' }}>Processing your sweet order... ⏳</h1>;
  if (checkoutStatus === 'error') return <h1 style={{ ...styles.pageTitle, marginTop: '50px', color: '#CC0000' }}>Error placing order. Please try again. 😔</h1>;

  return (
    <div>
      <h1 style={styles.pageTitle}>Your Dezzert Bag 🛍️</h1>
      <div>
        {/* Cart Item Display */}
        {cartItems.map(item => (
          <div key={item._id} style={styles.cartItem}> 
            <div style={{ flex: 2 }}>
              <h4 style={{ margin: 0, color: '#8B4513' }}>{item.name}</h4>
              <p style={{ margin: '5px 0 0 0', color: '#B8860B' }}>${item.price.toFixed(2)} each</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={styles.qtyButton}>-</button>
              <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={styles.qtyButton}>+</button>
              <button onClick={() => removeFromCart(item._id)} style={styles.removeButton}>Remove</button>
            </div>
            
            <p style={{ fontWeight: 'bold', flex: 1, textAlign: 'right' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px' }}>
          
        {/* Customer Info Form */}
        <div style={styles.formContainer}>
            <h3 style={{color: '#8B4513', borderBottom: '1px solid #D2B48C', paddingBottom: '10px'}}>Pickup Information</h3>
            <label>Name (Required)</label>
            <input type="text" name="name" value={customerInfo.name} onChange={handleInfoChange} style={styles.input}/>
            <label>Email (Required)</label>
            <input type="email" name="email" value={customerInfo.email} onChange={handleInfoChange} style={styles.input}/>
            <label>Phone (Optional)</label>
            <input type="tel" name="phone" value={customerInfo.phone} onChange={handleInfoChange} style={styles.input}/>
        </div>
          
        {/* Order Summary and Checkout */}
        <div style={styles.summary}>
          <h2 style={{ fontSize: '1.8em', color: '#5C3317' }}>Subtotal: ${cartTotal.toFixed(2)}</h2>
          <h1 style={{ fontSize: '2.5em', borderTop: '2px solid #5C3317', paddingTop: '10px' }}>Total: ${cartTotal.toFixed(2)}</h1>
          
          <button 
              onClick={handleCheckout} 
              style={styles.checkoutButton}
              disabled={checkoutStatus === 'loading'}
          >
            {checkoutStatus === 'loading' ? 'Placing Order...' : 'Place Order & Pay at Pickup'}
          </button>
        </div>
      </div>
    </div>
  );
}