import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: false,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ];

  productLinks = [
    { label: 'Solar Inverters', url: '/products' },
    { label: 'Lithium Batteries', url: '/products' },
    { label: 'Solar Panels', url: '/products' },
    { label: 'Accessories', url: '/products' }
  ];
}
