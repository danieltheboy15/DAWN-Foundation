import React from 'react';
import { motion } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { ShieldCheck, Heart, Sun, Eye, ChevronRight, Award, Lightbulb } from 'lucide-react';

export default function AboutView() {
  const { aboutContent: ABOUT_CONTENT } = useCMS();
  const iconMap = [Eye, Heart, Award, ShieldCheck];

  return (
    <div id="about-us-view" className="py-24 bg-brand-beige-50">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-16">
        <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Our Origin & Purpose</span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          About DAWN Foundation
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        <p className="text-base sm:text-lg text-brand-green-700 max-w-2xl mx-auto font-light leading-relaxed">
          Honoring the legacy of hospitality and caring for communities in the United States of America and Nigeria.
        </p>
      </div>

      {/* Grid: Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-green-700 text-white p-8 sm:p-12 rounded-3xl shadow-md relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sun className="h-32 w-32 animate-[spin_40s_linear_infinite]" />
          </div>
          <div className="space-y-6 relative z-10">
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Our Mission
            </h2>
            <p className="text-brand-green-100 font-light text-base sm:text-lg leading-relaxed">
              "{ABOUT_CONTENT.mission}"
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-green-600/40 flex items-center">
            <span className="px-3 py-1 bg-brand-gold-500/10 text-brand-gold-300 border border-brand-gold-500/30 font-mono text-xs uppercase font-bold tracking-widest rounded-full inline-block">
              Access • Empowerment • Respect
            </span>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-brand-green-100 p-8 sm:p-12 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden"
        >
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <Lightbulb className="h-32 w-32 text-[#faaf40]" />
          </div>
          <div className="space-y-6">
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green-900 leading-tight">
              Our Vision
            </h2>
            <p className="text-brand-green-700 font-light text-base sm:text-lg leading-relaxed">
              "{ABOUT_CONTENT.vision}"
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-green-100 flex items-center">
            <span className="px-3 py-1 bg-[#435e4a] text-white border border-[#435e4a] font-mono text-xs uppercase font-bold tracking-widest rounded-full inline-block">
              Global Outreach • Borderless Giving
            </span>
          </div>
        </motion.div>
      </section>

      {/* Narrative: Legacy & Founder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-16">
        
        {/* Legacy of HRM Samson Okirhioboh Omene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden  border-4 border-white shadow-xl relative z-10">
              <img
                src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781790265/Screenshot_20220130-104036_WhatsApp_o4sm63.jpg"
                alt="HRM Samson Okirhioboh Omene Legacy Concept"
                className="w-full h-full object-cover  "
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/90 via-brand-green-950/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold-400 font-bold mb-1">A Royal Benefactor</span>
                <h4 className="font-serif text-xl font-bold text-white leading-tight">HRM Samson Okirhioboh Omene</h4>
                <p className="text-xs text-brand-green-200 leading-relaxed font-light">Late King & community elder whose kindness forms our blueprint.</p>
              </div>
            </div>
            {/* Background design block */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand-gold-500 rounded-tl-3xl z-0" />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-brand-green-700/10 rounded-3xl z-0" />
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1 bg-brand-gold-100 text-brand-gold-800 px-3 py-1 rounded-full text-xs font-semibold">
              <Award className="h-4 w-4 text-brand-gold-600" />
              <span>Honoring a King's Legacy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green-900 leading-snug">
              The Legacy of HRM Samson Okirhioboh Omene
            </h2>
            <p className="text-brand-green-700 leading-relaxed font-light text-base sm:text-lg">
              {ABOUT_CONTENT.legacy}
            </p>
            
          </div>
        </div>

        {/* Founder's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 border-t border-brand-green-200/50">
          <div className="lg:col-span-7 lg:order-2 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-green-90s border-4 border-white shadow-xl relative z-10">
              <img
                src="https://res.cloudinary.com/dcxy05pvc/image/upload/v1784641976/IMG_9717.jpg_lzqtfd.jpg"
                alt="Dr. Aghogho Omene-Iroro"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="font-serif text-xl font-bold text-white">Dr. Aghogho Omene-Iroro</h4>
                <p className="text-xs text-brand-gold-300 font-mono uppercase tracking-widest font-bold">Founder & President</p>
              </div>
            </div>
            {/* Background design block */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-brand-gold-500 rounded-tr-3xl z-0" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-brand-green-700/10 rounded-2xl z-0" />
          </div>

          <div className="lg:col-span-5 lg:order-1 space-y-6">
            <span className="block text-brand-gold-600 text-xs uppercase font-mono tracking-widest font-bold">Founder's Message</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green-900 leading-snug">
              Generosity Changes Lives
            </h2>
            <div className="border-l-4 border-brand-gold-500 pl-4 py-1 italic text-brand-green-800 text-sm sm:text-base leading-relaxed">
              "We believe that lifting a child up with health, knowledge, or nutrition transforms not just an individual life, but creates ripples that heal whole cities."
            </div>
            <p className="text-brand-green-700 font-light text-sm sm:text-base leading-relaxed">
              {ABOUT_CONTENT.founderMessage}
            </p>
            <div className="flex items-center space-x-3 pt-4">
            <div className="p-1 px-3 bg-brand-gold-500 text-brand-green-950 font-mono text-[11px] rounded uppercase tracking-widest">
                United States
              </div>
              <div className="p-1 px-3 bg-brand-green-900 text-white font-mono text-[11px] rounded uppercase tracking-widest">
                Nigeria
              </div>
              
            </div>
          </div>
        </div>

      </section>

      {/* Core Values */}
      <section className="bg-white py-24 border-t border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Our Guiding Light</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green-900">
              Core Beliefs & Values
            </h2>
            <p className="text-sm text-brand-green-600 font-light leading-relaxed mt-3">
              These principles govern our strategic disbursements, our team alignments, and our local outreach operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.coreValues.map((val, index) => {
              const IconComponent = iconMap[index % iconMap.length];
              return (
                <div
                  key={index}
                  id={`value-card-${index}`}
                  className="bg-brand-beige-50 p-8 rounded-3xl border border-brand-green-100/60 shadow-xs hover:border-brand-gold-400 hover:bg-white transition-all duration-200"
                >
                  <div className="p-3 bg-brand-green-700 text-white rounded-2xl w-fit mb-6">
                    <IconComponent className="h-6 w-6 text-brand-gold-200" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-brand-green-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-brand-green-700 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
