import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  template: `
    <nav class="breadcrumb">
      <ng-container *ngFor="let item of items; let last = last">
        <a *ngIf="item.link && !last" [routerLink]="item.link" class="breadcrumb-link">{{item.label}}</a>
        <span *ngIf="!item.link || last" class="breadcrumb-current">{{item.label}}</span>
        <span *ngIf="!last" class="breadcrumb-sep">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </span>
      </ng-container>
    </nav>
  `,
  styles: [`
    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 0.8125rem; margin-bottom: 16px; }
    .breadcrumb-link { color: var(--color-primary, #10B981); text-decoration: none; }
    .breadcrumb-link:hover { text-decoration: underline; }
    .breadcrumb-current { color: var(--text-secondary, #A1A1AA); }
    .breadcrumb-sep { color: var(--text-muted, #52525B); display: flex; align-items: center; }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
