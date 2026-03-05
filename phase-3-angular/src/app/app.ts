import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private themeService: ThemeService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.get().subscribe(settings => {
      if (settings.faviconUrl) {
        this.setFavicon(settings.faviconUrl);
      }
      if (settings.metaTitle) {
        document.title = settings.metaTitle;
      }
    });
  }

  private setFavicon(url: string): void {
    const isSvg = url.toLowerCase().endsWith('.svg');
    const type = isSvg ? 'image/svg+xml' : 'image/png';
    // Update all icon link tags
    document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = type;
    link.href = url;
    document.head.appendChild(link);
  }
}
