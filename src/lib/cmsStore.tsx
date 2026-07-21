import React, { createContext, useContext, useState, useEffect } from 'react';
import { Program, TeamMember, VolunteerRole, GalleryItem, PartnerBenefit } from '../types';
import {
  ABOUT_CONTENT as DEFAULT_ABOUT_CONTENT,
  PROGRAMS as DEFAULT_PROGRAMS,
  TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS,
  VOLUNTEER_ROLES as DEFAULT_VOLUNTEER_ROLES,
  PARTNERSHIP_BENEFITS as DEFAULT_PARTNERSHIP_BENEFITS,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS
} from '../data';

interface CMSContextType {
  aboutContent: typeof DEFAULT_ABOUT_CONTENT;
  programs: Program[];
  teamMembers: TeamMember[];
  volunteerRoles: VolunteerRole[];
  partnershipBenefits: PartnerBenefit[];
  galleryItems: GalleryItem[];
  
  updateAboutContent: (content: typeof DEFAULT_ABOUT_CONTENT) => void;
  updatePrograms: (programs: Program[]) => void;
  updateTeamMembers: (members: TeamMember[]) => void;
  updateVolunteerRoles: (roles: VolunteerRole[]) => void;
  updatePartnershipBenefits: (benefits: PartnerBenefit[]) => void;
  updateGalleryItems: (items: GalleryItem[]) => void;
  resetAllContent: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  aboutContent: 'dawn_cms_aboutContent',
  programs: 'dawn_cms_programs',
  teamMembers: 'dawn_cms_teamMembers',
  volunteerRoles: 'dawn_cms_volunteerRoles',
  partnershipBenefits: 'dawn_cms_partnershipBenefits',
  galleryItems: 'dawn_cms_galleryItems',
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aboutContent, setAboutContentState] = useState(DEFAULT_ABOUT_CONTENT);
  const [programs, setProgramsState] = useState<Program[]>(DEFAULT_PROGRAMS);
  const [teamMembers, setTeamMembersState] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [volunteerRoles, setVolunteerRolesState] = useState<VolunteerRole[]>(DEFAULT_VOLUNTEER_ROLES);
  const [partnershipBenefits, setPartnershipBenefitsState] = useState<PartnerBenefit[]>(DEFAULT_PARTNERSHIP_BENEFITS);
  const [galleryItems, setGalleryItemsState] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedAbout = localStorage.getItem(LOCAL_STORAGE_KEYS.aboutContent);
      if (savedAbout) setAboutContentState(JSON.parse(savedAbout));

      const savedPrograms = localStorage.getItem(LOCAL_STORAGE_KEYS.programs);
      if (savedPrograms) {
        const parsed: Program[] = JSON.parse(savedPrograms);
        const merged = [...parsed];
        DEFAULT_PROGRAMS.forEach(def => {
          if (!merged.some(m => m.id === def.id)) {
            merged.push(def);
          }
        });
        setProgramsState(merged);
      }

      const savedTeam = localStorage.getItem(LOCAL_STORAGE_KEYS.teamMembers);
      if (savedTeam) {
        const parsed: TeamMember[] = JSON.parse(savedTeam);
        const merged = [...parsed];
        DEFAULT_TEAM_MEMBERS.forEach(def => {
          if (!merged.some(m => m.id === def.id)) {
            merged.push(def);
          }
        });
        setTeamMembersState(merged);
      }

      const savedVolunteers = localStorage.getItem(LOCAL_STORAGE_KEYS.volunteerRoles);
      if (savedVolunteers) {
        const parsed: VolunteerRole[] = JSON.parse(savedVolunteers);
        const merged = [...parsed];
        DEFAULT_VOLUNTEER_ROLES.forEach(def => {
          if (!merged.some(m => m.id === def.id)) {
            merged.push(def);
          }
        });
        setVolunteerRolesState(merged);
      }

      const savedBenefits = localStorage.getItem(LOCAL_STORAGE_KEYS.partnershipBenefits);
      if (savedBenefits) {
        const parsed: PartnerBenefit[] = JSON.parse(savedBenefits);
        const merged = [...parsed];
        DEFAULT_PARTNERSHIP_BENEFITS.forEach(def => {
          if (!merged.some(m => m.title === def.title)) {
            merged.push(def);
          }
        });
        setPartnershipBenefitsState(merged);
      }

      const savedGallery = localStorage.getItem(LOCAL_STORAGE_KEYS.galleryItems);
      if (savedGallery) {
        const parsed: GalleryItem[] = JSON.parse(savedGallery);
        const merged = [...parsed];
        DEFAULT_GALLERY_ITEMS.forEach(def => {
          if (!merged.some(m => m.id === def.id)) {
            merged.push(def);
          }
        });
        setGalleryItemsState(merged);
      }
    } catch (e) {
      console.error("Failed to load CMS data from localStorage", e);
    }
  }, []);

  const updateAboutContent = (content: typeof DEFAULT_ABOUT_CONTENT) => {
    setAboutContentState(content);
    localStorage.setItem(LOCAL_STORAGE_KEYS.aboutContent, JSON.stringify(content));
  };

  const updatePrograms = (newPrograms: Program[]) => {
    setProgramsState(newPrograms);
    localStorage.setItem(LOCAL_STORAGE_KEYS.programs, JSON.stringify(newPrograms));
  };

  const updateTeamMembers = (newMembers: TeamMember[]) => {
    setTeamMembersState(newMembers);
    localStorage.setItem(LOCAL_STORAGE_KEYS.teamMembers, JSON.stringify(newMembers));
  };

  const updateVolunteerRoles = (newRoles: VolunteerRole[]) => {
    setVolunteerRolesState(newRoles);
    localStorage.setItem(LOCAL_STORAGE_KEYS.volunteerRoles, JSON.stringify(newRoles));
  };

  const updatePartnershipBenefits = (newBenefits: PartnerBenefit[]) => {
    setPartnershipBenefitsState(newBenefits);
    localStorage.setItem(LOCAL_STORAGE_KEYS.partnershipBenefits, JSON.stringify(newBenefits));
  };

  const updateGalleryItems = (newItems: GalleryItem[]) => {
    setGalleryItemsState(newItems);
    localStorage.setItem(LOCAL_STORAGE_KEYS.galleryItems, JSON.stringify(newItems));
  };

  const resetAllContent = () => {
    setAboutContentState(DEFAULT_ABOUT_CONTENT);
    setProgramsState(DEFAULT_PROGRAMS);
    setTeamMembersState(DEFAULT_TEAM_MEMBERS);
    setVolunteerRolesState(DEFAULT_VOLUNTEER_ROLES);
    setPartnershipBenefitsState(DEFAULT_PARTNERSHIP_BENEFITS);
    setGalleryItemsState(DEFAULT_GALLERY_ITEMS);

    Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  return (
    <CMSContext.Provider value={{
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
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
