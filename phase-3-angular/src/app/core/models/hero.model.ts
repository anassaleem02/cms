export interface HeroStat {
  id: number;
  value: string;
  label: string;
  displayOrder: number;
}

export interface Hero {
  id: number;
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  backgroundImageUrl: string;
  isActive: boolean;
  stats: HeroStat[];
}

export interface CreateHeroDto {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  backgroundImageUrl: string;
  isActive: boolean;
  stats: { value: string; label: string; displayOrder: number; }[];
}

export type UpdateHeroDto = CreateHeroDto;
