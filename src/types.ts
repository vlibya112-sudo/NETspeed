export interface SpeedResult {
  download: number; // Mbps
  upload: number; // Mbps
  ping: number; // ms
  jitter: number; // ms
  packetLoss: number; // %
  bufferbloatScore: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  isp: string;
  ip: string;
  location: string;
  networkType: string;
  timestamp: string;
}

export type TestPhase = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

export interface ServerLocation {
  id: string;
  name: string;
  country: string;
  flag: string;
  city: string;
  host: string;
  distance: string;
}

export interface AppSuitability {
  id: string;
  name: string;
  nameAr: string;
  iconName: string;
  category: 'gaming' | 'streaming' | 'work' | 'browsing';
  minDownload: number;
  minUpload: number;
  maxPing: number;
  maxJitter: number;
  description: string;
  descriptionAr: string;
}

export interface ISPData {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  countryAr: string;
  logoColor: string;
  avgDownload: number;
  avgUpload: number;
  avgPing: number;
  rating: number;
  totalVotes: number;
  technologies: string[];
  pros: string[];
  cons: string[];
}

export interface SEOLandingPageData {
  slug: string;
  keyword: string;
  keywordAr: string;
  title: string;
  metaDesc: string;
  h1: string;
  ispFocus?: string;
  technology?: string;
  region: string;
  contentAr: string;
  faqs: { question: string; answer: string }[];
  searchVolumeEstimated: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AdUnitConfig {
  id: string;
  name: string;
  nameAr: string;
  dimensions: string;
  placement: string;
  placementAr: string;
  purpose: string;
  ctrEstimate: string;
  rpmEstimate: string;
  policyNotes: string;
  policyNotesAr: string;
  clsProtection: string;
}

export interface TechLibraryAnalysis {
  name: string;
  license: string;
  stars: string;
  pros: string[];
  cons: string[];
  bandwidthCostScore: string;
  recommendedRole: string;
}

export type ColorThemeId = 'cyan' | 'emerald' | 'violet' | 'crimson' | 'amber' | 'ocean' | 'obsidian';

export interface ColorTheme {
  id: ColorThemeId;
  nameAr: string;
  nameEn: string;
  primary: string;
  primaryHover: string;
  accent: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  gaugeGradient: [string, string, string];
  glowClass: string;
  badgeBg: string;
  badgeText: string;
  bgLight: string;
  bgDark: string;
}
