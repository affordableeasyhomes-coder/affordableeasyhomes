import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  BedDouble,
  Bath,
  Maximize,
  ArrowRight,
  MapPin,
  CalendarCheck,
  Eye
} from 'lucide-react';
import { isFavorite, toggleFavorite } from '../utils/favorites';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const PropertyCard = ({ property, tourFee, onBookTour }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(() => isFavorite(property.id));
  const navigate = useNavigate();

  const goToDetails = () => {
    const slug = slugify(`${property.title} ${property.location}`);
    navigate(`/properties/${property.id}--${slug}`);
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={goToDetails}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer"
    >

      {/* --- Image Header --- */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-stone-200 z-0" />
        )}

        {/* Favorite Button (Prevents navigation on click) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavorite(toggleFavorite(property));
          }}
          aria-label={favorite ? 'Remove from saved' : 'Save property'}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-white transition-all duration-300 group/heart"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              favorite
                ? 'fill-red-500 stroke-red-500 scale-110'
                : 'stroke-white group-hover/heart:stroke-stone-900'
            }`}
          />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
          <div className="bg-white text-stone-900 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
            <Eye className="w-4 h-4" />
            View Details
          </div>
        </div>

        <img
          src={property.image}
          alt={`${property.title} in ${property.location}`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20" />

        {/* Rating & Tag */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-stone-800 shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
            <span>{property.rating || 4.9}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full text-white">
            {property.tag || property.type}
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="max-w-[70%]">
            <h4 className="text-xl font-serif text-stone-900 leading-tight mb-1 group-hover:text-stone-600 transition-colors truncate">
              {property.title}
            </h4>
            <div className="flex items-center text-stone-500 text-sm font-light">
              <MapPin className="w-3.5 h-3.5 mr-1 text-stone-400" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-semibold text-stone-900">
              {formatPrice(property.price)}
            </div>
            <div className="text-[10px] uppercase tracking-tighter text-stone-400 font-bold">Per Month</div>
          </div>
        </div>

        {/* Amenities Row */}
        <div className="flex items-center gap-4 py-4 border-y border-stone-50 mb-6">
          <div className="flex items-center gap-1.5 text-stone-600">
            <BedDouble className="w-4 h-4 text-stone-400" />
            <span className="text-xs">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-600">
            <Bath className="w-4 h-4 text-stone-400" />
            <span className="text-xs">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-600">
            <Maximize className="w-4 h-4 text-stone-400" />
            <span className="text-xs">{Number(property.sqft).toLocaleString()} ft²</span>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookTour(property);
            }}
            className="flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            Tour • ${tourFee}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetails();
            }}
            className="flex items-center justify-center gap-2 bg-stone-100 text-stone-900 py-3 rounded-xl text-xs font-bold hover:bg-stone-200 transition-all"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
