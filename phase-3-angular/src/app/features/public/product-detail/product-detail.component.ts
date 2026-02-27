import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductImage } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: false,
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  selectedImage: ProductImage | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.productService.getBySlug(params['slug']).subscribe(product => {
        if (!product) {
          this.router.navigate(['/products']);
          return;
        }
        this.product = product;
        this.selectedImage = product.primaryImage || product.images[0] || null;
        this.loading = false;
        this.productService.getRelated(product.id).subscribe(related => {
          this.relatedProducts = related;
        });
      });
    });
  }

  selectImage(image: ProductImage): void {
    this.selectedImage = image;
  }

  getCategoryLabel(): string {
    if (!this.product) return '';
    const map: Record<number, string> = { 1: 'Inverter', 2: 'Battery', 3: 'Solar Panel', 4: 'Accessory' };
    return map[this.product.category] || 'Product';
  }
}
