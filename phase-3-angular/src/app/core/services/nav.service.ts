import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavItem, CreateNavItemDto, UpdateNavItemDto } from '../models/nav-item.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NavService {
  private base = `${environment.apiUrl}/navigation`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<NavItem[]> { return this.http.get<NavItem[]>(this.base); }
  getById(id: number): Observable<NavItem> { return this.http.get<NavItem>(`${this.base}/${id}`); }
  create(dto: CreateNavItemDto): Observable<NavItem> { return this.http.post<NavItem>(this.base, dto); }
  update(id: number, dto: UpdateNavItemDto): Observable<NavItem> { return this.http.put<NavItem>(`${this.base}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
  reorder(ids: number[]): Observable<void> { return this.http.put<void>(`${this.base}/reorder`, ids); }
}
