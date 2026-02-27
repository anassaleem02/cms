export interface SiteSettings {
  id: number;
  siteName: string;
  tagLine: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  email: string;
  whatsApp: string;
  address: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  googleAnalyticsId?: string;
  metaTitle?: string;
  metaDescription?: string;
  businessHours: string;
}

export type UpdateSiteSettingsDto = Omit<SiteSettings, 'id'>;
