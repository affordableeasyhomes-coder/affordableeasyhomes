import React, { useState } from 'react';
import { Building2, CheckCircle, AlertCircle, Send, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { submitContact } from '../apiService';

const inputClass =
  'w-full bg-white border border-stone-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all';

const PERKS = [
  { icon: Users, title: 'Qualified Tenants', desc: 'Every tour request comes with verified contact details and a refundable commitment fee.' },
  { icon: TrendingUp, title: 'Market Exposure', desc: 'Your listing is promoted across our state hubs and curated collections.' },
  { icon: ShieldCheck, title: 'Zero Upfront Cost', desc: 'Listing is free. We only succeed when your property rents.' },
];

const ListProperty = () => {
  const [form, setForm] = useState({ name: '', email: '', propertyAddress: '', details: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ type: 'loading' });
      await submitContact({
        name: form.name,
        email: form.email,
        subject: 'List My Property',
        message: `Property address: ${form.propertyAddress}\n\n${form.details}`,
      });
      setStatus({ type: 'success', message: 'Application received! Our curation team will reach out within 24 hours.' });
      setForm({ name: '', email: '', propertyAddress: '', details: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again or email westleykate71@gmail.com.' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6 bg-stone-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
          alt="Modern property exterior"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">For Property Owners</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            List Your <span className="italic text-stone-300">Property</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Join hundreds of owners renting faster with verified, serious tenants. Tell us about your property and our curation team will handle the rest.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-white border-b border-stone-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-stone-700" />
              </div>
              <h3 className="text-xl font-serif mb-2 text-stone-900">{title}</h3>
              <p className="text-stone-500 font-light text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto bg-white p-10 md:p-12 rounded-[2.5rem] border border-stone-100 shadow-sm">
          <h2 className="text-3xl font-serif text-stone-900 mb-2">Tell us about your property</h2>
          <p className="text-stone-500 font-light mb-10">Free to list. No obligations.</p>

          {status?.type === 'success' ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-medium text-green-800 mb-1">Application received</p>
                <p className="text-green-700 text-sm">{status.message}</p>
              </div>
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
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Your Name *</label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Email *</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputClass} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Property Address *</label>
                <input type="text" name="propertyAddress" required value={form.propertyAddress} onChange={handleChange} placeholder="123 Main St, Austin, Texas" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Property Details *</label>
                <textarea rows="5" name="details" required value={form.details} onChange={handleChange} placeholder="Type of home, bedrooms, bathrooms, expected rent, availability..." className={`${inputClass} resize-none`} />
              </div>
              <button
                type="submit"
                disabled={status?.type === 'loading'}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-stone-800 transition-all active:scale-95 shadow-xl shadow-stone-200 disabled:opacity-50"
              >
                {status?.type === 'loading' ? 'Submitting...' : <>Submit Application <Send className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ListProperty;
