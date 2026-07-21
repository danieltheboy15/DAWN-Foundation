export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  programsList: string[];
  whyItMatters: string;
  image: string;
  stats?: { label: string; count?: string; suffix?: string }[];
  ctaText: string;
  benefits?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'founder' | 'board' | 'advisor' | 'staff';
  position: string;
  image: string;
  bioIntro: string;
  fullBio?: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  category: 'Education' | 'Healthcare' | 'Food Distribution' | 'Media' | 'Administrative';
  responsibilities: string[];
  applyLink: string;
}

export interface PartnerBenefit {
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  category: 'Education' | 'Medical Outreach' | 'Food Distribution' | 'Community' | 'Volunteers';
  imageUrl: string;
  caption: string;
}
