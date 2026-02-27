import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardAnalytics } from '../../../core/services/dashboard.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  analytics: DashboardAnalytics | null = null;
  loading = true;

  stats: { label: string; value: string | number; icon: string; color: string; sub?: string }[] = [];

  constructor(
    private dashboardService: DashboardService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.dashboardService.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.stats = [
          { label: 'Total Products', value: data.totalProducts, icon: 'box', color: 'primary', sub: 'in catalog' },
          { label: 'Total Messages', value: data.totalMessages, icon: 'mail', color: 'accent', sub: `${data.unreadMessages} unread` },
          { label: 'Testimonials', value: data.totalTestimonials, icon: 'star', color: 'success', sub: 'customer reviews' },
          { label: 'Services', value: data.totalServices, icon: 'tool', color: 'info', sub: 'offered' },
          { label: 'Features', value: data.totalFeatures, icon: 'zap', color: 'warning', sub: 'highlighted' },
          { label: 'Media Files', value: data.totalMediaFiles, icon: 'image', color: 'purple', sub: 'uploaded' }
        ];
        this.loading = false;
      },
      error: () => {
        this.notificationService.error('Failed to load analytics.');
        this.loading = false;
      }
    });
  }

  getIconPath(icon: string): string {
    const icons: Record<string, string> = {
      box: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
      mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5',
      star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      tool: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
      zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      image: 'M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z'
    };
    return icons[icon] || icons['box'];
  }

  getColorClass(color: string): string {
    const map: Record<string, string> = {
      primary: 'stat-primary', accent: 'stat-accent', success: 'stat-success',
      info: 'stat-info', warning: 'stat-warning', purple: 'stat-purple'
    };
    return map[color] || 'stat-primary';
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }
}
