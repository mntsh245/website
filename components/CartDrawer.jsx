'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/providers';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    packagingFee,
    gst,
    grandTotal,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

  // Aminabad Counter WhatsApp Number (Replace with actual number)
  const AMINABAD_WHATSAPP_NUMBER = '919876543210';

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    if (!customerName || !address) {
      alert('Please enter your Name and Delivery Address.');
      return;
    }

    // Build Formatted Order Message
    let message = `*NEW ORDER - Aminabad Dawat (AMINABAD)*\n`;
    message += `------------------------------------\n`;
    message += `*Customer:* ${customerName}\n`;
    message += `*Address:* ${address}\n\n`;
    message += `*ORDER ITEMS:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.portion}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `------------------------------------\n`;
    message += `*Item Subtotal:* ₹${subtotal}\n`;
    message += `*Packaging Charges:* ₹${packagingFee}\n`;
    message += `*GST (5%):* ₹${gst}\n`;
    message += `*GRAND TOTAL:* ₹${grandTotal}\n`;
    message += `------------------------------------\n`;
    message += `Please confirm order availability and payment mode!`;

    // Encode URL for WhatsApp API
    const whatsappUrl = `https://wa.me/${AMINABAD_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-neutral-900 h-full p-6 flex flex-col justify-between border-l border-neutral-800 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2 text-amber-500">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-xl font-serif font-bold text-white">Your Order</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-neutral-800 rounded-lg text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Your cart is empty.</p>
              <p className="text-xs mt-1">Add some delicious Galouti Kababs from the menu!</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4 max-h-[40vh] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.portion}`}
                  className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <span className="text-xs text-amber-400 font-mono">
                      {item.portion} • ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.portion, -1)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.portion, 1)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.id, item.portion)}
                      className="text-red-500/70 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill Breakdown & Checkout Form */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-800 pt-4 mt-6 space-y-4">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Item Subtotal</span>
                <span className="text-white font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging Fee</span>
                <span className="text-white font-mono">₹{packagingFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="text-white font-mono">₹{gst}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-amber-400 pt-2 border-t border-neutral-800">
                <span>Grand Total</span>
                <span className="font-mono">₹{grandTotal}</span>
              </div>
            </div>

            {/* Customer Details */}
            <form onSubmit={handleWhatsAppCheckout} className="space-y-2.5 pt-2">
              <input
                type="text"
                placeholder="Your Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
              <textarea
                placeholder="Delivery Address / Table Number"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={2}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition"
              >
                Send Order to WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}