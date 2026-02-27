export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CreateFeatureDto {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

export type UpdateFeatureDto = CreateFeatureDto;
