import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, CreditCard, DollarSign, Landmark, X, MapPin } from 'lucide-react';
import { TIME_SLOTS, GUEST_OPTIONS, PAYMENT_METHODS } from '../config';
import { fetchPaymentMethods } from '../apiService';

const ICON_MAP = {
  CreditCard: CreditCard,
  DollarSign: DollarSign,
  Landmark: Landmark,
};

const inputClass =
  'w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all text-sm';

const BookingModal = ({
  show,
  property,
  tourFee,
  formData,
  status,
  onClose,
  onSubmit,
  onChange,
}) => {
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHODS);

  useEffect(() => {
    if (!show) return;
    fetchPaymentMethods()
      .then((methods) => {
        if (methods?.length) setPaymentMethods(methods);
      })
      .catch((err) => {
        console.error('Error fetching payment methods:', err);
      });
  }, [show]);

  // Lock background scroll while the modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [show]);

  if (!show || !property) return null;

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div
      className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with property context */}
        <div className="relative h-32 overflow-hidden rounded-t-3xl">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-stone-900 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <h3 className="text-2xl font-serif leading-none mb-1">Book a Private Tour</h3>
            <p className="text-white/80 text-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {property.title} • {property.location}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {status && (
            <div
              className={`mb-6 p-4 rounded-2xl ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : status.type === 'error'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {status.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
                {status.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
                {status.type === 'loading' && (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-800 shrink-0"></div>
                )}
                <p className="text-sm">{status.message}</p>
              </div>
              {status.bookingId && (
                <p className="text-sm mt-2 font-bold">Booking ID: {status.bookingId}</p>
              )}
            </div>
          )}

          <div className="mb-6 p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">Tour Booking Fee</p>
                <p className="text-xs text-stone-500">Refundable deposit to secure your tour</p>
              </div>
              <div className="text-2xl font-serif">${tourFee}</div>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={onChange}
                  placeholder="Jane Doe"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="jane@example.com"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  placeholder="+1 (555) 000-0000"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={onChange}
                  className={inputClass}
                  required
                >
                  {GUEST_OPTIONS.map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={onChange}
                  min={getTomorrowDate()}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={onChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select Time</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={onChange}
                rows="3"
                className={inputClass}
                placeholder="Any special requests or questions?"
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Payment Method *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = ICON_MAP[method.icon] || CreditCard;
                  const selected = formData.payment_method === method.value;
                  return (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                        selected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-lg'
                          : 'border-stone-200 hover:border-stone-400 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.value}
                        checked={selected}
                        onChange={onChange}
                        className="sr-only"
                      />
                      <Icon className={`w-5 h-5 ${selected ? 'text-white' : 'text-stone-400'}`} />
                      <span className="text-sm font-medium">{method.label}</span>
                      {selected && <CheckCircle className="w-4 h-4 ml-auto" />}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border border-stone-200 text-stone-700 rounded-2xl hover:bg-stone-50 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status?.type === 'loading' || status?.type === 'success'}
                className="flex-1 px-6 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-xl shadow-stone-300"
              >
                {status?.type === 'loading'
                  ? 'Processing...'
                  : status?.type === 'success'
                  ? 'Check Email for Payment'
                  : `Book Tour • $${tourFee}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
