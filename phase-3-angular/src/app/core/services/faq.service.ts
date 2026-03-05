import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faq, CreateFaqDto, UpdateFaqDto } from '../models/faq.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private base = `${environment.apiUrl}/faqs`;
  constructor(private http: HttpClient) {}

  getAll(activeOnly = true): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${this.base}?activeOnly=${activeOnly}`);
  }

  getById(id: number): Observable<Faq> {
    return this.http.get<Faq>(`${this.base}/${id}`);
  }

  create(dto: CreateFaqDto): Observable<Faq> {
    return this.http.post<Faq>(this.base, dto);
  }

  update(id: number, dto: UpdateFaqDto): Observable<Faq> {
    return this.http.put<Faq>(`${this.base}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  reorder(orderedIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.base}/reorder`, orderedIds);
  }
}
