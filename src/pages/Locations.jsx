import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Home, TrendingUp, Users, DollarSign, Shield, Search,
  ChevronRight, Building, Award, Clock, Star, CheckCircle, Heart
} from 'lucide-react';

const ICON_MAP = {
  MapPin: (props) => <MapPin {...props} />,
  Home: (props) => <Home {...props} />,
  TrendingUp: (props) => <TrendingUp {...props} />,
  Users: (props) => <Users {...props} />,
  DollarSign: (props) => <DollarSign {...props} />,
  Shield: (props) => <Shield {...props} />,
  Search: (props) => <Search {...props} />,
  Building: (props) => <Building {...props} />,
  Award: (props) => <Award {...props} />,
  Clock: (props) => <Clock {...props} />,
  Star: (props) => <Star {...props} />,
  CheckCircle: (props) => <CheckCircle {...props} />,
  Heart: (props) => <Heart {...props} />,
};

const Locations = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const popularStates = [
    { name: "California", cityCount: 12, propertyCount: "2,400+", avgPrice: "$2,100", color: "bg-blue-50" },
    { name: "Texas", cityCount: 8, propertyCount: "1,800+", avgPrice: "$1,600", color: "bg-red-50" },
    { name: "New York", cityCount: 5, propertyCount: "1,200+", avgPrice: "$2,400", color: "bg-green-50" },
    { name: "Florida", cityCount: 10, propertyCount: "1,500+", avgPrice: "$1,700", color: "bg-yellow-50" },
    { name: "Illinois", cityCount: 4, propertyCount: "800+", avgPrice: "$1,800", color: "bg-purple-50" },
    { name: "Washington", cityCount: 3, propertyCount: "600+", avgPrice: "$1,900", color: "bg-cyan-50" },
    { name: "Colorado", cityCount: 4, propertyCount: "500+", avgPrice: "$1,850", color: "bg-orange-50" },
    { name: "Georgia", cityCount: 5, propertyCount: "700+", avgPrice: "$1,550", color: "bg-pink-50" },
  ];

  const citiesByState = {
    "California": [
      { name: "Los Angeles", properties: "420+", avgRent: "$2,200", rating: 4.8 },
      { name: "San Francisco", properties: "380+", avgRent: "$3,100", rating: 4.9 },
      { name: "San Diego", properties: "320+", avgRent: "$2,300", rating: 4.7 },
      { name: "Sacramento", properties: "280+", avgRent: "$1,900", rating: 4.5 },
    ],
    "Texas": [
      { name: "Houston", properties: "450+", avgRent: "$1,550", rating: 4.6 },
      { name: "Dallas", properties: "380+", avgRent: "$1,650", rating: 4.7 },
      { name: "Austin", properties: "320+", avgRent: "$1,750", rating: 4.8 },
      { name: "San Antonio", properties: "290+", avgRent: "$1,450", rating: 4.5 },
    ],
    "New York": [
      { name: "New York City", properties: "520+", avgRent: "$3,200", rating: 4.9 },
      { name: "Buffalo", properties: "180+", avgRent: "$1,200", rating: 4.3 },
      { name: "Rochester", properties: "150+", avgRent: "$1,150", rating: 4.2 },
    ],
    "Florida": [
      { name: "Miami", properties: "290+", avgRent: "$1,950", rating: 4.6 },
      { name: "Orlando", properties: "240+", avgRent: "$1,550", rating: 4.5 },
      { name: "Tampa", properties: "220+", avgRent: "$1,600", rating: 4.4 },
    ],
  };

  const features = [
    { icon: "Shield", title: "Verified Locations", desc: "Every city and neighborhood is personally verified by our team." },
    { icon: "DollarSign", title: "Price Transparency", desc: "Clear understanding of average rents and living costs." },
    { icon: "TrendingUp", title: "Growth Potential", desc: "Identify areas with increasing property value and amenities." },
    { icon: "Users", title: "Community Insights", desc: "Real reviews and insights from current residents." },
  ];

  // Function to navigate to properties with state filter
  const viewStateProperties = (stateName) => {
    navigate(`/properties?state=${encodeURIComponent(stateName)}`);
  };

  // Function to navigate to properties with city filter
  const viewCityProperties = (cityName) => {
    navigate(`/properties?city=${encodeURIComponent(cityName)}`);
  };

  // Function to search properties
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const filteredStates = popularStates.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            alt="City map background"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto text-center text-white"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">Discover Locations</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Find Your Perfect <span className="italic text-stone-300">Location</span>
          </h1>

          <p className="text-xl text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Explore carefully curated apartments across 50+ cities in the United States. 
            Each location is selected for its unique character, amenities, and community vibe.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search states or cities..."
              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-white/30 font-light text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-stone-900 px-6 py-2 rounded-full hover:bg-stone-100 transition-colors font-medium text-sm"
            >
              Search
            </button>
          </form>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white border-b border-stone-100 relative z-20 -mt-8 rounded-t-3xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-stone-100/0 md:divide-stone-100">
            {[
              { value: "50+", label: "States Covered" },
              { value: "200+", label: "Cities" },
              { value: "10k+", label: "Properties" },
              { value: "4.8", label: "Avg. Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-serif mb-3 text-stone-900 group-hover:scale-110 transition-transform duration-500 ease-out">
                  {stat.value}
                </div>
                <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-serif mb-6">What Makes a Great Location?</h3>
            <p className="text-stone-600 max-w-2xl mx-auto font-light">
              We evaluate every area based on these key factors to ensure quality living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = ICON_MAP[feature.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-stone-900 mb-4 group-hover:scale-110 transition-transform inline-block">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif mb-2">{feature.title}</h4>
                  <p className="text-stone-600 font-light">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATES INTRODUCTION */}
      <section className="py-32 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-stone-300 rounded-tl-3xl hidden md:block"></div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8 text-stone-900">
              Explore by <br/> 
              <span className="text-stone-400 italic">State</span>
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-stone-900"></div>
              <p className="text-stone-500 font-medium uppercase tracking-wider text-sm">
                {filteredStates.length} states available
              </p>
            </div>
          </div>
          <div className="text-stone-600 leading-relaxed text-lg font-light md:pl-10 border-l border-stone-200">
            <p className="mb-8">
              Each state offers unique living experiences, from vibrant urban centers to peaceful suburban communities. 
              Our team has personally verified properties across all these locations.
            </p>
            <button 
              onClick={() => navigate('/properties')}
              className="group inline-flex items-center text-stone-900 font-medium hover:text-stone-600 transition-colors"
            >
              Browse all properties
              <span className="bg-stone-100 p-2 rounded-full ml-3 group-hover:translate-x-2 transition-transform duration-300">
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* STATES GRID */}
      <section id="states-grid" className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStates.map((state, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`${state.color} p-6 rounded-2xl border border-stone-100 hover:border-stone-200 transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-stone-900">{state.name}</h3>
                  <MapPin className="w-5 h-5 text-stone-600 group-hover:text-stone-900 transition-colors" />
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-stone-600" />
                    <span className="text-stone-700">{state.propertyCount} properties</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-stone-600" />
                    <span className="text-stone-700">{state.cityCount} major cities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-stone-600" />
                    <span className="text-stone-700">Avg: {state.avgPrice}/mo</span>
                  </div>
                </div>

                <button 
                  onClick={() => viewStateProperties(state.name)}
                  className="w-full py-3 border border-stone-200 text-stone-700 rounded-full hover:bg-white hover:border-stone-300 transition-colors font-medium text-sm"
                >
                  Explore {state.name}
                </button>

                {/* Show cities when selected */}
                {selectedState === state.name && citiesByState[state.name] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-stone-100"
                  >
                    <h4 className="font-serif text-lg mb-4">Popular Cities</h4>
                    <div className="space-y-3">
                      {citiesByState[state.name].map((city, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-stone-600">{city.properties} properties</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{city.avgRent}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                viewCityProperties(city.name);
                              }}
                              className="mt-1 text-sm text-stone-600 hover:text-stone-900 underline"
                            >
                              View Properties
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Toggle cities view */}
                <button
                  onClick={() => setSelectedState(state.name === selectedState ? null : state.name)}
                  className="w-full mt-4 text-center text-sm text-stone-500 hover:text-stone-700"
                >
                  {selectedState === state.name ? 'Hide cities' : 'Show cities'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CITY */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
                className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                alt="New York City"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="bg-white/90 backdrop-blur text-stone-900 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </span>
              </div>
            </div>
            <div className="md:pr-12">
              <p className="uppercase tracking-[0.3em] text-xs font-bold text-stone-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-stone-400"></span> Featured City
              </p>
              <h2 className="text-5xl lg:text-6xl font-serif mb-8 text-stone-900 leading-[1.1]">
                New York City
              </h2>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-stone-600" />
                  <span className="text-stone-700">520+ properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-stone-600" />
                  <span className="text-stone-700">Avg: $3,200/mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-stone-700">4.9 rating</span>
                </div>
              </div>
              <p className="text-stone-600 mb-10 text-lg font-light leading-relaxed">
                The city that never sleeps offers endless opportunities. From modern high-rises in Manhattan 
                to charming brownstones in Brooklyn, find your perfect urban sanctuary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => viewCityProperties("New York City")}
                  className="bg-stone-900 text-white px-10 py-4 rounded-full hover:bg-stone-700 transition shadow-lg hover:shadow-xl font-medium"
                >
                  View NYC Properties
                </button>
                <button 
                  onClick={() => navigate('/properties?state=New York')}
                  className="border border-stone-200 text-stone-900 px-10 py-4 rounded-full hover:bg-stone-50 transition font-medium"
                >
                  All New York State
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE SECTION */}
      <section className="py-32 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-stone-900">How to Choose Your Location</h3>
            <div className="w-24 h-1 bg-stone-900 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              A strategic approach to finding the perfect neighborhood for your lifestyle.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200 z-0"></div>

            {[
              { icon: "MapPin", title: "Assess Your Needs", desc: "Consider commute time, budget, and lifestyle preferences." },
              { icon: "Search", title: "Research Areas", desc: "Explore neighborhoods, amenities, and community reviews." },
              { icon: "CheckCircle", title: "Visit & Compare", desc: "Schedule tours and compare multiple locations before deciding." },
            ].map((step, i) => {
              const Icon = ICON_MAP[step.icon];
              return (
                <div key={i} className="relative z-10 text-center group">
                  <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-white border border-stone-200 shadow-xl flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                    <Icon className="w-8 h-8 text-stone-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="text-2xl font-serif mb-3 text-stone-900">{step.title}</h4>
                  <p className="text-stone-600 leading-relaxed px-4 font-light">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHT */}
      <section className="py-12 md:py-24 container mx-auto px-6">
        <div className="relative bg-stone-900 text-white overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[2s]" 
              alt="Neighborhood community"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative z-10 p-12 md:p-32 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-stone-300 mb-8 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md bg-white/5">
              <Heart className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Community Focused</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
              Find More Than <br/> <span className="italic text-stone-200 font-light">Just a Home.</span>
            </h2>
            <p className="text-stone-300 mb-12 max-w-xl text-lg leading-relaxed font-light">
              Discover neighborhoods where you can build connections, find your community, 
              and create lasting memories in spaces designed for modern living.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => navigate('/properties')}
                className="bg-white text-black px-10 py-4 rounded-full hover:bg-stone-200 transition-colors font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Browse All Properties
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all font-medium"
              >
                Learn About Our Process
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;