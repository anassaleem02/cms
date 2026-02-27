import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Testimonial, CreateTestimonialDto, UpdateTestimonialDto } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private items: Testimonial[] = [
    { id: 1, customerName: 'Ahmed Khan', customerTitle: 'Homeowner, DHA Karachi', customerImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', review: "Switching to solar was the best decision for our home. The system handles all our appliances including AC effortlessly. FM's Power team was professional from consultation to installation. We've seen significant reduction in electricity bills.", rating: 5, isActive: true, displayOrder: 0 },
    { id: 2, customerName: 'Muhammad Farooq', customerTitle: 'Factory Owner, SITE Area', customerImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg', review: "Our manufacturing unit needed reliable power, and FM's Power delivered beyond expectations. The 6.2KW inverter system handles our heavy machinery effortlessly. Highly recommended for industrial applications!", rating: 5, isActive: true, displayOrder: 1 },
    { id: 3, customerName: 'Farhan Rizvi', customerTitle: 'Homeowner, Gulshan-e-Iqbal', customerImageUrl: 'https://randomuser.me/api/portraits/men/67.jpg', review: "Living in Karachi with frequent load shedding, the FM's Power system has been a game-changer. The lithium battery backup keeps our home running smoothly during outages. Excellent service!", rating: 5, isActive: true, displayOrder: 2 },
    { id: 4, customerName: 'Dr. Hassan Ali', customerTitle: 'Medical Clinic Owner, Clifton', customerImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg', review: "A medical clinic cannot afford power interruptions. FM's Power installed a system that handles our medical equipment and air conditioning seamlessly. Outstanding investment!", rating: 5, isActive: true, displayOrder: 3 },
    { id: 5, customerName: 'Imran Sheikh', customerTitle: 'Shop Owner, Saddar', customerImageUrl: 'https://randomuser.me/api/portraits/men/75.jpg', review: "I run an electronics shop and needed reliable power backup. FM's Power provided the perfect solution. The 5-year warranty gives peace of mind. Very satisfied!", rating: 5, isActive: true, displayOrder: 4 }
  ];

  getAll(activeOnly = true): Observable<Testimonial[]> {
    return of(activeOnly ? this.items.filter(t => t.isActive) : this.items).pipe(delay(300));
  }

  getById(id: number): Observable<Testimonial | undefined> {
    return of(this.items.find(t => t.id === id)).pipe(delay(200));
  }

  create(dto: CreateTestimonialDto): Observable<Testimonial> {
    const item: Testimonial = { ...dto, id: Date.now() };
    this.items.push(item);
    return of(item).pipe(delay(300));
  }

  update(id: number, dto: UpdateTestimonialDto): Observable<Testimonial> {
    const idx = this.items.findIndex(t => t.id === id);
    if (idx !== -1) this.items[idx] = { ...this.items[idx], ...dto };
    return of(this.items[idx]).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.items = this.items.filter(t => t.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
