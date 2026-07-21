import { Program, TeamMember, VolunteerRole, GalleryItem } from './types';

export const ABOUT_CONTENT = {
  founderMessage: "Dr. Aghogho Omene-Iroro established DAWN Foundation in memory of her late father, carrying forward his lifelong belief that generosity has the power to transform lives. Under her leadership, our collective mission is to extend dignified opportunities to underserved families, creating generational change and community-driven hope across the United States and Nigeria.",
  legacy: "The legacy of HRM Samson Okirhioboh Omene forms the cornerstone of the DAWN Foundation. As a respected leader, his life was defined by active philanthropy, kindness, and building community resilience. We carry forward this royal legacy of pure generosity, treating every individual and family with dignity and sovereign respect regardless of circumstance, and striving to ensure that no one goes uneducated, untreated, or unfed.",
  mission: "To honor the legacy of generosity by providing dignified access to education, healthcare, and nourishment for underserved communities in the United States and Nigeria, transforming individual lives and breaking cycles of poverty through compassion.",
  vision: "A world where no one goes hungry, untreated, or uneducated—where the legacy of one king's generosity multiplies into a movement of compassion that transcends borders and uplifts communities.",
  coreValues: [
    {
      title: "Dignified Access",
      description: "Providing services and opportunities that respect individual self-worth and promote community honor."
    },
    {
      title: "Empathetic Action",
      description: "Meeting the community exactly where they are with genuine listening, tailored support, and deep-seated compassion."
    },
    {
      title: "Legacy of Stewardship",
      description: "Honoring and preserving a heritage of community-first responsibility and generational transparency."
    },
    {
      title: "Impact & Integrity",
      description: "Exercising meticulous accountability with all charitable investments, focusing resources directly on lives changed."
    }
  ]
};

