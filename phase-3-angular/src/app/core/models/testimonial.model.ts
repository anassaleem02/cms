export interface Testimonial {
  id: number;
  customerName: string;
  customerTitle: string;
  customerImageUrl: string;
  review: string;
  rating: number;
  isActive: boolean;
  displayOrder: number;
}

export interface CreateTestimonialDto {
  customerName: string;
  customerTitle: string;
  customerImageUrl: string;
  review: string;
  rating: number;
  isActive: boolean;
  displayOrder: number;
}

export type UpdateTestimonialDto = CreateTestimonialDto;
