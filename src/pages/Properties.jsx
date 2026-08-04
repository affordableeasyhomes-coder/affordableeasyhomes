import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Search, SlidersHorizontal, AlertCircle, X } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { fetchProperties, bookTour } from "../apiService";
import { useSearchParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { DEFAULT_BOOKING_FORM } from '../config';

const Properties = ({ locationFilter, categoryFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [sortBy, setSortBy] = useState("newest");

  // Filters arriving via URL (e.g. /properties?state=Texas or ?city=Miami)
  const stateParam = searchParams.get('state');
  const cityParam = searchParams.get('city');

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookingForm, setBookingForm] = useState(DEFAULT_BOOKING_FORM);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [tourFee, setTourFee] = useState(50.00);

  // ========== SEO CONSTANTS (replace with your actual data) ==========
  const siteUrl = 'https://easyaffordablehome.com';          // your domain
  const siteName = 'Easy Affordable Home';
  const siteLogo = `${siteUrl}/logo.png`;                    // ensure this file exists
  const socialProfiles = [
    'https://facebook.com/easyaffordablehome',
    'https://twitter.com/easyaffordablehome',
    'https://instagram.com/easyaffordablehome'
  ];
  const contactEmail = 'support@easyaffordablehome.com';
  const contactPhone = '+1-800-123-4567';

  // Structured data objects (reused from Home)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: siteLogo,
    sameAs: socialProfiles,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPhone,
      email: contactEmail,
      contactType: 'customer service',
      availableLanguage: 'English'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/properties?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // Dynamic breadcrumb based on current filters
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Properties',
        item: `${siteUrl}/properties`
      }
    ]
  };

  // If a location or category filter is active, add a third breadcrumb
  if (locationFilter) {
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: locationFilter,
      item: `${siteUrl}/hub/${locationFilter.toLowerCase().replace(/\s+/g, '-')}`
    });
  } else if (categoryFilter === 'luxury') {
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: 'Luxury Collection',
      item: `${siteUrl}/collection/luxury`
    });
  }
  // ========== END SEO CONSTANTS ==========

  // Initial Data Load
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties({});
        setProperties(data.properties);
        setTourFee(data.tourFee || 50.00);
      } catch (err) {
        setError("Unable to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  // SMART FILTERING LOGIC
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // 1. Route-based Filtering (Hubs & Collections)
    if (locationFilter) {
      result = result.filter(p =>
        p.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (categoryFilter === 'luxury') {
      // Luxury is defined by price > 5000 or a specific tag
      result = result.filter(p => p.price > 5000 || p.tag?.toLowerCase() === 'luxury');
    }

    // 2. URL query filters (from Locations page links)
    if (stateParam) {
      result = result.filter(p => p.state?.toLowerCase() === stateParam.toLowerCase());
    }
    if (cityParam) {
      result = result.filter(p =>
        p.city?.toLowerCase().includes(cityParam.toLowerCase()) ||
        p.location?.toLowerCase().includes(cityParam.toLowerCase())
      );
    }

    // 3. Search Bar Filtering
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(lowerTerm) ||
        p.location?.toLowerCase().includes(lowerTerm) ||
        p.state?.toLowerCase().includes(lowerTerm)
      );
    }

    // 4. Sorting
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return result;
  }, [properties, searchTerm, sortBy, locationFilter, categoryFilter, stateParam, cityParam]);

  const handleBookTour = (property) => {
    setSelectedProperty(property);
    setBookingForm(DEFAULT_BOOKING_FORM);
    setBookingStatus(null);
    setShowBookingModal(true);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;

    try {
      setBookingStatus({ type: 'loading', message: 'Processing your booking...' });

      const bookingData = {
        property_id: selectedProperty.id,
        ...bookingForm,
        preferred_time: bookingForm.preferred_time + ':00',
      };

      const result = await bookTour(bookingData);

      setBookingStatus({
        type: 'success',
        message: 'Check your email for payment instructions.',
        bookingId: result.booking_id,
      });

      setTimeout(() => setShowBookingModal(false), 3000);
    } catch (err) {
      setBookingStatus({
        type: 'error',
        message: err.message || 'Booking failed',
      });
    }
  };

  // Dynamic title and description for SEO
  const pageTitle = locationFilter
    ? `Easy Affordable Homes in ${locationFilter} | Listings`
    : categoryFilter === 'luxury'
    ? 'Luxury Homes Collection | Easy Affordable Home'
    : 'Easy Affordable Home Listings | Affordable Houses & Apartments';

  const pageDescription = locationFilter
    ? `Browse easy affordable homes, apartments, and houses in ${locationFilter}. Verified listings with flexible pricing.`
    : 'Browse easy affordable homes, budget apartments, and low-cost houses across the USA.';

  const canonicalUrl = locationFilter
    ? `${siteUrl}/hub/${locationFilter.toLowerCase().replace(/\s+/g, '-')}`
    : categoryFilter === 'luxury'
    ? `${siteUrl}/collection/luxury`
    : `${siteUrl}/properties`;

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* ========== HELMET – SEO Meta Tags & Structured Data ========== */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="affordable homes, cheap apartments, budget houses, low-cost housing, USA real estate" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteUrl}/twitter-card.jpg`} />

        {/* JSON‑LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Dynamic Header based on Filter */}
      <div className="pt-32 pb-12 bg-white border-b border-stone-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-8 bg-stone-300"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">
                  {locationFilter || stateParam || cityParam || categoryFilter || 'All Listings'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
                {locationFilter || stateParam || cityParam
                  ? `Affordable Homes in ${locationFilter || cityParam || stateParam}`
                  : categoryFilter === 'luxury'
                  ? 'Luxury Homes Collection'
                  : 'Easy Affordable Home Listings'}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Find your sanctuary..." 
                  className="pl-12 pr-6 py-4 bg-stone-50 rounded-2xl border-none outline-none focus:ring-1 focus:ring-stone-200 w-full md:w-80 text-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="pl-6 pr-10 py-4 bg-stone-50 rounded-2xl border-none outline-none focus:ring-1 focus:ring-stone-200 text-sm font-bold appearance-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container mx-auto max-w-7xl px-6 py-10">
        <p className="text-stone-600 max-w-3xl leading-relaxed">
          Discover easy affordable homes, budget-friendly apartments, and low-cost houses
          available for rent or purchase. Our curated property listings help you find a home
          that fits your budget, location, and lifestyle.
        </p>
      </section>

      <main className="container mx-auto max-w-7xl px-6 py-16">
        {/* Active Filter Pills */}
        {(locationFilter || categoryFilter || stateParam || cityParam || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-10">
            {(locationFilter || categoryFilter) && (
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-[10px] font-bold uppercase rounded-full">
                {locationFilter || categoryFilter}
              </div>
            )}
            {(stateParam || cityParam) && (
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-[10px] font-bold uppercase rounded-full">
                {cityParam || stateParam}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchParams({})} />
              </div>
            )}
            {searchTerm && (
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-600 text-[10px] font-bold uppercase rounded-full">
                Search: {searchTerm}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((n) => <PropertySkeleton key={n} />)}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-32">
            <h3 className="text-3xl font-serif text-stone-300 mb-4">
              No affordable homes found
            </h3>
            <p className="text-stone-500 font-light mb-8">Try adjusting your filters or searching another area.</p>
            <button onClick={() => { setSearchTerm(""); setSearchParams({}); }} className="bg-stone-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest">View All Listings</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                tourFee={tourFee}
                onBookTour={handleBookTour}
              />
            ))}
          </div>
        )}
      </main>
      <BookingModal
        show={showBookingModal}
        property={selectedProperty}
        tourFee={tourFee}
        formData={bookingForm}
        status={bookingStatus}
        onClose={() => setShowBookingModal(false)}
        onSubmit={submitBooking}
        onChange={handleBookingChange}
      />
    </div>
  );
};

const PropertySkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 h-[500px]">
    <div className="h-2/3 bg-stone-200 animate-pulse" />
    <div className="p-8 space-y-4">
      <div className="h-6 bg-stone-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-stone-100 rounded animate-pulse w-full" />
      <div className="h-12 bg-stone-200 rounded-xl animate-pulse w-full mt-6" />
    </div>
  </div>
);

export default Properties;