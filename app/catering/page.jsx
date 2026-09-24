'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UtensilsCrossed, 
  Sparkles, 
  Calendar, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Calculator
} from 'lucide-react';

export default function CateringPage() {
  const [guests, setGuests] = useState(100);
  const [selectedPkg, setSelectedPkg] = useState('royal');
  const [liveTawa, setLiveTawa] = useState(true);
  const [dessertCounter, setDessertCounter] = useState(true);

  // Price Calculation Logic
  const pkgPrices = { classic: 450, royal: 750, nawabi: 1100 };
  const basePrice = pkgPrices[selectedPkg] * guests;
  const tawaAddon = liveTawa ? guests * 80 : 0;
  const dessertAddon = dessertCounter ? guests * 50 : 0;
  const totalPrice = basePrice + tawaAddon + dessertAddon;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
   <div className="min-h-screen w-full bg-[#0c0c0c] text-white pt-24 pb-16 px-4 sm:px-12 selection:bg-amber-500 selection:text-black">
      
      {/* HERO SECTION */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center max-w-3xl mx-auto my-8"
      >
        <span className="text-amber-500 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Royal Awadhi Feast
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold mt-3 text-amber-50">
          Bulk Catering & Royal Events
        </h1>
        <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
          Bring the legendary 120-year-old taste of Aminabad to your weddings, corporate galas, and private celebrations. Authentic live iron tawa setup included.
        </p>
      </motion.div>

      {/* STATS HIGHLIGHT */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12"
      >
        {[
          { label: 'Events Catered', val: '1,500+' },
          { label: 'Secret Spices', val: '160 Blend' },
          { label: 'Halal Certified', val: '100% Pure' },
          { label: 'Guest Rating', val: '4.9 ★★★★★' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-neutral-900/80 border border-amber-900/30 rounded-2xl p-5 text-center hover:border-amber-500/50 transition">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-500 font-serif">{stat.val}</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* CALCULATOR & ESTIMATOR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-16">
        
        {/* PACKAGE SELECTION */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <UtensilsCrossed className="text-amber-500 w-5 h-5" /> Select Catering Package
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'classic', name: 'Classic Dawat', price: '₹450', desc: 'Galouti Kababs, Mughlai Paratha, Mutton Biryani, Phirni' },
              { id: 'royal', name: 'Royal Awadh', price: '₹750', desc: 'Galouti & Boti Kababs, Sheermal, Chicken Korma, Biryani, Shahi Tukda' },
              { id: 'nawabi', name: 'Nawabi Grand', price: '₹1,100', desc: 'Full Live Tawa Counter, Kakori, Galouti, Nihari, Sheermal, Live Desserts' }
            ].map((pkg) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition flex flex-col justify-between ${
                  selectedPkg === pkg.id 
                    ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10' 
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-serif font-bold text-lg text-amber-200">{pkg.name}</h3>
                    {selectedPkg === pkg.id && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">{pkg.price} <span className="text-xs text-gray-400 font-normal">/ guest</span></p>
                  <p className="text-xs text-gray-400 leading-relaxed">{pkg.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GUEST SLIDER & ADDONS */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 flex items-center gap-2"><Users className="w-4 h-4 text-amber-500" /> Expected Guest Count</span>
                <span className="font-bold text-amber-400 text-base">{guests} Guests</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="1000" 
                step="10"
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer bg-neutral-800 h-2 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>30 Min</span>
                <span>500</span>
                <span>1000+ Max</span>
              </div>
            </div>

            {/* ADDONS */}
            <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 bg-neutral-800/40 p-3 rounded-xl cursor-pointer hover:bg-neutral-800/80 transition">
                <input 
                  type="checkbox" 
                  checked={liveTawa} 
                  onChange={(e) => setLiveTawa(e.target.checked)} 
                  className="accent-amber-500 w-4 h-4"
                />
                <span className="text-xs text-gray-300">Live Charcoal Tawa Counter (+₹80/guest)</span>
              </label>

              <label className="flex items-center gap-3 bg-neutral-800/40 p-3 rounded-xl cursor-pointer hover:bg-neutral-800/80 transition">
                <input 
                  type="checkbox" 
                  checked={dessertCounter} 
                  onChange={(e) => setDessertCounter(e.target.checked)} 
                  className="accent-amber-500 w-4 h-4"
                />
                <span className="text-xs text-gray-300">Awadhi Live Dessert Counter (+₹50/guest)</span>
              </label>
            </div>
          </div>
        </div>

        {/* ESTIMATED SUMMARY CARD */}
        <div className="bg-gradient-to-b from-amber-950/30 to-neutral-900 border border-amber-800/40 rounded-2xl p-6 flex flex-col justify-between h-fit sticky top-24">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-4">
              <Calculator className="w-4 h-4" /> Instant Quote Summary
            </div>

            <div className="space-y-3 text-sm pb-4 border-b border-neutral-800">
              <div className="flex justify-between text-gray-400">
                <span>Selected Package:</span>
                <span className="text-white capitalize">{selectedPkg}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Guest Count:</span>
                <span className="text-white">{guests} Persons</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Live Add-ons:</span>
                <span className="text-amber-400">₹{(tawaAddon + dessertAddon).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-gray-400">Estimated Total</span>
              <div className="text-3xl font-serif font-bold text-amber-400">
                ₹{totalPrice.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-gray-500">*Taxes and setup fees included.</span>
            </div>
          </div>

          <button className="w-full mt-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20">
            Book Booking Consultation <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}