import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaFile } from '../models/media.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private base = `${environment.apiUrl}/media`;
  constructor(private http: HttpClient) {}

  getAll(contentType?: string, tags?: string): Observable<MediaFile[]> {
    let params: any = {};
    if (contentType) params['contentType'] = contentType;
    if (tags) params['tags'] = tags;
    return this.http.get<MediaFile[]>(this.base, { params });
  }

  upload(file: File, tags?: string): Observable<MediaFile> {
    const formData = new FormData();
    formData.append('file', file);
    if (tags) formData.append('tags', tags);
    return this.http.post<MediaFile>(`${this.base}/upload`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
