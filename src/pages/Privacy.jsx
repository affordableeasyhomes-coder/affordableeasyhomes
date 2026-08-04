import React from 'react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'When you book a tour, contact us, or list a property, we collect the information you provide: your name, email address, phone number, and any message you send. We also collect standard technical data such as browser type and pages visited to improve the site.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information to schedule and confirm property tours, respond to your inquiries, process property listing applications, and send you booking confirmations. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Data Storage & Security',
    body: 'Your data is stored on secure, encrypted infrastructure. Payment details are never collected or stored on our platform — payment instructions are provided separately through your selected payment method.',
  },
  {
    title: '4. Cookies & Local Storage',
    body: 'We use browser local storage to remember your saved properties on your device. This data never leaves your browser. See our Cookie Policy for details.',
  },
  {
    title: '5. Your Rights',
    body: 'You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it at any time by emailing westleykate71@gmail.com. We respond to all requests within 30 days.',
  },
  {
    title: '6. Contact',
    body: 'For any privacy-related questions, contact our team at westleykate71@gmail.com or +1 (716) 889-1380.',
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-white px-6 pt-32 pb-24">
    <div className="max-w-4xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-4">Legal</p>
      <h1 className="text-5xl font-serif mb-4 text-stone-900">Privacy Policy</h1>
      <p className="text-stone-400 text-sm mb-12">Last updated: August 2026</p>
      <p className="text-stone-600 font-light text-lg leading-relaxed mb-12">
        EasyAffordableHomes ("we", "our") is committed to protecting your privacy. This policy explains what
        information we collect, how we use it, and the choices you have.
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

export default Privacy;
