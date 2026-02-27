import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage, SubmitContactDto } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private base = `${environment.apiUrl}/contact`;
  constructor(private http: HttpClient) {}

  submit(dto: SubmitContactDto): Observable<any> { return this.http.post(this.base, dto); }
  getAll(): Observable<ContactMessage[]> { return this.http.get<ContactMessage[]>(this.base); }
  getUnreadCount(): Observable<number> { return this.http.get<number>(`${this.base}/unread/count`); }
  markAsRead(id: number): Observable<ContactMessage> { return this.http.put<ContactMessage>(`${this.base}/${id}/read`, {}); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}
