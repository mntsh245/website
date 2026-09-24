'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, Leaf, Sparkles, Plus, Check, Star } from 'lucide-react';

const MENU_DATA = [
  {
    category: 'Rolls Items',
    items: [
      { id: 'r1', name: 'Mughlai Roll (2 Pcs Kabab, 1 Paratha)', prices: { Full: 80 }, desc: 'Juicy kababs rolled in flaky paratha', isBestseller: true },
      { id: 'r2', name: 'Mughlai Roll (Single)', prices: { Full: 50 }, desc: 'Single kabab wrapped in hot paratha' },
      { id: 'r3', name: 'Shami Roll (2 Pcs Kabab, 1 Paratha)', prices: { Full: 50 }, desc: 'Traditional authentic Shami recipe' },
      { id: 'r4', name: 'Shami Roll (Single)', prices: { Full: 50 }, desc: 'Quick bite single shami roll' },
      { id: 'r5', name: 'Boti Roll (Mutton)', prices: { Full: 110 }, desc: 'Tender mutton boti chunks with onions', isSpicy: true },
      { id: 'r6', name: 'Boti Roll (Chicken)', prices: { Full: 100 }, desc: 'Charcoal grilled chicken boti' },
      { id: 'r7', name: 'Paneer Roll', prices: { Full: 80 }, desc: 'Spiced cottage cheese tikka wrap', isVeg: true },
    ]
  },
  {
    category: 'Dry Items',
    items: [
      { id: 'd1', name: 'Roasted Chicken (Tandoori)', prices: { Half: '190 (4 Pcs)', Full: '370 (8 Pcs)' }, desc: 'Clay-oven roasted chicken with lemon glaze', isBestseller: true, isSpicy: true },
      { id: 'd2', name: 'Chicken Tikka (Bone Less)', prices: { Half: '1 Stick', Full: '270 (8 Pcs)' }, desc: 'Boneless juicy chicken tikka' },
      { id: 'd3', name: 'Chicken Malai Tikka (Bone Less)', prices: { Half: '1 Stick', Full: '300 (8 Pcs)' }, desc: 'Creamy cashew marinated chicken morsels' },
      { id: 'd4', name: 'Tangri Leg (Breast)', prices: { Half: '1 Pcs', Full: 95 }, desc: 'Juicy roasted chicken leg item' },
      { id: 'd5', name: 'Chicken Kalimirch', prices: { Half: '270 (4 Pcs)', Full: '520 (8 Pcs)' }, desc: 'Black pepper infused grilled chicken', isSpicy: true },
      { id: 'd6', name: 'Chicken Afghani', prices: { Half: '200 (4 Pcs)', Full: '390 (8 Pcs)' }, desc: 'Rich yogurt and butter coated roast' },
      { id: 'd7', name: 'Chicken Chilli', prices: { Half: '100 (8 Pcs)', Full: '370 (16 Pcs)' }, desc: 'Indo-Chinese style chili chicken' },
    ]
  },
  {
    category: 'Chicken Gravy',
    items: [
      { id: 'cg1', name: 'Shahi Chicken Masala', prices: { Qtr: '160 (2 Pcs)', Half: '280 (4 Pcs)', Full: '540 (8 Pcs)' }, desc: 'Royal rich gravy with aromatic Mughlai spices', isBestseller: true },
      { id: 'cg2', name: 'Butter Chicken', prices: { Qtr: '160 (2 Pcs)', Half: '220 (4 Pcs)', Full: '540 (8 Pcs)' }, desc: 'Velvety tomato cream curry' },
      { id: 'cg3', name: 'Chicken Korma', prices: { Half: '160 (2 Pcs)', Full: '310 (4 Pcs)' }, desc: 'Slow-cooked Awadhi style korma' },
      { id: 'cg4', name: 'Chicken Do Pyaza', prices: { Half: '170 (3 Pcs)', Full: '340 (8 Pcs)' }, desc: 'Caramelized onion rich gravy' },
      { id: 'cg5', name: 'Chicken Tikka Masala', prices: { Half: '240 (6 Pcs)', Full: '640 (12 Pcs)' }, desc: 'Smoky tikka chunks in spicy gravy', isSpicy: true },
      { id: 'cg6', name: 'Chicken Boti Kabab', prices: { Half: 195, Full: 360 }, desc: 'Boneless gravy special' },
      { id: 'cg7', name: 'Chicken Chilli', prices: { Half: '200 (6 Pcs)', Full: '390 (12 Pcs)' }, desc: 'Thick spicy gravy chili chicken' },
      { id: 'cg8', name: 'Extra Gravy (Mutton)', prices: { Half: 90, Full: 160 }, desc: 'Aromatic mutton curry gravy' },
      { id: 'cg9', name: 'Extra Gravy (Masala)', prices: { Half: 160, Full: 310 }, desc: 'Rich masala gravy bowl' },
    ]
  },
  {
    category: 'Veg Items',
    items: [
      { id: 'v1', name: 'Paneer Chilli Dry', prices: { Half: '100 (6 Pcs)', Full: '190 (16 Pcs)' }, desc: 'Crispy cottage cheese in pepper sauce', isVeg: true },
      { id: 'v2', name: 'Mix Veg', prices: { Half: 100, Full: 190 }, desc: 'Assorted seasonal vegetables', isVeg: true },
      { id: 'v3', name: 'Veg Jaal Frizi', prices: { Half: 100, Full: 190 }, desc: 'Tangy and spicy stir-fried veg', isVeg: true },
      { id: 'v4', name: 'Paneer Tikka', prices: { Half: '1 Stick', Full: '160 (8 Pcs)' }, desc: 'Tandoor roasted cottage cheese', isVeg: true, isBestseller: true },
      { id: 'v5', name: 'Daal Handi Fry', prices: { Half: 90, Full: 190 }, desc: 'Lentils tempered with garlic & ghee', isVeg: true },
      { id: 'v6', name: 'Daal Makhni', prices: { Half: 100, Full: 190 }, desc: 'Slow simmered black lentils in butter', isVeg: true },
      { id: 'v7', name: 'Handi Paneer', prices: { Half: 140, Full: 270 }, desc: 'Handi cooked spicy gravy paneer', isVeg: true },
      { id: 'v8', name: 'Paneer Do Pyaza', prices: { Half: 150, Full: 280 }, desc: 'Paneer cooked with double onions', isVeg: true },
      { id: 'v9', name: 'Shahi Paneer', prices: { Half: 150, Full: 280 }, desc: 'Sweet & creamy royal paneer curry', isVeg: true },
      { id: 'v10', name: 'Kadhai Paneer', prices: { Half: 140, Full: 270 }, desc: 'Bell peppers & freshly ground spices', isVeg: true, isSpicy: true },
    ]
  }
];

