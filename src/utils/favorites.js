// Saved-properties store backed by localStorage, with a change event so the
// navbar badge and Saved page stay in sync across components.
const STORAGE_KEY = 'eah_saved_properties';
const EVENT = 'eah:favorites-changed';

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const isFavorite = (id) => getFavorites().some((p) => p.id === id);

export const toggleFavorite = (property) => {
  const favorites = getFavorites();
  const exists = favorites.some((p) => p.id === property.id);
  const next = exists
    ? favorites.filter((p) => p.id !== property.id)
    : [...favorites, {
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        image: property.image,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        rating: property.rating,
        tag: property.tag,
        type: property.type,
      }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
  return !exists;
};

export const removeFavorite = (id) => {
  const next = getFavorites().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
};

export const onFavoritesChange = (callback) => {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};
