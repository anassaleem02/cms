import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardAnalytics {
  totalProducts: number;
  totalMessages: number;
  unreadMessages: number;
  totalTestimonials: number;
  totalServices: number;
  totalFeatures: number;
  totalMediaFiles: number;
  recentMessages: any[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAnalytics(): Observable<DashboardAnalytics> {
    return this.http.get<DashboardAnalytics>(`${environment.apiUrl}/dashboard/analytics`);
  }
}
