import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, BadgeCheck } from 'lucide-react';
import { submitContact } from '../apiService';

const inputClass =
  'w-full bg-white border border-transparent rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ type: 'loading' });
      const result = await submitContact(form);
      setStatus({ type: 'success', message: result.message || 'Message sent! We will get back to you within 24 hours.' });
      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please email us directly at westleykate71@gmail.com.',
      });
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* Left: Contact Info */}
          <div>
            <h1 className="text-5xl font-serif text-stone-900 mb-8 tracking-tighter">Get in touch<span className="text-stone-400">.</span></h1>
            <p className="text-stone-500 font-light text-lg mb-12 leading-relaxed">
              Whether you're looking for your next home or interested in listing a property, our concierge team is here to assist you.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><Phone className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Call Us</h4>
                  <a href="tel:+17168891380" className="text-stone-900 text-xl font-medium hover:underline">+1 (716) 889-1380</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><Mail className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Email Us</h4>
                  <a href="mailto:westleykate71@gmail.com" className="text-stone-900 text-xl font-medium hover:underline">westleykate71@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><MapPin className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Visit Headquarters</h4>
                  <p className="text-stone-900 text-xl font-medium">755 Park Avenue, New York</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><BadgeCheck className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Licensed Broker</h4>
                  <p className="text-stone-900 text-xl font-medium">Illinois License #475.212757</p>
                  <p className="text-stone-400 text-sm mt-1">Valid through April 30, 2028</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-stone-50 p-10 md:p-12 rounded-[2.5rem] border border-stone-100">
            {status?.type === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-3">Message Sent</h3>
                <p className="text-stone-500 font-light mb-8 max-w-sm">{status.message}</p>
                <button
                  onClick={() => setStatus(null)}
                  className="text-sm font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1 hover:opacity-70"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status?.type === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" /> {status.message}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Email *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputClass} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    <option>General Inquiry</option>
                    <option>Buying a Home</option>
                    <option>Renting a Home</option>
                    <option>List My Property</option>
                    <option>Booking Support</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Message *</label>
                  <textarea rows="5" name="message" required value={form.message} onChange={handleChange} placeholder="Tell us about your needs..." className={`${inputClass} resize-none`}></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status?.type === 'loading'}
                  className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-stone-800 transition-all active:scale-95 shadow-xl shadow-stone-200 disabled:opacity-50"
                >
                  {status?.type === 'loading' ? 'Sending...' : <>Send Inquiry <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
