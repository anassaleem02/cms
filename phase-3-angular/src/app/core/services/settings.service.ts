import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteSettings, UpdateSiteSettingsDto } from '../models/site-settings.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private base = `${environment.apiUrl}/settings`;
  constructor(private http: HttpClient) {}

  get(): Observable<SiteSettings> { return this.http.get<SiteSettings>(this.base); }
  update(dto: UpdateSiteSettingsDto): Observable<SiteSettings> { return this.http.put<SiteSettings>(this.base, dto); }
}
