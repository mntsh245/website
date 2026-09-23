'use client';
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'next-themes';

const CartContext = createContext();

export default function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add Item (agar pehle se cart me hai toh quantity +1 karega)
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Quantity + / - change karne ke liye
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Cart Totals
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          isCartOpen,
          setIsCartOpen,
          addToCart,
          removeFromCart,
          updateQuantity,
          totalItems,
          totalPrice,
        }}
      >
        {children}
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export const useCart = () => useContext(CartContext);