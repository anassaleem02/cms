export enum ProductCategory { Inverter = 1, Battery = 2, SolarPanel = 3, Accessory = 4 }

export interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductSpecification {
  id: number;
  key: string;
  value: string;
  displayOrder: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  categoryName: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  pdfBrochureUrl?: string;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  primaryImage?: ProductImage;
}

export interface CreateProductDto {
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  pdfBrochureUrl?: string;
}

export type UpdateProductDto = CreateProductDto;

export interface AddProductImageDto {
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface AddSpecificationDto {
  key: string;
  value: string;
  displayOrder: number;
}
