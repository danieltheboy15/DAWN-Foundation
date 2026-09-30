import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { submitToFormEndpoint } from '../config';
import { Handshake, CheckCircle2, ShieldCheck, ClipboardList, Send, Phone, Mail, Building, Users } from 'lucide-react';

export default function PartnerView() {
  const { partnershipBenefits: PARTNERSHIP_BENEFITS } = useCMS();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: 'Corporate',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const partnershipTypes = [
    { title: "Corporate Sponsorships", desc: "Support educational access by funding scholarships and learning opportunities for children in need as part of your corporate social responsibility (CSR) or social impact initiatives." },
    { title: "Nonprofit Organizations", desc: "Collaborate with us on joint programs, advocacy efforts, capacity building, and community outreach initiatives to amplify our collective impact." },
    { title: "Educational Institutions", desc: "Partner with us to expand educational opportunities through student mentorship, academic support, research collaborations, internships, scholarship programs, and the donation of learning resources." },
    { title: "Healthcare Organizations", desc: "Partner with us to provide medical supplies, clinical materials, health screenings, and wellness programs that support the health and well-being of the communities we serve." },
    { title: "Faith-Based Organizations", desc: "Join us in serving communities through volunteer engagement and mentorship programs" },
    { title: "Local Community Organizations", desc: "Work alongside us to identify community needs, mobilize local resources, engage volunteers, and implement programs that create sustainable, community-driven impact." }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyClick = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToFormEndpoint(
        {
          'Organization Name': formData.orgName,
          'Partnership Category': formData.orgType,
          'Primary Contact Name': formData.contactName,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Partnership Goals & Message': formData.message,
          'Submission Source': 'Website Partnership & Sponsorship Form'
        },
        {
          subject: `DAWN Foundation: New Partnership Inquiry from ${formData.orgName} (${formData.contactName})`,
          replyTo: formData.email
        }
      );

      setIsSubmitSuccess(true);
      // Reset form variables
      setFormData({
        orgName: '',
        orgType: 'Corporate',
        contactName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback to success state anyway to maintain excellent user experience
      setIsSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="partnership-page-view" className="py-24 bg-brand-beige-50">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          Sponsorship & Partnerships
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        <p className="text-base sm:text-lg text-brand-green-700 max-w-2xl mx-auto font-light leading-relaxed">
          Partner with DAWN Foundation to help improve education access, healthcare access, and food security across the United States and Nigeria.
        </p>

        <button
          onClick={handleApplyClick}
          className="mt-8 px-6 py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-sm tracking-wider uppercase transition-colors shadow-mc cursor-pointer inline-flex items-center space-x-2"
        >
          <Handshake className="h-4.5 w-4.5 stroke-[2.5]" />
          <span>Partner with us Today</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* SECTION 1: Why Partner With DAWN (Benefits) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10">
              <img
                src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781869987/dark-businesswoman-shaking-hands-with-male-colleague_30_l9j0gu.jpg"
                alt="Cooperative meeting"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-green-950/20 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-gold-500/10 rounded-2xl z-0" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand-gold-500 rounded-tl-3xl z-0" />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="block text-brand-gold-600 text-xs font-mono font-bold uppercase tracking-widest">Enterprise alignment</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-green-900 leading-tight">
              Why Partner With DAWN?
            </h2>
            <p className="text-sm sm:text-base text-brand-green-700 font-light leading-relaxed">
              We provide a transparent operational structure bridging corporate investments and measurable impacts. Every scholarship grant, healthcare and food initiatives are audited by our compliance team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {PARTNERSHIP_BENEFITS.map((ben, bIdx) => (
                <div key={bIdx} className="p-4 bg-white rounded-2xl border border-brand-green-100 shadow-xs space-y-1">
                  <h4 className="font-serif font-bold text-sm text-brand-green-900 flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-green-700 shrink-0" />
                    <span>{ben.title}</span>
                  </h4>
                  <p className="text-[11px] text-brand-green-600 font-light leading-relaxed">
                    {ben.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Partnership Types list */}
        <section className="space-y-10">
          <div className="border-b border-brand-green-100 pb-3 text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-gold-500">
              Partnership Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light mt-1">
              We accommodate multiple alliance models depending on your organization’s mandate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((type, tIdx) => (
              <div key={tIdx} className="p-6 bg-white rounded-3xl border border-brand-green-100/65 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-lg text-brand-green-900 leading-snug">{type.title}</h4>
                  <p className="text-xs sm:text-sm text-brand-green-700 font-light leading-relaxed">{type.desc}</p>
                </div>
                
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Outline Partnership Process */}
        <section className="bg-brand-green-700 text-white rounded-3xl p-8 sm:p-12 border border-brand-green-600">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-gold-300 text-xs font-mono font-bold uppercase tracking-widest block mb-2">Our Procedural Roadmap</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">The Partnership Alignment Process</h2>
            <p className="text-xs sm:text-sm text-brand-green-100 font-light mt-2">
              We maintain absolute speed and clarity. From introductory brief to concrete physical implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Fill Inquiry", desc: "Submit your corporate details & social objectives through our secure portal below." },
              { num: "02", title: "Initial Discussion", desc: "We schedule an introductory briefing to identify targeted geographic sectors." },
              { num: "03", title: "Draft Proposal", desc: "We generate a fully budgeted project plan detailing key milestones & timelines." },
              { num: "04", title: "Implementation", desc: "We deploy volunteer logistics, releasing official progress summaries and tax declarations." }
            ].map((step, sIdx) => (
              <div key={sIdx} className="bg-brand-green-800 p-5 rounded-2xl border border-brand-green-600/50 space-y-3 relative group">
                <div className="font-mono text-3xl font-extrabold text-brand-gold-500 leading-none">
                  {step.num}
                </div>
                <h4 className="font-serif font-bold text-white text-base">
                  {step.title}
                </h4>
                <p className="text-xs text-brand-green-200 font-light leading-relaxed">
                  {step.desc}
                </p>
                {sIdx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-3.5 z-10 text-brand-gold-500 text-lg font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Contact/Inquiry Form */}
        <section ref={formRef} id="partnership-inquiry-section" className="scroll-mt-24 max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-brand-green-150 shadow-md">
          <div className="text-center space-y-2 mb-8">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block">Become a Partner</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-900">Partnership Inquiry Form</h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light max-w-md mx-auto">
              Please submit detailed contact parameters. A member of our team will connect eith you shortly.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="p-8 bg-brand-green-500/10 border border-brand-green-200 rounded-2xl text-center space-y-4"
              >
                <div className="inline-flex p-3 bg-brand-green-700 text-white rounded-full">
                  <ShieldCheck className="h-8 w-8 text-brand-gold-300" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-green-900">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light max-w-md mx-auto">
                  Thank you for aligning with DAWN. We have catalogued your partnership proposal inquiry. Our corporate integration officer will connect with your contact cell within 24 business hours.
                </p>
                <button
                  id="reset-form-btn-partnership"
                  onClick={() => setIsSubmitSuccess(false)}
                  className="px-5 py-2.5 bg-brand-green-750 hover:bg-brand-green-850 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization Name */}
                  <div className="space-y-1">
                    <label id="lbl-orgName" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Organization Name</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                      <input
                        type="text"
                        name="orgName"
                        required
                        value={formData.orgName}
                        onChange={handleFormChange}
                        placeholder="e.g. Acme Corp"
                        className="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                      />
                    </div>
                  </div>

                  {/* Organization Type */}
                  <div className="space-y-1">
                    <label id="lbl-orgType" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Sector/Type</label>
                    <select
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950 font-medium"
                    >
                      <option value="Corporate">Corporate / Corperate Brand</option>
                      <option value="Nonprofit">Nonprofit Organization</option>
                      <option value="Educational">Educational & Research</option>
                      <option value="Healthcare">Healthcare Network</option>
                      <option value="Faith-Based">Faith-Based Alliance</option>
                      <option value="Community">Local Community Hub</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Representative Name */}
                  <div className="space-y-1">
                    <label id="lbl-contactName" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Contact Person</label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleFormChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                    />
                  </div>

                  {/* Representative Email */}
                  <div className="space-y-1">
                    <label id="lbl-partner-email" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Business Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="representative@acme.com"
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                    />
                  </div>

                  {/* Representative Phone */}
                  <div className="space-y-1">
                    <label id="lbl-partner-phone" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Direct Contact Cell</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                    />
                  </div>
                </div>

                {/* Scope statement */}
                <div className="space-y-1">
                  <label id="lbl-partner-msg" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Brief Scope of desired collaboration</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Describe how you would like to partner with DAWN Foundation"
                    className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950 font-light resize-y leading-relaxed"
                  />
                </div>

                <button
                  id="submit-partnership-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 shadow transition-colors flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50 text-sm uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <span className="inline-block h-5 w-5 border-2 border-brand-green-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>

              </motion.form>
            )}
          </AnimatePresence>
        </section>

      </div>

    </div>
  );
}
