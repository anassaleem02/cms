import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Premium Solar Energy Solutions',
      description: "FM's Power offers premium solar inverters, lithium batteries & solar panels in Karachi with 5-year warranty. Get free quote today!",
      keywords: 'solar inverter Karachi, lithium battery Pakistan, solar panel price, FM Power',
      url: '/'
    });
  }
}
