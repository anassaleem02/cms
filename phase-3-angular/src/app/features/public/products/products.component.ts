import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.component.html',
  standalone: false,
  styleUrls: ['./products.component.scss']
})
export class ProductsPageComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  activeCategory: ProductCategory | null = null;

  categories = [
    { label: 'All', value: null },
    { label: 'Inverters', value: ProductCategory.Inverter },
    { label: 'Batteries', value: ProductCategory.Battery },
    { label: 'Solar Panels', value: ProductCategory.SolarPanel },
    { label: 'Accessories', value: ProductCategory.Accessory }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = products;
      this.loading = false;
    });
  }

  filterByCategory(category: ProductCategory | null): void {
    this.activeCategory = category;
    this.filteredProducts = category === null
      ? this.allProducts
      : this.allProducts.filter(p => p.category === category);
  }

  getCategoryCount(value: ProductCategory | null): number {
    if (value === null) return this.allProducts.length;
    return this.allProducts.filter(p => p.category === value).length;
  }

  getCategoryLabel(category: ProductCategory): string {
    const map: Record<number, string> = {
      [ProductCategory.Inverter]: 'Inverter',
      [ProductCategory.Battery]: 'Battery',
      [ProductCategory.SolarPanel]: 'Solar Panel',
      [ProductCategory.Accessory]: 'Accessory'
    };
    return map[category] || 'Product';
  }
}
