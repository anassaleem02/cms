import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductImage } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { SeoService } from '../../../core/services/seo.service';
import { ContactService } from '../../../core/services/contact.service';
import { NotificationService } from '../../../core/services/notification.service';

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
  inquiryForm!: FormGroup;
  submittingInquiry = false;
  inquirySuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private seoService: SeoService,
    private contactService: ContactService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.inquiryForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['']
    });

    this.route.params.subscribe(params => {
      this.loading = true;
      this.inquirySuccess = false;
      this.productService.getBySlug(params['slug']).subscribe(product => {
        if (!product) {
          this.router.navigate(['/products']);
          return;
        }
        this.product = product;
        this.selectedImage = product.primaryImage || product.images[0] || null;
        this.loading = false;
        this.seoService.setProductPage(product);
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

  get quickSpecs() {
    return this.product?.specifications?.slice(0, 3) ?? [];
  }

  submitInquiry(): void {
    if (this.inquiryForm.invalid) {
      this.inquiryForm.markAllAsTouched();
      return;
    }
    this.submittingInquiry = true;
    const v = this.inquiryForm.value;
    const productName = this.product?.name || 'a product';
    const dto = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      message: v.message || `I'm interested in ${productName}. Please provide pricing and availability.`
    };
    this.contactService.submit(dto).subscribe({
      next: () => {
        this.submittingInquiry = false;
        this.inquirySuccess = true;
        this.inquiryForm.reset();
        this.notification.success('Inquiry sent! We will contact you soon.');
      },
      error: () => {
        this.submittingInquiry = false;
        this.notification.error('Failed to send inquiry. Please try again.');
      }
    });
  }
}
