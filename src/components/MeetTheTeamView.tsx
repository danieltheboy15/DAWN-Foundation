import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../lib/cmsStore';
import { ChevronDown, ChevronUp, Sun, GraduationCap, Heart, HelpCircle, Mail, MapPin } from 'lucide-react';

export default function MeetTheTeamView() {
  const { teamMembers: TEAM_MEMBERS } = useCMS();
  // State to track expanded leadership write-ups: key is teamMember.id
  const [expandedIds, setExpandedIds] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter team members based on defined role tiers
  const founder = TEAM_MEMBERS.find(m => m.role === 'founder');
  const boardMembers = TEAM_MEMBERS.filter(m => m.role === 'board');
  const advisors = TEAM_MEMBERS.filter(m => m.role === 'advisor');
  const staffMembers = TEAM_MEMBERS.filter(m => m.role === 'staff');

  return (
    <div id="meet-the-team-view" className="py-24 bg-brand-beige-50">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center mb-16">
        <span className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest font-mono block mb-2">Our Stewards</span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight mb-6">
          Meet The Team
        </h1>
        <div className="h-1.5 w-24 bg-brand-gold-500 mx-auto rounded-full mb-6" />
        <p className="text-base sm:text-lg text-brand-green-700 max-w-2xl mx-auto font-light leading-relaxed">
          Meet the dedicated professionals and family champions stewarding the legacy of HRM Samson Okirhioboh Omene.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* SECTION 1: Founder and President Detail Layout (Can be enabled by removing "false && ") */}
        {false && founder && (
          <section id="founder-showcase-section" className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-green-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Photo */}
              <div className="lg:col-span-4 relative">
                <div className="aspect-square sm:aspect-[4/5] rounded-2.5xl overflow-hidden border-4 border-brand-beige-100 shadow-md">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
              </div>

              {/* Bio block with dropdown */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-brand-gold-600 text-xs font-mono font-bold uppercase tracking-widest block mb-1">DAWN Visionary</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-green-900 leading-tight">
                    {founder.name}
                  </h2>
                  <p className="text-brand-green-600 font-medium text-sm sm:text-base mt-1">
                    {founder.position}
                  </p>
                </div>

                <p className="text-brand-green-800 text-sm sm:text-base leading-relaxed font-light">
                  {founder.bioIntro}
                </p>

                {/* Dropdown button for detailed bio */}
                <div>
                  <button
                    id={`toggle-bio-btn-${founder.id}`}
                    onClick={() => toggleExpand(founder.id)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-brand-green-200 hover:border-brand-green-400 bg-brand-beige-50 hover:bg-brand-green-500/10 text-xs font-bold text-brand-green-800 transition-all duration-150 cursor-pointer"
                  >
                    <span>{expandedIds[founder.id] ? 'Hide Full Background' : 'Read Dr. Aghogho’s Full Bio'}</span>
                    {expandedIds[founder.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <AnimatePresence>
                    {expandedIds[founder.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-5 bg-brand-beige-50 rounded-2xl border border-brand-green-100 text-xs sm:text-sm text-brand-green-700 leading-relaxed font-light space-y-4">
                          {founder.fullBio.split('\n\n').map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                          <div className="pt-3 flex items-center space-x-4 border-t border-brand-green-200/50 text-[11px] font-mono text-brand-green-600">
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-brand-gold-500" />
                              <span>Est. DAWN USA & NG hubs</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 2: Board Members Grid */}
        <section id="board-members-showcase-section" className="space-y-12">
          <div className="border-b border-brand-green-100 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-900">
              Board of Directors
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light mt-1">
              Qualified leaders maintaining rigorous financial oversight, policy auditing, and legal compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {boardMembers.map((member) => (
              <div
                key={member.id}
                id={`board-card-${member.id}`}
                className="bg-white p-6 rounded-3xl border border-brand-green-100/60 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Photo & Role Line */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left space-y-5 sm:space-y-0 sm:space-x-16">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square rounded-2xl overflow-hidden shrink-0 border border-brand-green-100 shadow-inner bg-brand-green-50 mx-auto sm:mx-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover ${member.id === 'board-treasurer' ? 'object-top' : ''}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2 sm:pl-[30px]">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-green-900 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-wider text-brand-gold-600 font-bold">
                        {member.position}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-green-700 font-light leading-relaxed">
                    {member.bioIntro}
                  </p>
                </div>

                {/* Dropdown writeup */}
                <div className="mt-6 pt-4 border-t border-brand-green-50">
                  <button
                    id={`toggle-bio-btn-${member.id}`}
                    onClick={() => toggleExpand(member.id)}
                    className="w-full py-2.5 rounded-xl border border-brand-green-100 hover:border-brand-green-300 bg-brand-beige-50/50 text-xs font-semibold text-brand-green-800 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>{expandedIds[member.id] ? 'Hide Overview' : 'View Full Profile'}</span>
                    {expandedIds[member.id] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  <AnimatePresence>
                    {expandedIds[member.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3.5 bg-brand-beige-100/40 rounded-xl border border-brand-green-100 text-xs text-brand-green-700 leading-relaxed font-light">
                          {member.fullBio}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Committee Chairs & Advisors */}
        <section id="advisors-showcase-section" className="space-y-12">
          <div className="border-b border-brand-green-100 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-900">
              Directors, Advisors/Trustees
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light mt-1">
              Subject-matter technical specialists channeling focused knowledge in our education, feeding and medical programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {advisors.map((member) => (
              <div
                key={member.id}
                id={`advisor-card-${member.id}`}
                className="bg-white p-6 rounded-3xl border border-brand-green-100/60 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left space-y-5 sm:space-y-0 sm:space-x-16">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square rounded-2xl overflow-hidden shrink-0 border border-brand-green-100 shadow-inner bg-brand-green-50 mx-auto sm:mx-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2 sm:pl-[30px]">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-green-900 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-wider text-brand-gold-600 font-bold">
                        {member.position}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-green-700 font-light leading-relaxed">
                    {member.bioIntro}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-green-50">
                  <button
                    id={`toggle-bio-btn-${member.id}`}
                    onClick={() => toggleExpand(member.id)}
                    className="w-full py-2.5 rounded-xl border border-brand-green-100 hover:border-brand-green-300 bg-brand-beige-50/50 text-xs font-semibold text-brand-green-800 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>{expandedIds[member.id] ? 'Hide Overview' : 'View Full Profile'}</span>
                    {expandedIds[member.id] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  <AnimatePresence>
                    {expandedIds[member.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-3.5 bg-brand-beige-100/40 rounded-xl border border-brand-green-100 text-xs text-brand-green-700 leading-relaxed font-light">
                          {member.fullBio}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Staff Grid (Direct Brief Guideline: Position, Name, Photo) */}
        <section id="staff-showcase-section" className="space-y-12">
          <div className="border-b border-brand-green-100 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-green-900">
              Members of Staff
            </h2>
            <p className="text-xs sm:text-sm text-brand-green-600 font-light mt-1">
              Our hard-working coordinators handling logistics and local community engagement on the ground daily.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                id={`staff-card-${staff.id}`}
                className="bg-white p-4 rounded-2xl border border-brand-green-50 hover:border-brand-green-150 transition-all duration-200 text-center space-y-3"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square rounded-xl overflow-hidden shadow-inner bg-brand-green-50 mx-auto">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-green-950">
                    {staff.name}
                  </h4>
                  <p className="text-[11px] text-brand-green-600 font-medium">
                    {staff.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
