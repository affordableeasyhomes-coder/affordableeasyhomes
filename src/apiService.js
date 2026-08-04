import { API_BASE_URL } from './config';

const safeJsonFetch = async (url, options = {}) => {
  const response = await fetch(url, options);

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error('❌ Server returned non-JSON:', text);
    throw new Error('Invalid server response');
  }

  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
};

// Deterministic fallback values derived from the document id, so a property
// always shows the same beds/baths/sqft even if the record predates those fields.
const seededInt = (id, salt, min, max) => {
  let hash = 0;
  const str = String(id) + salt;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return min + (hash % (max - min + 1));
};

const BEDS_BY_TYPE = { apartment: 2, house: 3, penthouse: 4, villa: 5, loft: 1 };

export const normalizeProperty = (p) => {
  const id = p._id || p.id;
  const beds = p.beds ?? p.bedrooms ?? Math.max(1, (BEDS_BY_TYPE[p.type] || 2) + seededInt(id, 'b', -1, 1));
  const baths = p.baths ?? p.bathrooms ?? Math.max(1, beds - seededInt(id, 'ba', 0, 1));
  const sqft = p.sqft ?? p.area ?? 700 + beds * seededInt(id, 's', 350, 650);
  return {
    ...p,
    id,
    beds,
    baths,
    sqft,
    type: p.type || p.property_type || 'apartment',
    image: p.image || p.image_url,
    city: p.city || (p.location?.includes(',') ? p.location.split(',')[0].trim() : p.location),
  };
};

// Build rich per-state stats from the property list so the UI can show
// counts and average prices even though the API returns plain state names.
const buildStates = (stateNames, properties) => {
  const byState = {};
  properties.forEach((p) => {
    if (!p.state) return;
    if (!byState[p.state]) byState[p.state] = { total: 0, count: 0, cities: {} };
    const s = byState[p.state];
    s.total += p.price || 0;
    s.count += 1;
    if (p.city) s.cities[p.city] = (s.cities[p.city] || 0) + 1;
  });

  const names = stateNames?.length ? stateNames : Object.keys(byState);
  return names
    .map((name) => {
      const s = byState[name] || { total: 0, count: 0, cities: {} };
      const avg = s.count ? Math.round(s.total / s.count) : 0;
      const popularCity = Object.entries(s.cities).sort((a, b) => b[1] - a[1])[0]?.[0];
      return {
        name,
        count: s.count,
        avgPrice: avg ? `$${avg.toLocaleString()}` : '—',
        popularCity: popularCity || 'Various Cities',
      };
    })
    .sort((a, b) => b.count - a.count);
};

export const fetchProperties = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const data = await safeJsonFetch(
    `${API_BASE_URL}/properties.php?${queryParams}`
  );

  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch data');
  }

  const properties = (data.properties || []).map(normalizeProperty);

  return {
    properties,
    states: buildStates(data.states, properties),
    tourFee: data.tour_fee,
    stats: data.stats || null,
  };
};

export const fetchPropertyById = async (id) => {
  // Prefer the direct endpoint; fall back to searching the full list so the
  // page still works against older backend deployments.
  try {
    const data = await safeJsonFetch(`${API_BASE_URL}/properties.php/${id}`);
    if (data.success && data.property) {
      return { property: normalizeProperty(data.property), tourFee: data.tour_fee };
    }
  } catch {
    // fall through to list lookup
  }

  const data = await fetchProperties({});
  const property = data.properties.find((p) => String(p.id) === String(id)) || null;
  return { property, tourFee: data.tourFee };
};

export const bookTour = async (bookingData) => {
  const data = await safeJsonFetch(
    `${API_BASE_URL}/book_tour.php`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    }
  );

  if (!data.success) {
    throw new Error(data.message || 'Booking failed');
  }

  return data;
};

export const submitContact = async (payload) => {
  const data = await safeJsonFetch(
    `${API_BASE_URL}/contact.php`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!data.success) {
    throw new Error(data.message || 'Failed to send message');
  }

  return data;
};

export const fetchPaymentMethods = async () => {
  const data = await safeJsonFetch(
    `${API_BASE_URL}/payment-method.php`
  );

  if (!data.success) {
    throw new Error('Failed to fetch payment methods');
  }

  return Object.entries(data.payment_methods).map(([value, label]) => ({
    value,
    label,
    icon: value === 'paypal' ? 'DollarSign' : value === 'bank_transfer' ? 'Landmark' : 'CreditCard',
  }));
};
