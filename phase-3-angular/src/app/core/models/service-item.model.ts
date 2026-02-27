export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CreateServiceDto {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  displayOrder: number;
}

export type UpdateServiceDto = CreateServiceDto;
