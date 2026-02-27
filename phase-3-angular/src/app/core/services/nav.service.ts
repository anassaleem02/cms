import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { NavItem, CreateNavItemDto, UpdateNavItemDto } from '../models/nav-item.model';

@Injectable({ providedIn: 'root' })
export class NavService {
  private items: NavItem[] = [
    { id: 1, label: 'Home', url: '/', isActive: true, displayOrder: 0, openInNewTab: false },
    { id: 2, label: 'Products', url: '/products', isActive: true, displayOrder: 1, openInNewTab: false },
    { id: 3, label: 'About', url: '/about', isActive: true, displayOrder: 2, openInNewTab: false },
    { id: 4, label: 'Contact', url: '/contact', isActive: true, displayOrder: 3, openInNewTab: false }
  ];

  getAll(activeOnly = true): Observable<NavItem[]> {
    const sorted = [...(activeOnly ? this.items.filter(n => n.isActive) : this.items)]
      .sort((a, b) => a.displayOrder - b.displayOrder);
    return of(sorted).pipe(delay(200));
  }

  getById(id: number): Observable<NavItem | undefined> {
    return of(this.items.find(n => n.id === id)).pipe(delay(200));
  }

  create(dto: CreateNavItemDto): Observable<NavItem> {
    const item: NavItem = { ...dto, id: Date.now() };
    this.items.push(item);
    return of(item).pipe(delay(300));
  }

  update(id: number, dto: UpdateNavItemDto): Observable<NavItem> {
    const idx = this.items.findIndex(n => n.id === id);
    if (idx !== -1) this.items[idx] = { ...this.items[idx], ...dto };
    return of(this.items[idx]).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.items = this.items.filter(n => n.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
