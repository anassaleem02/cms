import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial, CreateTestimonialDto, UpdateTestimonialDto } from '../models/testimonial.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private base = `${environment.apiUrl}/testimonials`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Testimonial[]> { return this.http.get<Testimonial[]>(this.base); }
  getById(id: number): Observable<Testimonial> { return this.http.get<Testimonial>(`${this.base}/${id}`); }
  create(dto: CreateTestimonialDto): Observable<Testimonial> { return this.http.post<Testimonial>(this.base, dto); }
  update(id: number, dto: UpdateTestimonialDto): Observable<Testimonial> { return this.http.put<Testimonial>(`${this.base}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
  reorder(ids: number[]): Observable<void> { return this.http.put<void>(`${this.base}/reorder`, ids); }
}
