import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceItem, CreateServiceDto, UpdateServiceDto } from '../models/service-item.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServiceItemService {
  private base = `${environment.apiUrl}/services`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceItem[]> { return this.http.get<ServiceItem[]>(this.base); }
  getById(id: number): Observable<ServiceItem> { return this.http.get<ServiceItem>(`${this.base}/${id}`); }
  create(dto: CreateServiceDto): Observable<ServiceItem> { return this.http.post<ServiceItem>(this.base, dto); }
  update(id: number, dto: UpdateServiceDto): Observable<ServiceItem> { return this.http.put<ServiceItem>(`${this.base}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
  reorder(ids: number[]): Observable<void> { return this.http.put<void>(`${this.base}/reorder`, ids); }
}
