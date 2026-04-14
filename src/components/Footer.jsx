import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook, Send } from 'lucide-react';

const Footer = ({ stats = {}, usStates = [] }) => {
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
            
            <div className="relative max-w-sm">
              <input 
                type="email" 
                placeholder="Get latest listings..." 
                className="w-full bg-stone-900 border-none rounded-xl py-4 pl-5 pr-12 text-sm text-white focus:ring-1 focus:ring-stone-700 outline-none transition-all"
              />
              <button className="absolute right-2 top-2 p-2 bg-white text-stone-950 rounded-lg hover:bg-stone-200 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h6 className="text-white uppercase tracking-widest text-[10px] font-bold mb-8">Properties</h6>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/properties" className="hover:text-white transition-colors">All Listings</Link></li>
                <li><Link to="/locations" className="hover:text-white transition-colors">New York Hub</Link></li>
                <li><Link to="/locations" className="hover:text-white transition-colors">California Living</Link></li>
                <li><Link to="/properties?tag=luxury" className="hover:text-white transition-colors">Luxury Collection</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white uppercase tracking-widest text-[10px] font-bold mb-8">Resources</h6>
              <ul className="space-y-4 text-sm font-light">
                <li><Link to="/mortgage" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">FAQs</Link></li>
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

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium tracking-wide uppercase">
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <p className="text-stone-600">© 2026 EasyAffordableHomes  Group. Made with Precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;