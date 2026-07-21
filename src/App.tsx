import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CausesView from './components/CausesView';
import MeetTheTeamView from './components/MeetTheTeamView';
import VolunteerView from './components/VolunteerView';
import PartnerView from './components/PartnerView';
import GalleryView from './components/GalleryView';
import DonateView from './components/DonateView';
import AdminView from './components/AdminView';
import NewsletterPopup from './components/NewsletterPopup';

function AppContent() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Map react-router-dom pathname to currentTab for style/state bindings in Navbar/Footer
  const getTabFromPathname = (pathname: string) => {
    // Normalise pathname by removing trailing slash if any
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, "");
    if (cleanPath === '' || cleanPath === '/') return 'home';
    if (cleanPath === '/about') return 'about';
    if (cleanPath === '/causes') return 'causes';
    if (cleanPath === '/meet-the-team' || cleanPath === '/team') return 'team';
    if (cleanPath === '/volunteer') return 'volunteer';
    if (cleanPath === '/partner-with-us' || cleanPath === '/partner') return 'partner';
    if (cleanPath === '/gallery') return 'gallery';
    if (cleanPath === '/donate') return 'donate';
    if (cleanPath === '/admin') return 'admin';
    return 'home';
  };

  const currentTab = getTabFromPathname(location.pathname);

  // Smooth top restorer on navigation paths
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [location.pathname]);

  const setCurrentTab = (tabId: string) => {
    if (tabId === 'home') {
      navigate('/');
    } else if (tabId === 'team') {
      navigate('/meet-the-team');
    } else if (tabId === 'partner') {
      navigate('/partner-with-us');
    } else {
      navigate(`/${tabId}`);
    }
  };

  return (
    <div id="dawn-foundation-app" className="flex flex-col min-h-screen bg-brand-beige-50">
      
      {/* Universal Sticky Header Navigation */}
      {!(currentTab === 'admin' && isAdminLoggedIn) && (
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      )}

      {/* Main content viewport with stunning fade layout transitions */}
      <main className={`flex-grow ${currentTab === 'admin' && isAdminLoggedIn ? 'pt-0' : 'pt-16'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            <Routes>
              <Route path="/" element={<HomeView setCurrentTab={setCurrentTab} />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/causes" element={<CausesView setCurrentTab={setCurrentTab} />} />
              <Route path="/meet-the-team" element={<MeetTheTeamView />} />
              <Route path="/team" element={<MeetTheTeamView />} />
              <Route path="/volunteer" element={<VolunteerView />} />
              <Route path="/partner" element={<PartnerView />} />
              <Route path="/partner-with-us" element={<PartnerView />} />
              <Route path="/gallery" element={<GalleryView />} />
              <Route path="/donate" element={<DonateView />} />
              <Route path="/admin" element={<AdminView setCurrentTab={setCurrentTab} onLoginStateChange={setIsAdminLoggedIn} />} />
              {/* Fallback to home */}
              <Route path="*" element={<HomeView setCurrentTab={setCurrentTab} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer setCurrentTab={setCurrentTab} hideGoldLine={currentTab === 'admin' && !isAdminLoggedIn} />
      
      {/* 7-second Events Subscription Newsletter Popup */}
      <NewsletterPopup />
      
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
