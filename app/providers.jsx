'use client';
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'next-themes';

const CartContext = createContext();

export default function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <CartContext.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
    </ThemeProvider>
  );
}

export const useCart = () => useContext(CartContext);
