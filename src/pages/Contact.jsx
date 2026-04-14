import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Left: Contact Info */}
          <div>
            <h1 className="text-5xl font-serif text-stone-900 mb-8 tracking-tighter">Get in touch<span className="text-stone-400">.</span></h1>
            <p className="text-stone-500 font-light text-lg mb-12 leading-relaxed">
              Whether you're looking for your next sanctuary or interested in listing a property, our concierge team is here to assist you.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><Phone className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Call Us</h4>
                  <p className="text-stone-900 text-xl font-medium">+1 (800) LOW-COST</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><Mail className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Email Us</h4>
                  <p className="text-stone-900 text-xl font-medium">concierge@lowcost.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-stone-50 rounded-full"><MapPin className="w-6 h-6 text-stone-900" /></div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-stone-400 mb-1">Visit Headquarters</h4>
                  <p className="text-stone-900 text-xl font-medium">755 Park Avenue, New York</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-stone-50 p-10 md:p-12 rounded-[2.5rem] border border-stone-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none focus:ring-1 focus:ring-stone-200 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none focus:ring-1 focus:ring-stone-200 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Subject</label>
                <select className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none focus:ring-1 focus:ring-stone-200 appearance-none">
                  <option>Buying a Home</option>
                  <option>Renting a Sanctuary</option>
                  <option>List My Property</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-stone-400">Message</label>
                <textarea rows="5" placeholder="Tell us about your needs..." className="w-full bg-white border-none rounded-2xl py-4 px-6 outline-none focus:ring-1 focus:ring-stone-200 transition-all resize-none"></textarea>
              </div>
              <button className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-stone-800 transition-all active:scale-95 shadow-xl shadow-stone-200">
                Send Inquiry <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;