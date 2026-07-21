import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { Camera, Image as ImageIcon, Video, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function GalleryView() {
  const { galleryItems: GALLERY_ITEMS } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  // State to simulate holding live release - as specified in the brief instructions
  const [isDemoModeEnabled, setIsDemoModeEnabled] = useState(false);

  const categories = [
    'All',
    'Education',
    'Medical Outreach',
    'Food Distribution',
    'Community',
    'Volunteers'
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div id="gallery-page-view" className="py-24 bg-brand-beige-50 min-h-screen">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          Impact Gallery
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">

        {/* Informational Status Card explaining the Brief mandate */}
        <section className="bg-brand-green-900 text-white rounded-3xl p-8 sm:p-12 border border-brand-green-800 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Camera className="h-40 w-40" />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="px-3 py-1 bg-brand-gold-500/20 text-brand-gold-300 font-mono text-xs uppercase font-bold tracking-widest rounded-full inline-block">
              Stewardship Status: Pending Asset Curation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">Why the Live Gallery is Shelved</h2>
            <p className="text-xs sm:text-sm text-brand-green-150 font-light leading-relaxed">
              To fully preserve the dignity and identity of our beneficiaries (specifically minor school students and clinical patients in underserved localities), DAWN Foundation adheres to strict privacy protection laws. 
            </p>
            <p className="text-xs sm:text-sm text-brand-green-150 font-light leading-relaxed">
              We are currently awaiting official release approvals and signing custom photo waivers. In the meantime, you can toggle the preview button below to view a skeleton mockup of the future high-resolution image/video library.
            </p>

            {/* Toggle switch */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                id="toggle-gallery-demo-mode"
                onClick={() => setIsDemoModeEnabled(!isDemoModeEnabled)}
                className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow ${
                  isDemoModeEnabled
                    ? 'bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                }`}
              >
                {isDemoModeEnabled ? (
                  <>
                    <EyeOff className="h-4.5 w-4.5" />
                    <span>Disable Placeholder Gallery Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4.5 w-4.5" />
                    <span>Enable Placeholder Gallery Preview</span>
                  </>
                )}
              </button>
              
              <span className="text-[11px] font-mono text-brand-gold-300 uppercase tracking-widest flex items-center space-x-1.5 py-2">
                <span className={`inline-block h-2/5 w-2 rounded-full ${isDemoModeEnabled ? 'bg-amber-400' : 'bg-red-500 animate-pulse'}`} />
                <span>STATE: {isDemoModeEnabled ? 'ACTIVE PREVIEW' : 'RESTRICTED / HIDDEN'}</span>
              </span>
            </div>
          </div>
        </section>

        {/* Conditional rendering of interactive gallery block */}
        <AnimatePresence mode="wait">
          {isDemoModeEnabled ? (
            <motion.div
              key="active-gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
              id="active-preview-gallery-container"
            >
              {/* Category Tab Pills */}
              <div id="gallery-category-nav" className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-brand-green-100/40 rounded-2xl border border-brand-green-100 max-w-2xl mx-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 ${
                      activeCategory === cat
                        ? 'bg-brand-green-700 text-white shadow-sm'
                        : 'text-brand-green-800 hover:bg-brand-green-500/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid block */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-brand-green-100/60 shadow-xs group"
                  >
                    <div className="h-60 relative overflow-hidden bg-brand-green-950">
                      <img
                        src={item.imageUrl}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/80 via-transparent to-transparent flex items-end p-5" />
                      <span className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 rounded bg-brand-gold-500 text-brand-green-950 text-[10px] font-mono uppercase font-bold tracking-widest shadow">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="text-xs sm:text-sm text-brand-green-900 leading-relaxed font-light">
                        {item.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Video Gallery Mockup block */}
              <div className="bg-white rounded-3xl p-8 border border-brand-green-100 space-y-6">
                <div className="flex items-center space-x-2 border-b border-brand-green-50 pb-3">
                  <Video className="h-5 w-5 text-brand-green-700" />
                  <h3 className="font-serif font-extrabold text-lg text-brand-green-950">
                    Video Field Reports (Mock Preview)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Medical Screening Camp Mini-Doc (Nigeria)",
                    "TUITION SPONSORSHIP SUCCESS SUMMARIES (United States)"
                  ].map((videoTitle, vIdx) => (
                    <div key={vIdx} className="bg-brand-beige-50 p-4 rounded-2xl border border-brand-green-100 flex items-center space-x-4">
                      <div className="h-16 w-24 bg-brand-green-950 rounded-xl relative flex items-center justify-center shrink-0">
                        <span className="text-[10px] text-brand-gold-500 font-bold font-mono">02:40</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-brand-green-950 leading-tight">
                          {videoTitle}
                        </h4>
                        <span className="text-[10px] font-mono uppercase text-brand-green-500 mt-1 block">AWAITING RELEASE</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="restricted-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center text-brand-green-500 space-y-4"
              id="restricted-gallery-skeleton"
            >
              <Lock className="h-10 w-10 text-brand-green-300 mx-auto" />
              <div>
                <p className="font-serif font-bold text-lg text-brand-green-900">Gallery restricted to shield beneficiary privacy.</p>
                <p className="text-xs text-brand-green-600 font-light mt-1 max-w-sm mx-auto">
                  To view wireframe layouts and curated placeholder photographs, please activate the Preview Switch in the top status box.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
