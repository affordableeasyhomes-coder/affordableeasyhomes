import React from 'react';

const SECTIONS = [
  {
    title: '1. What Are Cookies?',
    body: 'Cookies and local storage are small pieces of data stored in your browser that help websites remember information between visits.',
  },
  {
    title: '2. How We Use Them',
    body: 'We keep it minimal. We use browser local storage to remember the properties you save with the heart icon — this stays on your device and is never sent to our servers. We do not use advertising or cross-site tracking cookies.',
  },
  {
    title: '3. Essential Functionality',
    body: 'The site works without any third-party cookies. Disabling local storage in your browser will only affect the saved-properties feature.',
  },
  {
    title: '4. Managing Your Data',
    body: "You can clear saved properties at any time from the Saved page, or by clearing your browser's site data for easyaffordablehome.com.",
  },
];

const Cookies = () => (
  <div className="min-h-screen bg-white px-6 pt-32 pb-24">
    <div className="max-w-4xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-4">Legal</p>
      <h1 className="text-5xl font-serif mb-4 text-stone-900">Cookie Policy</h1>
      <p className="text-stone-400 text-sm mb-12">Last updated: August 2026</p>
      <p className="text-stone-600 font-light text-lg leading-relaxed mb-12">
        This policy explains how EasyAffordableHomes uses cookies and similar technologies.
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

export default Cookies;
