export interface Faq {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CreateFaqDto {
  question: string;
  answer: string;
  isActive: boolean;
  displayOrder: number;
}

export type UpdateFaqDto = CreateFaqDto;
