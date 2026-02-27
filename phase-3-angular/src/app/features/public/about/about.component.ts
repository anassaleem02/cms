import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: false,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'About Us',
      description: "Learn about FM's Power - Karachi's trusted solar energy solutions provider since our founding.",
      url: '/about'
    });
  }
  stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '10MW+', label: 'Power Generated' },
    { value: '5 Years', label: 'Warranty' },
    { value: '98.5%', label: 'Efficiency' }
  ];

  values = [
    { icon: 'shield', title: 'Quality First', desc: 'We only source premium products from certified manufacturers with proven track records.' },
    { icon: 'users', title: 'Customer Focus', desc: 'Your satisfaction is our priority. We provide end-to-end support from consultation to after-sales.' },
    { icon: 'zap', title: 'Innovation', desc: 'We stay at the forefront of solar technology to offer you the best solutions available.' },
    { icon: 'leaf', title: 'Sustainability', desc: 'Every solar system we install contributes to a greener, more sustainable Pakistan.' }
  ];
}
