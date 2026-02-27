import { Component, OnInit, HostListener } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { SettingsService } from '../../core/services/settings.service';
import { NavService } from '../../core/services/nav.service';
import { SiteSettings } from '../../core/models/site-settings.model';
import { NavItem } from '../../core/models/nav-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isDark = true;
  settings: SiteSettings | null = null;
  navItems: NavItem[] = [];

  constructor(
    private themeService: ThemeService,
    private settingsService: SettingsService,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe(t => this.isDark = t === 'dark');

    this.settingsService.get().subscribe({
      next: s => this.settings = s,
      error: () => {}
    });

    this.navService.getAll().subscribe({
      next: items => this.navItems = items.filter(i => i.isActive).sort((a, b) => a.displayOrder - b.displayOrder),
      error: () => {}
    });
  }

  get whatsAppUrl(): string {
    const num = this.settings?.whatsApp?.replace(/\D/g, '') || '923222550299';
    return `https://wa.me/${num}`;
  }

  get phoneUrl(): string {
    return `tel:${this.settings?.phone || '03222550299'}`;
  }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 20; }

  toggleTheme(): void { this.themeService.toggle(); }
  toggleMenu(): void { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  closeMenu(): void { this.isMobileMenuOpen = false; }
}
