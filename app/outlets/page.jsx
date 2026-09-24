'use client';

import React, { useEffect, useState } from 'react';
import { 
  Crown, 
  MapPin, 
  Clock, 
  PhoneCall, 
  Car, 
  Navigation, 
  Utensils, 
  Train, 
  Plane, 
  TramFront 
} from 'lucide-react';

export default function OutletsPage() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours + minutes / 60;

      if (currentTime >= 11.5 && currentTime <= 23.5) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkStatus();
  }, []);

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C25E09]/10 text-[#C25E09] dark:text-[#E7D8BF] text-xs font-bold uppercase tracking-widest border border-[#C25E09]/20">
          <Crown className="w-4 h-4" /> Since 1905 • Heritage Landmark
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1410] dark:text-[#FAF7F2] tracking-tight">
          Visit Our Flagship Outlet
        </h1>
        <p className="text-base sm:text-lg text-[#6D5E54] dark:text-[#A89A8E] leading-relaxed">
          Step into the historical heart of Chowk & Aminabad. Experience 120+ years of secret Mughlai spices, melting Galouti Kababs, and authentic Awadhi hospitality.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
        {/* Left Panel: Outlet Info & Live Status */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1D1714] border border-[#E7D8BF] dark:border-[#3D322B] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-8">
            
          <div className="space-y-6">
            {/* Title & Live Status */}
            <div className="flex items-start justify-between border-b border-[#F4EDE1] dark:border-[#2C241F] pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1A1410] dark:text-[#FAF7F2]">Aminabad Main Outlet</h2>
                <p className="text-xs text-[#C25E09] font-bold uppercase tracking-wider mt-1">The Original Legacy Kitchen</p>
              </div>
              
              {isOpen ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Open Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Closed Now (Opens 11:30 AM)
                </span>
              )}
            </div>

            {/* Details List */}
            <div className="space-y-5 text-sm text-[#4A3E36] dark:text-[#C5B8AC]">
                
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF0E1] dark:bg-[#2A211B] text-[#C25E09] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1410] dark:text-[#FAF7F2] text-xs uppercase tracking-wider">Address</h3>
                  <p className="mt-0.5 leading-snug">168/6, Nazirabad Rd, Aminabad Market, Aminabad, Lucknow, Uttar Pradesh 226018</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF0E1] dark:bg-[#2A211B] text-[#C25E09] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1410] dark:text-[#FAF7F2] text-xs uppercase tracking-wider">Operating Hours</h3>
                  <p className="mt-0.5">11:30 AM – 11:30 PM (All 7 Days)</p>
                  <p className="text-xs text-[#8C7A6B] mt-0.5">Peak Hours: 8:00 PM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF0E1] dark:bg-[#2A211B] text-[#C25E09] shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1410] dark:text-[#FAF7F2] text-xs uppercase tracking-wider">Direct Hotline</h3>
                  <p className="mt-0.5 font-medium">+91 98390 12345 / 0522 2614321</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FAF0E1] dark:bg-[#2A211B] text-[#C25E09] shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1410] dark:text-[#FAF7F2] text-xs uppercase tracking-wider">Parking Guidance</h3>
                  <p className="mt-0.5">Paid Multi-level Parking available at Aminabad Park (2 min walk).</p>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-[#F4EDE1] dark:border-[#2C241F]">
            <a 
              href="https://maps.google.com/?q=Tunday+Kababi+Aminabad+Lucknow" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-[#C25E09] hover:bg-[#A34C03] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Navigation className="w-4 h-4" />
              Get Live Directions
            </a>
            
            <button 
              onClick={() => alert("Redirecting to Order/Takeaway...")} 
              className="w-full bg-[#FAF6EF] dark:bg-[#251E1A] text-[#C25E09] dark:text-[#E7D8BF] font-bold py-3.5 px-4 rounded-2xl border border-[#E7D8BF] dark:border-[#3D322B] flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:bg-[#C25E09] hover:text-white dark:hover:bg-[#C25E09] transition-all duration-200"
            >
              <Utensils className="w-4 h-4" />
              Order Delivery / Takeaway
            </button>
          </div>

        </div>

        {/* Right Panel: Map & Transport Quick Info */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
          {/* Map Container */}
          <div className="rounded-3xl overflow-hidden border border-[#E7D8BF] dark:border-[#3D322B] shadow-2xl relative bg-[#FAF7F2] dark:bg-[#1A1410] h-[380px] sm:h-[420px] w-full">
            <iframe 
              title="Tunday Kababi Aminabad Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.882410189748!2d80.92383827618035!3d26.843640263062635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd087612f02f%3A0x2897aa135fb08092!2sTunday%20Kababi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0 grayscale focus:grayscale-0 hover:grayscale-0 transition-all duration-500" 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>

          {/* How to Reach Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1D1714] border border-[#E7D8BF] dark:border-[#3D322B] shadow-sm flex items-start gap-3">
              <Train className="w-5 h-5 text-[#C25E09] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-[#1A1410] dark:text-[#FAF7F2]">From Railway Station</p>
                <p className="text-xs text-[#6D5E54] dark:text-[#A89A8E] mt-0.5">2.5 km from Charbagh Station (10 mins drive)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#1D1714] border border-[#E7D8BF] dark:border-[#3D322B] shadow-sm flex items-start gap-3">
              <Plane className="w-5 h-5 text-[#C25E09] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-[#1A1410] dark:text-[#FAF7F2]">From Airport</p>
                <p className="text-xs text-[#6D5E54] dark:text-[#A89A8E] mt-0.5">14 km from CCSI Airport (approx 30 mins)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#1D1714] border border-[#E7D8BF] dark:border-[#3D322B] shadow-sm flex items-start gap-3">
              <TramFront className="w-5 h-5 text-[#C25E09] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-[#1A1410] dark:text-[#FAF7F2]">Nearest Metro</p>
                <p className="text-xs text-[#6D5E54] dark:text-[#A89A8E] mt-0.5">Charbagh / Hazaratganj Metro Station</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}