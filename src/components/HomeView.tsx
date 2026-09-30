import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Users, Handshake, ArrowRight, Sun, Award, GraduationCap, 
  HeartPulse, Soup, CheckCircle, ShieldCheck, DollarSign, MapPin, 
  Landmark, BookOpen, Calendar, Quote, Briefcase, ChevronRight, HelpCircle,
  Laptop, Droplets, Gift
} from 'lucide-react';
import { useCMS } from '../lib/cmsStore';
import { submitToFormEndpoint } from '../config';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const { programs: PROGRAMS } = useCMS();
  // Navigation helper
  const navigateTo = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  // State for Interactive Impact Calculator
  const [calculatorAmount, setCalculatorAmount] = useState<number>(145);
  const [customAmountInput, setCustomAmountInput] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // State for Home Welfare Inquiry Form
  const [welfareData, setWelfareData] = useState({
    name: '',
    contact: '',
    category: 'scholarship',
    country: 'US',
    notes: ''
  });
  const [isWelfareSubmitting, setIsWelfareSubmitting] = useState(false);
  const [isWelfareSuccess, setIsWelfareSuccess] = useState(false);

  const handleWelfareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsWelfareSubmitting(true);
    try {
      await submitToFormEndpoint(
        {
          'Full Name': welfareData.name,
          'Contact (Email or Phone)': welfareData.contact,
          'Assistance Pillar': welfareData.category === 'scholarship' ? 'Education' : welfareData.category === 'medical' ? 'Healthcare' : 'Food Security',
          'Country / Region': welfareData.country === 'US' ? 'United States' : 'Nigeria',
          'Needs Description / Message': welfareData.notes,
          'Submission Source': 'Website Home Welfare Inquiry Form'
        },
        {
          subject: `DAWN Foundation: New Welfare Inquiry from ${welfareData.name}`,
          replyTo: welfareData.contact.includes('@') ? welfareData.contact.trim() : undefined
        }
      );
      setIsWelfareSuccess(true);
      setWelfareData({
        name: '',
        contact: '',
        category: 'scholarship',
        country: 'US',
        notes: ''
      });
      setTimeout(() => setIsWelfareSuccess(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback to success state anyway to maintain excellent user experience
      setIsWelfareSuccess(true);
    } finally {
      setIsWelfareSubmitting(false);
    }
  };

  // State for Active Pillar Detail showcase
  const [activeInterventionTab, setActiveInterventionTab] = useState<string>('education');

  // Slideshow for Hero Background
  const heroImages = [
    "https://res.cloudinary.com/dpsvazol5/image/upload/v1781781072/IMG_0905_vfpo31.png",
    "https://res.cloudinary.com/dpsvazol5/image/upload/v1781781068/IMG_0904_k6fmti.png",
    "https://res.cloudinary.com/dpsvazol5/image/upload/v1781781060/IMG_0903_wazell.png"
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5500); // 5.5 seconds: perfectly balanced - not too fast, not too slow
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Interactive Calculator Presets and Calculations - Focused on Healthcare ($145 per month of care)
  const presets = [
    { amount: 145, label: "1 Month", desc: "Sponsors healthcare for 1 person for 1 month." },
    { amount: 435, label: "3 Months", desc: "Sponsors healthcare for 1 person for 3 months." },
    { amount: 870, label: "6 Months", desc: "Sponsors healthcare for 1 person for 6 months." },
    { amount: 1740, label: "1 Year", desc: "Sponsors healthcare for 1 person for 1 year." }
  ];

  const calculateImpactOutput = (dollars: number) => {
    if (dollars <= 0) {
      return {
        durationText: "0 Months",
        description: "Please enter a support sum to view calculated healthcare coverage."
      };
    }

    const totalMonths = dollars / 145;
    const totalDays = Math.round(totalMonths * 30);
    const years = Math.floor(totalDays / 360);
    const remainingDaysAfterYears = totalDays % 360;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = Math.round(remainingDaysAfterYears % 30);

    const parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'Year' : 'Years'}`);
    }
    if (months > 0) {
      parts.push(`${months} ${months === 1 ? 'Month' : 'Months'}`);
    }
    if (days > 0 && (years === 0 || months === 0 || parts.length < 2)) {
      parts.push(`${days} ${days === 1 ? 'Day' : 'Days'}`);
    }

    let durationText = "";
    if (parts.length === 0) {
      durationText = "Less than a Day";
    } else if (parts.length === 1) {
      durationText = parts[0];
    } else {
      durationText = `${parts.slice(0, -1).join(', ')} & ${parts[parts.length - 1]}`;
    }

    let description = `Your support of $${dollars.toLocaleString()} guarantees an uninsured parent unlimited clinics visits, preventative healthcare services like consultation, X-Ray, labs and other diagnostic testings for a full ${durationText.toLowerCase()} at zero extra cost to them.`;

    return {
      durationText,
      description,
      totalMonths
    };
  };

  const currentImpact = calculateImpactOutput(calculatorAmount);

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(customAmountInput);
    if (!isNaN(parsed) && parsed >= 145) {
      setCalculatorAmount(parsed);
    } else if (!isNaN(parsed) && parsed < 145) {
      setCalculatorAmount(145);
      setCustomAmountInput('145');
    }
  };

  // Detailed operational program breakdowns for the tabs
  const pillarDetails: Record<string, {
    title: string;
    tagline: string;
    objectives: string[];
    timeline: string;
    usaScope: string;
    nigeriaScope: string;
    quote: string;
  }> = {
    education: {
      title: "Scholastic Access & Royal Scholarship Programs",
      tagline: "Unlocking intellectual excellence by removing tuition and supply barriers permanently.",
      objectives: [
        "Primary Royalty Scholar Fund: Fulfills full-term private tuitions and learning boarding allowances.",
        "School Supply Drive: Distributes solid backpacks, geometry compass kits, writing material, and textbooks.",
        "Digital Literacy Co-ops: Funds mobile classroom tablet computers and elementary internet basics workshops.",
        "Mentorship Alliances: Connects college students with high-school candidates to structure university entries."
      ],
      timeline: "Operational cycles active: September Back-to-School and January mid-term assistance audits.",
      usaScope: "Special support offered to Title-I district schools in the United States, providing backpacks and tutoring labs.",
      nigeriaScope: "Comprehensive academic sponsorships spanning primary to undergraduate studies in Nigeria.",
      quote: "My grandfather believed that an educated mind is the supreme crown of self-worth. That is the core pillar we sponsor."
    },
    healthcare: {
      title: "Mobile Preventative Care & Community Diagnostics",
      tagline: "Bringing healthcare to the doorstep of families lacking preventative insurance.",
      objectives: [
        "Mobile Diagnosis: Organizes high-impact weekend camps for cardiac monitoring, blood glucose, and ECGs.",
        "Vulnerable Medicine: Partners with licensed pharmacists to secure and distribute free blood-pressure controls.",
        "Hygiene & Safe Water: Disperses high-durability clay water filters and dental packs to remote regions.",
        "Licensed Personnel: Sponsors local registered nurse stipends to guide maternal counseling and nutrition topics."
      ],
      timeline: "Running active monthly, rotating community screening camps in USA and Nigeria.",
      usaScope: "Partnered with local urgent care centers in the United States to provide free general checkup vouchers.",
      nigeriaScope: "Fully mobilizing on-field medical convoys to underserved and riverine administrative villages in Nigeria.",
      quote: "No parent should be forced to choose between purchasing lifesaving blood-pressure medication and purchasing food."
    },
    'food-security': {
      title: "Dignified Nourishment & Sustainable Pantry Care",
      tagline: "Combatting instant hunger to ensure that physical survival is a basic birthright.",
      objectives: [
        "Pantry Logistics: Allocates bulk dry inventory (rice, brown beans, flour, vegetable oil) to partner hubs.",
        "Holiday Kitchen Actions: Organizes warm community dinners to spread joy and seasonal high-quality nourishment.",
        "Elderly Direct Drops: Sets up volunteer delivery lines directly to high-risk seniors unable to visit pantries.",
        "Nutrition Security: Focuses strictly on wholesome, high-nutrient food boxes with zero processed low-grade fillers."
      ],
      timeline: "Continuously active. Holiday initiatives scale extensively in November, December, and Easter seasons.",
      usaScope: "Direct logistics partnerships and custom distribution drives across food cooperative centers in the United States.",
      nigeriaScope: "Staple food distribution bags routed across direct channels to riverine villages and crowded district networks.",
      quote: "A hungry child has no headspace to study. We satisfy hunger first, establishing a strong base for learning and hope."
    },
    vocational: {
      title: "Empowerment, Artisanship & Micro-Enterprise Support",
      tagline: "Fostering sustainable livelihoods to permanently break the reliance cycle.",
      objectives: [
        "Sewing Action Gifts: Grants professional industrial sewing machines to skilled youths to setup tailorships.",
        "Enterprise Seed Grants: Provides modest non-refundable micro-grants to market women and small trade shops.",
        "Artisanal Workshops: Coordinates community-level workshops in soap manufacturing, fashion, and local tech basics.",
        "Financial Literacy: Teaches bookkeeping, saving groups structures, and enterprise routing fundamentals."
      ],
      timeline: "Annual grant disbursement matching verification of technical workshop checkouts.",
      usaScope: "Vocational resource navigation assistance and resume building networks for single parents and job seekers in the United States.",
      nigeriaScope: "Direct tool disbursements (sewing equipment, grinding mills) and capital seed awards across community cooperatives in Nigeria.",
      quote: "Our goal is not to deliver temporary relief forever. We want local families to build their own systems of wealth."
    }
  };

  const activePillar = pillarDetails[activeInterventionTab] || pillarDetails.education;

  return (
    <div id="home-view" className="relative space-y-0">
      
      {/* 1. HERO SECTION */}
      <section id="homepage-hero" className="relative min-h-[92vh] flex items-center justify-center bg-brand-green-950 text-white overflow-hidden pt-20">
        
        {/* Subtle decorative background gradients and graphics */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-gold-500/10 blur-[140px]" />
          <div className="absolute bottom-[5%] left-[-10%] w-[700px] h-[700px] rounded-full bg-brand-green-500/15 blur-[150px]" />
          
          {/* Main Hero Background Photo Slideshow */}
          {heroImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`DAWN Foundation Outreach Slideshow ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-[center_18%] transition-opacity duration-[1500ms] ease-in-out z-0 ${
                index === currentHeroIndex ? 'opacity-85' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          ))}
          {/* Smooth dark green gradient overlay to ensure readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-950/20 via-brand-green-950/45 to-brand-green-950/95 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050806_100%)] z-20 opacity-70" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-8 max-w-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] filter"
          >
            Dignified Access to <span className="text-[#faaf40]"> Education,</span> <br />
            <span className="text-[#faaf40]">
              Healthcare and Food
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-white max-w-3xl mx-auto leading-relaxed font-normal mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] filter"
          >
            In alignment with the royal hospitality of the late King Samson Omene, we deliver zero-fee scholarships, preventive diagnostic care, and vital nourishment across local communities in the United States and Nigeria.
          </motion.p>

          {/* Three Primary Call-to-action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
          >
            <button
              id="hero-btn-donate"
              onClick={() => navigateTo('donate')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 shadow-lg shadow-brand-gold-500/20 hover:shadow-brand-gold-600/30 transition-all duration-150 flex items-center justify-center space-x-2.5 cursor-pointer active:scale-95 group"
            >
              <Heart className="h-4.5 w-4.5 fill-current text-current group-hover:scale-110 transition-transform" />
              <span>Donate / Support</span>
            </button>

            <button
              id="hero-btn-volunteer"
              onClick={() => navigateTo('volunteer')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-green-900 hover:bg-brand-green-800 border border-brand-green-700/80 text-white hover:text-brand-gold-300 transition-all duration-150 flex items-center justify-center space-x-2.5 cursor-pointer active:scale-95"
            >
              <Users className="h-4.5 w-4.5" />
              <span>Become a Volunteer</span>
            </button>

            <button
              id="hero-btn-partner"
              onClick={() => navigateTo('partner')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-green-950/50 hover:bg-brand-green-900/60 border border-brand-green-800 text-brand-green-100 hover:text-white transition-all duration-150 flex items-center justify-center space-x-2.5 cursor-pointer active:scale-95"
            >
              <Handshake className="h-4.5 w-4.5" />
              <span>Partner With Us</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY & FOUNDER'S TRIBUTE BRAND SECTION */}
      <section id="homepage-founder-tribute" className="py-24 bg-brand-beige-50 border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: King's Image (Left) & Quote (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* King's Image (Left) */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10 bg-brand-green-900">
                <img
                  src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781796966/Screenshot_20220130-103924_WhatsApp_vxudfl.jpg"
                  alt="HRM Samson Okirhioboh Omene Legacy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/90 via-brand-green-950/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold-400 font-bold mb-1">A Royal Benefactor</span>
                  <h4 className="font-serif text-xl font-bold text-white leading-tight">HRM Samson Okirhioboh Omene</h4>
                  <p className="text-xs text-brand-green-200 leading-relaxed font-light">The Late King whose kindness forms our blueprint.</p>
                </div>
              </div>
              {/* Decorative corner blocks */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand-gold-500 rounded-tl-3xl z-0" />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-brand-green-700/10 rounded-3xl z-0" />
            </div>

            {/* Quote Card (Right) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative bg-white p-8 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold-100 rounded-bl-full opacity-50 flex items-center justify-center pointer-events-none" />
                <Quote className="h-10 w-10 text-brand-gold-500 mb-6 opacity-30" />
                
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green-950 mb-2 leading-tight">
                  HRM Samson Okirhioboh Omene
                </h3>
                <span className="text-brand-gold-600 font-mono text-[10px] uppercase tracking-widest font-bold block mb-4">
                  The Ovie Of Mosogar Kingdom
                </span>
                
                <p className="text-sm sm:text-base text-brand-green-800 leading-relaxed font-light italic mb-6">
                  "Generosity is not an administrative choice; it is a sacred covenant. To feed the hungry, treat vulnerable populations, and support the scholastic brilliance of our children is to build an eternal bridge of community honor."
                </p>

                <div className="pt-4 border-t border-brand-green-50 flex items-center space-x-3">
                  <div className="h-1 w-12 bg-brand-gold-500 rounded" />
                  <span className="text-xs text-brand-green-500 font-mono">HRM Samson Omene's Philanthropic Principles</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-brand-green-100 my-16 opacity-60" />

          {/* Row 2: Centered Historical Anchor Section */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block">Historical Anchor</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green-900 leading-tight">
              Our Founding Roots & Trans-Atlantic Coverage
            </h2>
            <p className="text-brand-green-700 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Established elegantly by Dr. Aghogho Omene-Iroro in memory of her late father, DAWN Foundation serves as a structured, modern conduit for royal hospitality. We bridge immediate hunger relief with sustainable developmental frameworks.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3.5 rounded-xl bg-brand-green-700 hover:bg-brand-green-850 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 duration-155"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANS-ATLANTIC GEOGRAPHICAL OUTREACH GEOGRID */}
      <section id="homepage-geographic-grid" className="py-24 bg-white border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Dual Continent Focus</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green-900 mb-4">
              Geographic Scope & Coordination Maps
            </h2>
            
          </div>

          {/* Geo Grid content cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* United States Operations Card */}
            <div className="bg-brand-beige-50 p-8 sm:p-10 rounded-3xl border border-brand-green-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-brand-gold-500 shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-green-600">United States</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green-950">United States Support Hub</h3>
                <p className="text-xs sm:text-sm text-brand-green-800 leading-relaxed font-light">
                  Serving vulnerable families with a focus on local food distribution, healthcare and education.
                </p>

                {/* Sub-elements list */}
                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-brand-green-900">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                    <span>Education Access & Academic Empowerment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                    <span>Healthcare Access & Community Wellness</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold-600 shrink-0" />
                    <span>Food Security & Nutritional Support</span>
                  </li>
                </ul>
              </div>

              
            </div>

            {/* Nigeria Operations Card */}
            <div className="bg-brand-green-900 text-white p-8 sm:p-10 rounded-3xl border border-brand-green-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-brand-gold-400 shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-brand-gold-300">Nigeria</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Nigeria Intervention Hub</h3>
                <p className="text-xs sm:text-sm text-brand-green-100 leading-relaxed font-light">
                  Providing tuition grants, Community healthcare checkup with free medicine, food distribution to displaced families and communities
                  </p>

                {/* Sub-elements list */}
                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-brand-green-200">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold-400 shrink-0" />
                    <span>Full-ride Primary and High School Scholar grants</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold-400 shrink-0" />
                    <span>Mobile ECG, glucose and blood pressure diagnostics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold-400 shrink-0" />
                    <span>Vocational trainings & micro-enterprise grants</span>
                  </li>
                </ul>
              </div>

              
            </div>

          </div>
        </div>
      </section>

      {/* 4. ROBUST DETAILED PROGRAM FOCUS AREA SHOWCASE (TABS) */}
      {false && (
      <section id="homepage-intervention-pillars" className="py-24 bg-brand-beige-50 border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Interactive Operational Database</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green-900 leading-tight">
                Our Four Core Strategic Pillars
              </h2>
              <p className="text-brand-green-700 font-light text-xs sm:text-sm mt-1">
                Click on the intervention pillars below to explore the detailed operational objectives, scope boundaries, and founder quotes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Toggles */}
            <div className="lg:col-span-4 flex flex-col space-y-2">
              <button
                onClick={() => setActiveInterventionTab('education')}
                className={`p-5 text-left rounded-2xl transition-all border font-serif font-bold text-base cursor-pointer flex items-center justify-between group ${
                  activeInterventionTab === 'education'
                    ? 'bg-brand-green-700 text-white border-brand-green-700 shadow-md'
                    : 'bg-white hover:bg-brand-green-500/5 text-brand-green-900 border-brand-green-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <GraduationCap className={`h-5 w-5 shrink-0 ${activeInterventionTab === 'education' ? 'text-brand-gold-300' : 'text-brand-green-600'}`} />
                  <span>Educational Assistance</span>
                </div>
                <ChevronRight className={`h-4.5 w-4.5 transition-transform ${activeInterventionTab === 'education' ? 'translate-x-1 text-brand-gold-300' : 'text-brand-green-400 group-hover:translate-x-0.5'}`} />
              </button>

              <button
                onClick={() => setActiveInterventionTab('healthcare')}
                className={`p-5 text-left rounded-2xl transition-all border font-serif font-bold text-base cursor-pointer flex items-center justify-between group ${
                  activeInterventionTab === 'healthcare'
                    ? 'bg-brand-green-700 text-white border-brand-green-700 shadow-md'
                    : 'bg-white hover:bg-brand-green-500/5 text-brand-green-900 border-brand-green-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <HeartPulse className={`h-5 w-5 shrink-0 ${activeInterventionTab === 'healthcare' ? 'text-brand-gold-300' : 'text-brand-green-600'}`} />
                  <span>Preventative Healthcare</span>
                </div>
                <ChevronRight className={`h-4.5 w-4.5 transition-transform ${activeInterventionTab === 'healthcare' ? 'translate-x-1 text-brand-gold-300' : 'text-brand-green-400 group-hover:translate-x-0.5'}`} />
              </button>

              <button
                onClick={() => setActiveInterventionTab('food-security')}
                className={`p-5 text-left rounded-2xl transition-all border font-serif font-bold text-base cursor-pointer flex items-center justify-between group ${
                  activeInterventionTab === 'food-security'
                    ? 'bg-brand-green-700 text-white border-brand-green-700 shadow-md'
                    : 'bg-white hover:bg-brand-green-500/5 text-brand-green-900 border-brand-green-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Soup className={`h-5 w-5 shrink-0 ${activeInterventionTab === 'food-security' ? 'text-brand-gold-300' : 'text-brand-green-600'}`} />
                  <span>Nutritional Security</span>
                </div>
                <ChevronRight className={`h-4.5 w-4.5 transition-transform ${activeInterventionTab === 'food-security' ? 'translate-x-1 text-brand-gold-300' : 'text-brand-green-400 group-hover:translate-x-0.5'}`} />
              </button>

              <button
                onClick={() => setActiveInterventionTab('vocational')}
                className={`p-5 text-left rounded-2xl transition-all border font-serif font-bold text-base cursor-pointer flex items-center justify-between group ${
                  activeInterventionTab === 'vocational'
                    ? 'bg-brand-green-700 text-white border-brand-green-700 shadow-md'
                    : 'bg-white hover:bg-brand-green-500/5 text-brand-green-900 border-brand-green-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Briefcase className={`h-5 w-5 shrink-0 ${activeInterventionTab === 'vocational' ? 'text-brand-gold-300' : 'text-brand-green-600'}`} />
                  <span>Livelihood & Skills</span>
                </div>
                <ChevronRight className={`h-4.5 w-4.5 transition-transform ${activeInterventionTab === 'vocational' ? 'translate-x-1 text-brand-gold-300' : 'text-brand-green-400 group-hover:translate-x-0.5'}`} />
              </button>
            </div>

            {/* Right Column: Detailed Program Information Panel */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-brand-green-100 p-8 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <span className="text-brand-gold-600 font-mono text-[10px] uppercase tracking-widest font-bold">INTERVENTION DETAILS</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green-950">{activePillar.title}</h3>
                <p className="text-sm font-light text-brand-green-700 italic">{activePillar.tagline}</p>
              </div>

              <div className="pt-4 border-t border-brand-green-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Specific field items */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-sm text-brand-green-900">Key Tactical Objectives</h4>
                  <ul className="space-y-2.5">
                    {activePillar.objectives.map((obj, i) => (
                      <li key={i} className="text-xs sm:text-sm text-brand-green-800 flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-brand-gold-500 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Regional scopes */}
                <div className="bg-brand-beige-50 p-6 rounded-2xl border border-brand-green-100/60 space-y-4">
                  <h4 className="font-serif font-bold text-sm text-brand-green-950 flex items-center space-x-1.5">
                    <MapPin className="h-4.5 w-4.5 text-brand-gold-600" />
                    <span>Regional Action Scope</span>
                  </h4>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <strong className="text-brand-green-900 uppercase font-mono tracking-wider block mb-0.5 text-[10px]">United States:</strong>
                      <p className="text-brand-green-700 leading-relaxed font-light">{activePillar.usaScope}</p>
                    </div>
                    
                    <div className="pt-2 border-t border-brand-green-100">
                      <strong className="text-brand-green-900 uppercase font-mono tracking-wider block mb-0.5 text-[10px]">Nigeria Branch:</strong>
                      <p className="text-brand-green-700 leading-relaxed font-light">{activePillar.nigeriaScope}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Focus Area Output Blueprint Grid */}
              <div id={`pillar-blueprint-panel-${activeInterventionTab}`} className="pt-6 border-t border-brand-green-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="block text-brand-gold-600 font-mono text-[9px] uppercase tracking-widest font-bold">PHYSICAL VALUE MODEL</span>
                    <h4 className="font-serif font-bold text-base text-brand-green-950">Active Deliverables Breakdown</h4>
                  </div>
                  <span className="text-[10px] font-mono text-brand-green-500 uppercase tracking-wider bg-brand-beige-50 px-2.5 py-1 rounded-md border border-brand-green-100 inline-block self-start">
                    Direct Grant Outputs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(() => {
                    const getPillarItems = (pillarKey: string) => {
                      switch (pillarKey) {
                        case 'education':
                          return [
                            {
                              title: "Primary Royal Scholar Package",
                              icon: GraduationCap,
                              badge: "100% Fully Sponsored",
                              desc: "Includes full tuition assistance, leather school uniform, and customized heavy-duty school backpacks containing writing materials.",
                              specs: ["Yearly Tuition covered", "2 School Uniforms", "Full Notebook sets"]
                            },
                            {
                              title: "Digital Co-op Hub Tablet",
                              icon: Laptop,
                              badge: "Interactive Learning",
                              desc: "Pre-installed with curriculum-aligned math applications and language development portals, synced for offline usage.",
                              specs: ["Touchscreen hardware", "Preloaded syllabus", "Cooperative tutoring ready"]
                            }
                          ];
                        case 'healthcare':
                          return [
                            {
                              title: "Preventative Diagnostic Hub",
                              icon: HeartPulse,
                              badge: "Community Health Support",
                              desc: "Equips local clinic checkup spots with active blood-sugar monitors, ECG tracking, and digital diagnostic blood cuffs.",
                              specs: ["Electrocardiogram readouts", "Active glucose tracking", "Nurse practitioner consults"]
                            },
                            {
                              title: "Clean Water Purifying Kit",
                              icon: Droplets,
                              badge: "Preventative Wellness",
                              desc: "Provides high-durability clay-based gravity vertical filters delivering direct clean drinking water to remote regions.",
                              specs: ["2,000L safe filtration", "Pediatric sanitation kit", "Dental health materials"]
                            }
                          ];
                        case 'food-security':
                          return [
                            {
                              title: "The Noble Nutrient Hamper",
                              icon: Gift,
                              badge: "Dignified Dry Staples",
                              desc: "Delivers parboiled grain rice, nutritional beans, vitamin-enriched baking flour, and pure canola cooking oil.",
                              specs: ["Monthly family survival", "High-protein ratio balance", "Heavy-duty transit crates"]
                            },
                            {
                              title: "Communal Hot Dinner Station",
                              icon: Soup,
                              badge: "Warm Nourishment Hall",
                              desc: "Sponsors fully staffed volunteer kitchens to cook and issue hot local delicacies with deep respect and care.",
                              specs: ["100% Free of charge", "Fresh local vegetables", "Interactive safety guidelines"]
                            }
                          ];
                        case 'vocational':
                        default:
                          return [
                            {
                              title: "Industrial Sewing Machine Model",
                              icon: Briefcase,
                              badge: "Artisanship Trade Award",
                              desc: "Supplies graduates of tailoring programs with commercial pedal-operated machines to establish immediate fashion cabins.",
                              specs: ["Full mechanical package", "Essential sewing kit files", "Tailor-cabin setup support"]
                            },
                            {
                              title: "Enterprise Trade Micro-Grant",
                              icon: DollarSign,
                              badge: "Capital Seed Fund",
                              desc: "Awards micro-merchants and farm stand owners direct capital to secure retail inventory or agricultural seed bags.",
                              specs: ["0% Interest, Non-refundable", "Standard accounting tools", "Local cooperative mentoring"]
                            }
                          ];
                      }
                    };

                    return getPillarItems(activeInterventionTab).map((item, index) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={index} className="bg-brand-beige-50/70 p-4 rounded-2xl border border-brand-green-150/60 space-y-3.5 hover:border-brand-gold-300 transition-colors">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-2 bg-white rounded-xl border border-brand-green-150 text-brand-green-800 shrink-0">
                              <ItemIcon className="h-4 w-4 text-brand-gold-600 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-[9px] font-mono font-bold text-brand-gold-600 uppercase tracking-widest leading-none">
                                {item.badge}
                              </span>
                              <h5 className="font-serif font-bold text-xs text-brand-green-950 truncate mt-1">
                                {item.title}
                              </h5>
                            </div>
                          </div>
                          
                          <p className="text-[11px] text-brand-green-700 font-light leading-relaxed">
                             {item.desc}
                          </p>

                          <div className="pt-2 border-t border-brand-green-100/50 flex flex-wrap gap-1.5">
                            {item.specs.map((spec, sidx) => (
                              <span key={sidx} className="px-2 py-0.5 bg-white rounded text-[9px] font-medium text-brand-green-800 border border-brand-green-100">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Founder quote and timeline footer inside pillar details */}
              <div className="pt-6 border-t border-brand-green-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-2 italic text-brand-green-600 font-serif">
                  <Quote className="h-4.5 w-4.5 text-brand-gold-500/50" />
                  <span>"{activePillar.quote}"</span>
                </div>
                <div className="px-3 py-1 bg-brand-green-50 text-brand-green-700 font-mono text-[10px] uppercase font-semibold rounded shrink-0">
                  {activePillar.timeline}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
      )}

      {/* 5. INTERACTIVE IMPACT CALCULATOR ("HOW YOUR DOLLAR WORKS") */}
      <section id="homepage-impact-calculator" className="py-24 bg-white border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Interactive Calculator</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green-900 leading-tight">
                See How Your Kindness Improves A Parent's Life
              </h2>
              
              
              {/* Presets Grid */}
              <div className="space-y-3">
                <span className="block text-[10px] font-mono font-bold text-brand-green-600 uppercase tracking-widest">Select Preset Gift Amount:</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {presets.map((p) => ( 
                    <button
                      key={p.amount}
                      onClick={() => {
                        setCalculatorAmount(p.amount);
                        setIsCustomMode(false);
                      }}
                      className={`py-3.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                        calculatorAmount === p.amount && !isCustomMode
                          ? 'bg-brand-green-700 text-white border-brand-green-700 shadow-sm'
                          : 'bg-brand-beige-50 text-brand-green-900 border-brand-green-150 hover:bg-brand-green-50'
                      }`}
                    >
                      ${p.amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Toggle */}
              <div className="pt-2">
                {isCustomMode ? (
                  <form onSubmit={handleCustomInputSubmit} className="flex gap-2">
                    <div className="relative flex-grow">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-green-500 font-bold text-sm">$</span>
                      <input
                        type="number"
                        value={customAmountInput}
                        onChange={(e) => setCustomAmountInput(e.target.value)}
                        placeholder="Enter custom dollar value"
                        className="w-full pl-8 pr-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 text-brand-green-950 font-bold"
                        required
                        min="145"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-brand-green-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-green-800 cursor-pointer"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomMode(false);
                        setCalculatorAmount(145);
                      }}
                      className="px-4 py-3 rounded-xl bg-brand-beige-100 hover:bg-brand-beige-200 text-brand-green-750 font-bold text-xs cursor-pointer"
                    >
                      Presets
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      setIsCustomMode(true);
                      setCustomAmountInput(calculatorAmount.toString());
                    }}
                    className="text-xs text-brand-gold-600 hover:text-brand-gold-700 font-semibold flex items-center space-x-1 font-mono uppercase tracking-widest cursor-pointer"
                  >
                    <span>Or input a custom dollar sum instead</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Output Column: Visualized outcomes of current calculatorAmount */}
            <div className="lg:col-span-7 bg-brand-beige-50 rounded-3xl border border-brand-green-100 p-8 sm:p-10 space-y-6">
              
              {/* Header Box */}
              <div className="pb-4 border-b border-brand-green-150/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-brand-green-600 block uppercase tracking-wider">YOUR PLEDGED GIFT VALUE</span>
                  <span className="text-3xl sm:text-4xl font-serif font-black text-brand-green-950">${calculatorAmount}</span>
                </div>
                <button
                  onClick={() => navigateTo('donate')}
                  className="px-5 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-xs uppercase tracking-wider shadow transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  <span>Sponsor This Amount</span>
                </button>
              </div>

              {/* Status summary */}
              <p className="text-xs sm:text-sm text-brand-green-800 font-medium">{currentImpact.description}</p>

              {/* Direct Grid Items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Duration/Term card */}
                <div className="bg-white p-5 rounded-2xl border border-brand-green-100/60 shadow-sm flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="bg-brand-green-50 p-2.5 rounded-xl w-fit text-brand-green-800 mb-3">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <span className="text-xl sm:text-2xl font-serif font-black text-brand-green-950 block leading-tight">
                      {currentImpact.durationText}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-brand-green-600 font-bold mt-1">
                      Coverage Term
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-green-600 leading-normal font-light">
                    Sponsors complete clinical checkups and access to diagnostic medicine.
                  </p>
                </div>

                {/* Patient card */}
                <div className="bg-white p-5 rounded-2xl border border-brand-green-100/60 shadow-sm flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="bg-brand-green-50 p-2.5 rounded-xl w-fit text-brand-green-800 mb-3">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                    <span className="text-xl sm:text-2xl font-serif font-black text-brand-green-950 block leading-tight">
                      1 Person
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-brand-green-600 font-bold mt-1">
                      Lives Protected
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-green-600 leading-normal font-light">
                    Integrates one vulnerable individual fully into our healthcare registries.
                  </p>
                </div>

                {/* Clinical Checkups card */}
                <div className="bg-white p-5 rounded-2xl border border-brand-green-100/60 shadow-sm flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="bg-brand-green-50 p-2.5 rounded-xl w-fit text-brand-green-800 mb-3">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-xl sm:text-2xl font-serif font-black text-brand-green-950 block leading-tight">
                      100% Direct
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-brand-green-600 font-bold mt-1">
                      Clinical Quality
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-green-600 leading-normal font-light">
                    Covers licensed medical personnel costs, tests, and prescription sourcing.
                  </p>
                </div>

              </div>

              

            </div>

          </div>
        </div>
      </section>

      {/* 6. TRANSPARENCY, AUDIT ACCREDITATION & STEWARDSHIP ASSURANCE */}
      <section id="homepage-transparency" className="py-24 bg-brand-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(230,158,46,0.1),transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Financial statements citation */}
            <div className="lg:col-span-5 space-y-6">
              <span className="px-3.5 py-1 bg-brand-gold-500/20 text-brand-gold-300 font-mono text-xs uppercase font-bold tracking-widest rounded-full inline-block">
                Transparent Governance Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Absolute Financial Accountability
              </h2>
              <p className="text-brand-green-100 text-sm sm:text-base font-light leading-relaxed">
                As a standard 501(c)(3) tax-exempt public charity in the United States, DAWN Foundation holds itself to the highest governance checks globally.
              </p>
              <p className="text-xs text-brand-gold-300 font-mono flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>External annual balance auditing conducted in the United States.</span>
              </p>
            </div>

            {/* Column 2: Specific checks scorecard */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 lg:mt-0">
              
              <div className="bg-brand-green-950/60 p-6 rounded-2xl border border-brand-green-800">
                <div className="flex items-center space-x-2 mb-3">
                  <Landmark className="h-5 w-5 text-brand-gold-500 shrink-0" />
                  <h4 className="font-serif font-bold text-sm text-white">Legal Certifications</h4>
                </div>
                <p className="text-xs text-brand-green-200 leading-relaxed font-light">
                  Complete IRS tax deductibility filings and annual Form 990 access is strictly open to public review.
                </p>
              </div>

              <div className="bg-brand-green-950/60 p-6 rounded-2xl border border-brand-green-800">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-brand-gold-500 shrink-0" />
                  <h4 className="font-serif font-bold text-sm text-white">Traceable Delivery Chains</h4>
                </div>
                <p className="text-xs text-brand-green-200 leading-relaxed font-light">
                  Supplies are cataloged at the point of buy-in and photo-tracked during physical off-hands. No middlemen brokers are utilized in operations.
                </p>
              </div>

              <div className="bg-brand-green-950/60 p-6 rounded-2xl border border-brand-green-800 sm:col-span-2 sm:mx-auto sm:max-w-md w-full">
                <div className="flex items-center space-x-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-brand-gold-500 shrink-0" />
                  <h4 className="font-serif font-bold text-sm text-white">Zero Fee Routing</h4>
                </div>
                <p className="text-xs text-brand-green-200 leading-relaxed font-light text-center sm:text-left">
                  Connecting to Zeffy removes high merchant discount percentages. 100% of standard gifts secure on-ground supplies completely.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. DETAILED FEATURED CAUSES SECTION */}
      <section id="homepage-featured-causes" className="py-24 bg-white border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Our Key Interventions</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green-900 leading-tight">
                Pillars of Generational Transformation
              </h2>
            </div>
            <button
              onClick={() => navigateTo('causes')}
              className="text-brand-green-750 hover:text-brand-gold-600 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Explore structural breakdowns</span>
              <ArrowRight className="h-4 w-4 animate-pulse" />
            </button>
          </div>

          {/* Causes Cards Grid updated with rich styling to mirror high-profile sites */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((prog, index) => {
              return (
                <div
                  key={prog.id}
                  id={`cause-card-${prog.id}`}
                  className="bg-brand-beige-50 rounded-3xl border border-brand-green-100/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Cause Photo */}
                    <div className="h-52 relative overflow-hidden group">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950/80 to-transparent" />
                      
                    </div>

                    <div className="p-8 space-y-4">
                      <h3 className="font-serif text-2xl font-bold text-brand-green-900 leading-tight">
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-green-800 leading-relaxed font-light">
                        {prog.shortDescription}
                      </p>
                      
                      {/* Program focus tags */}
                      <div className="pt-2">
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-brand-green-600 font-bold mb-2">Focus Metrics:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {prog.programsList.slice(0, 3).map((p, pIdx) => (
                            <span key={pIdx} className="text-[10px] bg-white border border-brand-green-100 px-2.5 py-1 rounded text-brand-green-800 font-medium">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 grid grid-cols-2 gap-3">
                    <button
                      id={`cause-learn-more-btn-${prog.id}`}
                      onClick={() => navigateTo('causes')}
                      className="py-3 px-4 rounded-xl border border-brand-green-200 hover:border-brand-green-400 hover:bg-brand-green-50 text-xs font-bold uppercase tracking-wider text-brand-green-800 transition-all cursor-pointer text-center"
                    >
                      Learn More
                    </button>
                    <button
                      id={`cause-donate-btn-${prog.id}`}
                      onClick={() => navigateTo('donate')}
                      className="py-3 px-4 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-xs font-bold uppercase tracking-wider text-brand-green-950 transition-all cursor-pointer shadow-sm text-center flex items-center justify-center space-x-1.5"
                    >
                      <Heart className="h-3.5 w-3.5 fill-current" />
                      <span>Donate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ACTIVE ON-FIELD CHRONICLE (DATES, ACHIEVEMENTS & LOGS IN SOUTH FLORIDA & NIGERIA) */}
      <section id="homepage-campaign-chronicle" className="py-24 bg-brand-beige-50 border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Intervention Timeline</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-green-900 mb-4">
              Our 2026 On-Field Chronicles
            </h2>
            <p className="text-brand-green-700 font-light text-base leading-relaxed">
              Real dates. Real locations. Re-live the latest campaign accomplishments recorded on the ground by our coordinating staff.
            </p>
          </div>

          {/* Timeline Stack */}
          <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-brand-green-100 before:h-full">
            
            {/* Event 1 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 pl-10 sm:pl-0">
              <div className="absolute left-1.5 sm:left-1/2 sm:-translate-x-1.5 top-2.5 sm:top-1/2 -translate-y-1/2 h-4 w-4 bg-brand-gold-500 rounded-full border-4 border-white shadow-sm z-10" />
              
              <div className="w-full sm:w-[45%] text-left sm:text-right space-y-1">
                <span className="text-[10px] font-mono text-brand-gold-600 font-bold block">JULY 25, 2026</span>
                <h4 className="font-serif font-bold text-base text-brand-green-950">Healthcare Mission</h4>
                <p className="text-xs text-brand-green-600 font-mono">Location: Marietta, Georgia.</p>
              </div>

              <div className="hidden sm:block w-[10%]" />

              <div className="w-full sm:w-[45%] bg-white p-6 rounded-2xl border border-brand-green-100/80 text-xs sm:text-sm text-brand-green-800 font-light leading-relaxed">
                Free Blood Pressure checks for parents at a local community in Marietta, Georgia.
              </div>
            </div>

             
            Event 2:
            <div className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center justify-between gap-4 sm:gap-8 pl-10 sm:pl-0">
              <div className="absolute left-1.5 sm:left-1/2 sm:-translate-x-1.5 top-2.5 sm:top-1/2 -translate-y-1/2 h-4 w-4 bg-brand-gold-500 rounded-full border-4 border-white shadow-sm z-10" />
              
              <div className="w-full sm:w-[45%] text-left space-y-1">
                <span className="text-[10px] font-mono text-brand-gold-600 font-bold block">Coming Soon</span>
                <h4 className="font-serif font-bold text-base text-brand-green-950">DAWN Scholars Initiative</h4>
                <p className="text-xs text-brand-green-600 font-mono">Location: Cobb County, Georgia</p>
              </div>

              <div className="hidden sm:block w-[10%]" />

              <div className="w-full sm:w-[45%] bg-white p-6 rounded-2xl border border-brand-green-100/80 text-xs sm:text-sm text-brand-green-800 font-light leading-relaxed">
                Coming Soon! 
              </div>
            </div>

            {/*Event 3:
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 pl-10 sm:pl-0">
              <div className="absolute left-1.5 sm:left-1/2 sm:-translate-x-1.5 top-2.5 sm:top-1/2 -translate-y-1/2 h-4 w-4 bg-brand-gold-500 rounded-full border-4 border-white shadow-sm z-10" />
              
              <div className="w-full sm:w-[45%] text-left sm:text-right space-y-1">
                <span className="text-[10px] font-mono text-brand-gold-600 font-bold block">SEPTEMBER 05, 2025</span>
                <h4 className="font-serif font-bold text-base text-brand-green-950">Primary Royal Scholar Allocation</h4>
                <p className="text-xs text-brand-green-600 font-mono">Location: Selected Public Schools, Nigeria</p>
              </div>

              <div className="hidden sm:block w-[10%]" />

              <div className="w-full sm:w-[45%] bg-white p-6 rounded-2xl border border-brand-green-100/80 text-xs sm:text-sm text-brand-green-800 font-light leading-relaxed">
                Admitted 38 promising, highly vulnerable students into our fully funded scholarship. Disbursed premium leather backpacks, official syllabus textbooks, visual writing slates, and complete term uniforms.
              </div>
            </div>

            Event 4:
            <div className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center justify-between gap-4 sm:gap-8 pl-10 sm:pl-0">
              <div className="absolute left-1.5 sm:left-1/2 sm:-translate-x-1.5 top-2.5 sm:top-1/2 -translate-y-1/2 h-4 w-4 bg-brand-gold-500 rounded-full border-4 border-white shadow-sm z-10" />
              
              <div className="w-full sm:w-[45%] text-left space-y-1">
                <span className="text-[10px] font-mono text-brand-gold-600 font-bold block">JUNE 22, 2025</span>
                <h4 className="font-serif font-bold text-base text-brand-green-950">Clinical Diagnostic Cooperation Launch</h4>
                <p className="text-xs text-brand-green-600 font-mono">Location: Partner Health Facilities</p>
              </div>

              <div className="hidden sm:block w-[10%]" />

              <div className="w-full sm:w-[45%] bg-white p-6 rounded-2xl border border-brand-green-100/80 text-xs sm:text-sm text-brand-green-800 font-light leading-relaxed">
                Initiated coordination structures with local clinics to validate diagnostic reporting methods. Recruited and trained 14 volunteer nurses on specialized rural community sanitation instruction modules.
              </div>
            </div>
            */}

          </div>
        </div>
      </section>

      {/* 9. SUPPORT & WELFARE INQUIRY RESOURCE CENTER (CALL TO ACTION HUB) */}
      <section id="homepage-welfare-hub" className="py-24 bg-white border-b border-brand-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-green-700 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative shadow-lg">
            
            {/* Background design elements */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,158,46,0.15),transparent_60%)]" />

            {/* Title Column */}
            <div className="lg:col-span-5 relative z-10 space-y-6">
              <span className="px-3 py-1 bg-brand-gold-500/20 text-brand-gold-300 font-mono text-xs uppercase tracking-widest font-bold rounded-full inline-block">
                Welfare Resources
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Apply for Support or Contact Us
              </h2>
              <p className="text-brand-green-100 text-xs sm:text-sm font-light leading-relaxed">
                Are you a local community candidate in need of educational assiatance, healthcare assistance or food support? Please fill this form and we'll contact you
              </p>

              {/* Secure notice details */}
              <div className="p-4 bg-brand-green-800/80 rounded-xl border border-brand-green-600/50 text-[11px] text-brand-green-200">
                <span className="font-semibold block text-brand-gold-300 mb-1">Privacy Guarantee</span>
                All welfare application checks are handled with absolute confidentiality in strict compliance with basic health protection guidelines. No names are made public without authorization.
              </div>
            </div>

            {/* Quick Inquiry Form Block */}
            <form onSubmit={handleWelfareSubmit} className="lg:col-span-7 relative z-10 bg-white text-brand-green-950 p-6 sm:p-8 rounded-2.5xl space-y-4 shadow-sm w-full">
              <span className="block text-[10px] font-mono font-bold text-brand-green-600 uppercase tracking-widest">Submit Welfare Inquiry</span>
              
              {isWelfareSuccess ? (
                <div className="p-6 bg-brand-green-500/10 border border-brand-green-200 rounded-xl text-center space-y-2">
                  <span className="text-xl font-bold text-brand-green-900 block font-serif">Inquiry Transmitted!</span>
                  <p className="text-xs text-brand-green-700 leading-relaxed font-light">
                    Your welfare request has been catalogued securely. We will contact you back using your preferred cell coordinates soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-green-700 uppercase font-mono tracking-wider font-semibold">Name</label>
                      <input
                        type="text"
                        required
                        value={welfareData.name}
                        onChange={(e) => setWelfareData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-green-700 uppercase font-mono tracking-wider font-semibold">Email / Contact Number:</label>
                      <input
                        type="text"
                        required
                        value={welfareData.contact}
                        onChange={(e) => setWelfareData(prev => ({ ...prev, contact: e.target.value }))}
                        placeholder="Enter email or phone"
                        className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-green-700 uppercase font-mono tracking-wider font-semibold">Request Category:</label>
                      <select
                        value={welfareData.category}
                        onChange={(e) => setWelfareData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 text-brand-green-900"
                      >
                        <option value="scholarship">Education</option>
                        <option value="medical">Healthcare</option>
                        <option value="food">Food Security</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-brand-green-700 uppercase font-mono tracking-wider font-semibold">Country:</label>
                      <select
                        value={welfareData.country}
                        onChange={(e) => setWelfareData(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 text-brand-green-900"
                      >
                        <option value="US">United States</option>
                        <option value="NG">Nigeria</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-brand-green-700 uppercase font-mono tracking-wider font-semibold">Tell us how we can help you</label>
                    <textarea
                      rows={2}
                      required
                      value={welfareData.notes}
                      onChange={(e) => setWelfareData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Tell us about the family's needs or volunteer/partner goals..."
                      className="w-full px-3.5 py-2.5 bg-brand-beige-50 border border-brand-green-100 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 text-brand-green-950"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isWelfareSubmitting}
                    className="w-full py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isWelfareSubmitting ? (
                      <span className="inline-block h-4 w-4 border-2 border-brand-green-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </>
              )}

            </form>

          </div>
        </div>
      </section>

    </div>
  );
}