export default function ZigzagMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterVeg, setFilterVeg] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (id) => {
    setAddedItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const categories = ['All', ...MENU_DATA.map((c) => c.category)];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white pt-28 pb-24 px-4 sm:px-8 selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-amber-500 text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Awadhi Delicacies
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-amber-50 mt-2">
          Tundey Kababi Menu
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-lg mx-auto font-light">
          Crafted with century-old recipes from Aminabad, Lucknow.
        </p>

        {/* SEARCH & CATEGORY FILTER */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between max-w-3xl mx-auto bg-neutral-900/60 border border-neutral-800 p-3 rounded-2xl">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            <input
              type="text"
              placeholder="Search dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                    : 'text-gray-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFilterVeg(!filterVeg)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition shrink-0 ${
              filterVeg
                ? 'bg-green-950/60 border-green-500 text-green-400'
                : 'bg-neutral-950 border-neutral-800 text-gray-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-green-500" /> Pure Veg
          </button>
        </div>
      </div>

      {/* DISH SECTIONS (ZIGZAG LAYOUT) */}
      <div className="max-w-5xl mx-auto space-y-16">
        {MENU_DATA.filter(
          (cat) => activeCategory === 'All' || activeCategory === cat.category
        ).map((sec) => {
          const filteredDishes = sec.items.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesVeg = filterVeg ? item.isVeg : true;
            return matchesSearch && matchesVeg;
          });

          if (filteredDishes.length === 0) return null;

          return (
            <div key={sec.category} className="space-y-8">
              {/* Category Heading */}
              <div className="flex items-center justify-center gap-3 border-b border-amber-900/30 pb-3">
                <Flame className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-serif font-bold text-amber-200 tracking-wide">{sec.category}</h2>
              </div>

              {/* ZIGZAG GRID CONTAINER */}
              <div className="relative space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                
                {/* Center Dividing Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent -translate-x-1/2 pointer-events-none" />

                {filteredDishes.map((item, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`relative bg-neutral-900/50 border border-neutral-800/80 hover:border-amber-600/50 p-5 rounded-2xl transition flex flex-col justify-between gap-4 ${
                        isEven ? 'md:col-start-1 md:mr-2' : 'md:col-start-2 md:ml-2'
                      }`}
                    >
                      {/* Top Row: Name, Badges, Veg Dot */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full border flex items-center justify-center p-0.5 shrink-0 ${
                              item.isVeg ? 'border-green-500' : 'border-red-500'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                            </span>
                            <h3 className="font-serif font-semibold text-lg text-amber-50">{item.name}</h3>
                          </div>

                          {/* Badges */}
                          {item.isBestseller && (
                            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shrink-0">
                              <Star className="w-2.5 h-2.5 fill-amber-400" /> Bestseller
                            </span>
                          )}
                          {item.isSpicy && (
                            <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0">
                              🌶️ Spicy
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-400 font-light pl-5">{item.desc}</p>
                      </div>

                      {/* Bottom Row: Prices & Add Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800/50 mt-2">
                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(item.prices).map(([portion, price]) => (
                            <div key={portion} className="bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-lg text-xs">
                              <span className="text-amber-500 font-medium">{portion}: </span>
                              <span className="text-gray-200 font-bold">₹{price}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleAddToCart(item.id)}
                          className={`p-2 rounded-lg text-xs font-semibold transition ${
                            addedItems[item.id]
                              ? 'bg-green-600 text-white'
                              : 'bg-amber-600 hover:bg-amber-500 text-white'
                          }`}
                        >
                          {addedItems[item.id] ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}