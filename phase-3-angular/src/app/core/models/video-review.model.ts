export interface VideoReview {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CreateVideoReviewDto {
  title: string;
  description: string;
  youtubeUrl: string;
  isActive: boolean;
  displayOrder: number;
}

export type UpdateVideoReviewDto = CreateVideoReviewDto;
