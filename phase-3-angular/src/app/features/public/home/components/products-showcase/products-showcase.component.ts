import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from '../../../../../core/models/product.model';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  standalone: false,
  styleUrls: ['./products-showcase.component.scss']
})
export class ProductsShowcaseComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeatured().subscribe(p => {
      this.products = p;
      this.loading = false;
    });
  }

  getCategoryLabel(category: ProductCategory): string {
    const labels: Record<number, string> = {
      [ProductCategory.Inverter]: 'Inverter',
      [ProductCategory.Battery]: 'Battery',
      [ProductCategory.SolarPanel]: 'Solar Panel',
      [ProductCategory.Accessory]: 'Accessory'
    };
    return labels[category] || 'Product';
  }
}
