import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactMessage, SubmitContactDto } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private messages: ContactMessage[] = [
    { id: 1, name: 'Ali Hassan', email: 'ali@example.com', phone: '0300-1234567', message: 'I want to know about solar system pricing for my home.', isRead: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: 2, name: 'Sara Ahmed', email: 'sara@example.com', phone: '0312-9876543', message: 'Please contact me regarding the 4KW inverter package.', isRead: true, readAt: new Date().toISOString(), createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 3, name: 'Tariq Mehmood', email: 'tariq@example.com', phone: '0333-5555555', message: 'Need a quote for commercial solar installation.', isRead: false, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
  ];

  submit(dto: SubmitContactDto): Observable<ContactMessage> {
    const message: ContactMessage = {
      ...dto, id: Date.now(), isRead: false,
      createdAt: new Date().toISOString()
    };
    this.messages.unshift(message);
    return of(message).pipe(delay(500));
  }

  getAll(): Observable<ContactMessage[]> {
    return of([...this.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())).pipe(delay(300));
  }

  getUnreadCount(): Observable<number> {
    return of(this.messages.filter(m => !m.isRead).length).pipe(delay(100));
  }

  markAsRead(id: number): Observable<ContactMessage> {
    const idx = this.messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.messages[idx] = { ...this.messages[idx], isRead: true, readAt: new Date().toISOString() };
    }
    return of(this.messages[idx]).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.messages = this.messages.filter(m => m.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
