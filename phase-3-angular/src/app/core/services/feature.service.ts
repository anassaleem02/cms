import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Feature, CreateFeatureDto, UpdateFeatureDto } from '../models/feature.model';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private items: Feature[] = [
    { id: 1, title: 'High Efficiency', description: '98.5% power conversion efficiency ensures maximum energy utilization.', icon: 'zap', isActive: true, displayOrder: 0 },
    { id: 2, title: 'Smart Monitoring', description: 'Real-time monitoring via mobile app. Track energy production anytime.', icon: 'smartphone', isActive: true, displayOrder: 1 },
    { id: 3, title: 'Advanced Protection', description: 'Multi-layered protection against lightning, overload, and temperature extremes.', icon: 'shield', isActive: true, displayOrder: 2 },
    { id: 4, title: 'MPPT Technology', description: 'Advanced MPPT technology optimizes energy harvest throughout the day.', icon: 'trending-up', isActive: true, displayOrder: 3 },
    { id: 5, title: 'Remote Management', description: 'Control your solar system remotely via smartphone from anywhere.', icon: 'wifi', isActive: true, displayOrder: 4 },
    { id: 6, title: 'Modular Design', description: 'Expandable system design allows you to scale as your needs grow.', icon: 'layers', isActive: true, displayOrder: 5 }
  ];

  getAll(activeOnly = true): Observable<Feature[]> {
    return of(activeOnly ? this.items.filter(f => f.isActive) : this.items).pipe(delay(300));
  }

  getById(id: number): Observable<Feature | undefined> {
    return of(this.items.find(f => f.id === id)).pipe(delay(200));
  }

  create(dto: CreateFeatureDto): Observable<Feature> {
    const item: Feature = { ...dto, id: Date.now() };
    this.items.push(item);
    return of(item).pipe(delay(300));
  }

  update(id: number, dto: UpdateFeatureDto): Observable<Feature> {
    const idx = this.items.findIndex(f => f.id === id);
    if (idx !== -1) this.items[idx] = { ...this.items[idx], ...dto };
    return of(this.items[idx]).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.items = this.items.filter(f => f.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
