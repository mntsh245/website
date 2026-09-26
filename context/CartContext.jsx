'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tunday_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync cart to localStorage whenever cartItems state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tunday_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Add Item to Cart (Handles distinct portions like Half / Full separately)
  const addToCart = (item, portion = 'Full', price = 0) => {
    setCartItems((prevCart) => {
      // Check if item with same ID and portion already exists
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
          price: Number(price) || 0,
          quantity: 1,
          isVeg: item.isVeg || false,
        },
      ];
    });
  };

  // Remove Item Completely
  const removeFromCart = (id, portion) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.portion === portion))
    );
  };

  // Update Quantity (+1 or -1)
  const updateQuantity = (id, portion, delta) => {
    setCartItems((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id && item.portion === portion) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Calculate Subtotal, Packaging, GST, and Final Total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const packagingFee = cartItems.length > 0 ? 30 : 0; // Flat packaging fee
  const gst = Math.round(subtotal * 0.05); // 5% GST on food service
  const grandTotal = subtotal + packagingFee + gst;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        packagingFee,
        gst,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);