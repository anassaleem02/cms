import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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

  // Lightbox
  zoomOpen = false;
  currentImageIndex = 0;

  // Hover zoom
  isHoverZoom = false;
  zoomOriginX = 50;
  zoomOriginY = 50;

  // Touch swipe
  private touchStartX = 0;

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
        this.currentImageIndex = 0;
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
    this.currentImageIndex = this.product?.images.indexOf(image) ?? 0;
    this.isHoverZoom = false;
  }

  // Lightbox
  openZoom(): void { if (this.selectedImage) this.zoomOpen = true; }
  closeZoom(): void { this.zoomOpen = false; }

  get totalImages(): number { return this.product?.images?.length ?? 0; }

  prevImage(): void {
    if (!this.product?.images.length) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.totalImages) % this.totalImages;
    this.selectedImage = this.product.images[this.currentImageIndex];
  }

  nextImage(): void {
    if (!this.product?.images.length) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
    this.selectedImage = this.product.images[this.currentImageIndex];
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (!this.zoomOpen) return;
    if (e.key === 'Escape') this.closeZoom();
    if (e.key === 'ArrowLeft') this.prevImage();
    if (e.key === 'ArrowRight') this.nextImage();
  }

  // Hover zoom
  onImageMouseEnter(): void { this.isHoverZoom = true; }
  onImageMouseLeave(): void { this.isHoverZoom = false; }
  onImageMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.zoomOriginX = ((event.clientX - rect.left) / rect.width) * 100;
    this.zoomOriginY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  // Touch swipe for lightbox
  onLightboxTouchStart(e: TouchEvent): void { this.touchStartX = e.touches[0].clientX; }
  onLightboxTouchEnd(e: TouchEvent): void {
    const diff = this.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? this.nextImage() : this.prevImage(); }
  }

  getCategoryLabel(): string {
    if (!this.product) return '';
    const map: Record<number, string> = { 1: 'Inverter', 2: 'Battery', 3: 'Solar Panel', 4: 'Accessory' };
    return map[this.product.category] || 'Product';
  }

  get quickSpecs() {
    return this.product?.specifications?.filter(s => s.key.toLowerCase() !== 'warranty').slice(0, 3) ?? [];
  }

  get warrantySpec() {
    const spec = this.product?.specifications?.find(s => s.key.toLowerCase() === 'warranty');
    if (!spec) return null;
    const parts = spec.value.split('|').map(p => p.trim());
    return {
      title: parts[0],
      description: parts[1] || null
    };
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
