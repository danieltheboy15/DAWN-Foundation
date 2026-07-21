import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, DollarSign, ShieldCheck, FileText, ArrowRight, X, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export default function DonateView() {
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; name: string; zeffyUrl: string } | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>('100');
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<string | null>('usage');
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [closedCampaignName, setClosedCampaignName] = useState('');

  const campaigns = {
    education: [
      { id: "edu-schol", name: "Primary Royalty Scholar Fund", desc: "Covers complete academic tuition and boarding expenses for promising, vulnerable young students.", zeffyUrl: "https://www.zeffy.com/donation-form/dawn-scholar-fund" },
      { id: "edu-supplies", name: "Back-to-School Supply Supplies", desc: "Supplies premium textbooks, mathematical geometry kits, bags, and tablet computers.", zeffyUrl: "https://www.zeffy.com/donation-form/dawn-supplies-drive" }
    ],
    healthcare: [
      { id: "health-screen", name: "Sponsor 10 Uninsured Parents", desc: "Provide 10 uninsured low income patients unlimited clinic visits for one year. Free consultation, x-rays, labs, and other diagnostic testing" },
      { id: "health-prevent", name: "Preventive Hygiene Kits", desc: "Distributes clean water filters, emergency aid supplies, and dental wellness packs.", zeffyUrl: "https://www.zeffy.com/donation-form/dawn-preventive-hygiene" }
    ],
    food: [
      { id: "food-pantry", name: "Daily Harvest Food Pantry Allocation", desc: "Replenishes regional dry rice, grain bags, and vegetable oil boxes inside community pantries.", zeffyUrl: "https://www.zeffy.com/donation-form/dawn-harvest-pantry" },
      { id: "food-holiday", name: "Holiday Hot Dinner Initiatives", desc: "Supports localized warm holiday kitchen dinners and seasonal nutrition packages.", zeffyUrl: "https://www.zeffy.com/donation-form/dawn-holiday-meals" }
    ],
    general: { id: "general-fund", name: "General Legacy Foundation Fund", desc: "Powers our responsive operational infrastructure, enabling quick mobilization during emergency relief situations.", zeffyUrl: "https://www.zeffy.com/en-US/donation-form/donate-to-support-dawn-foundation" }
  };

  const handleOpenDonateModal = (campaignId: string, campaignName: string, url: string) => {
    if (campaignId === "health-screen" || campaignId === "general-fund") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setClosedCampaignName(campaignName);
      setShowClosedModal(true);
    }
  };

  const handleConfirmMockCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCheckout(true);
    setTimeout(() => {
      setIsSubmittingCheckout(false);
      setIsCheckoutSuccess(true);
    }, 1800);
  };

  return (
    <div id="donate-support-view" className="py-24 bg-brand-beige-50">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-16">
        <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Empowering Actions</span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          Donate & Support Portal
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        <p className="text-base sm:text-lg text-brand-green-700 max-w-2xl mx-auto font-light leading-relaxed">
          When you donate through a campaign's dedicated donation button, 100% of your contribution goes directly toward supporting that campaign
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-12">

        {/* 1. General Fund Highlight Callout */}
        <section className="bg-brand-green-700 text-white rounded-3xl p-8 sm:p-12 border border-brand-green-600 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <HeartHandshake className="h-44 w-44 animate-pulse" />
          </div>
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="px-3.5 py-1 bg-brand-gold-500/20 text-brand-gold-300 font-mono text-xs uppercase font-bold tracking-widest rounded-full inline-block">
              Sustaining Foundation Support
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              General Foundation Legacy Fund
            </h2>
            <p className="text-sm sm:text-base text-brand-green-100 font-light leading-relaxed">
              This core operational fund supports our day-to-day operations, logistics, and essential administrative expenses. It helps ensure that our programs run efficiently by providing the resources needed to sustain and support direct program activities.
            </p>

            <button
              id="donate-btn-general"
              onClick={() => handleOpenDonateModal(campaigns.general.id, campaigns.general.name, campaigns.general.zeffyUrl)}
              className="px-6 py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center space-x-2"
            >
              <Heart className="h-4 w-4 fill-current text-current" />
              <span>Donate to General Fund</span>
            </button>
          </div>
        </section>

        {/* 2. Structured Campaign Pillars (Displaying all causes on Zeffy) */}
        <section className="space-y-16">
          <div className="border-b border-brand-green-100 pb-3 text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-905">
              Support Our Focused Campaigns
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light mt-1">
              Select a direct campaign area below.
            </p>
          </div>

          {/* Education Campaigns (Commented out for now, can be uncommented to show later) */}
          {/*
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-1 bg-brand-gold-500 w-6 rounded" />
              <h3 className="font-serif font-black text-xl text-brand-green-900 uppercase">Education Access Campaigns</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.education.map((camp) => (
                <div key={camp.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-green-100 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-serif font-extrabold text-lg text-brand-green-950">{camp.name}</h4>
                    <p className="text-xs sm:text-sm text-brand-green-700 font-light leading-relaxed">{camp.desc}</p>
                    <div className="text-[10px] font-mono text-brand-green-500 uppercase tracking-widest bg-brand-green-50 px-2 py-1 rounded w-fit">
                      Sub-category: Tuition / Supply Drive
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-brand-green-50 flex items-center justify-between">
                    <span className="text-xs text-brand-green-400 font-mono">100% Tax Deductible</span>
                    <button
                      id={`donate-btn-${camp.id}`}
                      onClick={() => handleOpenDonateModal(camp.id, camp.name, camp.zeffyUrl)}
                      className="px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Donate to Campaign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          */}

          {/* Healthcare Campaigns */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-1 bg-brand-gold-500 w-6 rounded" />
              <h3 className="font-serif font-black text-xl text-brand-green-900 uppercase">Healthcare Access Campaigns</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Only showing Sponsor 10 Uninsured Parents campaign for now, filter can be removed/modified to show all */}
              {campaigns.healthcare
                .filter((camp) => camp.id === 'health-screen')
                .map((camp) => (
                <div key={camp.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-green-100 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-serif font-extrabold text-lg text-brand-green-950">{camp.name}</h4>
                    <p className="text-xs sm:text-sm text-brand-green-700 font-light leading-relaxed">{camp.desc}</p>
                    <div className="text-[10px] font-mono text-brand-green-500 uppercase tracking-widest bg-brand-green-50 px-2 py-1 rounded w-fit">
                      Sub-category: Nursing / Preventive
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-brand-green-50 flex items-center justify-between">
                    <span className="text-xs text-brand-green-400 font-mono">Spatium Urgent care & Dawn Primary Care</span>
                    <button
                      id={`donate-btn-${camp.id}`}
                      onClick={() => handleOpenDonateModal(camp.id, camp.name, camp.zeffyUrl)}
                      className="px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Donate to Campaign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food Security Campaigns (Commented out for now, can be uncommented to show later) */}
          {/*
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-1 bg-brand-gold-500 w-6 rounded" />
              <h3 className="font-serif font-black text-xl text-brand-green-900 uppercase">Food Security Campaigns</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.food.map((camp) => (
                <div key={camp.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-green-100 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-serif font-extrabold text-lg text-brand-green-950">{camp.name}</h4>
                    <p className="text-xs sm:text-sm text-brand-green-700 font-light leading-relaxed">{camp.desc}</p>
                    <div className="text-[10px] font-mono text-brand-green-500 uppercase tracking-widest bg-brand-green-50 px-2 py-1 rounded w-fit">
                      Sub-category: Pantry / Seasonal
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-brand-green-50 flex items-center justify-between">
                    <span className="text-xs text-brand-green-400 font-mono">Dignified Nourishment</span>
                    <button
                      id={`donate-btn-${camp.id}`}
                      onClick={() => handleOpenDonateModal(camp.id, camp.name, camp.zeffyUrl)}
                      className="px-5 py-2.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Donate to Campaign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          */}
        </section>

        {/* 3. Transparency Section (Required by the brief) */}
        <section id="donate-transparency" className="bg-white rounded-3xl border border-brand-green-150 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block">Zero Transaction Fee Assurance</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-909">
              Transparency & Financial Stewardship
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light mt-1">
              DAWN Foundation guarantees detailed, trace-backed utilization audits for all global donations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-brand-green-100">
            
            {/* Interactive Accordion triggers */}
            <div className="lg:col-span-5 flex flex-col space-y-1.5">
              <button
                onClick={() => setActiveFAQ('usage')}
                className={`p-4 text-left rounded-xl transition-all font-serif font-bold text-sm cursor-pointer ${
                  activeFAQ === 'usage'
                    ? 'bg-brand-green-700 text-white shadow-sm'
                    : 'bg-brand-beige-100/50 hover:bg-brand-green-500/5 text-brand-green-900 border border-brand-green-100'
                }`}
              >
                1. How Donations Are Used
              </button>
              <button
                onClick={() => setActiveFAQ('reports')}
                className={`p-4 text-left rounded-xl transition-all font-serif font-bold text-sm cursor-pointer ${
                  activeFAQ === 'reports'
                    ? 'bg-brand-green-700 text-white shadow-sm'
                    : 'bg-brand-beige-100/50 hover:bg-brand-green-500/5 text-brand-green-900 border border-brand-green-100'
                }`}
              >
                2. Annual Reports & Governance
              </button>
              <button
                onClick={() => setActiveFAQ('accountability')}
                className={`p-4 text-left rounded-xl transition-all font-serif font-bold text-sm cursor-pointer ${
                  activeFAQ === 'accountability'
                    ? 'bg-brand-green-700 text-white shadow-sm'
                    : 'bg-brand-beige-100/50 hover:bg-brand-green-500/5 text-brand-green-900 border border-brand-green-100'
                }`}
              >
                3. Absolute Financial Accountability
              </button>
            </div>

            {/* Accordion detail pane */}
            <div className="lg:col-span-7 bg-brand-beige-50 rounded-2.5xl border border-brand-green-100 p-6 min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeFAQ === 'usage' && (
                  <motion.div
                    key="faq-usage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif font-bold text-brand-green-950 text-base">Direct On-field Allocation</h4>
                    <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light">
                      Across both United States and Nigeria branches, 100% of campaign funds directly cover programs.
                    </p>
                  </motion.div>
                )}

                {activeFAQ === 'reports' && (
                  <motion.div
                    key="faq-reports"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif font-bold text-brand-green-950 text-base">Full IRS 501(c)(3) & NG NGO Registrations</h4>
                    <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light">
                      We file annual Form 990 financials and regional audits with authorities. In accordance with HRM Samson Okirhioboh Omene's legacy of royal hospitality, all data remains open-access. High-resolution report sheets are made public of all operations.
                    </p>
                    <p className="text-xs text-brand-green-500 font-mono flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>Next general audit: January 2027</span>
                    </p>
                  </motion.div>
                )}

                {activeFAQ === 'accountability' && (
                  <motion.div
                    key="faq-accountability"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif font-bold text-brand-green-950 text-base">Guaranteed Traceability Safeguards</h4>
                    <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light">
                      No board members receive salaries or payments for their roles. This ensures total alignment with the original royal principles: pure, borderless compassion designed strictly to relieve poverty, hunger, and basic healthcare.
                    </p>
                    <p className="text-xs text-brand-gold-600 font-mono">✓ Managed strictly by the appointed Treasurer</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

      </div>

      {/* 4. Beautiful checkout modal simulation */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="checkout-safe-modal">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCampaign(null)}
                className="fixed inset-0 transition-opacity bg-brand-green-950/70 backdrop-blur-xs"
              />

              {/* Centered Modal card */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="inline-block overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
              >
                {/* Header banner */}
                <div className="relative p-6 bg-brand-green-700 text-white flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-brand-gold-500 text-brand-green-950 rounded font-mono text-[9px] uppercase tracking-wider font-bold mb-1">
                      Safe Zeffy Connection
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-tight">
                      {selectedCampaign.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {isCheckoutSuccess ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="inline-flex p-3 bg-brand-green-500/10 text-brand-green-700 rounded-full">
                      <ShieldCheck className="h-10 w-10 text-brand-green-700" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-brand-green-950">Thank You For Your Kindness!</h4>
                    <p className="text-xs text-brand-green-700 leading-relaxed max-w-sm mx-auto">
                      Your generous simulated gift of <strong>${donationAmount}</strong> has been secure-registered for the <strong>{selectedCampaign.name}</strong> campaign. An official tax-allowable receipt has been populated to your email.
                    </p>
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="w-full py-3 rounded-xl bg-brand-green-750 text-white font-semibold text-xs uppercase tracking-wider hover:bg-brand-green-850 cursor-pointer"
                    >
                      Close Portal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmMockCheckout} className="p-6 space-y-5">
                    
                    {/* Amount picker presets */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold text-brand-green-600 uppercase tracking-widest">Select Donation Gift:</span>
                      <div className="grid grid-cols-4 gap-2">
                        {['25', '50', '100', '250'].map((amt) => (
                          <button
                            type="button"
                            key={amt}
                            onClick={() => setDonationAmount(amt)}
                            className={`py-2 rounded-xl text-xs font-bold font-mono transition-colors border cursor-pointer ${
                              donationAmount === amt
                                ? 'bg-brand-green-750 text-white border-brand-green-750'
                                : 'bg-brand-beige-50 text-brand-green-900 hover:bg-brand-green-50 border-brand-green-150'
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                      
                      {/* Custom input */}
                      <div className="relative mt-2">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-green-500 font-bold text-sm">$</span>
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="Other amount"
                          className="w-full pl-8 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950 font-bold text-sm"
                          required
                          min="5"
                        />
                      </div>
                    </div>

                    {/* Donor Credentials */}
                    <div className="space-y-3">
                      <span className="block text-[10px] font-mono font-bold text-brand-green-600 uppercase tracking-widest">Payment credentials (safe variables):</span>
                      <div className="grid grid-cols-1 gap-2.5">
                        <input
                          type="text"
                          required
                          placeholder="Donor Full Name"
                          className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Card Number"
                            className="col-span-2 px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500"
                          />
                          <input
                            type="text"
                            required
                            placeholder="CVV"
                            className="px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="confirm-checkout-btn"
                      type="submit"
                      disabled={isSubmittingCheckout}
                      className="w-full py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingCheckout ? (
                        <span className="inline-block h-4 w-4 border-2 border-brand-green-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Heart className="h-4 w-4 fill-current" />
                          <span>Pledge ${donationAmount} Securely</span>
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-brand-green-400 font-mono uppercase tracking-widest flex items-center justify-center space-x-2">
                      <span className="text-brand-green-600 font-bold font-mono text-[10px]">🔒 Secure TLS 256bit encryption active</span>
                    </div>

                  </form>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Fancy Campaign Closed Modal */}
      <AnimatePresence>
        {showClosedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClosedModal(false)}
              className="fixed inset-0 bg-brand-green-950/75 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative z-10 border border-brand-green-100"
            >
              {/* Close Button at top right */}
              <button
                onClick={() => setShowClosedModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-green-50 text-brand-green-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 text-center space-y-6">
                {/* Decorative Icon Circle */}
                <div className="inline-flex p-4 bg-brand-gold-500/10 text-brand-gold-600 rounded-full">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-brand-gold-600 font-bold uppercase tracking-widest block">
                    {closedCampaignName || 'Campaign Details'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-green-950">
                    Sponsorship Status
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light">
                  This campaign is not open at the moment. Please check back later.
                </p>

                <div className="p-4 bg-brand-beige-50 rounded-2xl border border-brand-green-50 text-left space-y-1">
                  <span className="inline-block px-2 py-0.5 bg-brand-green-900 text-white font-mono text-[9px] rounded uppercase font-semibold">
                    Live Initiative
                  </span>
                  <p className="text-xs text-brand-green-900 font-medium leading-relaxed">
                    Our Sponsor 10 Uninsured Parents campaign is currently active and fully open for sponsorships!
                  </p>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setShowClosedModal(false);
                      // Open active campaign in new tab
                      window.open("https://www.zeffy.com/en-US/donation-form/donate-to-sponsor-a-parents-healthcare", "_blank", "noopener,noreferrer");
                    }}
                    className="w-full py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>Sponsor Uninsured Parents Instead</span>
                  </button>

                  <button
                    onClick={() => setShowClosedModal(false)}
                    className="w-full py-3 rounded-xl bg-brand-beige-100 hover:bg-brand-beige-200 text-brand-green-900 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close & Keep Exploring
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
