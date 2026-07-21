import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'causes', label: 'Our Causes' },
    { id: 'team', label: 'Meet The Team' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'partner', label: 'Partner With Us' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-app-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-green-950/95 backdrop-blur-md shadow-lg border-b border-brand-green-800/50 py-3'
          : 'bg-brand-green-950 py-5 border-b border-brand-green-900/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            id="nav-brand-logo"
            className="flex items-center cursor-pointer group relative z-50 py-1"
            onClick={() => handleNavClick('home')}
          >
            {/* Small placeholder container to maintain the normal navbar height layout */}
            <div className="h-12 w-12 sm:h-14 sm:w-14 relative flex items-center justify-center">
              {/* Large logo positioned absolutely inside, allowing beautiful hanging overlap, shifted down and right */}
              <div 
                className="absolute top-[48%] left-[135%] -translate-x-1/2 -translate-y-1/2 h-[144px] w-[144px] sm:h-[168px] sm:w-[168px] transition-all duration-300 group-hover:scale-[1.06] flex items-center justify-center pointer-events-auto cursor-pointer z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavClick('home');
                }}
              >
                <img
                  src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781764238/Dawn_Foundation_Logo_kdtvox.png"
                  alt="DAWN Foundation Logo"
                  className="w-full h-full object-contain filter drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`desktop-nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentTab === item.id
                    ? 'text-brand-gold-500 bg-brand-green-900/60 shadow-sm'
                    : 'text-brand-green-100 hover:text-brand-gold-300 hover:bg-brand-green-900/30'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="desktop-nav-btn-donate"
              onClick={() => handleNavClick('donate')}
              className={`ml-4 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                currentTab === 'donate'
                  ? 'bg-white text-brand-green-900'
                  : 'bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950'
              }`}
            >
              <Heart className="h-4 w-4 fill-current text-current" />
              <span>Donate / Support</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-brand-green-100 hover:text-white hover:bg-brand-green-900/50 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Badass Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="lg:hidden fixed top-0 left-0 w-full h-full bg-brand-green-950/98 backdrop-blur-lg z-40"
            style={{ top: '64px', height: 'calc(100vh - 64px)' }}
          >
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1
                  }
                }
              }}
              className="px-4 pt-4 pb-6 space-y-2 flex flex-col justify-between h-full"
            >
              <div className="space-y-1.5 py-4">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    variants={{
                      hidden: { opacity: 0, x: 40, scale: 0.95 },
                      show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-4 py-3.5 rounded-lg text-lg font-medium transition-all duration-200 cursor-pointer flex justify-between items-center ${
                      currentTab === item.id
                        ? 'text-brand-gold-500 bg-brand-green-900 shadow-inner'
                        : 'text-brand-green-100 hover:text-white hover:bg-brand-green-900/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <motion.span 
                      initial={{ x: -5 }}
                      animate={{ x: 0 }}
                      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.6 }}
                      className="text-xs text-brand-green-300"
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 14, delay: 0.3 } }
                }}
                className="pb-12 px-2"
              >
                <button
                  id="mobile-nav-btn-donate-bottom"
                  onClick={() => handleNavClick('donate')}
                  className="w-full py-4 rounded-xl font-bold bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 flex items-center justify-center space-x-3 text-lg shadow-lg cursor-pointer transition-transform duration-150 active:scale-95"
                >
                  <Heart className="h-5 w-5 fill-current text-current animate-pulse" />
                  <span>Donate / Support</span>
                </button>
                <p className="text-center text-[10px] text-brand-green-400 mt-4 font-mono uppercase tracking-widest">
                  DAWN Foundation • Dignity, Access, Wellness, Nourishment
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
