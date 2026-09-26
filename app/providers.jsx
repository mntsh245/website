'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

const CartContext = createContext();

export default function Providers({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add Item to Cart
  const addToCart = (item, portion = 'Full', price = 0) => {
    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (ci) => ci.id === item.id && ci.portion === portion
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          portion: portion,
          price: Number(price) || item.price || 0,
          quantity: 1,
          isVeg: item.isVeg || false,
        },
      ];
    });
  };

  // Remove Item
  const removeFromCart = (id, portion) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => !(item.id === id && (portion ? item.portion === portion : true)))
    );
  };

  // Update Quantity (+1 or -1)
  const updateQuantity = (id, portion, delta) => {
    // Agar delta pass nahi kiya to 2nd parameter ko delta mano
    if (typeof portion === 'number') {
      delta = portion;
      portion = null;
    }

    setCartItems((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id && (!portion || item.portion === portion)) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Clear Cart
  const clearCart = () => setCartItems([]);

  // Totals
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const packagingFee = cartItems.length > 0 ? 30 : 0;
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + packagingFee + gst;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          isCartOpen,
          setIsCartOpen,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          totalItems,
          subtotal,
          packagingFee,
          gst,
          grandTotal,
        }}
      >
        {children}
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a Providers component');
  }
  return context;
};