export const PROGRAMS: Program[] = [
  {
    id: "education",
    title: "Education Access",
    shortDescription: "Empowering young minds through scholarships, school supply drives, and digital literacy initiatives.",
    longDescription: "Education is the most powerful catalyst for breaking cycle-based generational poverty. Through targeted academic sponsorships, we supply basic educational essentials, books, and specialized resources to public schools. We support promising students in the US and Nigeria to secure standard primary, secondary, and higher-institution qualifications.",
    whyItMatters: "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    iconName: "GraduationCap",
    programsList: [
      "Scholarships & Tuition Grants",
      "School Supply Drives & Back-to-School Kits",
      "Youth Mentorship & Career Guidance Initiatives",
      "Adult Literacy & Digital Training Programs"
    ],
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Scholarships Awarded", count: "140", suffix: "+" },
      { label: "Schools Supported", count: "12", suffix: "" },
      { label: "Students Reached", count: "1500", suffix: "+" }
    ],
    ctaText: "Educate a child"
  },
  {
    id: "healthcare",
    title: "Healthcare Access",
    shortDescription: "Providing free regional health screenings, preventive education, and support in partnership with local clinics.",
    longDescription: "A healthy community is the baseline of prosperity. In many underserved neighborhoods, critical diagnostics are unavailable or unaffordable. We organize community medical missions, supply screening resources, and partner with regional clinics to provide basic health care and health safety education.",
    whyItMatters: "It is health that is real wealth and not pieces of gold and silver. - Mahatma Gandhi",
    iconName: "HeartPulse",
    programsList: [
      "Community Medical Missions",
      "Free Health Screenings (Hypertension, Diabetes, Vision, Hearing)",
      "Preventive Healthcare Workshops",
      "Clinic Partnerships (Spatium Urgent Care, Dawn Primary Care)"
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Medical Screenings", count: "3200", suffix: "+" },
      { label: "Partner Clinics", count: "2", suffix: "" },
      { label: "Health Talks Hosted", count: "45", suffix: "" }
    ],
    ctaText: "Support an Uninsured Person's Healthcare"
  },
  {
    id: "food-security",
    title: "Food Security",
    shortDescription: "Combating immediate hunger via community food drives, pantry sponsorships, and holiday nutrition programs.",
    longDescription: "Food insecurity deprives children of focus and robs families of peace. We provide relief packages containing dry foods to families facing economic hardship. Our food initiatives collaborate with local grocers, community kitchens, and agricultural partners.",
    whyItMatters: "Food is the moral right of all who are born into this world. - Norman Borlaug",
    iconName: "Soup",
    programsList: [
      "Community Food Drives & Nutrition Hampers",
      "Holiday Warm Meal Initiatives",
      "Local Food Pantry Partnerships",
      "Emergency Relief Grocery Packs"
    ],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
    stats: [
      { label: "Meals Distributed", count: "25000", suffix: "+" },
      { label: "Families Supported", count: "850", suffix: "+" },
      { label: "Food Hubs Sponsored", count: "8", suffix: "" }
    ],
    ctaText: "Feed a hungry person"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Dr. Aghogho Omene-Iroro, MD",
    role: "founder",
    position: "Founder & President",
    image: "https://www.dawnfdn.org/_next/image?url=%2Fimages%2Ffounder-3.webp&w=1080&q=75",
    bioIntro: "Dr. Aghogho Omene-Iroro, MD, is a physician entrepreneur, philanthropist, and healthcare leader with over 15 years of experience building and scaling healthcare organizations.",
    fullBio: "Dr. Aghogho Omene-Iroro, MD, is a physician entrepreneur, philanthropist, and healthcare leader with over 15 years of experience building and scaling healthcare organizations. She is the founder of Spatium Urgent Care, Dawn Primary Care, and Spatium Wellness in Marietta, Georgia, where she has dedicated her career to expanding access to quality healthcare while empowering individuals to live healthier lives.\n\nIn January 2025, Dr. Iroro founded DAWN Foundation in honor of her late father, whose generosity, compassion, and unwavering commitment to serving others left a lasting impact on everyone who knew him.\n\nAs Founder and President of DAWN Foundation, Dr. Iroro leads the organization's strategic vision and oversees initiatives focused on education, healthcare, and food security for underserved communities in the United States and Nigeria. She also plays an active role in the foundation's medical missions, ensuring that its programs reflect the values of compassion, dignity, excellence, and service that inspired its creation.\n\nPrior to establishing DAWN Foundation, Dr. Iroro gained extensive experience in community service and nonprofit engagement through her work with Arms of Care Charity in Georgia, United States. She spearheaded fundraising efforts for a charitable campaign, volunteered at medical outreach programs, and provided health education and sensitization to individuals and families, helping to improve health awareness and access to care within underserved communities.\n\nHer commitment to global health and service also extends to Nigeria, where she collaborated with a local charity organization in Delta State to organize and participate in medical outreach initiatives, delivering healthcare services and support to communities in need.\n\nInspired by her father's legacy, Dr. Iroro established DAWN Foundation to carry forward his belief that generosity changes lives. Through scholarships, medical outreach, nourishment programs, and community partnerships, the foundation works to create opportunities, restore hope, and improve the lives of individuals and families in need.\n\nThrough her work in healthcare, business, philanthropy, and community development, Dr. Iroro continues to champion a simple but powerful belief: that generosity has the power to transform lives, strengthen communities, and create lasting change for generations to come."
  },
  {
    id: "board-president",
    name: "Aghogho Omene-Iroro, MD",
    role: "board",
    position: "President & Executive Director",
    image: "https://www.dawnfdn.org/_next/image?url=%2Fimages%2Ffounder-3.webp&w=1080&q=75",
    bioIntro: "Aghogho Omene-Iroro, MD, is a physician entrepreneur, philanthropist, and healthcare leader with over 15 years of experience...",
    fullBio: "Aghogho Omene-Iroro, MD, is a physician entrepreneur, philanthropist, and healthcare leader with over 15 years of experience building and scaling healthcare organizations. She is the founder of Spatium Urgent Care, Dawn Primary Care, and Spatium Wellness in Marietta, Georgia, where she has dedicated her career to expanding access to quality healthcare while empowering individuals to live healthier lives.\n\nIn January 2025, Dr. Iroro founded DAWN Foundation in honor of her late father, whose generosity, compassion, and unwavering commitment to serving others left a lasting impact on everyone who knew him.\n\nAs Founder and President of DAWN Foundation, Dr. Iroro leads the organization's strategic vision and oversees initiatives focused on education, healthcare, and food security for underserved communities in the United States and Nigeria. She also plays an active role in the foundation's medical missions, ensuring that its programs reflect the values of compassion, dignity, excellence, and service that inspired its creation.\n\nPrior to establishing DAWN Foundation, Dr. Iroro gained extensive experience in community service and nonprofit engagement through her work with Arms of Care Charity in Georgia, United States. She spearheaded fundraising efforts for a charitable campaign, volunteered at medical outreach programs, and provided health education and sensitization to individuals and families, helping to improve health awareness and access to care within underserved communities.\n\nHer commitment to global health and service also extends to Nigeria, where she collaborated with a local charity organization in Delta State to organize and participate in medical outreach initiatives, delivering healthcare services and support to communities in need.\n\nInspired by her father's legacy, Dr. Iroro established DAWN Foundation to carry forward his belief that generosity changes lives. Through scholarships, medical outreach, nourishment programs, and community partnerships, the foundation works to create opportunities, restore hope, and improve the lives of individuals and families in need.\n\nThrough her work in healthcare, business, philanthropy, and community development, Dr. Iroro continues to champion a simple but powerful belief: that generosity has the power to transform lives, strengthen communities, and create lasting change for generations to come."
  },
  {
    id: "board-vp",
    name: "Will Carter, III, MD, DHA, MS",
    role: "board",
    position: "Board Member",
    image: "https://res.cloudinary.com/dpsvazol5/image/upload/v1781872536/Dr._Will_Carter_s_Photo_lmskmc.png",
    bioIntro: "Will Carter, III, MD, DHA, MS is a physician, healthcare strategist, philanthropist, and consultant with...",
    fullBio: "Will Carter, III, MD, DHA, MS is a physician, healthcare strategist, philanthropist, and consultant with expertise in population health, healthcare quality, community health, and clinical AI governance. His work focuses on improving health outcomes and expanding opportunities for underserved, rural, resource-limited, and marginalized communities through innovative partnerships, evidence-based programs, and sustainable systems transformation. From a philanthropic standpoint, Dr. Carter is committed to empowering individuals and communities through education, health literacy, scholarship opportunities, and community engagement. He serves as Chief Executive Officer of the Third Generation Carter Foundation, where he helps lead initiatives designed to create meaningful and lasting impact for future generations. Throughout his career, Dr. Carter has collaborated with academic, nonprofit, healthcare, and public health organizations on projects involving maternal and child health, chronic disease prevention, workforce development, and rural health equity. His leadership is guided by a strong belief in accountability, transparency, integrity, and service."
  },
  {
    id: "board-treasurer",
    name: "Ramsey Joudeh, MD",
    role: "board",
    position: "Board Member",
    image: "https://res.cloudinary.com/dpsvazol5/image/upload/v1781872667/Dr._Joudeh_s_Photo_cfitls.jpg",
    bioIntro: "Ramsey H. Joudeh is a board-certified Internal Medicine physician, healthcare executive, entrepreneur, and...",
    fullBio: "Ramsey H. Joudeh is a board-certified Internal Medicine physician, healthcare executive, entrepreneur, and educator dedicated to improving healthcare delivery and patient outcomes. With over a decade of leadership experience across hospitals, addiction treatment centers, rehabilitation programs, and private medical organizations, he has built and scaled healthcare systems focused on efficiency, innovation, and compassionate care. As Medical Director of an Intermediate ICU/Progressive Care Unit at a major New York City hospital, Dr. Joudeh leads multidisciplinary teams while mentoring the next generation of physicians. He is also the Founder and CEO/CMO of Artisans of Medicine NYC, a multispecialty healthcare organization serving underserved communities. Beyond medicine, Dr. Joudeh develops wellness and lifestyle ventures centered on innovation, education, and responsible industry transformation. A father of five and lifelong student, he is committed to building institutions, empowering others, and creating a lasting impact through service, leadership, and innovation."
  },
  {
    id: "member-large",
    name: "James B. Martin, MBA",
    role: "advisor",
    position: "Director Of Programs",
    image: "https://res.cloudinary.com/dpsvazol5/image/upload/v1781873480/Director_of_Programs_Photo_gbxznj.jpg",
    bioIntro: "James B. Martin, MBA is an executive leader and financial strategist who pairs a decade of healthcare...",
    fullBio: "James B. Martin, MBA is an executive leader and financial strategist who pairs a decade of healthcare management experience with a deep commitment to global humanitarian impact. Serving as the Chief Financial Officer (CFO) for Arms of Care International since 2019, James directs the organization’s global financial strategy, donation tracking, and grant management. His leadership is central to driving international medical initiatives, including overseeing complex budgets and logistics for multi- disciplinary community health deployments in Eswatini. Armed with an MBA, James specializes in transforming philanthropic visions into transparent, sustainable, and highly compliant operational models that maximize community outcomes."
  },
  {
    id: "committee-chair",
    name: "Princess Ibekwe-Onwueme, MHA, BA, BSN, RN",
    role: "advisor",
    position: "Director Of Healthcare Services",
    image: "https://res.cloudinary.com/dpsvazol5/image/upload/v1781873564/Director_of_Healthcare_services_Photo_uakcie.jpg",
    bioIntro: "Princess Ibekwe-Onwueme, MHA, BA, BSN, RN is a distinguished healthcare executive, educator, and public...",
    fullBio: "Princess Ibekwe-Onwueme, MHA, BA, BSN, RN is a distinguished healthcare executive, educator, and public health leader with extensive experience in clinical practice, healthcare administration, and community health. She previously served as Clinical Director of Cobb &amp; Douglas Public Health, where she provided strategic leadership for nursing and clinical services, oversaw public health programs, and advanced initiatives focused on improving community health outcomes. A dedicated Registered Nurse and experienced Case Manager, Princess has a strong background in patient- centered care, care coordination, disease prevention, health promotion, quality improvement, and population health management. Her work has consistently focused on expanding access to care, improving healthcare delivery, and promoting health equity across diverse populations. In addition to her leadership and clinical expertise, Princess is committed to developing the next generation of healthcare professionals. As a Clinical Instructor, she mentors nursing students and healthcare trainees, fostering excellence and evidence-based practice. She is also a certified CPR and QPR (Question, Persuade, Refer) Instructor, equipping healthcare professionals and community members with lifesaving skills in emergency response, suicide prevention, and mental health awareness. Recognized for her collaborative leadership style and dedication to public service, Princess continues to champion innovative healthcare strategies, workforce development, and high-quality care that strengthens the health and well-being of individuals, families, and communities."
  },
  {
    id: "staff-1",
    name: "Chiamaka Okwara",
    role: "staff",
    position: "Social Media Coordinator",
    image: "https://res.cloudinary.com/dcxy05pvc/image/upload/v1784636168/IMG_6887.JPG_xk3ko6.jpg",
    bioIntro: "Drives community mobilization, social storytelling, and cross-channel content strategies.",
    fullBio: "Chiamaka Okwara is a marketing communications strategist with a deep passion for digital storytelling and community-led brand development. Working closely with global teams, Chiamaka designs social messaging frameworks and cross-platform outreach programs that translate educational scholarship initiatives into high-impact visual stories. Directing brand partnerships and media workflows, she works on the front lines ensuring transparent community relations and robust volunteer networks."
  },
  {
    id: "staff-2",
    name: "Yetunde Oseni",
    role: "staff",
    position: "Program Coordinator",
    image: "https://res.cloudinary.com/dpsvazol5/image/upload/v1781873015/Yetunde_Oseni_s_Photo_pjsjcc.jpg",
    bioIntro: "Oversees local administrative operations, project execution, and on-ground logistics.",
    fullBio: "Yetunde Oseni is a program director and operations specialist focused on civil society partnerships and community relief. With a strong track record of organizing distribution clinics and school-focused outreach logistics, she ensures every program delivers maximum, direct value to recipient children and families. Yetunde leads resource distribution, coordinate supply runs, and coordinates with local partners to scale our geographic reach."
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: "vol-edu",
    title: "Education Volunteer",
    category: "Education",
    responsibilities: [
      "Tutoring elementary, middle and high-school students in core subjects (Math, English, Science).",
      "Mentoring youth to develop public speaking, vocational goals, and digital basics.",
      "Assisting in regional school supply distributions and school facility support."
    ],
    applyLink: "#register-volunteer"
  },
  {
    id: "vol-health",
    title: "Healthcare Outreach Volunteer",
    category: "Healthcare",
    responsibilities: [
      "Assisting with clinical tasks (Healthcare Workers)",
      "Distributing informational wellness materials and guiding patient entry workflows.",
      "Aiding the nursing teams with event operations, crowd direction, and setup packing."
    ],
    applyLink: "#register-volunteer"
  },
  {
    id: "vol-food",
    title: "Food Distribution Volunteer",
    category: "Food Distribution",
    responsibilities: [
      "Sorting, sanitizing, and neatly packing dry food into weekly family packs.",
      "Directing curbside pick-ups or delivering meal packs directly to high-risk elderly residents.",
      "Keeping pantry inventory logs accurate and preparing clean tables for holiday meals."
    ],
    applyLink: "#register-volunteer"
  },
  {
    id: "vol-media",
    title: "Media & Communications Volunteer",
    category: "Media",
    responsibilities: [
      "Capturing beautiful professional landscape and portrait photography at official outreaches.",
      "Designing simple, impact-focused graphic stories and social video summaries.",
      "Drafting community impact stories, medium articles, and newsletter updates."
    ],
    applyLink: "#register-volunteer"
  },
  {
    id: "vol-admin",
    title: "Administrative Volunteer",
    category: "Administrative",
    responsibilities: [
      "Supporting database records, tracking volunteer attendance, and answering direct emails.",
      "Coordinating local volunteer schedules and organizing calendar invitations for alignments.",
      "Assisting program leads in general coordination tasks, phone calls, and documentation."
    ],
    applyLink: "#register-volunteer"
  }
];

