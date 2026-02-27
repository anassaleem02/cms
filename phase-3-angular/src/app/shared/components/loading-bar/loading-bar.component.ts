import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-bar',
  standalone: false,
  template: `
    <div class="loading-bar" *ngIf="loadingService.loading$ | async">
      <div class="loading-bar-progress"></div>
    </div>
  `,
  styles: [`
    .loading-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 10000; height: 3px; background: rgba(16,185,129,0.2); }
    .loading-bar-progress { height: 100%; background: var(--color-primary, #10B981); animation: progress 1.5s ease-in-out infinite; }
    @keyframes progress { 0% { width: 0%; margin-left: 0; } 50% { width: 70%; margin-left: 15%; } 100% { width: 0%; margin-left: 100%; } }
  `]
})
export class LoadingBarComponent {
  constructor(public loadingService: LoadingService) {}
}
