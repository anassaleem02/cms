export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface SubmitContactDto {
  name: string;
  email: string;
  phone: string;
  message: string;
}