export const PARTNERSHIP_BENEFITS = [
  {
    title: "Sustained Community Impact",
    description: "Align your organization with direct, traceable efforts in health diagnostics, education sponsorships, and food networks."
  },
  {
    title: "Corporate Social Responsibility",
    description: "Fulfill key Corporate Social Responsibility targets with reliable, legally audited projects across the United States and Nigeria."
  },
  {
    title: "Inspiring Team Joint Initiatives",
    description: "Engage your workforce in customized team-building volunteering days in our community drives."
  },
  {
    title: "Transparent Reporting & Branding",
    description: "Highlight your generous sponsorship in our public press releases, digital banners, and annual transparent reports."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600",
    caption: "Handing out specialized study notebooks and school backpacks to children in Nigeria."
  },
  {
    id: "gal-2",
    category: "Medical Outreach",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    caption: "A volunteer nurse carrying out free blood pressure screenings during a weekend healthcare camp."
  },
  {
    id: "gal-3",
    category: "Food Distribution",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
    caption: "Local community volunteers preparing healthy hot meals during the holiday food program."
  },
  {
    id: "gal-4",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
    caption: "Community alignment gathering where community leaders and Board members coordinate upcoming health screening dates."
  },
  {
    id: "gal-5",
    category: "Volunteers",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4467902d40?auto=format&fit=crop&q=80&w=600",
    caption: "Our incredible support volunteers taking a quick warm group portrait before starting a food drive."
  },
  {
    id: "gal-6",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    caption: "A bright literacy session focused on introducing primary digital tools to students in underprivileged districts."
  }
];
