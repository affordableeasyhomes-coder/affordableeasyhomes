// API Configuration
export const API_BASE_URL = 'https://admin.lowcostaparments.com/api';

// Amenities Data (icons as string references only)
export const AMENITIES = [
  { icon: 'Shield', title: "24/7 Security", description: "Advanced security systems" },
  { icon: 'Clock', title: "Concierge", description: "24-hour concierge service" },
  { icon: 'TrendingUp', title: "Smart Home", description: "Fully integrated technology" },
  { icon: 'Users', title: "Community", description: "Exclusive resident events" },
  { icon: 'Award', title: "Premium", description: "Luxury brand appliances" },
  { icon: 'Building', title: "Amenities", description: "Gym, pool, spa & more" }
];

// Time Slots for Booking
export const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

// Guest Options
export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6];

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Credit Card', icon: 'CreditCard' },
  { value: 'paypal', label: 'PayPal', icon: 'DollarSign' },
  { value: 'stripe', label: 'Stripe', icon: 'CreditCard' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: 'CreditCard' }
];

// Property Types for Filter
export const PROPERTY_TYPES = [
  { value: '', label: 'Property Type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'villa', label: 'Villa' },
  { value: 'loft', label: 'Loft' }
];

// Default Stats
export const DEFAULT_STATS = {
  totalProperties: 0,
  countries: 0,
  satisfaction: '98%',
  experienceYears: 15
};

// Default Booking Form
export const DEFAULT_BOOKING_FORM = {
  full_name: '',
  email: '',
  phone: '',
  preferred_date: '',
  preferred_time: '',
  guests: 1,
  message: '',
  payment_method: 'credit_card'
};

// Default Filters
export const DEFAULT_FILTERS = {
  state: '',
  type: '',
  min_price: '',
  max_price: ''
};

// Social Links
export const SOCIAL_LINKS = [
  { platform: 'Instagram', icon: 'Instagram', href: '#' },
  { platform: 'Twitter', icon: 'Twitter', href: '#' },
  { platform: 'Facebook', icon: 'Facebook', href: '#' }
];

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Partners', href: '#' }
  ],
  support: [
    { label: 'Concierge', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' }
  ],
  locations: [
    { label: 'United States', href: '#' },
    { label: 'Europe', href: '#' },
    { label: 'Asia Pacific', href: '#' },
    { label: 'Middle East', href: '#' }
  ]
};