import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatesGrid from '../components/StatesGrid';
import PropertyListings from '../components/PropertyListings';
import Testimonials from '../components/Testimonials';
import BookingModal from '../components/BookingModal';
import { fetchProperties, bookTour } from '../apiService';
import { DEFAULT_STATS, DEFAULT_BOOKING_FORM, DEFAULT_FILTERS, AMENITIES } from '../config';
import { 
  Shield, Clock, TrendingUp, Users, Award, Building,
  Instagram, Twitter, Facebook, CreditCard, DollarSign,
  Search, Calendar, CheckCircle, ArrowRight
} from 'lucide-react';

// Icon mapping (unchanged)
const ICON_MAP = {
  Shield: (props) => <Shield {...props} />,
  Clock: (props) => <Clock {...props} />,
  TrendingUp: (props) => <TrendingUp {...props} />,
  Users: (props) => <Users {...props} />,
  Award: (props) => <Award {...props} />,
  Building: (props) => <Building {...props} />,
  Instagram: (props) => <Instagram {...props} />,
  Twitter: (props) => <Twitter {...props} />,
  Facebook: (props) => <Facebook {...props} />,
  CreditCard: (props) => <CreditCard {...props} />,
  DollarSign: (props) => <DollarSign {...props} />,
  Search: (props) => <Search {...props} />,
  Calendar: (props) => <Calendar {...props} />,
  CheckCircle: (props) => <CheckCircle {...props} />,
};

