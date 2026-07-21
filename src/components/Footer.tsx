import React from 'react';
import { Sun, Mail, MapPin, Phone, Instagram, Linkedin, Twitter, Facebook, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  hideGoldLine?: boolean;
}

export default function Footer({ setCurrentTab, hideGoldLine }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social account notes:
  // Brief specifies linking correct Instagram account, with LinkedIn, X, and Facebook routing appropriately as well
  // We'll configure interactive click labels with dynamic tooltips so that donors see they are aligned!
  const socialInstagramUrl = "https://www.instagram.com/dawnfdn_/"; // The correct official Instagram handle reference

  return (
    <footer id="main-app-footer" className="bg-brand-green-950 text-white border-t border-brand-green-800">
      {/* Top Graphic Sun Ray Accent */}
      {!hideGoldLine && (
        <div className="h-1 bg-gradient-to-r from-brand-gold-500 via-brand-gold-200 to-brand-gold-600" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Intro Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <div className="relative overflow-hidden h-[144px] w-[144px] sm:h-[168px] sm:w-[168px] transition-transform group-hover:scale-[1.05] duration-300 flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781764238/Dawn_Foundation_Logo_kdtvox.png"
                  alt="DAWN Foundation Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-brand-green-200 text-sm leading-relaxed">
              Dignifying underserved families in the United States and Nigeria by providing access to Education, Healthcare and Food.
            </p>
            {/* Social Icons */}
            <div className="space-y-2">
              <span className="block text-xs uppercase tracking-wider text-brand-gold-500 font-bold font-mono">Connect With Our Team</span>
              <div className="flex items-center space-x-3">
                <a
                  href={socialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-brand-green-900 hover:bg-brand-gold-500 hover:text-brand-green-950 rounded-full transition-all duration-350 cursor-pointer"
                  title="Follow official Instagram @dawnfdn_"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={socialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-brand-green-900 hover:bg-brand-gold-500 hover:text-brand-green-950 rounded-full transition-all duration-350 cursor-pointer"
                  title="DAWN LinkedIn Connection (redirects to Instagram)"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={socialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-brand-green-900 hover:bg-brand-gold-500 hover:text-brand-green-950 rounded-full transition-all duration-350 cursor-pointer"
                  title="DAWN Twitter/X Connection (redirects to Instagram)"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={socialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-brand-green-900 hover:bg-brand-gold-500 hover:text-brand-green-950 rounded-full transition-all duration-350 cursor-pointer"
                  title="DAWN Facebook Page (redirects to Instagram)"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
              
            </div>
          </div>

          {/* Quick Menu Nav Column */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-brand-gold-500 border-b border-brand-green-900 pb-2">
              Quick Navigations
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-brand-green-100 hover:text-brand-gold-300 transition-colors cursor-pointer block"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-brand-green-100 hover:text-brand-gold-300 transition-colors cursor-pointer block"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('causes')}
                  className="text-brand-green-100 hover:text-brand-gold-300 transition-colors cursor-pointer block"
                >
                  Our Core Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('team')}
                  className="text-brand-green-100 hover:text-brand-gold-300 transition-colors cursor-pointer block"
                >
                  Meet The Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('volunteer')}
                  className="text-brand-green-100 hover:text-brand-gold-300 transition-colors cursor-pointer block"
                >
                  Volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('partner')}
                  className="text-brand-green-100 hover:text-brand-gold-300 transition-colors cursor-pointer block"
                >
                  Sponsorship / Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Causes Link highlight Column */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-brand-gold-500 border-b border-brand-green-900 pb-2">
              Our Core Causes
            </h3>
            <ul className="space-y-3.5 text-xs text-brand-green-100">
              <li className="p-2 hover:bg-brand-green-900/40 rounded transition-colors group cursor-pointer" onClick={() => handleNavClick('causes')}>
                <span className="font-semibold text-white block group-hover:text-brand-gold-300">Education Access</span>
                <span className="text-[11px] text-brand-green-300">Scholarships, kits & rural school infrastructure.</span>
              </li>
              <li className="p-2 hover:bg-brand-green-900/40 rounded transition-colors group cursor-pointer" onClick={() => handleNavClick('causes')}>
                <span className="font-semibold text-white block group-hover:text-brand-gold-300">Healthcare Access</span>
                <span className="text-[11px] text-brand-green-300">Screenings, preventive medical fairs & local partnerships.</span>
              </li>
              <li className="p-2 hover:bg-brand-green-900/40 rounded transition-colors group cursor-pointer" onClick={() => handleNavClick('causes')}>
                <span className="font-semibold text-white block group-hover:text-brand-gold-300">Food Security</span>
                <span className="text-[11px] text-brand-green-300">Community distribution hubs & seasonal nourishment.</span>
              </li>
            </ul>
          </div>

          {/* Core Contacts Column */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-brand-gold-500 border-b border-brand-green-900 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-brand-green-100">
              
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-gold-500 shrink-0" />
                <a href="mailto:info@dawnfdn.org" className="hover:text-brand-gold-300 transition-colors">
                  info@dawnfdn.org
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-gold-500 shrink-0" />
                <span>+1 (800) DAWN-FDN</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-brand-green-900 flex flex-col md:flex-row items-center justify-between text-xs text-brand-green-400">
          <p className="text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} DAWN Foundation. All Rights Reserved. <br />
            Honoring the memory and legacy of HRM Samson Okirhioboh Omene. • <button onClick={() => { window.location.hash = '#admin'; handleNavClick('admin'); }} className="text-[10px] text-brand-green-500 hover:text-brand-gold-500 font-mono transition-colors cursor-pointer inline-block mt-0.5">Staff Portal</button>
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('donate')}
              className="text-brand-gold-500 hover:text-brand-gold-400 group flex items-center space-x-1 decoration-transparent"
            >
              <span>Secure Zeffy Payments</span>
              <ExternalLink className="h-3 w-3 stroke-[3]" />
            </button>
            <span>•</span>
            <span className="text-brand-green-300">US 501(c)(3) & NG NGO Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
