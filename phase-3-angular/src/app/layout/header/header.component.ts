import { Component, OnInit, HostListener } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

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

  navItems = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe(t => this.isDark = t === 'dark');
  }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 20; }

  toggleTheme(): void { this.themeService.toggle(); }
  toggleMenu(): void { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  closeMenu(): void { this.isMobileMenuOpen = false; }
}
