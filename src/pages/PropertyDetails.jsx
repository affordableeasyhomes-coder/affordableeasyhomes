import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BedDouble, Bath, Maximize, MapPin, CheckCircle2,
  ArrowLeft, Share2, Heart, Calendar, ShieldCheck, Star, Check
} from 'lucide-react';
import { fetchPropertyById, bookTour } from '../apiService';
import BookingModal from '../components/BookingModal';
import { DEFAULT_BOOKING_FORM } from '../config';
import { setSEO } from '../utils/seo';
import { isFavorite, toggleFavorite } from '../utils/favorites';

const DEFAULT_AMENITIES = ['Fiber Internet', 'Smart Home Tech', 'Dedicated Parking', 'In-unit Laundry', 'Concierge Service', 'Private Terrace'];

const PropertyDetails = () => {
  const { id } = useParams();
  // URLs look like /properties/<mongoId>--<slug>; the id is the first segment
  const propertyId = id.split('-')[0];
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState(DEFAULT_BOOKING_FORM);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [tourFee, setTourFee] = useState(50.00);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!property) return;

    try {
      setBookingStatus({ type: 'loading', message: 'Processing your booking...' });

      const bookingData = {
        property_id: property.id,
        ...bookingForm,
        preferred_time: bookingForm.preferred_time + ':00',
      };

      const result = await bookTour(bookingData);

      setBookingStatus({
        type: 'success',
        message:
          'We have received your booking. Check your email for payment instructions to finalize your tour.',
        bookingId: result.booking_id,
      });

      setTimeout(() => setShowBookingModal(false), 4000);
    } catch (err) {
      setBookingStatus({
        type: 'error',
        message: err.message || 'Booking failed. Please try again.',
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    } catch {
      // user cancelled share — nothing to do
    }
  };

  useEffect(() => {
    setLoading(true);
    const getDetails = async () => {
      try {
        const data = await fetchPropertyById(propertyId);
        setProperty(data.property);
        setTourFee(data.tourFee || 50.00);
        if (data.property) setFavorite(isFavorite(data.property.id));
      } catch (err) {
        console.error('Failed to load property:', err);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [propertyId]);

  useEffect(() => {
    if (!property) return;
    setSEO({
      title: `Easy Affordable Home | ${property.title} in ${property.location}`,
      description: `Discover this affordable ${property.type} in ${property.location}. ${property.beds} bedrooms, ${property.baths} bathrooms, available now. Book a tour today.`
    });
  }, [property]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20">
        <div className="h-[60vh] bg-stone-200 animate-pulse" />
        <div className="container mx-auto max-w-7xl px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-stone-200 rounded animate-pulse w-2/3" />
            <div className="h-4 bg-stone-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-stone-200 rounded animate-pulse w-5/6" />
          </div>
          <div className="h-96 bg-stone-200 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6 text-center">
        <h1 className="text-4xl font-serif text-stone-900 mb-4">Property not found</h1>
        <p className="text-stone-500 mb-8 max-w-md">This listing may have been removed or the link is incorrect.</p>
        <Link to="/properties" className="bg-stone-900 text-white px-8 py-4 rounded-full hover:bg-stone-700 transition font-medium">
          Browse All Properties
        </Link>
      </div>
    );
  }

  const amenities = property.amenities
    ? property.amenities.split(',').map(a => a.trim()).filter(Boolean)
    : DEFAULT_AMENITIES;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Navigation & Actions Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-stone-900 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button
            onClick={handleShare}
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white relative"
            aria-label="Share property"
          >
            {shareCopied ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5 text-stone-900" />}
          </button>
          <button
            onClick={() => setFavorite(toggleFavorite(property))}
            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white"
            aria-label={favorite ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 stroke-red-500' : 'text-stone-900'}`} />
          </button>
        </div>
      </div>

      {/* Cinematic Hero */}
      <div className="relative h-[70vh] w-full bg-stone-200 overflow-hidden">
        <img
          src={property.image}
          alt={`${property.title} in ${property.location}`}
          className="w-full h-full object-cover animate-fade-in"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-6 md:left-10 right-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase inline-block">
              {property.type}
            </span>
            {property.rating && (
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" /> {property.rating}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 opacity-90">
            <MapPin className="w-4 h-4" />
            <span className="text-lg font-light">{property.location}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2">
            {/* Highlights Grid */}
            <div className="flex items-center gap-8 py-8 border-b border-stone-100 overflow-x-auto">
              <div className="flex flex-col gap-1 min-w-max">
                <span className="text-stone-400 text-xs uppercase font-bold tracking-tighter">Bedrooms</span>
                <div className="flex items-center gap-2 text-xl font-medium"><BedDouble className="w-5 h-5" /> {property.beds}</div>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div className="flex flex-col gap-1 min-w-max">
                <span className="text-stone-400 text-xs uppercase font-bold tracking-tighter">Bathrooms</span>
                <div className="flex items-center gap-2 text-xl font-medium"><Bath className="w-5 h-5" /> {property.baths}</div>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div className="flex flex-col gap-1 min-w-max">
                <span className="text-stone-400 text-xs uppercase font-bold tracking-tighter">Square Feet</span>
                <div className="flex items-center gap-2 text-xl font-medium"><Maximize className="w-5 h-5" /> {Number(property.sqft).toLocaleString()}</div>
              </div>
            </div>

            {/* Description */}
            <div className="py-10">
              <h3 className="text-2xl font-serif mb-6 text-stone-900">About this Home</h3>
              <p className="text-stone-600 leading-relaxed text-lg font-light">
                {property.description || `This affordable ${property.type} is located in ${property.location} and offers ${property.beds} bedrooms, ${property.baths} bathrooms, and ${Number(property.sqft).toLocaleString()} square feet of living space.`}
                {' '}Ideal for renters seeking a budget-friendly home with modern amenities in a prime location.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="py-10 border-t border-stone-100">
              <h3 className="text-2xl font-serif mb-8 text-stone-900">Premium Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {amenities.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-stone-700">
                    <CheckCircle2 className="w-5 h-5 text-stone-400" />
                    <span className="font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 bg-stone-50 rounded-3xl border border-stone-200 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-stone-400 text-xs font-bold uppercase block mb-1">Monthly Rent</span>
                  <span className="text-4xl font-semibold text-stone-900">${property.price.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-green-600 text-sm font-medium">Available Now</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-stone-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-stone-400 leading-none mb-1">Tour Fee</span>
                    <span className="text-sm font-medium text-stone-900">${tourFee} (Refundable)</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-stone-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-stone-400 leading-none mb-1">Security</span>
                    <span className="text-sm font-medium text-stone-900">Verified Listing</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingForm(DEFAULT_BOOKING_FORM);
                  setBookingStatus(null);
                  setShowBookingModal(true);
                }}
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-all mb-4 active:scale-95 shadow-xl shadow-stone-200"
              >
                Book a Private Tour
              </button>

              <Link
                to="/support"
                className="block text-center w-full bg-white border border-stone-300 text-stone-900 py-4 rounded-xl font-bold hover:bg-stone-50 transition-all"
              >
                Contact Agent
              </Link>

              <p className="text-center text-[11px] text-stone-400 mt-6 leading-relaxed px-4">
                By booking a tour, you agree to our <Link to="/terms" className="underline">terms of service</Link> and <Link to="/privacy" className="underline">privacy policy</Link> regarding personal data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        show={showBookingModal}
        property={property}
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

export default PropertyDetails;
