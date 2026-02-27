import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this._notifications.asObservable();
  private _idCounter = 0;

  private add(type: Notification['type'], message: string): void {
    const id = ++this._idCounter;
    const current = this._notifications.value;
    this._notifications.next([...current, { id, type, message }]);
    setTimeout(() => this.remove(id), 4000);
  }

  success(message: string): void { this.add('success', message); }
  error(message: string): void { this.add('error', message); }
  info(message: string): void { this.add('info', message); }
  warning(message: string): void { this.add('warning', message); }

  remove(id: number): void {
    this._notifications.next(this._notifications.value.filter(n => n.id !== id));
  }
}
