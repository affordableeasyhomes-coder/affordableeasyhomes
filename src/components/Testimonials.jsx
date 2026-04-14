import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const Testimonials = ({ visibleTestimonials, setVisibleTestimonials }) => {
  const testimonials = [
    { name: "Alex Morgan", role: "Investor, New York, NY", quote: "LowCostApartments made finding premium rentals effortless and enjoyable." },
    { name: "Sofia Parker", role: "Interior Designer, Los Angeles, CA", quote: "The level of detail and service is unmatched. Truly exceptional." },
    { name: "Michael Johnson", role: "Tech Executive, San Francisco, CA", quote: "Every property feels thoughtfully curated. Highly recommended." },
    { name: "James Walker", role: "Startup Founder, Austin, TX", quote: "An elegant experience from start to finish. Five stars." },
    { name: "Emily Carter", role: "Marketing Director, Chicago, IL", quote: "The interface is clean, modern, and incredibly easy to use." },
    { name: "Daniel Thompson", role: "Product Manager, Seattle, WA", quote: "Booking a tour was seamless and intuitive." },
    { name: "Olivia Reynolds", role: "Luxury Buyer, Miami, FL", quote: "The properties feel handpicked. Absolutely stunning." },
    { name: "Christopher Miller", role: "Consultant, Boston, MA", quote: "Customer support was fast, friendly, and professional." },
    { name: "Grace Williams", role: "Entrepreneur, Atlanta, GA", quote: "A refined platform that respects your time and taste." },
    { name: "Matthew Anderson", role: "Digital Strategist, Denver, CO", quote: "Perfect for professionals who want quality living spaces." },
    { name: "Sarah Bennett", role: "Architect, Portland, OR", quote: "Design-forward homes with real character." },
    { name: "Jonathan Harris", role: "Finance Director, New York, NY", quote: "Premium experience without unnecessary friction." },
    { name: "Lauren Mitchell", role: "Property Manager, Phoenix, AZ", quote: "The booking system is incredibly smooth." },
    { name: "Andrew Collins", role: "Private Investor, Dallas, TX", quote: "Exceptional listings across multiple states." },
    { name: "Rachel Peterson", role: "HR Manager, Minneapolis, MN", quote: "Finding housing for executives has never been easier." },
    { name: "Ryan Cooper", role: "Tech Consultant, San Jose, CA", quote: "Reliable, elegant, and very professional." },
    { name: "Hannah Brooks", role: "UX Designer, San Diego, CA", quote: "You can feel the intentional design in every interaction." },
    { name: "Kevin Roberts", role: "Relocation Specialist, Tampa, FL", quote: "Ideal for clients relocating across the US." },
    { name: "Megan Turner", role: "Operations Lead, Columbus, OH", quote: "Everything works exactly as expected." },
    { name: "Brandon Scott", role: "Business Analyst, Raleigh, NC", quote: "Professional, polished, and trustworthy platform." }
  ];

  return (
    <section id="testimonials" className="py-32 bg-stone-950 text-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6">
              Client Perspectives
            </h3>
            <p className="text-stone-400 max-w-xl text-lg font-light">
              Trusted by homeowners, investors, and families worldwide.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-1 bg-stone-800 rounded-full"></div>
            <div className="w-2 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 mask-image-linear-gradient">
          {testimonials.slice(0, visibleTestimonials).map((t, i) => (
            <div
              key={i}
              className="min-w-[320px] md:min-w-[400px] bg-stone-900/50 border border-white/5 p-10 rounded-2xl snap-start hover:bg-stone-900 transition duration-300 hover:border-white/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-stone-200 fill-stone-200" />)}
              </div>
              <p className="italic mb-8 text-stone-300 text-lg leading-relaxed font-light">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center font-serif text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-serif text-white text-lg">{t.name}</p>
                  <p className="text-stone-500 text-xs uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Load More Card */}
          {visibleTestimonials < testimonials.length && (
            <div 
              onClick={() => setVisibleTestimonials(v => Math.min(v + 5, testimonials.length))}
              className="min-w-[200px] flex flex-col items-center justify-center cursor-pointer group snap-start"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all mb-4">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="text-stone-400 group-hover:text-white transition-colors">View More</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;