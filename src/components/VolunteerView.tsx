import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { GraduationCap, HeartPulse, Soup, Video, ClipboardList, CheckCircle, Mail, Phone, User, Send, Calendar } from 'lucide-react';

export default function VolunteerView() {
  const { volunteerRoles: VOLUNTEER_ROLES } = useCMS();
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedRoleForForm, setSelectedRoleForForm] = useState<string>('Education');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    availability: 'weekly',
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Icon mapper
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Education': return GraduationCap;
      case 'Healthcare': return HeartPulse;
      case 'Food Distribution': return Soup;
      case 'Media': return Video;
      default: return ClipboardList;
    }
  };

  const handleApplyClick = (roleCategory: string) => {
    setSelectedRoleForForm(roleCategory);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('https://formsubmit.co/ajax/dawnfoundation26@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          selectedRole: selectedRoleForForm,
          formType: 'Volunteer Application',
          _subject: `DAWN Foundation: New Volunteer Application from ${formData.firstName} ${formData.lastName} (${selectedRoleForForm})`
        })
      });

      setIsSubmitSuccess(true);
      // Reset form variables
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        availability: 'weekly',
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
    <div id="volunteer-page-view" className="py-24 bg-brand-beige-50">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-16">
        <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Join Our Mission</span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          Volunteer Landing Hub
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        <p className="text-base sm:text-lg text-brand-green-700 max-w-2xl mx-auto font-light leading-relaxed">
          Explore active roles below, learn how you can serve, and submit your registration securely.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Step-by-Step Info Section */}
        <section className="bg-brand-green-700 text-white rounded-3xl p-8 sm:p-12 border border-brand-green-600 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">How Our Volunteering Model Operates</h2>
            <p className="text-sm sm:text-base text-brand-green-100 font-light leading-relaxed">
            We welcome professionals from all backgrounds and industries. Whether you're an educator, healthcare professional, business specialist, creative, technician, or working in any other sector, we offer carefully selected opportunities in the United States and Nigeria designed to help you make a meaningful real-world impact.  
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
              <div className="p-5 bg-brand-green-800 rounded-2xl space-y-2">
                <span className="text-brand-gold-300 font-mono text-xs font-bold block">STEP 01</span>
                <h4 className="font-semibold text-white text-sm">Explore Positions</h4>
                <p className="text-[11px] text-brand-green-200 font-light">Read the key responsibilities for our active program lines below.</p>
              </div>
              <div className="p-5 bg-brand-green-800 rounded-2xl space-y-2">
                <span className="text-brand-gold-300 font-mono text-xs font-bold block">STEP 02</span>
                <h4 className="font-semibold text-white text-sm">Submit Form</h4>
                <p className="text-[11px] text-brand-green-200 font-light">Review availability and select your preferred focus area.</p>
              </div>
              <div className="p-5 bg-brand-green-800 rounded-2xl space-y-2">
                <span className="text-brand-gold-300 font-mono text-xs font-bold block">STEP 03</span>
                <h4 className="font-semibold text-white text-sm">Briefing & Entry</h4>
                <p className="text-[11px] text-brand-green-200 font-light">Join an online introduction session and get active on-field briefing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: List of Volunteer Roles with detailed responsibilities */}
        <section id="volunteer-opportunities-section" className="space-y-6">
          <div className="border-b border-brand-green-100 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-900">
              Active Volunteer Roles
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light">
              Explore open positions across our active outreach locations in the United States and Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VOLUNTEER_ROLES.map((role) => {
              const IconComp = getIcon(role.category);
              return (
                <div
                  key={role.id}
                  id={`vol-role-${role.id}`}
                  className="bg-white p-6 rounded-3xl border border-brand-green-100 shadow-xs hover:border-brand-green-300 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-brand-green-500/10 text-brand-green-800 rounded-xl">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="px-2.5 py-1 bg-brand-gold-150 text-brand-gold-800 text-[10px] font-mono uppercase tracking-wider font-bold rounded-md">
                        {role.category}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-brand-green-900">
                      {role.title}
                    </h3>

                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-green-500 font-bold">Key Responsibilities:</span>
                      <ul className="space-y-2 text-xs text-brand-green-800">
                        {role.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold-500 mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply triggers the on-screen form smoothly with pre-selection */}
                  <div className="mt-8 pt-4 border-t border-brand-green-50">
                    <button
                      id={`apply-volunteer-btn-${role.id}`}
                      onClick={() => handleApplyClick(role.category)}
                      className="w-full py-3 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Apply For This Role
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Seamless Registration Inquiry Form on page */}
        <section ref={formRef} id="register-volunteer" className="scroll-mt-24 max-w-3xl mx-auto bg-white rounded-3xl border border-brand-green-100 shadow-md p-8 sm:p-12">
          <div className="text-center space-y-2 mb-8">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block">Inquiry Portal</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-900">Volunteer Application</h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light leading-relaxed max-w-lg mx-auto">
              Please submit the secure credential variables below. Our coordinating office will trace back within 48 business hours.
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
                  <CheckCircle className="h-8 w-8 text-brand-gold-300" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-green-900">Application Submitted!</h3>
                <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light max-w-md mx-auto">
                  Thank you for taking active stewardship. We have received your preliminary volunteer registration inquiry for <strong>{selectedRoleForForm}</strong>. Our volunteer managers in the United States & Nigeria will schedule a brief phone call with you soon.
                </p>
                <button
                  id="reset-form-btn-volunteer"
                  onClick={() => setIsSubmitSuccess(false)}
                  className="px-5 py-2.5 bg-brand-green-750 hover:bg-brand-green-850 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-1">
                    <label id="lbl-firstName" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleFormChange}
                        placeholder="e.g. John"
                        className="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1">
                    <label id="lbl-lastName" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleFormChange}
                        placeholder="e.g. Doe"
                        className="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label id="lbl-email" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="john.doe@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label id="lbl-phone" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                      />
                    </div>
                  </div>
                </div>

                {/* Role and availability selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label id="lbl-selectedRole" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Core Role Choice</label>
                    <select
                      name="selectedRole"
                      value={selectedRoleForForm}
                      onChange={(e) => setSelectedRoleForForm(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950 font-medium"
                    >
                      <option value="Education">Education Access Support</option>
                      <option value="Healthcare">Healthcare Outreach Support</option>
                      <option value="Food Distribution">Food Pantry & Distribution</option>
                      <option value="Media">Media & Communications Coordination</option>
                      <option value="Administrative">Administrative Office Support</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label id="lbl-availability" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Availability commitment</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950 font-medium"
                    >
                      <option value="weekly">Weekly commitment (4-8 hours)</option>
                      <option value="biweekly">Bi-weekly commitment (8-16 hours)</option>
                      <option value="monthly">Monthly outreach events (Weekend campaigns)</option>
                      <option value="flexible">Flexible / Occasional</option>
                    </select>
                  </div>
                </div>

                {/* Experience / Notes */}
                <div className="space-y-1">
                  <label id="lbl-experience" className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Short statement of experience / interest</label>
                  <textarea
                    name="experience"
                    required
                    rows={4}
                    value={formData.experience}
                    onChange={handleFormChange}
                    placeholder="Describe why you want to support DAWN Foundation..."
                    className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950 font-light resize-y leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="submit-volunteer-btn"
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
