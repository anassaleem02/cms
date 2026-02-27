import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature, CreateFeatureDto, UpdateFeatureDto } from '../models/feature.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private base = `${environment.apiUrl}/features`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Feature[]> { return this.http.get<Feature[]>(this.base); }
  getById(id: number): Observable<Feature> { return this.http.get<Feature>(`${this.base}/${id}`); }
  create(dto: CreateFeatureDto): Observable<Feature> { return this.http.post<Feature>(this.base, dto); }
  update(id: number, dto: UpdateFeatureDto): Observable<Feature> { return this.http.put<Feature>(`${this.base}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
  reorder(ids: number[]): Observable<void> { return this.http.put<void>(`${this.base}/reorder`, ids); }
}
