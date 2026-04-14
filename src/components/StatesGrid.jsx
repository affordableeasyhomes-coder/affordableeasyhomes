import React, { useState } from 'react';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';

const StatesGrid = ({ usStates, onStateSelect }) => {

  const [showAllStates, setShowAllStates] = useState(false);
  const featuredStates = showAllStates ? usStates : usStates.slice(0, 6);

  if (usStates.length === 0) return null;

  return (
    <section id="locations" className="py-24 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h3 className="text-4xl font-serif mb-4 text-stone-900">Explore by State</h3>
            <p className="text-stone-600 max-w-xl">Discover exceptional properties across major US states.</p>
          </div>
          {usStates.length > 6 && (
            <button 
              onClick={() => setShowAllStates(!showAllStates)}
              className="hidden md:flex items-center gap-2 text-stone-900 font-medium hover:opacity-70 transition-opacity"
            >
              {showAllStates ? 'View Less' : 'View All'}
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showAllStates ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredStates.map((state) => (
            <div 
              key={state.name} 
              className="bg-white p-8 rounded-xl border border-stone-200/50 hover:border-stone-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer relative overflow-hidden"
              onClick={() => onStateSelect(state.name)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-4 -mt-4 z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-stone-50 rounded-lg group-hover:bg-stone-900 group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-serif font-medium text-stone-900">
                    {typeof state.avgPrice === 'string' ? state.avgPrice : `$${state.avg_price || state.avgPrice}`}
                    <span className="text-xs font-sans font-normal text-stone-500 block text-right mt-1">/mo avg</span>
                  </span>
                </div>

                <h4 className="text-2xl font-serif group-hover:text-stone-600 transition-colors mb-2">{state.name}</h4>
                <p className="text-stone-500 text-sm mb-4">Popular: {state.popularCity || 'Various Cities'}</p>
                
                <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-sm text-stone-500 font-medium">
                  <span>{state.listings || state.count} properties</span>
                  <span className="flex items-center text-stone-900 group-hover:translate-x-1 transition-transform">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {usStates.length > 6 && (
          <div className="text-center md:hidden">
            <button 
              onClick={() => setShowAllStates(!showAllStates)}
              className="text-stone-900 border border-stone-300 px-8 py-3 rounded-full hover:bg-stone-900 hover:text-white transition-all inline-flex items-center gap-2"
            >
              {showAllStates ? 'Show Less States' : 'View All States'}
              <ChevronRight className={`w-4 h-4 transition-transform ${showAllStates ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatesGrid;