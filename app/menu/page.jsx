'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/app/providers';
export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVegOnly, setIsVegOnly] = useState(false);

  // const { addToCart } = useCart();

  const cartContext = useCart() || {};
  const addToCart = cartContext.addToCart || (() => {});

  // Database se API dwara Menu Fetch karna
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu');
        const result = await res.json();
        
        // Response format handler: result.data me array hai
        if (result.success && Array.isArray(result.data)) {
          setMenuItems(result.data);
        } else if (Array.isArray(result)) {
          setMenuItems(result);
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Search, Category aur Veg Filters
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVeg = !isVegOnly || item.isVeg;

    return matchesSearch && matchesCategory && matchesVeg;
  });

  const categories = ['All', 'Kababs', 'Breads', 'Main Course', 'Biryani & Rice', 'Desserts'];

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white pt-28 pb-16 px-4 sm:px-8">
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <span className="text-amber-500 text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2">
          <span>✨</span> AWADHI CULINARY LEGACY
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-amber-50">
          À La Carte Menu
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Crafted with century-old recipes from Lucknow.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="max-w-4xl mx-auto mt-8 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
          <input
            type="text"
            placeholder="Search dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-950/80 text-white placeholder-neutral-500 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-800 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Veg Only Toggle */}
        <button
          onClick={() => setIsVegOnly(!isVegOnly)}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border transition ${
            isVegOnly
              ? 'border-green-500 bg-green-950/30 text-green-400'
              : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${isVegOnly ? 'bg-green-500' : 'bg-neutral-600'}`} />
          Pure Veg
        </button>
      </div>

      {/* MENU CARDS GRID */}
      <div className="max-w-6xl mx-auto mt-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-48 bg-neutral-900/50 rounded-2xl animate-pulse border border-neutral-800" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            No items found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id || item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5 transition duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif font-bold text-lg text-amber-100 group-hover:text-amber-400 transition">
                      {item.name}
                    </h3>
                    <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded border ${
                      item.isVeg ? 'border-green-600 text-green-400 bg-green-950/40' : 'border-red-600 text-red-400 bg-red-950/40'
                    }`}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 block">Price</span>
                    <span className="text-lg font-bold text-amber-500">
                      ₹{item.priceFull || item.priceHalf}
                    </span>
                    {item.priceHalf > 0 && (
                      <span className="text-[11px] text-neutral-500 ml-1">(Full)</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(item, 'Full', item.priceFull || item.priceHalf)}
                    className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white font-medium text-xs rounded-xl border border-amber-500/30 transition shadow-sm active:scale-95"
                  >
                    + Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}