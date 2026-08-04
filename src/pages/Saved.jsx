import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, BedDouble, Bath, Maximize, Trash2, ArrowRight, Star } from 'lucide-react';
import { getFavorites, removeFavorite, onFavoritesChange } from '../utils/favorites';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Saved = () => {
  const [favorites, setFavorites] = useState(getFavorites());
  const navigate = useNavigate();

  useEffect(() => onFavoritesChange(() => setFavorites(getFavorites())), []);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="pt-32 pb-12 bg-white border-b border-stone-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-stone-300"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">
              Your Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
            Saved Properties
          </h1>
          <p className="text-stone-500 font-light mt-4">
            {favorites.length === 0
              ? 'Tap the heart on any property to keep it here.'
              : `${favorites.length} ${favorites.length === 1 ? 'home' : 'homes'} you loved.`}
          </p>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-6 py-16">
        {favorites.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-stone-200">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-50 flex items-center justify-center">
              <Heart className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-3">Nothing saved yet</h3>
            <p className="text-stone-500 font-light mb-8 max-w-md mx-auto">
              Browse our curated listings and tap the heart icon to build your shortlist.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full hover:bg-stone-700 transition font-medium"
            >
              Explore Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/properties/${p.id}--${slugify(`${p.title} ${p.location}`)}`)}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(p.id);
                    }}
                    aria-label="Remove from saved"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur hover:bg-red-50 text-stone-600 hover:text-red-600 transition-all shadow"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {p.rating && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-stone-800">
                      <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" /> {p.rating}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-serif text-stone-900 leading-tight">{p.title}</h4>
                      <div className="flex items-center text-stone-500 text-sm font-light mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-stone-400" />
                        {p.location}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-stone-900">
                      ${Number(p.price).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-3 border-t border-stone-50 text-xs text-stone-600">
                    <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-stone-400" /> {p.beds}</span>
                    <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-stone-400" /> {p.baths}</span>
                    <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-stone-400" /> {Number(p.sqft).toLocaleString()} ft²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Saved;
