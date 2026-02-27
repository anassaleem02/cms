import { Component, OnInit } from '@angular/core';
import { Feature } from '../../../../../core/models/feature.model';
import { FeatureService } from '../../../../../core/services/feature.service';

@Component({
  selector: 'app-features-grid',
  templateUrl: './features-grid.component.html',
  standalone: false,
  styleUrls: ['./features-grid.component.scss']
})
export class FeaturesGridComponent implements OnInit {
  features: Feature[] = [];
  loading = true;

  constructor(private featureService: FeatureService) {}

  ngOnInit(): void {
    this.featureService.getAll().subscribe(f => {
      this.features = f;
      this.loading = false;
    });
  }

  getIconSvg(icon: string): string {
    const icons: Record<string, string> = {
      'zap': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      'smartphone': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
      'shield': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'trending-up': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
      'wifi': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
      'layers': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
    };
    return icons[icon] || icons['zap'];
  }
}
