import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const questions = [
    { q: "How do I book a private property tour?", a: "You can book directly from any property page. Select 'Book Tour', choose your preferred date, and our concierge will confirm within 2 hours." },
    { q: "Are the listings on EasyAffordableHomes verified?", a: "Every property undergoes a 45-point inspection by our regional agents before being listed on our platform to ensure quality standards." },
    { q: "What is the tour fee for?", a: "The small refundable fee ensures serious inquiries. This amount is fully credited toward your first month's rent or security deposit." },
    { q: "Can I list my own property?", a: "Absolutely. Navigate to 'List Property' in the navbar to start the application. We specialize in high-end urban rentals and sales." }
  ];

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-serif text-stone-900 text-center mb-16">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-200 overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <span className="font-serif text-lg text-stone-800">{item.q}</span>
                {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              <div className={`px-8 transition-all duration-300 ease-in-out ${openIndex === i ? 'pb-8 opacity-100 max-h-40' : 'max-h-0 opacity-0'}`}>
                <p className="text-stone-500 font-light leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;