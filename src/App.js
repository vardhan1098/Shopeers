// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckOut';

const App = () => {
  return (
    <Router>
        <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>} />
      </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
