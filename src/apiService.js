import { API_BASE_URL } from './config';

const safeJsonFetch = async (url, options = {}) => {
  const response = await fetch(url, options);

  const text = await response.text(); // 👈 always read raw text first

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

  return {
    properties: data.properties || [],
    states: data.states || [],
    tourFee: data.tour_fee,
    stats: data.stats || null,
  };
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
    icon: value === 'paypal' ? 'DollarSign' : 'CreditCard',
  }));
};
