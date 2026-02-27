import { Component } from '@angular/core';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: false,
  template: `
    <div class="toast-container">
      <div *ngFor="let n of notifications$ | async"
           class="toast toast-{{n.type}}"
           (click)="notificationService.remove(n.id)">
        <span class="toast-icon">
          <ng-container [ngSwitch]="n.type">
            <svg *ngSwitchCase="'success'" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <svg *ngSwitchCase="'error'" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            <svg *ngSwitchCase="'warning'" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            <svg *ngSwitchDefault width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </ng-container>
        </span>
        <span class="toast-message">{{n.message}}</span>
      </div>
    </div>
  `,
  styles: [`
    .toast-container { position: fixed; bottom: 24px; left: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
    .toast { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 10px; font-size: 0.875rem; font-weight: 500; cursor: pointer; animation: slideIn 0.3s ease; max-width: 380px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
    .toast-success { background: #065f46; color: #6ee7b7; border: 1px solid #10b981; }
    .toast-error { background: #7f1d1d; color: #fca5a5; border: 1px solid #ef4444; }
    .toast-warning { background: #78350f; color: #fcd34d; border: 1px solid #f59e0b; }
    .toast-info { background: #1e3a5f; color: #93c5fd; border: 1px solid #3b82f6; }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export class ToastComponent {
  notifications$: Observable<Notification[]>;
  constructor(public notificationService: NotificationService) {
    this.notifications$ = notificationService.notifications$;
  }
}
