import React from 'react';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using EasyAffordableHomes, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.',
  },
  {
    title: '2. Our Service',
    body: 'EasyAffordableHomes is a listing and tour-booking platform connecting renters and buyers with property owners across the United States. We are not a party to any rental or purchase agreement made between users and property owners.',
  },
  {
    title: '3. Tour Bookings & Fees',
    body: "Booking a tour requires a refundable tour fee that secures your appointment and confirms serious intent. The fee is fully credited toward your first month's rent or security deposit if you proceed, or refunded if the tour is cancelled with at least 24 hours' notice.",
  },
  {
    title: '4. Accurate Information',
    body: 'You agree to provide accurate, current information when booking tours or listing properties. Listings that misrepresent a property will be removed, and repeat offenders may be banned from the platform.',
  },
  {
    title: '5. Limitation of Liability',
    body: 'While every listing undergoes verification, we do not guarantee the condition, availability, or suitability of any property. Our liability for any claim arising from use of the platform is limited to the amount of fees you paid to us.',
  },
  {
    title: '6. Changes to These Terms',
    body: 'We may update these terms from time to time. Material changes will be announced on the site, and continued use after changes constitutes acceptance.',
  },
];

const Terms = () => (
  <div className="min-h-screen bg-white px-6 pt-32 pb-24">
    <div className="max-w-4xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-4">Legal</p>
      <h1 className="text-5xl font-serif mb-4 text-stone-900">Terms of Service</h1>
      <p className="text-stone-400 text-sm mb-12">Last updated: August 2026</p>
      <p className="text-stone-600 font-light text-lg leading-relaxed mb-12">
        These terms govern your use of the EasyAffordableHomes platform, including browsing listings,
        booking tours, and listing properties.
      </p>
      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-2xl font-serif text-stone-900 mb-3">{s.title}</h2>
            <p className="text-stone-600 font-light leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default Terms;
