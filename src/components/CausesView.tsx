import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { GraduationCap, HeartPulse, Soup, CheckCircle, HelpCircle, ArrowRight, BookOpen, Sparkles, Building2, UserCheck, AlertCircle, Laptop, Activity, Droplets, Gift, Heart, Award, Users } from 'lucide-react';

interface CausesViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function CausesView({ setCurrentTab }: CausesViewProps) {
  const { programs: PROGRAMS } = useCMS();
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'healthcare' | 'food-security' | string>('all');

  const iconsMap: { [key: string]: any } = {
    GraduationCap: GraduationCap,
    HeartPulse: HeartPulse,
    Soup: Soup,
    Heart: Heart,
    Award: Award,
    Users: Users
  };

  const navigateToDonate = () => {
    setCurrentTab('donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPrograms = activeTab === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.id === activeTab);

  return (
    <div id="causes-view" className="py-24 bg-brand-beige-50 min-h-screen">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-16">
        <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Our Pillars of Intervention</span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          Strategic Focus Pages
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        <p className="text-base sm:text-lg text-brand-green-700 max-w-2xl mx-auto font-light leading-relaxed">
          How we empower families through critical education, sustainable nourishment, and clinical health campaigns in the United States & Nigeria.
        </p>

        {/* Filters/Tabs for each page section */}
        <div id="causes-pill-nav" className="flex flex-wrap items-center justify-center gap-2 mt-10 max-w-lg mx-auto bg-brand-green-100/50 p-1.5 rounded-2xl border border-brand-green-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 ${
              activeTab === 'all'
                ? 'bg-brand-green-700 text-white shadow-sm'
                : 'text-brand-green-800 hover:bg-brand-green-500/10'
            }`}
          >
            All Areas
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 ${
              activeTab === 'education'
                ? 'bg-brand-green-700 text-white shadow-sm'
                : 'text-brand-green-800 hover:bg-brand-green-500/10'
            }`}
          >
            Education Access
          </button>
          <button
            onClick={() => setActiveTab('healthcare')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 ${
              activeTab === 'healthcare'
                ? 'bg-brand-green-700 text-white shadow-sm'
                : 'text-brand-green-800 hover:bg-brand-green-500/10'
            }`}
          >
            Healthcare Access
          </button>
          <button
            onClick={() => setActiveTab('food-security')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 ${
              activeTab === 'food-security'
                ? 'bg-brand-green-700 text-white shadow-sm'
                : 'text-brand-green-800 hover:bg-brand-green-500/10'
            }`}
          >
            Food Security
          </button>
        </div>
      </div>

      {/* Main Causes detail loop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-12">
        <AnimatePresence mode="popLayout">
          {filteredPrograms.map((prog, index) => {
            const Icon = iconsMap[prog.iconName] || BookOpen;
            return (
              <motion.section
                key={prog.id}
                id={`detailed-cause-section-${prog.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl border border-brand-green-100 shadow-sm overflow-hidden"
              >
                {/* Visual Banner Block */}
                <div className="h-64 sm:h-80 relative">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950 via-brand-green-950/40 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="text-white space-y-1">
                      <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {prog.title}
                      </h2>
                    </div>
                    {/* Direct CTA button matching the briefs */}
                    <button
                      id={`cause-page-cta-btn-${prog.id}`}
                      onClick={navigateToDonate}
                      className="px-6 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-sm shadow-md transition-colors cursor-pointer shrink-0 uppercase tracking-wider"
                    >
                      {prog.ctaText} →
                    </button>
                  </div>
                </div>

                {/* Content body layout */}
                <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left: Why it matters and detailed description */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="block text-brand-gold-600 text-xs font-bold font-mono uppercase tracking-widest mb-1.5">Overview</span>
                      <h3 className="font-serif text-2xl font-bold text-brand-green-900 mb-3">
                        Why {prog.title} Matters
                      </h3>
                      <p className="text-brand-green-800 text-base leading-relaxed font-light italic bg-brand-beige-50 p-4 border-l-4 border-brand-gold-500 rounded-r-2xl">
                        {(() => {
                          const parts = prog.whyItMatters.split(' - ');
                          if (parts.length > 1) {
                            return (
                              <>
                                "{parts[0].trim()}" - {parts.slice(1).join(' - ').trim()}
                              </>
                            );
                          }
                          return `"${prog.whyItMatters}"`;
                        })()}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <span className="block text-brand-gold-600 text-xs font-bold font-mono uppercase tracking-widest">Our Operations Model</span>
                      <p className="text-brand-green-700 text-sm sm:text-base leading-relaxed font-light">
                        {prog.longDescription}
                      </p>
                    </div>

                    {/* Specific clinic detail highlights for Healthcare */}
                    {prog.id === 'healthcare' && (
                      <div id="healthcare-partners-block" className="p-5 bg-brand-green-500/10 border border-brand-green-100 rounded-2xl space-y-3">
                        <h4 className="font-serif font-bold text-sm text-brand-green-900 flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-brand-green-700" />
                          <span>Official Partner Hospitals & Clinics</span>
                        </h4>
                        <p className="text-xs text-brand-green-700 font-light leading-relaxed">
                          We deliver premium, high-impact clinical aid with licensed and certified healthcare networks.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-brand-green-800 border border-brand-green-200">
                            Spatium Urgent Care
                          </span>
                          <span className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-brand-green-800 border border-brand-green-200">
                            Dawn Primary Care
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Focus Area Visual Illustration Module (Commented out as requested, can be made visible later by removing comment tags) */}
                    {/*
                    <div className="pt-6 border-t border-brand-green-100 space-y-4">
                      <div>
                        <span className="block text-brand-gold-600 text-[10px] font-bold font-mono uppercase tracking-widest mb-1">
                          Operational Assembly Blueprint
                        </span>
                        <h4 className="font-serif text-lg font-bold text-brand-green-900">
                          Primary Deliverables & On-field Units
                        </h4>
                      </div>
                      
                      <p className="text-xs text-brand-green-700 leading-relaxed font-light">
                        This curated outline visually represents physical resources, specialized devices, and community supplies curated under our <strong className="font-semibold text-brand-green-950">{prog.title}</strong> framework:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {((id: string) => {
                          const getCards = (progId: string) => {
                            switch (progId) {
                              case 'education':
                                return [
                                  {
                                    title: "Scholarship Sponsor Pack",
                                    icon: GraduationCap,
                                    tag: "Full Academic Coverage",
                                    desc: "Sponsors direct academic school fees, customized uniforms, and physical notebooks/stationery backpacks.",
                                    metrics: ["Tuition: 100% Fully Paid", "Core Uniforms: Tailor-fitted", "Supplies: 12-Month Stationery Kit"]
                                  },
                                  {
                                    title: "Essential Digital Co-op Kit",
                                    icon: Laptop,
                                    tag: "Technology Distribution",
                                    desc: "Issues pre-configured learning tablets loaded with mathematics programs and curated reading manuals.",
                                    metrics: ["Elementary Math Modules", "Offline Classroom Sync", "Durable Protective Hardware Case"]
                                  }
                                ];
                              case 'healthcare':
                                return [
                                  {
                                    title: "Mobile Diagnostic Hub",
                                    icon: Activity,
                                    tag: "Rapid On-site Screenings",
                                    desc: "Mobilizes clean clinical tables with digital heart diagnostics, blood glucose strips, and blood pressure monitors.",
                                    metrics: ["Live Electrocardiogram Reading", "Instant Blood Glucose Tests", "Registered Clinical Volunteers"]
                                  },
                                  {
                                    title: "Clean Hydration Filter Box",
                                    icon: Droplets,
                                    tag: "Preventative Resource Kit",
                                    desc: "Supplies heavy-duty vertical water filter cylinders and basic sanitary supplies for family preventive hygiene.",
                                    metrics: ["Capacity: 2,000L clean life water", "Gravity-operated, zero power needed", "Includes pediatric oral hygiene tools"]
                                  }
                                ];
                              case 'food-security':
                              default:
                                return [
                                  {
                                    title: "The Noble Nutrient Hamper",
                                    icon: Gift,
                                    tag: "Monthly Family Staples",
                                    desc: "Provides dry food crates filled with clean parboiled rice, raw beans, high-oleic oil, and vitamin-rich porridge grains.",
                                    metrics: ["Reinforced safe storage crates", "30 Days comprehensive meal baseline", "High-protein grain ratio formulation"]
                                  },
                                  {
                                    title: "Communal Hot Dinner Station",
                                    icon: Soup,
                                    tag: "Coordinated Soup Pantries",
                                    desc: "Organizes volunteer kitchen halls to cook and serve steaming, balanced seasonal dinners directly to the public.",
                                    metrics: ["Served with dignity and care", "Freshly sourced regional groceries", "Provides direct warm nourishment"]
                                  }
                                ];
                            }
                          };
                          
                          return getCards(id).map((card, cidx) => {
                            const CardIcon = card.icon;
                            return (
                              <div key={cidx} className="bg-brand-beige-50/75 rounded-2xl border border-brand-green-150/60 p-4 space-y-3 hover:border-brand-gold-300 transition-colors">
                                <div className="flex items-center space-x-2.5">
                                  <div className="p-2 bg-white rounded-xl border border-brand-green-150 text-brand-green-800 shrink-0">
                                    <CardIcon className="h-4.5 w-4.5 text-brand-gold-600 stroke-[2]" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="block text-[9px] font-mono font-bold text-brand-gold-600 uppercase tracking-wider truncate">
                                      {card.tag}
                                    </span>
                                    <h5 className="font-serif font-bold text-xs text-brand-green-950 truncate">
                                      {card.title}
                                    </h5>
                                  </div>
                                </div>
                                <p className="text-[11px] text-brand-green-700 font-light leading-relaxed">
                                  {card.desc}
                                </p>
                                <div className="pt-2 border-t border-brand-green-100/50 space-y-1">
                                  {card.metrics.map((met, midx) => (
                                    <div key={midx} className="flex items-center space-x-1.5 text-[10px] text-brand-green-800">
                                      <span className="w-1 h-1 rounded-full bg-brand-gold-500 inline-block shrink-0" />
                                      <span>{met}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          });
                        })(prog.id)}
                      </div>
                    </div>
                    */}
                  </div>

                  {/* Right: Core Programs list, Statistics (Pending status), Success / Testimonial blocks (Empty placeholders as per Brief directives) */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    {/* Active Programs list */}
                    <div className="space-y-4">
                      <span className="block text-brand-gold-600 text-xs font-bold font-mono uppercase tracking-widest">Included Programs</span>
                      <div className="space-y-2">
                        {prog.programsList.map((piItem, piIdx) => (
                          <div key={piIdx} className="flex items-start space-x-2.5 text-xs text-brand-green-950">
                            <span className="h-4 w-4 rounded-full bg-brand-green-700 text-brand-gold-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span className="font-semibold text-brand-green-900 text-xs sm:text-sm">
                              {piItem}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Statistics - Brief: "Statistics (hide counters for now)" */}
                    <div id={`stats-block-${prog.id}`} className="space-y-3 pt-6 border-t border-brand-green-100">
                      <span className="block text-brand-gold-600 text-xs font-bold font-mono uppercase tracking-widest">Local Statistical Metrics</span>
                      <div className="p-4 bg-brand-beige-50 rounded-xl border border-brand-green-100 flex items-center space-x-3 text-xs text-brand-green-600">
                        <AlertCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                        <span>
                          <em>Statistics counter hidden for live audit. Detailed demographic metrics will release in upcoming annual governance report.</em>
                        </span>
                      </div>
                    </div>

                    {/* Success Stories & Testimonials - Brief requests they should not be live / added later */}
                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-brand-green-100">
                      <div className="p-4 bg-brand-beige-50 rounded-xl border border-dashed border-brand-green-200 text-center">
                        <span className="block text-[10px] font-mono font-bold text-brand-green-400 uppercase tracking-widest">Success Stories</span>
                        <span className="block text-xs text-brand-green-500 font-light mt-1 italic">To be added later</span>
                      </div>
                      <div className="p-4 bg-brand-beige-50 rounded-xl border border-dashed border-brand-green-200 text-center">
                        <span className="block text-[10px] font-mono font-bold text-brand-green-400 uppercase tracking-widest">Testimonials</span>
                        <span className="block text-xs text-brand-green-500 font-light mt-1 italic">To be added later</span>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
