import React, { useState, useEffect } from 'react';
import { MapPin, Search, Home as HomeIcon, ChevronDown, ArrowRight } from 'lucide-react';
import { PROPERTY_TYPES } from '../config';

// Curated high-res images for the slideshow
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop", // Modern Living Room
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop", // Exterior Pool
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", // Minimalist Bedroom
];

const HeroSection = ({ filters, usStates, handleFilterChange, loadData }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle Slideshow Logic
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
      
      {/* --- Background Slideshow --- */}
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImageIdx ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={img} 
            alt="Interior" 
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentImageIdx ? 'scale-110' : 'scale-100'
            }`}
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* --- Content Layer --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        {/* Animated Text Block */}
        <div className={`text-center text-white transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-medium text-white/90">
              Curated Living Spaces
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-10 leading-tight drop-shadow-lg">
            Find Your <br/> 
            <span className="italic font-light text-white bg-clip-text relative inline-block">
              Sanctuary
              {/* Decorative underline */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-white/80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99999C44.7571 2.37344 116.321 -2.71077 198 4.49999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
        </div>

        {/* --- Floating Search Interface --- */}
        <div 
          className={`w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-3xl shadow-2xl transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-2">
            
            {/* State Selector */}
            <div className="relative flex-1 w-full group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <select 
                className="w-full bg-transparent text-white pl-12 pr-10 py-4 outline-none appearance-none cursor-pointer text-base font-medium border-b md:border-b-0 md:border-r border-white/10 focus:bg-white/5 transition-colors rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              >
                <option value="" className="text-stone-900">Where to?</option>
                {usStates.map(state => (
                  <option key={state.name} value={state.name} className="text-stone-900">{state.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>

            {/* Type Selector */}
            <div className="relative flex-1 w-full group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors">
                <HomeIcon className="w-5 h-5" />
              </div>
              <select 
                className="w-full bg-transparent text-white pl-12 pr-10 py-4 outline-none appearance-none cursor-pointer text-base font-medium border-b md:border-b-0 md:border-r border-white/10 focus:bg-white/5 transition-colors"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type.value} value={type.value} className="text-stone-900">{type.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
            </div>

            {/* Price Input */}
            <div className="relative flex-1 w-full group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors">
                <span className="text-lg font-serif">$</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Max Price"
                className="w-full bg-transparent text-white pl-12 pr-4 py-4 outline-none placeholder-white/50 text-base font-medium focus:bg-white/5 transition-colors rounded-b-2xl md:rounded-r-none md:rounded-bl-none"
                value={filters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>

            {/* Action Button */}
            <button
              className="w-full md:w-auto bg-white text-stone-900 px-8 py-4 rounded-2xl md:rounded-2xl hover:bg-stone-100 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              onClick={() => {
                loadData();
                const section = document.getElementById('properties-section');
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
         <ArrowRight className="w-6 h-6 rotate-90" />
      </div>
    </header>
  );
};

export default HeroSection;