export interface NavItem {
  id: number;
  label: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
  openInNewTab: boolean;
}

export interface CreateNavItemDto {
  label: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
  openInNewTab: boolean;
}

export type UpdateNavItemDto = CreateNavItemDto;
