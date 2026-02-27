export interface MediaFile {
  id: number;
  fileName: string;
  originalFileName: string;
  url: string;
  contentType: string;
  fileSize: number;
  tags?: string;
  createdAt: string;
}
