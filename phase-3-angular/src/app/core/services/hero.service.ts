import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Hero, CreateHeroDto, UpdateHeroDto } from '../models/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private hero: Hero = {
    id: 1,
    headline: 'Power Your Future with Solar Energy',
    subheadline: 'Premium solar inverters, lithium batteries & panels with 5-year warranty. Save energy, reduce bills, and embrace sustainable living.',
    primaryButtonText: 'Explore Products',
    primaryButtonUrl: '/products',
    secondaryButtonText: 'Get Quote',
    secondaryButtonUrl: '/contact',
    backgroundImageUrl: '/images/hero/solar_img.jpg',
    isActive: true,
    stats: [
      { id: 1, value: '500+', label: 'Happy Customers', displayOrder: 0 },
      { id: 2, value: '10MW+', label: 'Power Generated', displayOrder: 1 },
      { id: 3, value: '5 Years', label: 'Warranty', displayOrder: 2 },
      { id: 4, value: '98.5%', label: 'Efficiency', displayOrder: 3 }
    ]
  };

  getActive(): Observable<Hero> {
    return of({ ...this.hero }).pipe(delay(200));
  }

  get(id: number): Observable<Hero> {
    return of({ ...this.hero }).pipe(delay(200));
  }

  update(id: number, dto: UpdateHeroDto): Observable<Hero> {
    this.hero = {
      ...this.hero,
      ...dto,
      stats: dto.stats.map((s, i) => ({ ...s, id: i + 1 }))
    };
    return of({ ...this.hero }).pipe(delay(300));
  }

  create(dto: CreateHeroDto): Observable<Hero> {
    const newHero: Hero = { ...dto, id: Date.now(), stats: dto.stats.map((s, i) => ({ ...s, id: i + 1 })) };
    this.hero = newHero;
    return of(newHero).pipe(delay(300));
  }
}
