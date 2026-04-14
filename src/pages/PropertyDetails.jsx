import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BedDouble, Bath, Maximize, MapPin, CheckCircle2, 
  ArrowLeft, Share2, Heart, Calendar, ShieldCheck 
} from 'lucide-react';
import { fetchProperties } from '../apiService'; // Adjust based on your API
import BookingModal from '../components/BookingModal';
import { DEFAULT_BOOKING_FORM } from '../config';
import { setSEO } from '../utils/seo';


const PropertyDetails = () => {
  const { id } = useParams();
  const propertyId = id.split('-')[0]; // gets "123"
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

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
        'We have received your selected payment method. Check your email for payment instructions.',
      bookingId: result.booking_id,
    });

    setTimeout(() => setShowBookingModal(false), 3000);
  } catch (err) {
    setBookingStatus({
      type: 'error',
      message: err.message || 'Booking failed. Please try again.',
    });
  }
};


  useEffect(() => {
    window.scrollTo(0, 0);
    const getDetails = async () => {
      try {
        const data = await fetchProperties({});
const found = data.properties.find(
  p => p.id === parseInt(propertyId)
);
setProperty(found);
setTourFee(data.tourFee || 50.00);

      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  useEffect(() => {
  if (!property) return;

  setSEO({
    title: `Easy Affordable Home | ${property.title} in ${property.location}`,
    description: `Discover this easy affordable ${property.property_type.toLowerCase()} in ${property.location}. ${property.beds} bedrooms, ${property.baths} bathrooms, available now. Book a tour today.`
  });
}, [property]);


  if (loading) return <div className="h-screen flex items-center justify-center bg-stone-50 animate-pulse">Loading Sanctuary...</div>;
  if (!property) return <div className="h-screen flex items-center justify-center">Property not found.</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Navigation & Actions Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="pointer-events-auto p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-stone-900 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex gap-3 pointer-events-auto">
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white"><Share2 className="w-5 h-5 text-stone-900" /></button>
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white"><Heart className="w-5 h-5 text-stone-900" /></button>
        </div>
      </div>

      {/* Cinematic Hero Gallery */}
      <div className="relative h-[70vh] w-full bg-stone-200 overflow-hidden">
        <img 
          src={property.image_url || property.image}
          alt={`Easy affordable ${property.property_type} in ${property.location}`}
          className="w-full h-full object-cover animate-fade-in"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 text-white">
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            {property.property_type}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Easy Affordable Home: {property.title}
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
                <div className="flex items-center gap-2 text-xl font-medium"><Maximize className="w-5 h-5" /> {property.sqft}</div>
              </div>
            </div>

            {/* Description */}
            <div className="py-10">
              <h3 className="text-2xl font-serif mb-6 text-stone-900">About this Sanctuary</h3>
              <p className="text-stone-600 leading-relaxed text-lg font-light">
                This easy affordable {property.property_type.toLowerCase()} is located in {property.location} and offers
                {property.beds} bedrooms, {property.baths} bathrooms, and {property.sqft} square feet of living space.
                Ideal for renters seeking a budget-friendly home with modern amenities in a prime location.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="py-10 border-t border-stone-100">
              <h3 className="text-2xl font-serif mb-8 text-stone-900">Premium Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {['Fiber Internet', 'Smart Home Tech', 'Dedicated Parking', 'In-unit Laundry', 'Concierge Service', 'Private Terrace'].map((item) => (
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
                    <span className="text-sm font-medium text-stone-900">${property.tour_fee} (Refundable)</span>
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
  onClick={() => setShowBookingModal(true)}
  className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-all mb-4 active:scale-95 shadow-xl shadow-stone-200"
>
  Book a Private Tour
</button>

              
              <button className="w-full bg-white border border-stone-300 text-stone-900 py-4 rounded-xl font-bold hover:bg-stone-50 transition-all">
                Contact Agent
              </button>

              <p className="text-center text-[11px] text-stone-400 mt-6 leading-relaxed px-4">
                By booking a tour, you agree to our terms of service and privacy policy regarding personal data.
              </p>
            </div>
          </div>
          <p className="sr-only">
  Easy affordable home for rent in {property.location}. Affordable {property.property_type}
  with {property.beds} bedrooms and {property.baths} bathrooms. Monthly rent ${property.price}.
</p>

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