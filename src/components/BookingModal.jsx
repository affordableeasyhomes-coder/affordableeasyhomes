import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, CreditCard, DollarSign } from 'lucide-react';
import { TIME_SLOTS, GUEST_OPTIONS, PAYMENT_METHODS } from '../config';
import { fetchPaymentMethods } from '../apiService';

const ICON_MAP = {
  CreditCard: CreditCard,
  DollarSign: DollarSign,
};

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
  if (!show || !property) return null;

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [paymentMethods, setPaymentMethods] = useState([]);

 useEffect(() => {
  fetchPaymentMethods()
    .then(methods => setPaymentMethods(methods || []))
    .catch(err => {
      console.error('Error fetching payment methods:', err);
      setPaymentMethods([]); // fallback so React never renders undefined
    });
}, []);


  const getIconComponent = (iconName) => ICON_MAP[iconName] || CreditCard;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-serif">Book a Tour</h3>
              <p className="text-stone-600">{property.title} • {property.location}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-stone-500 hover:text-stone-800"
            >
              ✕
            </button>
          </div>

          {status && (
            <div className={`mb-6 p-4 rounded-lg ${
              status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
              status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              <div className="flex items-center gap-2">
                {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {status.type === 'error' && <AlertCircle className="w-5 h-5" />}
                {status.type === 'loading' && (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-800"></div>
                )}
                <p>{status.message}</p>
              </div>
              {status.bookingId && (
                <p className="text-sm mt-2">Booking ID: {status.bookingId}</p>
              )}
            </div>
          )}

          <div className="mb-6 p-4 bg-stone-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Tour Booking Fee</p>
                <p className="text-sm text-stone-600">Refundable deposit to secure your tour</p>
              </div>
              <div className="text-2xl font-serif">${tourFee}</div>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Number of Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
                >
                  {GUEST_OPTIONS.map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Date *</label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={onChange}
                  min={getTomorrowDate()}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Time *</label>
                <select
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
                >
                  <option value="">Select Time</option>
                  {TIME_SLOTS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={onChange}
                rows="3"
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                placeholder="Any special requests or questions?"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">Payment Method *</label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(method => {
        const Icon = ICON_MAP[method.icon] || CreditCard;
        return (
          <label key={method.value} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="radio"
              name="payment_method"
              value={method.value}
              checked={formData.payment_method === method.value}
              onChange={onChange}
              className="mr-2"
            />
            <Icon className="w-5 h-5" />
            <span>{method.label}</span>
          </label>
        );
      })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status?.type === 'loading' || status?.type === 'success'}
                className="flex-1 px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status?.type === 'loading'
                  ? 'Processing...'
                  : status?.type === 'success'
                  ? 'Check Email for Payment'
                  : 'Book Tour'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;