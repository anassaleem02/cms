import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ServiceItem, CreateServiceDto, UpdateServiceDto } from '../models/service-item.model';

@Injectable({ providedIn: 'root' })
export class ServiceItemService {
  private items: ServiceItem[] = [
    { id: 1, title: 'Professional Installation', description: 'Expert installation team ensures your solar system is set up correctly and safely.', icon: 'tool', isActive: true, displayOrder: 0 },
    { id: 2, title: 'Maintenance & Support', description: 'Regular maintenance services and 24/7 technical support to keep your system running optimally.', icon: 'settings', isActive: true, displayOrder: 1 },
    { id: 3, title: 'Consultation & Planning', description: 'Free consultation to design the perfect solar system for your specific needs and budget.', icon: 'clipboard', isActive: true, displayOrder: 2 },
    { id: 4, title: '5-Year Warranty', description: 'Comprehensive 5-year warranty on all products with guaranteed performance and reliability.', icon: 'award', isActive: true, displayOrder: 3 },
    { id: 5, title: 'System Monitoring', description: 'Continuous monitoring and optimization of your solar system for peak performance.', icon: 'activity', isActive: true, displayOrder: 4 },
    { id: 6, title: 'Custom Solutions', description: 'Tailor-made solar solutions for homes, businesses, and industrial applications.', icon: 'package', isActive: true, displayOrder: 5 }
  ];

  getAll(activeOnly = true): Observable<ServiceItem[]> {
    return of(activeOnly ? this.items.filter(s => s.isActive) : this.items).pipe(delay(300));
  }

  getById(id: number): Observable<ServiceItem | undefined> {
    return of(this.items.find(s => s.id === id)).pipe(delay(200));
  }

  create(dto: CreateServiceDto): Observable<ServiceItem> {
    const item: ServiceItem = { ...dto, id: Date.now() };
    this.items.push(item);
    return of(item).pipe(delay(300));
  }

  update(id: number, dto: UpdateServiceDto): Observable<ServiceItem> {
    const idx = this.items.findIndex(s => s.id === id);
    if (idx !== -1) this.items[idx] = { ...this.items[idx], ...dto };
    return of(this.items[idx]).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.items = this.items.filter(s => s.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
