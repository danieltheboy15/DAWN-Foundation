import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { 
  Building, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  LogIn, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  Info, 
  Image as ImageIcon, 
  Award, 
  Heart, 
  BookOpen, 
  PlusCircle, 
  Check, 
  AlertCircle,
  Users,
  Briefcase,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Program, TeamMember, VolunteerRole, GalleryItem, PartnerBenefit } from '../types';

interface AdminViewProps {
  setCurrentTab: (tab: string) => void;
  onLoginStateChange?: (loggedIn: boolean) => void;
}

export default function AdminView({ setCurrentTab, onLoginStateChange }: AdminViewProps) {
  const {
    aboutContent,
    programs,
    teamMembers,
    volunteerRoles,
    partnershipBenefits,
    galleryItems,
    updateAboutContent,
    updatePrograms,
    updateTeamMembers,
    updateVolunteerRoles,
    updatePartnershipBenefits,
    updateGalleryItems,
    resetAllContent
  } = useCMS();

  // Screen/Tab States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Active Editor Section State
  const [activeConfigTab, setActiveConfigTab] = useState<'about' | 'programs' | 'team' | 'volunteers' | 'gallery' | 'benefits'>('about');

  // Sync login status with parent component
  useEffect(() => {
    if (onLoginStateChange) {
      onLoginStateChange(isLoggedIn);
    }
  }, [isLoggedIn, onLoginStateChange]);

  // Check login token on mount
  useEffect(() => {
    const session = localStorage.getItem('dawn_admin_logged_in');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'dawnfoundation' && password === 'dawn1596%') {
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('dawn_admin_logged_in', 'true');
      showToast('Logged in successfully!');
    } else {
      setLoginError('Invalid Administrator credentials. Please verify username and passcode.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('dawn_admin_logged_in');
    showToast('Logged out of system.');
  };

  const showToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // ----------------------------------------------------
  // About Page CMS State and Handlers
  // ----------------------------------------------------
  const [aboutForm, setAboutForm] = useState(aboutContent);

  useEffect(() => {
    setAboutForm(aboutContent);
  }, [aboutContent]);

  const handleAboutSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutContent(aboutForm);
    showToast('About Page Content successfully updated!');
  };

  const handleCoreValueChange = (index: number, field: 'title' | 'description', value: string) => {
    const updatedValues = [...aboutForm.coreValues];
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value
    };
    setAboutForm(prev => ({
      ...prev,
      coreValues: updatedValues
    }));
  };

  // ----------------------------------------------------
  // Programs CMS State and Handlers
  // ----------------------------------------------------
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0]?.id || '');
  const currentProgram = programs.find(p => p.id === selectedProgramId);
  const [programForm, setProgramForm] = useState<Program | null>(null);

  useEffect(() => {
    if (currentProgram) {
      setProgramForm({ ...currentProgram });
    } else {
      setProgramForm(null);
    }
  }, [selectedProgramId, programs]);

  const handleProgramSave = () => {
    if (!programForm) return;
    const updatedPrograms = programs.map(p => p.id === programForm.id ? programForm : p);
    updatePrograms(updatedPrograms);
    showToast(`Program '${programForm.title}' saved successfully!`);
  };

  const handleAddProgram = () => {
    const newId = `program-${Date.now()}`;
    const newProgram: Program = {
      id: newId,
      title: 'New Community Initiative',
      shortDescription: 'Brief summary displayed on main listing pages.',
      longDescription: 'Extended comprehensive details detailing objectives and community impacts.',
      whyItMatters: 'Inspiring quote or rationale statement regarding this initiative.',
      iconName: 'Heart',
      programsList: ['Core objective list item one', 'Core objective list item two'],
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
      stats: [
        { label: 'Beneficiaries', count: '100', suffix: '+' },
        { label: 'Outreaches', count: '5', suffix: '' }
      ],
      ctaText: 'Support this initiative'
    };

    updatePrograms([...programs, newProgram]);
    setSelectedProgramId(newId);
    showToast('Added new Initiative! Switch config tab or scroll down to modify it.');
  };

  const handleDeleteProgram = (id: string) => {
    if (programs.length <= 1) {
      alert('You must keep at least one community initiative on the website.');
      return;
    }
    if (confirm('Are you absolutely sure you want to delete this program entire section? This operation is irreversible.')) {
      const remaining = programs.filter(p => p.id !== id);
      updatePrograms(remaining);
      setSelectedProgramId(remaining[0].id);
      showToast('Program initiative removed.');
    }
  };

  const updateProgramStat = (statIndex: number, field: 'label' | 'count' | 'suffix', value: string) => {
    if (!programForm || !programForm.stats) return;
    const statsList = [...programForm.stats];
    statsList[statIndex] = {
      ...statsList[statIndex],
      [field]: value
    };
    setProgramForm(prev => prev ? { ...prev, stats: statsList } : null);
  };

  const handleAddProgramListItem = () => {
    if (!programForm) return;
    setProgramForm(prev => prev ? {
      ...prev,
      programsList: [...prev.programsList, 'New objective item']
    } : null);
  };

  const handleRemoveProgramListItem = (idx: number) => {
    if (!programForm) return;
    setProgramForm(prev => prev ? {
      ...prev,
      programsList: prev.programsList.filter((_, i) => i !== idx)
    } : null);
  };

  const handleProgramListItemChange = (idx: number, newVal: string) => {
    if (!programForm) return;
    const list = [...programForm.programsList];
    list[idx] = newVal;
    setProgramForm(prev => prev ? { ...prev, programsList: list } : null);
  };

  // ----------------------------------------------------
  // Team Members CMS Handlers
  // ----------------------------------------------------
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<TeamMember | null>(null);

  const startEditMember = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setMemberForm({ ...member });
  };

  const saveMember = () => {
    if (!memberForm) return;
    let updated;
    if (teamMembers.some(m => m.id === memberForm.id)) {
      updated = teamMembers.map(m => m.id === memberForm.id ? memberForm : m);
    } else {
      updated = [...teamMembers, memberForm];
    }
    updateTeamMembers(updated);
    setEditingMemberId(null);
    setMemberForm(null);
    showToast(`Team profile for ${memberForm.name} saved!`);
  };

  const startAddMember = () => {
    const newId = `member-${Date.now()}`;
    const newMember: TeamMember = {
      id: newId,
      name: 'Dr. Jane Doe',
      role: 'staff',
      position: 'Senior Program Coordinator',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      bioIntro: 'Brief professional intro displayed on grids.',
      fullBio: 'Complete extended biography detailing years of healthcare service, philanthropy, or operations.'
    };
    setEditingMemberId(newId);
    setMemberForm(newMember);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Delete this team profile from the database?')) {
      const remaining = teamMembers.filter(m => m.id !== id);
      updateTeamMembers(remaining);
      showToast('Team member profile deleted.');
    }
  };

  // ----------------------------------------------------
  // Volunteer Roles CMS Handlers
  // ----------------------------------------------------
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleForm, setRoleForm] = useState<VolunteerRole | null>(null);

  const startEditRole = (role: VolunteerRole) => {
    setEditingRoleId(role.id);
    setRoleForm({ ...role });
  };

  const saveRole = () => {
    if (!roleForm) return;
    let updated;
    if (volunteerRoles.some(r => r.id === roleForm.id)) {
      updated = volunteerRoles.map(r => r.id === roleForm.id ? roleForm : r);
    } else {
      updated = [...volunteerRoles, roleForm];
    }
    updateVolunteerRoles(updated);
    setEditingRoleId(null);
    setRoleForm(null);
    showToast(`Volunteer role '${roleForm.title}' saved!`);
  };

  const startAddRole = () => {
    const newId = `role-${Date.now()}`;
    const newRole: VolunteerRole = {
      id: newId,
      title: 'Emergency Response Volunteer',
      category: 'Administrative',
      responsibilities: ['Responsibility one', 'Responsibility two'],
      applyLink: '#register-volunteer'
    };
    setEditingRoleId(newId);
    setRoleForm(newRole);
  };

  const handleDeleteRole = (id: string) => {
    if (confirm('Delete this volunteer role category?')) {
      const remaining = volunteerRoles.filter(r => r.id !== id);
      updateVolunteerRoles(remaining);
      showToast('Volunteer role profile deleted.');
    }
  };

  const handleRoleResponChange = (idx: number, val: string) => {
    if (!roleForm) return;
    const list = [...roleForm.responsibilities];
    list[idx] = val;
    setRoleForm(prev => prev ? { ...prev, responsibilities: list } : null);
  };

  const addRoleResponIdx = () => {
    if (!roleForm) return;
    setRoleForm(prev => prev ? {
      ...prev,
      responsibilities: [...prev.responsibilities, 'New responsibility requirement']
    } : null);
  };

  const removeRoleResponIdx = (idx: number) => {
    if (!roleForm) return;
    setRoleForm(prev => prev ? {
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== idx)
    } : null);
  };

  // ----------------------------------------------------
  // Partnership Benefits CMS Handlers
  // ----------------------------------------------------
  const [editingBenefitIndex, setEditingBenefitIndex] = useState<number | null>(null);
  const [benefitForm, setBenefitForm] = useState<PartnerBenefit | null>(null);

  const startEditBenefit = (idx: number, benefit: PartnerBenefit) => {
    setEditingBenefitIndex(idx);
    setBenefitForm({ ...benefit });
  };

  const saveBenefit = () => {
    if (!benefitForm || editingBenefitIndex === null) return;
    const updated = [...partnershipBenefits];
    updated[editingBenefitIndex] = benefitForm;
    updatePartnershipBenefits(updated);
    setEditingBenefitIndex(null);
    setBenefitForm(null);
    showToast('Partnership benefit description updated!');
  };

  // ----------------------------------------------------
  // Gallery CMS Handlers
  // ----------------------------------------------------
  const [newGalleryItem, setNewGalleryItem] = useState<{
    category: GalleryItem['category'];
    imageUrl: string;
    caption: string;
  }>({
    category: 'Education',
    imageUrl: '',
    caption: ''
  });

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.imageUrl || !newGalleryItem.caption) {
      alert('Please fill out both the Image URL and Caption parameters.');
      return;
    }
    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      category: newGalleryItem.category,
      imageUrl: newGalleryItem.imageUrl,
      caption: newGalleryItem.caption
    };
    updateGalleryItems([item, ...galleryItems]);
    setNewGalleryItem({ category: 'Education', imageUrl: '', caption: '' });
    showToast('New gallery picture added and catalogued!');
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm('Remove this photo object from the public gallery?')) {
      const remaining = galleryItems.filter(item => item.id !== id);
      updateGalleryItems(remaining);
      showToast('Gallery image removed from databases.');
    }
  };

  // Global Revert Action
  const handleFactoryReset = () => {
    if (confirm('CRITICAL WARN: This will wipe ALL custom text edits, team additions, program statistics modifications, and photographs uploaded to local databases, resetting the entire website to default compiled code. Proceed?')) {
      resetAllContent();
      // Reload states
      setAboutForm(aboutContent);
      setSelectedProgramId(programs[0]?.id || '');
      setEditingMemberId(null);
      setEditingRoleId(null);
      setEditingBenefitIndex(null);
      showToast('The database state has been fully reset to template defaults.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-green-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Abstract Background Blurs */}
        <div className="absolute top-[-25%] left-[-20%] w-[80%] h-[80%] bg-brand-green-900/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-brand-green-900/40 border border-brand-green-800/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10"
        >
          {/* Logo Heading Container */}
          <div className="text-center space-y-4 mb-8">
            <div className="mx-auto h-[120px] w-[120px] relative flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781764238/Dawn_Foundation_Logo_kdtvox.png"
                alt="DAWN Foundation"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <div className="space-y-1.5">
              <h1 className="font-serif font-bold text-2xl text-white tracking-tight">Staff CMS Hub</h1>
              <p className="text-xs text-brand-green-300 font-mono uppercase tracking-widest">Authorized Administration Access Only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-2.5 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-brand-gold-500 uppercase tracking-widest font-mono">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-green-400" />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-brand-green-950/80 border border-brand-green-700/60 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-brand-gold-500 uppercase tracking-widest font-mono">Administration Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-green-400" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-brand-green-950/80 border border-brand-green-700/60 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-green-400 hover:text-brand-gold-400 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-transform duration-100 active:scale-98 shadow-lg cursor-pointer"
            >
              <LogIn className="h-4.5 w-4.5" />
              <span>Unlock Administrator Panel</span>
            </button>
          </form>

          {/* Quick security advice */}
          <div className="mt-8 text-center bg-brand-green-950/30 p-3 rounded-lg border border-brand-green-800/30">
            <span className="text-[10px] text-brand-green-400 leading-relaxed block">
              All logins, session requests, and site-wide modifications are audited locally. Use authorized credentials assigned by HRM memory overseers only.
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige-50 pb-24 text-brand-green-950">
      {/* Top Admin Header */}
      <div className="bg-brand-green-950 text-white border-b border-brand-green-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-white/10 rounded-xl p-1 shrink-0">
              <img 
                src="https://res.cloudinary.com/dpsvazol5/image/upload/v1781764238/Dawn_Foundation_Logo_kdtvox.png"
                alt="DAWN"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-brand-gold-500 text-brand-green-950 text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full">Live CMS</span>
                <span className="text-xs text-brand-green-300 font-mono">v1.2.0 • Session Secured</span>
              </div>
              <h1 className="font-serif font-bold text-xl text-white">DAWN Foundation Content Engine</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentTab('home')}
              className="px-4 py-2 bg-brand-green-900 border border-brand-green-800 hover:bg-brand-green-850 hover:text-brand-gold-300 rounded-xl text-xs text-brand-green-100 font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Back to Public Website</span>
            </button>
            <button
              onClick={handleFactoryReset}
              className="px-4 py-2 bg-red-950/20 border border-red-900/30 hover:bg-red-950/40 text-red-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Factory Reset Everything back to defaults"
            >
              <RotateCcw className="h-3.5 w-3.5 text-red-400" />
              <span>Reset Site Defaults</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Navigation configuration Tabs bar */}
        <div id="cms-config-nav-tabs" className="flex flex-wrap gap-2 border-b border-brand-green-200 pb-2 mb-8">
          {[
            { id: 'about', label: 'About & Core Settings', icon: Info },
            { id: 'programs', label: 'Programs & Causes', icon: BookOpen },
            { id: 'team', label: 'Meet the Team', icon: Users },
            { id: 'volunteers', label: 'Volunteer Roles', icon: Briefcase },
            { id: 'benefits', label: 'Partnership Benefits', icon: Award },
            { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeConfigTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveConfigTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-brand-green-900 text-white shadow-md'
                    : 'bg-white hover:bg-brand-green-50 text-brand-green-800 border border-brand-green-100'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-brand-gold-300' : 'text-brand-green-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Edit Views block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConfigTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            
            {/* ABOUT CONTENT EDITOR */}
            {activeConfigTab === 'about' && (
              <form onSubmit={handleAboutSave} className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-brand-green-950 mb-1">About Us & Legacy Parameters</h2>
                  <p className="text-xs text-brand-green-600">Update general missions, visions, and legacy statements displayed on the primary About us page.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 pt-4">
                  {/* Mission */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="block text-[11px] font-bold text-brand-green-800 uppercase tracking-wider font-mono">Our Foundation Mission Statement</label>
                    <textarea
                      required
                      rows={3}
                      value={aboutForm.mission}
                      onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                      className="w-full p-4 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 font-light"
                    />
                  </div>

                  {/* Vision */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="block text-[11px] font-bold text-brand-green-800 uppercase tracking-wider font-mono">Our Foundation Vision Statement</label>
                    <textarea
                      required
                      rows={3}
                      value={aboutForm.vision}
                      onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                      className="w-full p-4 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 font-light"
                    />
                  </div>

                  {/* Founder Letter Message */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="block text-[11px] font-bold text-brand-green-800 uppercase tracking-wider font-mono">Founder & President Message Letter</label>
                    <textarea
                      required
                      rows={4}
                      value={aboutForm.founderMessage}
                      onChange={(e) => setAboutForm({ ...aboutForm, founderMessage: e.target.value })}
                      className="w-full p-4 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 font-light leading-relaxed"
                    />
                  </div>

                  {/* Legacy Section Description */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="block text-[11px] font-bold text-brand-green-800 uppercase tracking-wider font-mono">HRM Samson Okirhioboh Omene Legacy Text</label>
                    <textarea
                      required
                      rows={5}
                      value={aboutForm.legacy}
                      onChange={(e) => setAboutForm({ ...aboutForm, legacy: e.target.value })}
                      className="w-full p-4 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 font-light leading-relaxed"
                    />
                  </div>
                </div>

                {/* Core Values edits */}
                <div className="border-t border-brand-green-100 pt-6 mt-6">
                  <h3 className="font-serif font-bold text-lg text-brand-green-950 mb-3 block">Corporate Pillars / Core Values (Exactly 4 Cards)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aboutForm.coreValues.map((val, idx) => (
                      <div key={idx} className="p-4 bg-brand-green-50/20 border border-brand-green-100/60 rounded-2xl space-y-3">
                        <span className="text-[10px] font-mono font-bold text-brand-gold-600 uppercase">Core Value Pillar #{idx + 1}</span>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-700">Value Title</label>
                          <input
                            type="text"
                            required
                            value={val.title}
                            onChange={(e) => handleCoreValueChange(idx, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-brand-green-150 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 font-semibold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-700">Detailed Description</label>
                          <textarea
                            required
                            rows={3}
                            value={val.description}
                            onChange={(e) => handleCoreValueChange(idx, 'description', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-brand-green-150 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 font-light"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-green-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-green-900 hover:bg-brand-green-950 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer shadow"
                  >
                    <Save className="h-4 w-4 text-brand-gold-300" />
                    <span>Save About & Legacy Site Settings</span>
                  </button>
                </div>
              </form>
            )}

            {/* PROGRAMS / CAUSES EDITOR */}
            {activeConfigTab === 'programs' && (
              <div className="space-y-6">
                {/* Selector Header Bar */}
                <div className="bg-white p-6 rounded-3xl border border-brand-green-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold-600 font-bold block">Pillars of Stewardship</span>
                    <h2 className="font-serif font-bold text-xl text-brand-green-950">Select Cause or Initiative to Update</h2>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={selectedProgramId}
                      onChange={(e) => setSelectedProgramId(e.target.value)}
                      className="px-4 py-2.5 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-xs font-semibold focus:outline-none text-brand-green-900"
                    >
                      {programs.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>

                    <button
                      onClick={handleAddProgram}
                      className="px-4 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New Initiative</span>
                    </button>
                  </div>
                </div>

                {programForm && (
                  <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-brand-green-50 pb-4">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-brand-green-950">Edit Initiative: {programForm.title}</h3>
                        <span className="font-mono text-[10px] text-brand-green-400">ID: {programForm.id}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProgram(programForm.id)}
                        className="p-2 sm:px-3 sm:py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Delete Initiative</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Initiative Title</label>
                        <input
                          type="text"
                          required
                          value={programForm.title}
                          onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                          className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950"
                        />
                      </div>

                      {/* Icon */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Lucide Icon Identifier</label>
                        <select
                          value={programForm.iconName}
                          onChange={(e) => setProgramForm({ ...programForm, iconName: e.target.value })}
                          className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950"
                        >
                          <option value="GraduationCap">GraduationCap (Education)</option>
                          <option value="HeartPulse">HeartPulse (Healthcare)</option>
                          <option value="Soup">Soup (Food Security)</option>
                          <option value="Heart">Heart (General Care)</option>
                          <option value="Award">Award (Achievement)</option>
                          <option value="Users">Users (Team)</option>
                        </select>
                      </div>

                      {/* Short Description */}
                      <div className="space-y-1.5 col-span-1 md:col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Short Card Description (1-2 sentences)</label>
                        <input
                          type="text"
                          required
                          value={programForm.shortDescription}
                          onChange={(e) => setProgramForm({ ...programForm, shortDescription: e.target.value })}
                          className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950"
                        />
                      </div>

                      {/* Long Description */}
                      <div className="space-y-1.5 col-span-1 md:col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Extended Details Page Description</label>
                        <textarea
                          required
                          rows={4}
                          value={programForm.longDescription}
                          onChange={(e) => setProgramForm({ ...programForm, longDescription: e.target.value })}
                          className="w-full p-4 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950 font-light"
                        />
                      </div>

                      {/* Why it matters */}
                      <div className="space-y-1.5 col-span-1 md:col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Featured Foundation Quote / Highlight</label>
                        <input
                          type="text"
                          required
                          value={programForm.whyItMatters}
                          onChange={(e) => setProgramForm({ ...programForm, whyItMatters: e.target.value })}
                          className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950 font-light italic"
                        />
                      </div>

                      {/* Hero Image */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Banner Image URL</label>
                        <input
                          type="text"
                          required
                          value={programForm.image}
                          onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                          className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950"
                        />
                        <div className="mt-2 h-32 w-full bg-brand-green-50 rounded-lg overflow-hidden border border-brand-green-100 flex items-center justify-center relative">
                          <img 
                            src={programForm.image} 
                            alt="Initiative Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'placeholder';
                            }}
                          />
                          <span className="absolute bottom-1 right-1 bg-brand-green-950/80 text-white text-[9px] font-mono px-2 py-0.5 rounded">Live Preview</span>
                        </div>
                      </div>

                      {/* CTA Text */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase font-bold text-brand-green-800">Call to Action Button text</label>
                        <input
                          type="text"
                          required
                          value={programForm.ctaText}
                          onChange={(e) => setProgramForm({ ...programForm, ctaText: e.target.value })}
                          className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-brand-green-950 font-bold"
                        />
                      </div>
                    </div>

                    {/* Statistics counters */}
                    {programForm.stats && (
                      <div className="border-t border-brand-green-100 pt-6 mt-6 space-y-4">
                        <h4 className="font-serif font-bold text-base text-brand-green-950">Dynamic Impact Indicators (Up to 3 Numerical Stats)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {programForm.stats.map((s, idx) => (
                            <div key={idx} className="p-4 bg-brand-gold-50/20 border border-brand-gold-150/50 rounded-xl space-y-3">
                              <span className="text-[9px] font-mono font-bold text-brand-gold-600 block uppercase">Stat Indicator #{idx + 1}</span>
                              
                              <div className="space-y-1">
                                <label className="block text-[9px] uppercase font-bold text-brand-green-700">Display Label</label>
                                <input
                                  type="text"
                                  required
                                  value={s.label}
                                  onChange={(e) => updateProgramStat(idx, 'label', e.target.value)}
                                  className="w-full px-2.5 py-1.5 bg-white border border-brand-green-150 rounded-lg text-xs focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="block text-[9px] uppercase font-bold text-brand-green-700">Count Number</label>
                                  <input
                                    type="text"
                                    required
                                    value={s.count || ''}
                                    onChange={(e) => updateProgramStat(idx, 'count', e.target.value)}
                                    className="w-full px-2.5 py-1.5 bg-white border border-brand-green-150 rounded-lg text-xs font-mono"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[9px] uppercase font-bold text-brand-green-700">Suffix (e.g. +)</label>
                                  <input
                                    type="text"
                                    value={s.suffix || ''}
                                    onChange={(e) => updateProgramStat(idx, 'suffix', e.target.value)}
                                    className="w-full px-2.5 py-1.5 bg-white border border-brand-green-150 rounded-lg text-xs font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Program List Objectives */}
                    <div className="border-t border-brand-green-100 pt-6 mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-base text-brand-green-950">Detailed Pillar Objectives</h4>
                        <button
                          type="button"
                          onClick={handleAddProgramListItem}
                          className="px-3 py-1.5 bg-brand-green-550/10 hover:bg-brand-green-550/20 text-brand-green-900 rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {programForm.programsList.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3 bg-brand-beige-50/30 p-2 border border-brand-green-50 rounded-xl">
                            <span className="font-mono text-xs text-brand-green-500 font-bold w-6 text-center">{idx + 1}.</span>
                            <input
                              type="text"
                              required
                              value={item}
                              onChange={(e) => handleProgramListItemChange(idx, e.target.value)}
                              className="flex-grow px-3 py-2 bg-white border border-brand-green-150 rounded-lg text-xs font-light text-brand-green-950 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveProgramListItem(idx)}
                              className="p-1.5 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                              title="Delete Bullet"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Save footer */}
                    <div className="pt-6 border-t border-brand-green-100 flex justify-end">
                      <button
                        onClick={handleProgramSave}
                        className="px-6 py-3 bg-brand-green-900 hover:bg-brand-green-950 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer shadow"
                      >
                        <Save className="h-4 w-4 text-brand-gold-300" />
                        <span>Save Program Modifications</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* MEET THE TEAM EDITOR */}
            {activeConfigTab === 'team' && (
              <div className="space-y-6">
                
                {/* Team List Dashboard card */}
                {editingMemberId === null ? (
                  <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="font-serif font-bold text-2xl text-brand-green-950 mb-1">Human Board & Leadership Catalog</h2>
                        <p className="text-xs text-brand-green-600">Represent, add or remove administrators, board directors, and executive counselors.</p>
                      </div>
                      
                      <button
                        onClick={startAddMember}
                        className="px-4 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Team Profile</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {teamMembers.map((member) => (
                        <div 
                          key={member.id}
                          className="p-5 border border-brand-green-100 rounded-2xl flex items-start gap-4 hover:border-brand-gold-500/50 transition-colors relative group"
                        >
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-brand-green-100 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dpsvazol5/image/upload/v1781872536/Dr._Will_Carter_s_Photo_lmskmc.png';
                            }}
                          />
                          <div className="space-y-1.5 flex-grow pr-16">
                            <span className="px-2 py-0.5 bg-brand-green-100 text-brand-green-800 text-[9px] uppercase font-mono tracking-wider rounded font-bold">
                              {member.role}
                            </span>
                            <h3 className="font-serif font-bold text-sm text-brand-green-950">{member.name}</h3>
                            <p className="text-xs text-brand-gold-600 font-medium">{member.position}</p>
                            <p className="text-[11px] text-brand-green-700 leading-normal font-light line-clamp-2">{member.bioIntro}</p>
                          </div>

                          <div className="absolute right-4 top-4 flex items-center space-x-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditMember(member)}
                              className="p-1.5 bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-800 rounded-lg text-xs font-bold cursor-pointer"
                              title="Edit Member"
                            >
                              <EditPenIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member.id)}
                              className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs font-bold cursor-pointer"
                              title="Delete Member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Active Member editor sheet
                  memberForm && (
                    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                      <div className="flex items-center justify-between border-b border-brand-green-50 pb-4">
                        <div>
                          <h3 className="font-serif font-bold text-lg text-brand-green-950">Editing Team Profile: {memberForm.name}</h3>
                          <span className="font-mono text-[10px] text-brand-green-400">ID: {memberForm.id}</span>
                        </div>
                        <button
                          onClick={() => {
                            setEditingMemberId(null);
                            setMemberForm(null);
                          }}
                          className="px-3 py-1.5 border border-brand-green-200 hover:bg-brand-green-50 text-brand-green-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Back to List
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Officer Full Name</label>
                          <input
                            type="text"
                            required
                            value={memberForm.name}
                            onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Official Position Label</label>
                          <input
                            type="text"
                            required
                            value={memberForm.position}
                            onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Role Categorization</label>
                          <select
                            value={memberForm.role}
                            onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value as any })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500"
                          >
                            <option value="founder">Founder & President</option>
                            <option value="board">Board of Directors</option>
                            <option value="advisor">Program Advisors / Coordinators</option>
                            <option value="staff">Associate Staff</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Profile Image URL</label>
                          <input
                            type="text"
                            required
                            value={memberForm.image}
                            onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none"
                          />
                        </div>

                        {/* Bio Intro */}
                        <div className="space-y-1.5 col-span-1 sm:col-span-2">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Short Card Snippet Intro (1-2 sentences max)</label>
                          <input
                            type="text"
                            required
                            value={memberForm.bioIntro}
                            onChange={(e) => setMemberForm({ ...memberForm, bioIntro: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none"
                          />
                        </div>

                        {/* Full Bio */}
                        <div className="space-y-1.5 col-span-1 sm:col-span-2">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Complete Extended Biography Details (Paragraphs)</label>
                          <textarea
                            rows={8}
                            value={memberForm.fullBio || ''}
                            onChange={(e) => setMemberForm({ ...memberForm, fullBio: e.target.value })}
                            className="w-full p-4 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-xs focus:outline-none leading-relaxed font-light"
                          />
                        </div>
                      </div>

                      <div className="mt-6 border-t border-brand-green-100 flex items-center justify-between pt-6">
                        {/* Live Avatar Preview */}
                        <div className="flex items-center space-x-3">
                          <img 
                            src={memberForm.image} 
                            alt="Preiview Avatar" 
                            className="h-14 w-14 rounded-full object-cover border border-brand-green-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dpsvazol5/image/upload/v1781872536/Dr._Will_Carter_s_Photo_lmskmc.png';
                            }}
                          />
                          <span className="text-[10px] font-mono text-brand-green-500 font-bold block">Live Image Link check</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMemberId(null);
                              setMemberForm(null);
                            }}
                            className="px-5 py-2.5 bg-brand-beige-50 border border-brand-green-200 hover:bg-brand-green-100 rounded-xl text-xs font-bold transition-all text-brand-green-950 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={saveMember}
                            className="px-6 py-2.5 bg-brand-green-900 hover:bg-brand-green-950 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Save className="h-4 w-4 text-brand-gold-300" />
                            <span>Save Officer Profile</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* VOLUNTEER ROLES EDITOR */}
            {activeConfigTab === 'volunteers' && (
              <div className="space-y-6">
                
                {editingRoleId === null ? (
                  <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="font-serif font-bold text-2xl text-brand-green-950 mb-1">Volunteer Role Categories</h2>
                        <p className="text-xs text-brand-green-600">List and update dynamic volunteer operational domains displayed on the main Volunteer Registration sheet.</p>
                      </div>
                      
                      <button
                        onClick={startAddRole}
                        className="px-4 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Volunteer Category</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {volunteerRoles.map((role) => (
                        <div 
                          key={role.id}
                          className="p-5 border border-brand-green-100 rounded-2xl space-y-3 hover:border-brand-gold-500/50 transition-all relative group"
                        >
                          <span className="px-2.5 py-0.5 bg-brand-gold-500/15 text-brand-gold-600 border border-brand-gold-500/20 text-[9px] uppercase font-mono tracking-widest rounded-full font-bold inline-block">
                            {role.category}
                          </span>
                          <h3 className="font-serif font-bold text-base text-brand-green-950">{role.title}</h3>
                          <ul className="space-y-1 list-disc pl-4 text-xs text-brand-green-700 font-light">
                            {role.responsibilities.slice(0, 2).map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                            {role.responsibilities.length > 2 && (
                              <li className="font-mono text-[10px] text-brand-green-400 list-none">+{role.responsibilities.length - 2} more responsibilities configured</li>
                            )}
                          </ul>

                          <div className="absolute right-4 top-4 flex items-center space-x-1.5 opacity-85 group-hover:opacity-100 pointer-events-auto">
                            <button
                              onClick={() => startEditRole(role)}
                              className="p-1.5 bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-800 rounded-lg text-xs font-bold cursor-pointer"
                            >
                              <EditPenIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRole(role.id)}
                              className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs font-bold cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Active edit role
                  roleForm && (
                    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                      <div className="flex items-center justify-between border-b border-brand-green-50 pb-4">
                        <div>
                          <h3 className="font-serif font-bold text-lg text-brand-green-950">Editing Volunteer Domain: {roleForm.title}</h3>
                          <span className="font-mono text-[10px] text-brand-green-400">ID: {roleForm.id}</span>
                        </div>
                        <button
                          onClick={() => {
                            setEditingRoleId(null);
                            setRoleForm(null);
                          }}
                          className="px-3 py-1.5 border border-brand-green-200 hover:bg-brand-green-50 text-brand-green-700 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Back To Dashboard
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Job/Volunteer Title</label>
                          <input
                            type="text"
                            required
                            value={roleForm.title}
                            onChange={(e) => setRoleForm({ ...roleForm, title: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase font-bold text-brand-green-800">Core Functional Category</label>
                          <select
                            value={roleForm.category}
                            onChange={(e) => setRoleForm({ ...roleForm, category: e.target.value as any })}
                            className="w-full px-4 py-3 bg-brand-beige-50/50 border border-brand-green-150 rounded-xl text-sm focus:outline-none"
                          >
                            <option value="Education">Education</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Food Distribution">Food Distribution</option>
                            <option value="Media">Media & Marketing</option>
                            <option value="Administrative">Administrative Office</option>
                          </select>
                        </div>
                      </div>

                      {/* Responsibilities list sub-configurer */}
                      <div className="border-t border-brand-green-100 pt-6 mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-base text-brand-green-950">Responsibilities Requirements Checklist (bullet points)</h4>
                          <button
                            type="button"
                            onClick={addRoleResponIdx}
                            className="px-3 py-1.5 bg-brand-green-550/10 hover:bg-brand-green-550/20 text-brand-green-900 rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                          >
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span>Add Requirement Bullet</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {roleForm.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <span className="font-mono text-xs text-brand-green-500 font-bold w-6 text-center">{idx + 1}.</span>
                              <input
                                type="text"
                                required
                                value={resp}
                                onChange={(e) => handleRoleResponChange(idx, e.target.value)}
                                className="flex-grow px-3 py-2 bg-brand-beige-50/50 border border-brand-green-150 rounded-lg text-xs font-light text-brand-green-950 focus:outline-none focus:bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => removeRoleResponIdx(idx)}
                                className="p-1.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-brand-green-100 pt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRoleId(null);
                            setRoleForm(null);
                          }}
                          className="px-5 py-2.5 bg-brand-beige-50 border border-brand-green-200 text-xs font-bold rounded-xl text-brand-green-950 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={saveRole}
                          className="px-6 py-2.5 bg-brand-green-900 hover:bg-brand-green-950 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                          <Save className="h-4 w-4 text-brand-gold-300" />
                          <span>Save Role category</span>
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* PARTNERSHIP BENEFITS EDITOR */}
            {activeConfigTab === 'benefits' && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-brand-green-950 mb-1">Corporate Partnership Benefit Cards (Exactly 4 Cards)</h2>
                  <p className="text-xs text-brand-green-600">Represent and explain strategic motivations shown on the Partner Alignment details pane.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {partnershipBenefits.map((benefit, idx) => (
                    <div key={idx} className="p-5 border border-brand-green-100 rounded-2xl space-y-3 bg-brand-beige-50/25 relative group">
                      <span className="text-[10px] font-mono text-brand-gold-600 uppercase font-bold">Benefit Card #{idx + 1}</span>
                      
                      {editingBenefitIndex === idx && benefitForm ? (
                        <div className="space-y-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-brand-green-700">Display Title</label>
                            <input
                              type="text"
                              required
                              value={benefitForm.title}
                              onChange={(e) => setBenefitForm({ ...benefitForm, title: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-brand-green-150 rounded-lg text-xs focus:outline-none font-bold"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-brand-green-700">Detailed Impact Summary</label>
                            <textarea
                              rows={3}
                              required
                              value={benefitForm.description}
                              onChange={(e) => setBenefitForm({ ...benefitForm, description: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-brand-green-150 rounded-lg text-xs focus:outline-none font-light"
                            />
                          </div>

                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingBenefitIndex(null);
                                setBenefitForm(null);
                              }}
                              className="px-2.5 py-1 bg-brand-beige-100 rounded text-[10px] font-bold text-brand-green-950 cursor-pointer"
                            >
                              Discard
                            </button>
                            <button
                              type="button"
                              onClick={saveBenefit}
                              className="px-3 py-1 bg-brand-green-800 text-white rounded text-[10px] font-bold cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-serif font-bold text-sm text-brand-green-950">{benefit.title}</h3>
                          <p className="text-xs text-brand-green-700 leading-normal font-light">{benefit.description}</p>
                          
                          <button
                            type="button"
                            onClick={() => startEditBenefit(idx, benefit)}
                            className="absolute right-4 top-4 p-1.5 bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-800 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center space-x-1"
                          >
                            <EditPenIcon className="h-3.5 w-3.5" />
                            <span className="text-[10px]">Adjust</span>
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY PHOTO CMS */}
            {activeConfigTab === 'gallery' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Addition Pane */}
                <form onSubmit={handleAddGalleryItem} className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-3xl border border-brand-green-100 shadow-sm space-y-5 h-fit">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-brand-green-950 mb-1">Add Image Showcase</h2>
                    <p className="text-xs text-brand-green-600">Register new outreach photos to demonstrate real program accomplishments.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-bold text-brand-green-800">Media Category</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 text-brand-green-950 font-semibold"
                    >
                      <option value="Education">Education Access</option>
                      <option value="Medical Outreach">Medical Outreach</option>
                      <option value="Food Distribution">Food Security</option>
                      <option value="Community">Community Leadership Meetings</option>
                      <option value="Volunteers">Volunteers group portraits</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-bold text-brand-green-800">Unsplash/Cloudinary Image URL</label>
                    <input
                      type="text"
                      required
                      value={newGalleryItem.imageUrl}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-bold text-brand-green-800">Picture Caption text</label>
                    <textarea
                      required
                      rows={3}
                      value={newGalleryItem.caption}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                      className="w-full p-3.5 bg-brand-beige-50 border border-brand-green-150 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  {newGalleryItem.imageUrl && (
                    <div className="space-y-1 border border-brand-green-100 rounded-xl p-2.5 bg-brand-green-50/20">
                      <span className="text-[9px] font-mono font-bold text-brand-green-600 block uppercase">Draft Picture Preview</span>
                      <div className="h-32 w-full bg-slate-100 rounded-lg overflow-hidden border border-brand-green-150 flex items-center justify-center relative">
                        <img 
                          src={newGalleryItem.imageUrl} 
                          alt="Gallery item draft preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'placeholder';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-green-900 hover:bg-brand-green-950 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow transition-all duration-100 active:scale-98"
                  >
                    <Plus className="h-4.5 w-4.5 text-brand-gold-300" />
                    <span>Upload to Gallery Catalog</span>
                  </button>
                </form>

                {/* Display listing of gallery image objects */}
                <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-brand-green-100 shadow-sm space-y-6">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-brand-green-950 mb-1">Active Photo Catalog ({galleryItems.length})</h2>
                    <p className="text-xs text-brand-green-600">All registered photos streaming live on the website gallery component.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="border border-brand-green-100 rounded-xl overflow-hidden relative group shadow-sm flex flex-col justify-between">
                        <div className="h-40 w-full relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.caption} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'placeholder';
                            }}
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-brand-green-950/80 text-white text-[9px] font-mono rounded">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-3 bg-brand-beige-50/40 relative flex-grow flex flex-col justify-between gap-3">
                          <p className="text-xs text-brand-green-900 font-light leading-normal line-clamp-3 italic">
                            "{item.caption}"
                          </p>
                          <div className="flex items-center justify-between border-t border-brand-green-100/55 pt-2 mt-1">
                            <span className="text-[10px] font-mono text-brand-green-400">ID: {item.id}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteGalleryItem(item.id)}
                              className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-600 text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete Photo</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Success notification popup Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-brand-green-950 border border-brand-gold-500/50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 text-white max-w-sm"
          >
            <div className="p-1 bg-brand-gold-500 rounded-full text-brand-green-950">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <span className="text-xs font-bold block text-brand-gold-300 font-mono text-left uppercase tracking-widest">Notification</span>
              <p className="text-[11px] text-brand-green-100 leading-normal font-light">{successToast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Minimal in-file icon helper since Lucide change may trigger typescript errors about specific edit icons
function EditPenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
