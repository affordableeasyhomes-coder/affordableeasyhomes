import React from 'react';
import { ChevronRight, AlertCircle, HomeIcon } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { DEFAULT_FILTERS } from '../config';

const PropertyListings = ({ 
  displayedProperties, 
  properties, 
  loading, 
  error, 
  tourFee, 
  openBookingModal, 
  loadMoreProperties, 
  visibleCount,
  filters,
  setFilters,
  loadData
}) => {
  return (
    <section id="listings" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h3 className="text-4xl font-serif text-stone-900 mb-2">Curated Selection</h3>
            <p className="text-stone-500 font-light">
              Showing {displayedProperties.length} of {properties.length} exclusive properties
            </p>
          </div>
          <button 
            className="text-sm tracking-widest uppercase hover:text-stone-500 flex items-center gap-2 font-semibold border-b border-transparent hover:border-stone-500 pb-1 transition-all"
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              loadData();
            }}
          >
            Reset Filters <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
            <p className="mt-6 text-stone-500 tracking-wider text-sm uppercase">Curating properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-red-50 rounded-xl border border-red-100">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-800 font-medium mb-6">{error}</p>
            <button 
              onClick={loadData}
              className="bg-white text-red-900 border border-red-200 px-8 py-3 rounded-full hover:bg-red-50 transition-all shadow-sm"
            >
              Try Again
            </button>
          </div>
        ) : displayedProperties.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-xl border border-dashed border-stone-300">
            <HomeIcon className="w-16 h-16 text-stone-200 mx-auto mb-6" />
            <p className="text-stone-900 text-xl font-serif mb-2">No matches found</p>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">We couldn't find any properties matching your current criteria. Try adjusting your filters.</p>
            <button 
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-stone-700 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayedProperties.map((property) => (
                <div key={property.id} className="transform transition-all duration-300 hover:-translate-y-2">
                  <PropertyCard 
                    property={property} 
                    tourFee={tourFee}
                    onBookTour={openBookingModal}
                  />
                </div>
              ))}
            </div>
            
            {/* See More Button */}
            {properties.length > visibleCount && (
              <div className="text-center mt-20">
                <button 
                  onClick={loadMoreProperties}
                  className="group bg-white text-stone-900 border border-stone-200 px-10 py-4 rounded-full hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all shadow-lg inline-flex items-center gap-3 font-medium"
                >
                  Load More Properties
                  <span className="bg-stone-100 text-stone-900 rounded-full px-2 py-0.5 text-xs group-hover:bg-white/20 group-hover:text-white">
                    {properties.length - visibleCount}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {/* Show message when all properties are displayed */}
            {properties.length > 0 && properties.length <= visibleCount && (
              <div className="text-center mt-20 pb-12">
                <div className="w-16 h-px bg-stone-300 mx-auto mb-6"></div>
                <p className="text-stone-400 text-sm font-light italic">
                  You have viewed all {properties.length} available residences.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PropertyListings;