import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import About from './pages/About';

const appContainerStyle = {
  fontFamily: 'Georgia, serif', 
  backgroundColor: '#FDF5E6', 
  minHeight: '100vh', 
  display: 'flex', 
  flexDirection: 'column'
};
const mainStyle = {
  flexGrow: 1, 
  maxWidth: '1200px', 
  margin: '20px auto', 
  width: '90%' 
};

const Layout = ({ children }) => {
  return (
    <div style={appContainerStyle}>
      <Header />
      <main style={mainStyle}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '50px', color: '#8B4513'}}>404 | Page Not Found</h1>} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;