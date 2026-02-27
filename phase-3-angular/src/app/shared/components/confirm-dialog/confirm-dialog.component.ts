import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  template: `
    <div class="dialog-overlay" *ngIf="visible" (click)="onCancel()">
      <div class="dialog-box" (click)="$event.stopPropagation()">
        <div class="dialog-icon">
          <svg width="32" height="32" fill="none" stroke="#EF4444" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <h3 class="dialog-title">{{title}}</h3>
        <p class="dialog-message">{{message}}</p>
        <div class="dialog-actions">
          <button class="btn btn-outline" (click)="onCancel()">Cancel</button>
          <button class="btn btn-danger" (click)="onConfirm()">{{confirmText}}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 9998; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; }
    .dialog-box { background: #1A1A1D; border: 1px solid #3F3F46; border-radius: 16px; padding: 32px; max-width: 400px; width: 90%; text-align: center; }
    .dialog-icon { margin-bottom: 16px; }
    .dialog-title { font-size: 1.25rem; font-weight: 700; color: #FAFAFA; margin-bottom: 8px; }
    .dialog-message { color: #A1A1AA; font-size: 0.875rem; margin-bottom: 24px; line-height: 1.6; }
    .dialog-actions { display: flex; gap: 12px; justify-content: center; }
    .btn-danger { background: #EF4444; color: #fff; padding: 10px 24px; border-radius: 9999px; font-weight: 500; font-size: 0.875rem; border: none; cursor: pointer; transition: all 0.2s; }
    .btn-danger:hover { background: #DC2626; transform: translateY(-1px); }
    .btn { display: inline-flex; align-items: center; padding: 10px 24px; border-radius: 9999px; font-weight: 500; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; }
    .btn-outline { background: transparent; color: #FAFAFA; border: 1px solid #3F3F46; }
    .btn-outline:hover { background: rgba(255,255,255,0.05); }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Delete';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void { this.confirmed.emit(); this.visible = false; }
  onCancel(): void { this.cancelled.emit(); this.visible = false; }
}
