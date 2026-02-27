import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { TestimonialService } from '../../../core/services/testimonial.service';
import { ContactService } from '../../../core/services/contact.service';
import { FeatureService } from '../../../core/services/feature.service';
import { forkJoin } from 'rxjs';

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

  constructor(
    private productService: ProductService,
    private testimonialService: TestimonialService,
    private contactService: ContactService,
    private featureService: FeatureService
  ) {}

  ngOnInit(): void {
    forkJoin({
      products: this.productService.getAllAdmin(),
      testimonials: this.testimonialService.getAll(false),
      messages: this.contactService.getAll(),
      features: this.featureService.getAll(false)
    }).subscribe(data => {
      this.stats.products = data.products.length;
      this.stats.testimonials = data.testimonials.length;
      this.stats.messages = data.messages.length;
      this.stats.unreadMessages = data.messages.filter(m => !m.isRead).length;
      this.stats.features = data.features.length;
      this.loading = false;
    });
  }
}
