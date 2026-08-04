import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
    <div className="text-center max-w-lg">
      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6">Error 404</p>
      <h1 className="text-7xl md:text-8xl font-serif text-stone-900 mb-6">Lost?</h1>
      <p className="text-stone-500 font-light text-lg mb-10 leading-relaxed">
        The page you're looking for has moved, or never existed. Let's get you back to finding your next home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full hover:bg-stone-700 transition font-medium"
        >
          <Home className="w-4 h-4" /> Back Home
        </Link>
        <Link
          to="/properties"
          className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-900 px-8 py-4 rounded-full hover:bg-white transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Properties
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
