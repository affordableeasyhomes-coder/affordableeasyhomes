import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = homePrice - downPayment;
    const calculatedInterest = interestRate / 100 / 12;
    const calculatedPayments = loanTerm * 12;

    let monthly;
    if (principal <= 0 || calculatedPayments <= 0) {
      monthly = 0;
    } else if (calculatedInterest === 0) {
      monthly = principal / calculatedPayments;
    } else {
      const x = Math.pow(1 + calculatedInterest, calculatedPayments);
      monthly = (principal * x * calculatedInterest) / (x - 1);
    }

    setMonthlyPayment(monthly.toFixed(2));
  }, [homePrice, downPayment, interestRate, loanTerm]);

  // Format number for input display (remove commas, etc.)
  const handleNumberInput = (value, setter) => {
    // Remove any non-numeric characters except decimal point
    const numValue = value.replace(/[^0-9.]/g, '');
    setter(numValue === '' ? 0 : parseFloat(numValue));
  };

  return (
    <div className="pt-32 pb-20 bg-stone-50 min-h-screen px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Affordability Calculator</h1>
          <p className="text-stone-500 font-light text-sm md:text-base px-4">
            Estimate your monthly housing expenses with precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-stone-200">
          <div className="space-y-6 md:space-y-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                <input 
                  type="tel" // Using tel for better mobile keyboard
                  value={homePrice.toLocaleString()} // Display with commas
                  onChange={(e) => handleNumberInput(e.target.value, setHomePrice)}
                  className="w-full bg-stone-50 border-none rounded-xl py-4 pl-10 pr-4 outline-none focus:ring-1 focus:ring-stone-200 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                <input 
                  type="tel"
                  value={downPayment.toLocaleString()}
                  onChange={(e) => handleNumberInput(e.target.value, setDownPayment)}
                  className="w-full bg-stone-50 border-none rounded-xl py-4 pl-10 pr-4 outline-none focus:ring-1 focus:ring-stone-200 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[10, 15, 20].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setDownPayment((homePrice * percent) / 100)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 rounded-lg text-sm transition-colors"
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                  Interest Rate
                </label>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">%</span>
                  <input 
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="20"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-full bg-stone-50 border-none rounded-xl py-4 px-4 outline-none focus:ring-1 focus:ring-stone-200 text-lg pr-12"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  {[5.0, 6.5, 8.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setInterestRate(rate)}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 rounded-lg text-sm transition-colors"
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                  Loan Term
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 15, label: '15 Years' },
                    { value: 30, label: '30 Years' },
                  ].map((term) => (
                    <button
                      key={term.value}
                      onClick={() => setLoanTerm(term.value)}
                      className={`py-4 rounded-xl transition-colors ${
                        loanTerm === term.value
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {term.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary for mobile */}
            <div className="md:hidden bg-stone-50 rounded-2xl p-6 mt-6">
              <h3 className="text-stone-400 uppercase tracking-widest text-[10px] font-bold mb-2">
                Loan Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Loan Amount</span>
                  <span className="font-semibold">
                    ${(homePrice - downPayment).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Down Payment</span>
                  <span className="font-semibold">
                    ${downPayment.toLocaleString()} ({(downPayment / homePrice * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Total Interest</span>
                  <span className="font-semibold">
                    ${((monthlyPayment * loanTerm * 12) - (homePrice - downPayment)).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-3xl p-6 md:p-10 text-white flex flex-col justify-center items-center text-center">
            <h3 className="text-stone-400 uppercase tracking-widest text-[10px] font-bold mb-4">
              Estimated Monthly Payment
            </h3>
            <div className="text-4xl md:text-6xl font-serif mb-4">
              ${Number(monthlyPayment).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </div>
            
            <div className="w-full bg-white/10 rounded-xl p-4 mb-6 hidden md:block">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <div className="text-stone-400 text-xs mb-1">Loan Amount</div>
                  <div className="font-semibold">
                    ${(homePrice - downPayment).toLocaleString()}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-stone-400 text-xs mb-1">Down Payment</div>
                  <div className="font-semibold">
                    ${downPayment.toLocaleString()}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-stone-400 text-xs mb-1">Interest Rate</div>
                  <div className="font-semibold">
                    {interestRate}%
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-stone-400 text-xs mb-1">Loan Term</div>
                  <div className="font-semibold">
                    {loanTerm} years
                  </div>
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 px-2">
              This estimate includes principal and interest. It does not include property taxes or insurance.
            </p>
            
            <button className="w-full bg-white text-stone-900 py-4 rounded-xl font-bold hover:bg-stone-200 transition-colors active:scale-[0.98]">
              Get Pre-Approved
            </button>
            
            <div className="mt-6 pt-6 border-t border-white/10 w-full">
              <p className="text-stone-400 text-xs">
                Need help? <a href="#" className="text-white underline">Contact our mortgage specialists</a>
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-white rounded-3xl border border-stone-200">
          <h3 className="text-xl font-serif text-stone-900 mb-6">Understanding Your Mortgage</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900">Principal & Interest</h4>
              <p className="text-stone-600 text-sm">
                The core payment that pays down your loan balance and covers interest charges.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900">Property Taxes</h4>
              <p className="text-stone-600 text-sm">
                Typically 1-2% of home value annually, often paid through escrow.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900">Insurance</h4>
              <p className="text-stone-600 text-sm">
                Homeowners insurance is required and usually costs $100-$200/month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;