function Home() {
  const [properties, setProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [usStates, setUsStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [tourFee, setTourFee] = useState(50.00);
  
  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookingForm, setBookingForm] = useState(DEFAULT_BOOKING_FORM);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [visibleTestimonials, setVisibleTestimonials] = useState(5);

  // Filters
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

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

  // Structured data objects
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      }
    ]
  };

  // Optional: schema for the featured property (can be uncommented and populated later)
  // const featuredPropertySchema = { ... };

  // ========== END SEO CONSTANTS ==========

  // Fetch data
  useEffect(() => {
    loadData();
  }, [filters]);

  // Update displayed properties when properties or visibleCount changes
  useEffect(() => {
    setDisplayedProperties(properties.slice(0, visibleCount));
  }, [properties, visibleCount]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      setVisibleCount(20); // Reset to initial count when filters change
      
      const data = await fetchProperties(filters);
      setProperties(data.properties);
      setUsStates(data.states);
      setTourFee(data.tourFee);
      
      if (data.stats) {
        setStats(prev => ({
          ...prev,
          totalProperties: data.stats.total_properties || 0,
          countries: data.stats.countries || 0
        }));
      }
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const openBookingModal = (property) => {
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
        preferred_date: bookingForm.preferred_date,
        preferred_time: bookingForm.preferred_time + ':00'
      };
      
      const result = await bookTour(bookingData);
      
      setBookingStatus({ 
        type: 'success', 
        message: `We have received your selected payment method. You will receive an email with instructions to complete your payment and finalize your booking.`,
        bookingId: result.booking_id
      });

      // Reset form after success
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingForm(DEFAULT_BOOKING_FORM);
      }, 3000);
    } catch (err) {
      setBookingStatus({ 
        type: 'error', 
        message: err.message || 'Booking failed. Please try again.'
      });
    }
  };

  const loadMoreProperties = () => {
    setVisibleCount(prevCount => prevCount + 20);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200">
      {/* ========== HELMET – SEO Meta Tags & Structured Data ========== */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Easy Affordable Home | Find Affordable Houses & Apartments in the USA</title>
        <meta name="description" content="Easy Affordable Home helps you find affordable houses, budget apartments, and low-cost homes across the USA. Browse verified listings, compare prices, and book tours online." />
        <meta name="keywords" content="affordable homes, cheap apartments, budget houses, low-cost housing, USA real estate, rent to own, easy affordable home" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Easy Affordable Home – Find Homes You Can Actually Afford" />
        <meta property="og:description" content="Discover affordable houses, budget apartments, and low-cost homes across the USA. Verified listings, easy booking." />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />  {/* replace with actual image */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Easy Affordable Home – Affordable Housing Made Simple" />
        <meta name="twitter:description" content="Browse thousands of budget-friendly homes. Rent or buy with confidence." />
        <meta name="twitter:image" content={`${siteUrl}/twitter-card.jpg`} />  {/* replace with actual image */}

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
        {/* Optionally add featured property schema here */}
      </Helmet>

      <HeroSection
        filters={filters}
        usStates={usStates}
        handleFilterChange={handleFilterChange}
        loadData={loadData}
      />

      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">
          Easy Affordable Home – Find Homes You Can Actually Afford
        </h1>
        <p className="text-stone-600 max-w-3xl leading-relaxed mb-6">
          Easy Affordable Home is your trusted platform for discovering affordable houses,
          low-cost apartments, and budget-friendly homes across the United States.
          Whether you are looking to rent or buy, we make finding an easy affordable home simple.
        </p>
        <p className="text-stone-600 max-w-3xl leading-relaxed">
          Browse verified listings by state, compare prices, schedule tours online,
          and move into a home that fits your budget and lifestyle.
        </p>
      </section>

      {/* Stats Section */}
      <section id="residence" className="py-20 bg-white border-b border-stone-100 relative z-20 -mt-8 rounded-t-3xl md:rounded-none md:mt-0">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-stone-100/0 md:divide-stone-100">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-serif mb-3 text-stone-900 group-hover:scale-110 transition-transform duration-500 ease-out">{stats.totalProperties}+</div>
              <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">Properties</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-serif mb-3 text-stone-900 group-hover:scale-110 transition-transform duration-500 ease-out">{stats.countries}</div>
              <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">States Covered</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-serif mb-3 text-stone-900 group-hover:scale-110 transition-transform duration-500 ease-out">{stats.satisfaction}</div>
              <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">Client Satisfaction</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-serif mb-3 text-stone-900 group-hover:scale-110 transition-transform duration-500 ease-out">{stats.experienceYears}</div>
              <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-28 bg-stone-50 overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-stone-900">How It Works</h2>
            <div className="w-24 h-1 bg-stone-900 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              A seamless journey from discovery to doorstep, curated for your convenience.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200 z-0"></div>

            {[
              { icon: "Search", title: "Discover", desc: "Browse curated listings tailored to your lifestyle and preferences." },
              { icon: "Calendar", title: "Book a Tour", desc: "Schedule a private or virtual tour at your convenience." },
              { icon: "CheckCircle", title: "Move In", desc: "Complete payment and move into your new sanctuary." }
            ].map((step, i) => {
              const IconComponent = ICON_MAP[step.icon];
              return (
                <div key={i} className="relative z-10 text-center group">
                  <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-white border border-stone-200 shadow-xl flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                    {IconComponent ? (
                      <IconComponent className="w-8 h-8 text-stone-600 group-hover:text-white transition-colors duration-500" />
                    ) : (
                      <div className="w-8 h-8 bg-stone-300 rounded"></div>
                    )}
                  </div>
                  <h4 className="text-2xl font-serif mb-3 text-stone-900">{step.title}</h4>
                  <p className="text-stone-600 leading-relaxed px-4">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-32 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-stone-300 rounded-tl-3xl hidden md:block"></div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-stone-900">
              Designed for the <br/> 
              <span className="text-stone-400 italic">modern aesthete.</span>
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-stone-900"></div>
              <p className="text-stone-500 font-medium uppercase tracking-wider text-sm">Serving {usStates.length}+ states</p>
            </div>
          </div>
          <div className="text-stone-600 leading-relaxed text-lg font-light md:pl-10 border-l border-stone-200">
            <p className="mb-8">
              We believe that a home is more than just a physical space; it is a reflection of the soul. Our collection features exclusive properties chosen for their character, light, and architectural integrity.
            </p>
            <Link to="/about" className="group inline-flex items-center text-stone-900 font-medium hover:text-stone-600 transition-colors">
              Read our philosophy
              <span className="bg-stone-100 p-2 rounded-full ml-3 group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <StatesGrid
        usStates={usStates}
        onStateSelect={(stateName) => {
          handleFilterChange('state', stateName);
          requestAnimationFrame(() => {
            const section = document.getElementById('properties-section');
            if (section) {
              const y = section.getBoundingClientRect().top + window.pageYOffset - 120;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          });
        }}
      />

      {/* Featured Property Spotlight */}
      <section id="featured" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                alt="Easy affordable modern home for sale in the city"
                loading="lazy"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="bg-white/90 backdrop-blur text-stone-900 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                  Exclusive
                </span>
              </div>
            </div>
            <div className="md:pr-12">
              <p className="uppercase tracking-[0.3em] text-xs font-bold text-stone-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-stone-400"></span> Editor's Pick
              </p>
              <h2 className="text-5xl lg:text-6xl font-serif mb-8 text-stone-900 leading-[1.1]">
                A statement home in the heart of the city
              </h2>
              <p className="text-stone-600 mb-10 text-lg font-light leading-relaxed">
                Designed with precision and purpose, this residence offers expansive interiors,
                panoramic views, and timeless architecture. Perfect for those who seek silence in the noise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const section = document.getElementById('properties-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-stone-900 text-white px-10 py-4 rounded-full hover:bg-stone-700 transition shadow-lg hover:shadow-xl"
                >
                  View Properties
                </button>
                <Link
                  to="/properties"
                  className="border border-stone-200 text-stone-900 px-10 py-4 rounded-full hover:bg-stone-50 transition text-center"
                >
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="properties-section">
        <PropertyListings 
          displayedProperties={displayedProperties}
          properties={properties}
          loading={loading}
          error={error}
          tourFee={tourFee}
          openBookingModal={openBookingModal}
          loadMoreProperties={loadMoreProperties}
          visibleCount={visibleCount}
          filters={filters}
          setFilters={setFilters}
          loadData={loadData}
        />
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-serif mb-6">Premium Amenities</h3>
            <p className="text-stone-600 max-w-2xl mx-auto">Experience unparalleled comfort with our carefully curated selection of luxury amenities and services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((amenity, index) => {
              const Icon = ICON_MAP[amenity.icon];
              return (
                <div key={index} className="bg-white p-8 rounded-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="text-stone-900 mb-4 group-hover:scale-110 transition-transform inline-block">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif mb-2">{amenity.title}</h4>
                  <p className="text-stone-600">{amenity.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials 
        visibleTestimonials={visibleTestimonials}
        setVisibleTestimonials={setVisibleTestimonials}
      />

      {/* Feature Highlight */}
      <section className="py-12 md:py-24 container mx-auto px-6">
        <div className="relative bg-stone-900 text-white overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[2s]" 
              alt="Feature"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 p-12 md:p-32 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-stone-300 mb-8 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md bg-white/5">
              {/* Star icon would go here */}
              <span className="text-xs uppercase tracking-widest font-bold">Premium Membership</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
              Experience the art of <br/> <span className="italic text-stone-200 font-light">elevated living.</span>
            </h2>
            <p className="text-stone-300 mb-12 max-w-xl text-lg leading-relaxed">Join our exclusive community of discerning individuals who value exceptional design, privacy, and unparalleled concierge service.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-black px-10 py-4 rounded-full hover:bg-stone-200 transition-colors font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Browse Properties
              </button>
              <Link
                to="/list-property"
                className="border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all font-medium text-center"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

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
}

export default Home;