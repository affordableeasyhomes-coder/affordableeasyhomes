import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Send, Check } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-stone-950 text-stone-400 pt-24 pb-12 border-t border-stone-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand and Newsletter */}
          <div className="lg:col-span-5 pr-0 lg:pr-20">
            <div className="flex flex-col leading-none mb-6">
    <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-bold mb-1">
      Easy
    </span>
    <h5 className="text-3xl font-serif text-white font-bold tracking-tight">
      AffordableHomes <span className="text-stone-600">.</span>
    </h5>
  </div>
  <p className="font-light mb-10 leading-relaxed max-w-md">
    The premier destination for accessible luxury. We curate the finest urban sanctuaries for the modern professional.
  </p>
            
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={subscribed ? 'Subscribed! Watch your inbox.' : 'Get latest listings...'}
                className="w-full bg-stone-900 border-none rounded-xl py-4 pl-5 pr-12 text-sm text-white focus:ring-1 focus:ring-stone-700 outline-none transition-all placeholder:text-stone-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className={`absolute right-2 top-2 p-2 rounded-lg transition-colors ${
                  subscribed ? 'bg-green-500 text-white' : 'bg-white text-stone-950 hover:bg-stone-200'
                }`}
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h6 className="text-white uppercase tracking-widest text-[10px] font-bold mb-8">Properties</h6>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/properties" className="hover:text-white transition-colors">All Listings</Link></li>
                <li><Link to="/hub/new-york" className="hover:text-white transition-colors">New York Hub</Link></li>
                <li><Link to="/hub/california" className="hover:text-white transition-colors">California Living</Link></li>
                <li><Link to="/collection/luxury" className="hover:text-white transition-colors">Luxury Collection</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white uppercase tracking-widest text-[10px] font-bold mb-8">Resources</h6>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/mortgage" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/list-property" className="hover:text-white transition-colors">List Your Property</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h6 className="text-white uppercase tracking-widest text-[10px] font-bold mb-8">Social</h6>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-stone-900 rounded-full hover:bg-white hover:text-stone-950 transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="p-3 bg-stone-900 rounded-full hover:bg-white hover:text-stone-950 transition-all"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="p-3 bg-stone-900 rounded-full hover:bg-white hover:text-stone-950 transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & License Bar */}
        <div className="pt-10 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
            <a href="tel:+17168891380" className="hover:text-white transition-colors">+1 (716) 889-1380</a>
            <a href="mailto:westleykate71@gmail.com" className="hover:text-white transition-colors">westleykate71@gmail.com</a>
          </div>
          <p className="text-stone-500 text-xs tracking-wide">
            License 475212757
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium tracking-wide uppercase">
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <p className="text-stone-600">© 2026 EasyAffordableHomes Group. Made with Precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;