import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle, Home, Shield, Users, Target, Globe, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    { icon: Shield, title: "Trust & Transparency", desc: "No hidden fees, no misleading photos, just honest listings you can rely on." },
    { icon: Target, title: "Value-First Approach", desc: "We prioritize properties that offer the best quality for your budget." },
    { icon: Users, title: "Community Focused", desc: "Building relationships between renters and verified property managers." },
    { icon: Globe, title: "Nationwide Coverage", desc: "From bustling cities to quiet suburbs, we connect you to homes across the US." },
  ];

  const team = [
    { name: "Alex Morgan", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
    { name: "Sarah Chen", role: "Head of Curation", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786" },
    { name: "Marcus Rivera", role: "Tech Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
    { name: "Priya Sharma", role: "Community Director", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f" },
  ];

  const milestones = [
    { year: "2018", event: "Founded with a mission to simplify apartment hunting" },
    { year: "2019", event: "Expanded to 10 major US cities" },
    { year: "2020", event: "Launched virtual tour feature" },
    { year: "2021", event: "Reached 1000+ verified listings" },
    { year: "2022", event: "Introduced AI-powered matching system" },
    { year: "2023", event: "Expanded to 50+ cities nationwide" },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/95 to-stone-800/90">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            alt="Modern apartment interior"
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-6xl text-center text-white"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">About Us</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight">
            Redefining <span className="text-stone-300 italic">Affordable</span> Living
          </h1>

          <p className="text-xl md:text-2xl text-stone-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe everyone deserves a beautiful home that doesn't break the bank. 
            Our mission is to make quality living accessible through transparency, curation, and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="px-8 py-4 bg-white text-stone-900 rounded-full font-medium hover:bg-stone-100 transition-all shadow-lg hover:shadow-xl"
            >
              Browse Properties
            </Link>
            <a
              href="#story"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Our Story
            </a>
          </div>
        </motion.div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:pr-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-stone-900"></div>
                <span className="text-sm font-semibold tracking-widest uppercase text-stone-500">Our Journey</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Why We Started EasyAffordableHomes<span className="text-stone-400">.</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-stone-600 leading-relaxed">
                  In 2018, our founder spent 3 months searching for an apartment in New York. 
                  The experience was exhausting: misleading photos, hidden fees, and endless compromises on quality.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  That frustration sparked an idea: what if there was a platform that actually cared about 
                  <span className="font-medium text-stone-900"> value, transparency, and real livability</span>—not just transactions?
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Today, every property on our platform goes through a 14-point verification process. 
                  We visit locations, meet property managers, and assess neighborhoods to ensure 
                  what you see is truly what you get.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
                  alt="City apartment"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="text-3xl font-serif mb-2">14-Point</div>
                <div className="text-stone-600">Verification Process</div>
              </div>
            </motion.div>
          </div>

          {/* TIMELINE */}
          <div className="mt-32">
            <h3 className="text-3xl font-serif text-center mb-16">Our Milestones</h3>
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-stone-200 via-stone-400 to-stone-200"></div>
              
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                      <div className="inline-block bg-stone-100 px-4 py-2 rounded-full mb-3">
                        <span className="text-sm font-semibold text-stone-700">{milestone.year}</span>
                      </div>
                      <p className="text-lg text-stone-700">{milestone.event}</p>
                    </div>
                    
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-stone-900 rounded-full z-10"></div>
                    
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                        <CheckCircle className="w-6 h-6 text-green-500 mb-3" />
                        <h4 className="font-semibold text-stone-900 mb-2">Achievement</h4>
                        <p className="text-stone-600">A step forward in our mission</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold tracking-widest uppercase text-stone-500">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">What We Stand For</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every property we list.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-stone-100"
                >
                  <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-stone-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-32 px-6 bg-gradient-to-br from-stone-900 to-stone-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">By The Numbers</h2>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto">
              Real impact, measurable results, and growing trust across the country.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "1,200+", label: "Verified Listings", suffix: "properties" },
              { value: "50+", label: "US Cities", suffix: "and counting" },
              { value: "10k+", label: "Happy Residents", suffix: "and growing" },
              { value: "96%", label: "Satisfaction Rate", suffix: "verified reviews" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-5xl md:text-6xl font-serif mb-4 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                <div className="text-lg font-medium mb-2">{stat.label}</div>
                <div className="text-sm text-stone-400">{stat.suffix}</div>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Meet Our Team</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to making home-finding better for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-square">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-stone-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-gradient-to-r from-stone-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
                alt="Apartment building"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            
            <div className="relative z-10 p-12 md:p-20 text-center text-white">
              <Award className="w-12 h-12 mx-auto mb-6 text-stone-300" />
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                Ready to Find Your <span className="italic text-stone-200">Perfect Home</span>?
              </h2>
              <p className="text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands who've found their ideal space through our curated, verified listings.
                No stress, no surprises—just smart matches to great homes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/properties"
                  className="px-8 py-4 bg-white text-stone-900 rounded-full font-semibold hover:bg-stone-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Start Browsing
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-stone-400 text-sm">
                  Need help? Our support team is available 7 days a week.
                  <a href="mailto:support@easyaffordablehome.com" className="text-white hover:underline ml-2">support@easyaffordablehome.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;