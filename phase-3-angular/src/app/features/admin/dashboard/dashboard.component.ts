import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    products: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0,
    features: 0
  };
  loading = true;

  quickActions = [
    { label: 'Add Product', url: '/admin/products', icon: 'package', color: 'green' },
    { label: 'Edit Hero', url: '/admin/hero', icon: 'image', color: 'blue' },
    { label: 'View Messages', url: '/admin/messages', icon: 'mail', color: 'amber' },
    { label: 'Site Settings', url: '/admin/settings', icon: 'settings', color: 'purple' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAnalytics().subscribe({
      next: (data) => {
        this.stats.products = data.totalProducts;
        this.stats.testimonials = data.totalTestimonials;
        this.stats.messages = data.totalMessages;
        this.stats.unreadMessages = data.unreadMessages;
        this.stats.features = data.totalFeatures;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
