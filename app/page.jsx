'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation Variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function Home() {
  return (
    <div className="bg-white dark:bg-[#121212] text-neutral-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
      
      {/* HERO SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-8 md:px-20 max-w-7xl mx-auto py-12"
      >
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">
            A Premium <br />
            <span className="text-amber-600 dark:text-amber-500">& Authentic</span> <br />
            Tunday Kababi
          </h1>
          <p className="text-neutral-600 dark:text-gray-400 text-lg">
            One kitchen, one lane, four generations. Experience the original Galouti Kababs cooked to order on our historic iron tawa since 1905.
          </p>
          <div>
            <Link 
              href="/menu" 
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition duration-300 inline-block shadow-lg shadow-amber-900/30"
            >
              Book A Table
            </Link>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-full max-w-md h-[350px] mt-10 md:mt-0 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shadow-2xl"
        >
          <p className="text-neutral-400 text-sm">Floating Dish PNG Image</p>
        </motion.div>
      </motion.section>

      {/* OUR STORY SECTION (SCROLL ANIMATION) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-8 md:px-20 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-neutral-100 dark:bg-neutral-900 h-80 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
             <p className="text-neutral-400 text-sm">Story Image / Kitchen Video</p>
          </div>
          <div className="space-y-4">
            <span className="text-amber-600 dark:text-amber-500 font-serif italic text-xl">Discover</span>
            <h2 className="text-4xl font-serif font-bold">Our Story</h2>
            <p className="text-neutral-600 dark:text-gray-400 leading-relaxed">
              Get the best authentic Awadhi experience at Tunday Kababi. Whether you are joining us for a family dinner or quick bites in Aminabad, our chefs treat each recipe with four generations of legacy.
            </p>
          </div>
        </div>
      </motion.section>

      {/* DISCOVER OUR MENU SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-8 md:px-20 max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="text-center mb-16">
          <span className="text-amber-600 dark:text-amber-500 font-serif italic text-xl">Discover</span>
          <h2 className="text-4xl font-serif font-bold mt-1">Our Menu</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex gap-6 items-center bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="w-28 h-28 shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center border border-amber-500/20">
              <span className="text-xs text-neutral-500">Dish Pic</span>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-semibold text-amber-600 dark:text-amber-500">Galouti Kabab</h3>
              <p className="text-neutral-600 dark:text-gray-400 text-sm mt-2">
                Melt-in-mouth Galouti Kababs served with freshly baked Mughlai Paratha.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-center bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="w-28 h-28 shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center border border-amber-500/20">
              <span className="text-xs text-neutral-500">Dish Pic</span>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-semibold text-amber-600 dark:text-amber-500">Mutton Korma</h3>
              <p className="text-neutral-600 dark:text-gray-400 text-sm mt-2">
                Juicy, rich Mutton Korma cooked with authentic Lucknowi spices.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}