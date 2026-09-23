'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function InteractiveHome() {
  const containerRef = useRef(null);

  // Track scroll progress inside the 400vh tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 1. Plate Rotation & Scale Animations
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const plateScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8]);

  // 2. Background Glow Animation
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 0.8, 0.4]);

  // 3. Section Opacities based on Scroll Position
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  const scene4Opacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);

  return (
    <div className="bg-[#0c0c0c] text-white selection:bg-amber-500 selection:text-black">
      
      {/* SCROLL TRACKER CONTAINER */}
      <div ref={containerRef} className="relative h-[400vh]">
        
        {/* STICKY VIEWPORT */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* BACKGROUND AMBIENT LIGHT */}
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute w-[500px] h-[500px] bg-amber-600/30 rounded-full blur-[140px] pointer-events-none"
          />

          {/* CENTER FIXED ROTATING PLATE & OVERLAYS */}
          <motion.div 
            style={{ rotate: plateRotate, scale: plateScale }}
            className="relative w-[320px] sm:w-[420px] md:w-[500px] aspect-square z-20 flex items-center justify-center"
          >
            {/* 1. Base Plate Image */}
            <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(217,119,6,0.3)]">
              <Image 
                src="/plate.png" 
                alt="Brass Plate" 
                fill 
                className="object-contain"
                priority
              />
            </div>

            {/* 2. SCENE 2 FOOD: Kabab & Paratha Overlay */}
            <motion.div 
              style={{ opacity: scene2Opacity }}
              className="absolute inset-0 p-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <Image 
                src="/kabab-paratha.png" 
                alt="Galouti Kabab and Mughlai Paratha" 
                fill 
                className="object-contain"
              />
            </motion.div>

            {/* 3. SCENE 3 SPICES: Floating Spices Overlay */}
            <motion.div 
              style={{ opacity: scene3Opacity }}
              className="absolute inset-0 scale-110"
            >
              <Image 
                src="/spices-floating.png" 
                alt="160 Secret Spices" 
                fill 
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* OVERLAY TEXT SCENES */}

          {/* SCENE 1 TEXT */}
          <motion.div 
            style={{ opacity: scene1Opacity }}
            className="absolute z-30 text-center max-w-xl px-6 pointer-events-none"
          >
            <span className="text-amber-500 font-serif italic text-lg sm:text-xl">Welcome to</span>
            <h1 className="text-5xl sm:text-7xl font-serif font-bold mt-2 tracking-wide">
              Tunday Kababi
            </h1>
            <p className="text-gray-400 mt-4 text-sm sm:text-base">
              Scroll down to begin the culinary journey of Aminabad since 1905
            </p>
          </motion.div>

          {/* SCENE 2 TEXT (Kabab Reveal) */}
          <motion.div 
            style={{ opacity: scene2Opacity }}
            className="absolute z-30 left-8 sm:left-16 md:left-24 max-w-md pointer-events-none"
          >
            <span className="text-amber-500 font-serif italic text-lg">Melt In Mouth</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mt-1 text-white">
              The Famous Galouti
            </h2>
            <p className="text-neutral-300 mt-3 text-sm sm:text-base leading-relaxed">
              Crafted originally for the Nawab of Awadh. Prepared on the iconic iron tawa with hand-pounded meat.
            </p>
          </motion.div>

          {/* SCENE 3 TEXT (Secret Recipe) */}
          <motion.div 
            style={{ opacity: scene3Opacity }}
            className="absolute z-30 right-8 sm:right-16 md:right-24 max-w-md text-right pointer-events-none"
          >
            <span className="text-amber-500 font-serif italic text-lg">Four Generations</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mt-1 text-white">
              160 Secret Spices
            </h2>
            <p className="text-neutral-300 mt-3 text-sm sm:text-base leading-relaxed">
              A closely guarded family recipe passed down through generations, creating an aroma unmatched anywhere in Lucknow.
            </p>
          </motion.div>

          <motion.div 
              style={{ opacity: scene4Opacity }}
              className="absolute inset-0 p-12 sm:p-16 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image 
                  src="/owner-celebrities.webp" 
                  alt="Owners and Celebrities" 
                  fill 
                  className="object-cover"
                />
              </div>
            </motion.div>

          {/* SCENE 4 TEXT & CELEBRITIES PHOTO */}
          {/* <motion.div 
            style={{ opacity: scene4Opacity }}
            className="absolute z-30 text-center max-w-3xl px-6 flex flex-col items-center"
          >
            <span className="text-amber-500 font-serif italic text-lg">Wall of Fame</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mt-1">
              Loved By Legends
            </h2>
            <p className="text-neutral-300 mt-2 text-sm sm:text-base max-w-xl">
              From royalty and freedom fighters to global stars and food connoisseurs — everyone visits Aminabad for the authentic taste.
            </p> */}

            {/* CELEBRITY / OWNER IMAGE FRAME */}
            {/* <div className="relative w-full max-w-md h-48 sm:h-64 mt-6 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl">
              <Image 
                src="/owner-celebrities.webp" 
                alt="Owners and Celebrities at Tunday Kababi" 
                fill 
                className="object-cover"
              />
            </div>

            <div className="mt-6">
              <Link 
                href="/menu" 
                className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full shadow-lg transition inline-block"
              >
                Explore Full Menu
              </Link>
            </div>
          </motion.div> */}
          {/* 👇 YEH REPLACE KARO (Purane Scene 4 Text ki jagah) */}
          <motion.div 
            style={{ opacity: scene4Opacity }}
            className="absolute z-30 inset-0 flex flex-col justify-between items-center py-12 px-6 pointer-events-none"
          >
            {/* Top Heading */}
            <div className="text-center max-w-2xl mt-4">
              <span className="text-amber-500 font-serif italic text-lg">Wall of Fame</span>
              <h2 className="text-4xl sm:text-6xl font-serif font-bold mt-1">
                Loved By Legends
              </h2>
              <p className="text-neutral-300 mt-2 text-sm sm:text-base hidden sm:block">
                From royalty and freedom fighters to global stars and food connoisseurs — everyone visits Aminabad for the authentic taste.
              </p>
            </div>

            {/* Bottom Button */}
            <div className="mb-4 pointer-events-auto">
              <Link 
                href="/menu" 
                className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full shadow-2xl transition inline-block"
              >
                Explore Full Menu
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}