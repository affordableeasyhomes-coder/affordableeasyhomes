import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Heart, 
  Search, 
  ChevronDown, 
  Instagram, 
  Twitter, 
  Linkedin,
  Home,
  MapPin,
  Building,
  Calculator,
  Info,
  HelpCircle,
  Plus,
  Navigation
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const location = useLocation();

  // Navigation links with icons
  const navLinks = [
    { label: 'Home', to: '/', icon: <Navigation className="w-3.5 h-3.5" /> },
    { label: 'Properties', to: '/properties', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Locations', to: '/locations', icon: <MapPin className="w-3.5 h-3.5" /> },
    { label: 'Mortgage', to: '/mortgage', icon: <Calculator className="w-3.5 h-3.5" /> },
    { label: 'Our Story', to: '/about', icon: <Info className="w-3.5 h-3.5" /> },
    { label: 'Support', to: '/support', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = 'unset';
  }, [location]);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : 'unset';
  };

  const textColor = scrolled ? 'text-stone-800' : 'text-white';
  const textShadowClass = !scrolled ? 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]' : '';

  return (
    <>
      {/* Gradient overlay for better text visibility when not scrolled */}
      {!scrolled && (
        <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent z-[99] pointer-events-none" />
      )}

      {/* MAIN NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 font-sans ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-stone-100 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
         {/* LOGO */}
        <Link
          to="/"
          className={`flex flex-col leading-none transition-colors ${textColor} ${textShadowClass} hover:opacity-80 group`}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-80">
            Easy
          </span>
          <span className="text-xl font-serif font-bold tracking-tight -mt-0.5">
            AffordableHomes
            <span className={scrolled ? 'text-stone-500' : 'text-stone-300'}>.</span>
          </span>
        </Link>

          {/* DESKTOP NAVIGATION */}
          <div className={`hidden lg:flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300
            ${scrolled ? 'text-stone-700' : `text-white/95 ${textShadowClass}`}
          `}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 group
                  ${scrolled 
                    ? 'hover:bg-stone-50 hover:text-stone-900' 
                    : 'hover:bg-white/10 hover:text-white'
                  }
                  ${location.pathname === link.to 
                    ? scrolled 
                      ? 'text-stone-900 font-semibold' 
                      : 'text-white font-semibold'
                    : ''
                  }
                `}
              >
                {link.icon}
                <span>{link.label}</span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-8 ${
                  location.pathname === link.to ? 'w-8' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <button className={`hidden sm:flex p-2.5 rounded-full transition-colors ${
              scrolled 
                ? 'hover:bg-stone-100 text-stone-700' 
                : `hover:bg-white/15 ${textShadowClass}`
            }`}>
              <Search className={`w-4 h-4 ${scrolled ? 'text-stone-600' : 'text-white'}`} />
            </button>
            
            <Link 
              to="/saved" 
              className={`p-2.5 rounded-full transition-colors relative ${
                scrolled 
                  ? 'hover:bg-stone-100 text-stone-700' 
                  : `hover:bg-white/15 ${textShadowClass}`
              }`}
            >
              <Heart className={`w-4 h-4 ${scrolled ? 'text-stone-600' : 'text-white'}`} />
              <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${
                scrolled ? 'bg-stone-500' : 'bg-white'
              }`}></span>
            </Link>
            
            <Link 
              to="/list-property" 
              className={`hidden md:flex items-center gap-2 text-xs font-medium tracking-wider px-5 py-3 rounded-full transition-all ${
                scrolled
                  ? 'bg-stone-900 text-white hover:bg-stone-800 shadow'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:border-white/40 shadow-lg shadow-black/10'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              List Property
            </Link>
            
            <button 
              onClick={toggleMobile} 
              className={`lg:hidden p-2.5 rounded-full transition-colors ${
                scrolled 
                  ? 'bg-stone-100 hover:bg-stone-200' 
                  : 'bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/20'
              }`}
            >
              <Menu className={`w-5 h-5 ${scrolled ? 'text-stone-700' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden transition-opacity duration-500"
          onClick={toggleMobile}
        />
      )}

      {/* MOBILE SIDEBAR MENU */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-sm bg-stone-900 z-[120] transform transition-transform duration-500 lg:hidden flex flex-col ${
        mobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* MENU HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div className="flex flex-col leading-none">
    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">Easy</span>
    <span className="text-white font-serif text-xl font-bold tracking-tight -mt-0.5">
      AffordableHomes<span className="text-stone-500">.</span>
    </span>
  </div>
          <button 
            onClick={toggleMobile} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* MENU CONTENT */}
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={toggleMobile}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 text-base font-medium ${
                  location.pathname === link.to
                    ? 'bg-white/10 text-white border-l-4 border-white'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="opacity-70">
                  {link.icon}
                </div>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* SEPARATOR */}
          <div className="my-8 h-px bg-white/10"></div>

          {/* MOBILE ACTIONS */}
          <div className="space-y-4">
            {/* <Link
              to="/list-property"
              onClick={toggleMobile}
              className="flex items-center justify-center gap-2 w-full bg-white text-stone-900 py-4 rounded-xl font-semibold hover:bg-stone-100 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              List Your Property
            </Link> */}

            <div className="flex items-center justify-center gap-6 py-6">
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Instagram className="w-5 h-5 text-white/70" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-white/70" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5 text-white/70" />
              </a>
            </div>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-stone-500 text-xs">
                Need help? <a href="tel:+1234567890" className="text-white hover:underline">Call us</a>
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;