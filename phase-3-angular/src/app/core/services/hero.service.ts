import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero, CreateHeroDto, UpdateHeroDto } from '../models/hero.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private base = `${environment.apiUrl}/hero`;
  constructor(private http: HttpClient) {}

  getActive(): Observable<Hero> { return this.http.get<Hero>(`${this.base}/active`); }
  get(id: number): Observable<Hero> { return this.http.get<Hero>(`${this.base}/${id}`); }
  getAll(): Observable<Hero[]> { return this.http.get<Hero[]>(this.base); }
  create(dto: CreateHeroDto): Observable<Hero> { return this.http.post<Hero>(this.base, dto); }
  update(id: number, dto: UpdateHeroDto): Observable<Hero> { return this.http.put<Hero>(`${this.base}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}
