import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, User, CheckCircle } from 'lucide-react';
import { submitToFormEndpoint } from '../config';

interface NewsletterPopupProps {
  delayMs?: number;
}

export default function NewsletterPopup({ delayMs = 7000 }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Clear any previous session suppression so the popup reliably appears for the user
    try {
      sessionStorage.removeItem('dawn_has_seen_newsletter_popup');
    } catch (_e) {}

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitToFormEndpoint(
        {
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Phone Number': formData.phone,
          'Email Address': formData.email,
          'Inquiry / Registration Type': 'Keep In Touch & Upcoming Events Pop-up',
          'Submission Source': 'Website Visitor Welcome Pop-up'
        },
        {
          subject: `DAWN Foundation: New Events Keep-in-Touch Registration from ${formData.firstName} ${formData.lastName}`,
          replyTo: formData.email
        }
      );

      setIsSuccess(true);
    } catch (_err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-green-950/75 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-brand-green-100 overflow-hidden relative z-10 p-6 sm:p-8 my-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-brand-green-400 hover:text-brand-green-900 rounded-full hover:bg-brand-green-50 transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Heading */}
                  <div className="space-y-2 pr-6">
                    <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block">Keep in Touch</span>
                    <h3 className="font-serif font-black text-2xl text-brand-green-900 leading-tight">
                      Thank You For Visiting DAWN Foundation
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light">
                      If you'll like to keep in touch with our upcoming events, please fill this form below.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="w-full pl-10 pr-4 py-2.5 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className="w-full pl-10 pr-4 py-2.5 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john.doe@example.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-brand-green-900 uppercase font-mono tracking-wide">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-green-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-2.5 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 focus:bg-white text-brand-green-950"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center disabled:opacity-50 mt-2 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <span>Subscribe for Updates</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="inline-flex p-3 bg-brand-green-500/10 text-brand-green-700 rounded-full">
                    <CheckCircle className="h-10 w-10 text-brand-gold-500" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-brand-green-900">
                    Registration Confirmed!
                  </h3>
                  <p className="text-sm text-brand-green-700 leading-relaxed font-light max-w-sm mx-auto">
                    Thank you! We've successfully saved your updates preference and will keep you informed of all upcoming events of DAWN Foundation.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-brand-green-700 hover:bg-brand-green-800 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer mt-4"
                  >
                    Back to Website
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
