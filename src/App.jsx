import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import Locations from './pages/Locations';
import About from './pages/About';
import PropertyDetails from './pages/PropertyDetails';
import MortgageCalculator from './pages/MortgageCalculator';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Properties & Collections */}
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/collection/luxury" element={<Properties category="luxury" />} />
        <Route path="/hub/new-york" element={<Properties location="New York" />} />
        <Route path="/hub/california" element={<Properties location="California" />} />
        
        {/* Company & Resources */}
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/mortgage" element={<MortgageCalculator />} />
        <Route path="/support" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        
        {/* Legal */}
        <Route path="/privacy" element="/Privacy" />
        <Route path="/terms" element="/Terms" />
        <Route path="/cookies" element="/Cookies" />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;