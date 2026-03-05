import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoReview, CreateVideoReviewDto, UpdateVideoReviewDto } from '../models/video-review.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VideoReviewService {
  private base = `${environment.apiUrl}/video-reviews`;
  constructor(private http: HttpClient) {}

  getAll(activeOnly = true): Observable<VideoReview[]> {
    return this.http.get<VideoReview[]>(`${this.base}?activeOnly=${activeOnly}`);
  }

  getById(id: number): Observable<VideoReview> {
    return this.http.get<VideoReview>(`${this.base}/${id}`);
  }

  create(dto: CreateVideoReviewDto): Observable<VideoReview> {
    return this.http.post<VideoReview>(this.base, dto);
  }

  update(id: number, dto: UpdateVideoReviewDto): Observable<VideoReview> {
    return this.http.put<VideoReview>(`${this.base}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  reorder(orderedIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.base}/reorder`, orderedIds);
  }
}
