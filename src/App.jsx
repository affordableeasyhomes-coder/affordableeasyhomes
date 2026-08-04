import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Saved from './pages/Saved';
import ListProperty from './pages/ListProperty';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Properties & Collections */}
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/collection/luxury" element={<Properties categoryFilter="luxury" />} />
        <Route path="/hub/new-york" element={<Properties locationFilter="New York" />} />
        <Route path="/hub/california" element={<Properties locationFilter="California" />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/list-property" element={<ListProperty />} />

        {/* Company & Resources */}
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/mortgage" element={<MortgageCalculator />} />
        <Route path="/support" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/help" element={<Faqs />} />

        {/* Legal */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
