import { Component } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: false,
  template: `
    <div class="not-found">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div class="actions">
          <a routerLink="/" class="btn btn-primary">Go Home</a>
          <a routerLink="/products" class="btn btn-outline">View Products</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found { min-height: 70vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; }
    .not-found-content { max-width: 480px; }
    .error-code { font-size: 8rem; font-weight: 800; background: linear-gradient(135deg, #10B981 0%, #059669 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 16px; }
    h1 { font-size: 1.875rem; font-weight: 700; margin-bottom: 12px; }
    p { color: var(--text-secondary); margin-bottom: 28px; }
    .actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; padding: 12px 28px; border-radius: 9999px; font-weight: 500; font-size: 0.875rem; transition: all 0.2s; text-decoration: none; }
    .btn-primary { background: linear-gradient(135deg, #10B981 0%, #047857 100%); color: #fff; }
    .btn-outline { background: transparent; color: var(--text-primary); border: 1px solid rgba(255,255,255,0.1); }
    .btn:hover { transform: translateY(-2px); }
  `]
})
export class NotFoundComponent {
  constructor(seoService: SeoService) {
    seoService.setPage({ title: 'Page Not Found' });
  }
}
