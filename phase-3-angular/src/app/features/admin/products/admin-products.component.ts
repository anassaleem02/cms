import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductCategory, CreateProductDto, ProductImage, ProductSpecification } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { MediaService } from '../../../core/services/media.service';
import { MediaFile } from '../../../core/models/media.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  showForm = false;
  editingProduct: Product | null = null;
  deleteDialogVisible = false;
  productToDelete: Product | null = null;
  searchQuery = '';
  filterCategory: ProductCategory | '' = '';
  filterStatus: '' | 'active' | 'inactive' = '';

  selectedIds = new Set<number>();
  bulkDeleteDialogVisible = false;

  categories = [
    { label: 'All', value: '' },
    { label: 'Inverter', value: ProductCategory.Inverter },
    { label: 'Battery', value: ProductCategory.Battery },
    { label: 'Solar Panel', value: ProductCategory.SolarPanel },
    { label: 'Accessory', value: ProductCategory.Accessory }
  ];

  form: CreateProductDto = { name: '', shortDescription: '', description: '', category: ProductCategory.Inverter, isFeatured: false, isActive: true, displayOrder: 0, badgeLabel: '', pdfBrochureUrl: '' };
  saving = false;
  ProductCategory = ProductCategory;

  // Image management
  productImages: ProductImage[] = [];
  newImageUrl = '';
  newImageAlt = '';
  addingImage = false;
  uploadingImage = false;

  // Pending images (for new product before creation)
  pendingImages: Array<{type: 'url'|'file', url?: string, file?: File, preview?: string, alt: string}> = [];
  pendingImageUrl = '';
  pendingImageAlt = '';

  // PDF upload
  uploadingPdf = false;

  // Media picker
  showMediaPicker = false;
  mediaPickerFiles: MediaFile[] = [];
  mediaPickerFiltered: MediaFile[] = [];
  mediaPickerLoading = false;
  mediaPickerSearch = '';

  // Specification management
  productSpecs: ProductSpecification[] = [];
  newSpecKey = '';
  newSpecValue = '';
  addingSpec = false;
  editingSpecId: number | null = null;
  editSpecKey = '';
  editSpecValue = '';

  // Pending specs (for new product before creation)
  pendingSpecs: Array<{key: string, value: string, displayOrder: number}> = [];

  // Badge presets
  badgePresets = ['Best Seller', 'New', 'Popular', 'Limited', 'Sale'];

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void { this.loadProducts(); }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && this.showForm) {
      e.preventDefault();
      this.saveProduct();
    }
    if (e.key === 'Escape' && this.showForm) { this.closeForm(); }
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllAdmin().subscribe({
      next: (products) => { this.products = products; this.applyFilters(); this.loading = false; },
      error: () => { this.notificationService.error('Failed to load products.'); this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(p => {
      const matchSearch = !this.searchQuery || p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.shortDescription.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCat = this.filterCategory === '' || p.category === Number(this.filterCategory);
      const matchStatus = this.filterStatus === '' || (this.filterStatus === 'active' ? p.isActive : !p.isActive);
      return matchSearch && matchCat && matchStatus;
    });
  }

  openCreate(): void {
    this.editingProduct = null;
    this.form = { name: '', shortDescription: '', description: '', category: ProductCategory.Inverter, isFeatured: false, isActive: true, displayOrder: this.products.length, badgeLabel: '', pdfBrochureUrl: '' };
    this.productImages = [];
    this.productSpecs = [];
    this.pendingImages = []; this.pendingImageUrl = ''; this.pendingImageAlt = '';
    this.pendingSpecs = [];
    this.newSpecKey = ''; this.newSpecValue = ''; this.editingSpecId = null;
    this.showForm = true;
  }

  openEdit(product: Product): void {
    this.editingProduct = product;
    this.form = { name: product.name, shortDescription: product.shortDescription, description: product.description || '', category: product.category, isFeatured: product.isFeatured, isActive: product.isActive, displayOrder: product.displayOrder, badgeLabel: product.badgeLabel || '', pdfBrochureUrl: product.pdfBrochureUrl || '' };
    this.productImages = [...(product.images || [])];
    this.productSpecs = [...(product.specifications || [])];
    this.pendingImages = []; this.pendingImageUrl = ''; this.pendingImageAlt = '';
    this.newImageUrl = '';
    this.newImageAlt = '';
    this.newSpecKey = ''; this.newSpecValue = ''; this.editingSpecId = null;
    this.showForm = true;
  }

  closeForm(): void { this.showForm = false; this.editingProduct = null; this.productImages = []; this.productSpecs = []; this.pendingImages = []; this.pendingSpecs = []; }

  saveProduct(): void {
    if (!this.form.name.trim()) { this.notificationService.error('Product name is required.'); return; }
    this.saving = true;
    const op = this.editingProduct
      ? this.productService.update(this.editingProduct.id, this.form)
      : this.productService.create(this.form);
    op.subscribe({
      next: (saved: Product) => {
        this.saving = false;
        if (this.editingProduct) {
          this.notificationService.success('Product updated!');
          this.closeForm();
          this.loadProducts();
        } else {
          this.products.push(saved);
          this.applyFilters();
          this.editingProduct = saved;
          this.productImages = [];
          this.productSpecs = [];
          const hasPending = this.pendingImages.length > 0 || this.pendingSpecs.length > 0;
          if (this.pendingSpecs.length > 0) {
            this.uploadPendingSpecs(saved.id);
          }
          if (this.pendingImages.length > 0) {
            this.uploadPendingImages(saved.id);
          }
          if (!hasPending) {
            this.notificationService.success('Product created! You can now add images and specifications.');
          }
        }
      },
      error: () => { this.notificationService.error('Failed to save product.'); this.saving = false; }
    });
  }

  confirmDelete(product: Product): void { this.productToDelete = product; this.deleteDialogVisible = true; }

  onDeleteConfirmed(): void {
    if (!this.productToDelete) return;
    this.productService.delete(this.productToDelete.id).subscribe({
      next: () => { this.notificationService.success('Product deleted.'); this.loadProducts(); this.productToDelete = null; },
      error: () => this.notificationService.error('Failed to delete product.')
    });
  }

  duplicateProduct(product: Product): void {
    const dto: CreateProductDto = { name: product.name + ' (Copy)', shortDescription: product.shortDescription, description: product.description || '', category: product.category, isFeatured: false, isActive: false, displayOrder: this.products.length };
    this.productService.create(dto).subscribe({
      next: () => { this.notificationService.success('Product duplicated.'); this.loadProducts(); },
      error: () => this.notificationService.error('Failed to duplicate product.')
    });
  }

  toggleSelect(id: number): void { this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id); }
  toggleSelectAll(): void {
    if (this.selectedIds.size === this.filteredProducts.length) { this.selectedIds.clear(); }
    else { this.filteredProducts.forEach(p => this.selectedIds.add(p.id)); }
  }
  get allSelected(): boolean { return this.filteredProducts.length > 0 && this.selectedIds.size === this.filteredProducts.length; }

  bulkDelete(): void { if (this.selectedIds.size) this.bulkDeleteDialogVisible = true; }
  onBulkDeleteConfirmed(): void {
    const ids = Array.from(this.selectedIds);
    let done = 0;
    ids.forEach(id => {
      this.productService.delete(id).subscribe({ next: () => { done++; if (done === ids.length) { this.notificationService.success(`${ids.length} products deleted.`); this.selectedIds.clear(); this.loadProducts(); } } });
    });
  }

  exportCsv(): void {
    const headers = ['ID', 'Name', 'Category', 'Featured', 'Active', 'Display Order'];
    const rows = this.filteredProducts.map(p => [p.id, p.name, p.categoryName, p.isFeatured, p.isActive, p.displayOrder]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'products.csv'; a.click();
    URL.revokeObjectURL(url);
    this.notificationService.success('CSV exported!');
  }

  onDrop(event: CdkDragDrop<Product[]>): void {
    moveItemInArray(this.filteredProducts, event.previousIndex, event.currentIndex);
    const ids = this.filteredProducts.map(p => p.id);
    this.productService.reorder(ids).subscribe({ next: () => this.notificationService.success('Order saved.') });
  }

  getCategoryLabel(cat: ProductCategory): string {
    return ['', 'Inverter', 'Battery', 'Solar Panel', 'Accessory'][cat] || 'Unknown';
  }

  // --- PDF upload ---
  handlePdfUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.uploadingPdf = true;
    this.mediaService.upload(file, 'document').subscribe({
      next: (media) => { this.form.pdfBrochureUrl = media.url; this.uploadingPdf = false; this.notificationService.success('PDF uploaded.'); },
      error: () => { this.notificationService.error('PDF upload failed.'); this.uploadingPdf = false; }
    });
    input.value = '';
  }

  // --- Pending images (for new product) ---
  addPendingImageByUrl(): void {
    if (!this.pendingImageUrl.trim()) return;
    this.pendingImages.push({ type: 'url', url: this.pendingImageUrl.trim(), alt: this.pendingImageAlt.trim(), preview: this.pendingImageUrl.trim() });
    this.pendingImageUrl = ''; this.pendingImageAlt = '';
  }

  handlePendingFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pendingImages.push({ type: 'file', file, alt: file.name.replace(/\.[^.]+$/, ''), preview: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  removePendingImage(index: number): void { this.pendingImages.splice(index, 1); }

  setPendingThumbnail(index: number): void {
    // Move chosen image to position 0 (thumbnail is always index 0)
    const [img] = this.pendingImages.splice(index, 1);
    this.pendingImages.unshift(img);
  }

  uploadPendingImages(productId: number): void {
    const pending = [...this.pendingImages];
    this.pendingImages = [];
    let completed = 0;
    const total = pending.length;
    const onDone = (img?: ProductImage) => {
      if (img) this.productImages.push(img);
      completed++;
      if (completed === total) {
        this.notificationService.success(`Product created with ${total} image${total !== 1 ? 's' : ''}!`);
        this.loadProducts();
      }
    };
    pending.forEach((img, i) => {
      const isPrimary = i === 0;
      if (img.type === 'url' && img.url) {
        this.productService.addImage(productId, { imageUrl: img.url, altText: img.alt, isPrimary, displayOrder: i }).subscribe({ next: onDone, error: () => onDone() });
      } else if (img.type === 'file' && img.file) {
        this.mediaService.upload(img.file, 'product').subscribe({
          next: (media) => { this.productService.addImage(productId, { imageUrl: media.url, altText: img.alt, isPrimary, displayOrder: i }).subscribe({ next: onDone, error: () => onDone() }); },
          error: () => onDone()
        });
      }
    });
  }

  // --- Image management ---
  addImageByUrl(): void {
    if (!this.newImageUrl.trim() || !this.editingProduct) return;
    this.addingImage = true;
    const isPrimary = this.productImages.length === 0;
    this.productService.addImage(this.editingProduct.id, {
      imageUrl: this.newImageUrl.trim(),
      altText: this.newImageAlt.trim(),
      isPrimary,
      displayOrder: this.productImages.length
    }).subscribe({
      next: (img: ProductImage) => {
        this.productImages.push(img);
        if (isPrimary && this.editingProduct) {
          this.editingProduct.primaryImage = img;
        }
        this.newImageUrl = '';
        this.newImageAlt = '';
        this.addingImage = false;
        this.notificationService.success('Image added.');
        this.loadProducts();
      },
      error: () => { this.notificationService.error('Failed to add image.'); this.addingImage = false; }
    });
  }

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.editingProduct) return;
    const file = input.files[0];
    this.uploadingImage = true;
    this.mediaService.upload(file, 'product').subscribe({
      next: (media) => {
        const isPrimary = this.productImages.length === 0;
        this.productService.addImage(this.editingProduct!.id, {
          imageUrl: media.url,
          altText: file.name.replace(/\.[^.]+$/, ''),
          isPrimary,
          displayOrder: this.productImages.length
        }).subscribe({
          next: (img: ProductImage) => {
            this.productImages.push(img);
            if (isPrimary && this.editingProduct) {
              this.editingProduct.primaryImage = img;
            }
            this.uploadingImage = false;
            this.notificationService.success('Image uploaded and added.');
            this.loadProducts();
          },
          error: () => { this.notificationService.error('Failed to attach image.'); this.uploadingImage = false; }
        });
      },
      error: () => { this.notificationService.error('Upload failed.'); this.uploadingImage = false; }
    });
    input.value = '';
  }

  setThumbnail(img: ProductImage): void {
    if (!this.editingProduct || img.isPrimary) return;
    this.productService.setPrimaryImage(this.editingProduct.id, img.id).subscribe({
      next: () => {
        this.productImages.forEach(i => i.isPrimary = i.id === img.id);
        if (this.editingProduct) this.editingProduct.primaryImage = img;
        this.notificationService.success('Thumbnail set.');
        this.loadProducts();
      },
      error: () => this.notificationService.error('Failed to set thumbnail.')
    });
  }

  removeImage(img: ProductImage): void {
    if (!this.editingProduct) return;
    this.productService.deleteImage(this.editingProduct.id, img.id).subscribe({
      next: () => {
        this.productImages = this.productImages.filter(i => i.id !== img.id);
        if (this.editingProduct) {
          this.editingProduct.images = this.productImages;
          if (this.editingProduct.primaryImage?.id === img.id) {
            this.editingProduct.primaryImage = this.productImages.find(i => i.isPrimary) || this.productImages[0];
          }
        }
        this.notificationService.success('Image removed.');
        this.loadProducts();
      },
      error: () => this.notificationService.error('Failed to remove image.')
    });
  }

  // --- Pending specs (for new product) ---
  addPendingSpec(): void {
    if (!this.newSpecKey.trim() || !this.newSpecValue.trim()) return;
    this.pendingSpecs.push({ key: this.newSpecKey.trim(), value: this.newSpecValue.trim(), displayOrder: this.pendingSpecs.length });
    this.newSpecKey = ''; this.newSpecValue = '';
  }

  removePendingSpec(index: number): void { this.pendingSpecs.splice(index, 1); }

  uploadPendingSpecs(productId: number): void {
    const specs = [...this.pendingSpecs];
    this.pendingSpecs = [];
    let completed = 0;
    specs.forEach(spec => {
      this.productService.addSpec(productId, spec).subscribe({
        next: (s) => {
          this.productSpecs.push(s);
          completed++;
          if (completed === specs.length) {
            this.notificationService.success(`${specs.length} spec${specs.length !== 1 ? 's' : ''} added.`);
            this.loadProducts();
          }
        },
        error: () => { completed++; }
      });
    });
  }

  // Badge preset toggle (multi-select, comma-separated)
  toggleBadge(preset: string): void {
    const badges = this.getActiveBadges();
    const index = badges.indexOf(preset);
    if (index > -1) {
      badges.splice(index, 1);
    } else {
      badges.push(preset);
    }
    this.form.badgeLabel = badges.join(', ');
  }

  isBadgeActive(preset: string): boolean {
    return this.getActiveBadges().includes(preset);
  }

  private getActiveBadges(): string[] {
    if (!this.form.badgeLabel) return [];
    return this.form.badgeLabel.split(',').map(b => b.trim()).filter(b => b);
  }

  // --- Specification management ---
  addSpec(): void {
    if (!this.newSpecKey.trim() || !this.newSpecValue.trim() || !this.editingProduct) return;
    this.addingSpec = true;
    this.productService.addSpec(this.editingProduct.id, {
      key: this.newSpecKey.trim(),
      value: this.newSpecValue.trim(),
      displayOrder: this.productSpecs.length
    }).subscribe({
      next: (spec: ProductSpecification) => {
        this.productSpecs.push(spec);
        this.newSpecKey = '';
        this.newSpecValue = '';
        this.addingSpec = false;
        this.notificationService.success('Specification added.');
      },
      error: () => { this.notificationService.error('Failed to add specification.'); this.addingSpec = false; }
    });
  }

  startEditSpec(spec: ProductSpecification): void {
    this.editingSpecId = spec.id;
    this.editSpecKey = spec.key;
    this.editSpecValue = spec.value;
  }

  cancelEditSpec(): void {
    this.editingSpecId = null;
    this.editSpecKey = '';
    this.editSpecValue = '';
  }

  saveEditSpec(spec: ProductSpecification): void {
    if (!this.editSpecKey.trim() || !this.editSpecValue.trim() || !this.editingProduct) return;
    this.productService.updateSpec(this.editingProduct.id, spec.id, { key: this.editSpecKey.trim(), value: this.editSpecValue.trim() }).subscribe({
      next: () => {
        spec.key = this.editSpecKey.trim();
        spec.value = this.editSpecValue.trim();
        this.cancelEditSpec();
        this.notificationService.success('Specification updated.');
      },
      error: () => this.notificationService.error('Failed to update specification.')
    });
  }

  removeSpec(spec: ProductSpecification): void {
    if (!this.editingProduct) return;
    this.productService.deleteSpec(this.editingProduct.id, spec.id).subscribe({
      next: () => {
        this.productSpecs = this.productSpecs.filter(s => s.id !== spec.id);
        this.notificationService.success('Specification removed.');
      },
      error: () => this.notificationService.error('Failed to remove specification.')
    });
  }

  // --- Media picker ---
  openMediaPicker(): void {
    this.showMediaPicker = true;
    this.mediaPickerSearch = '';
    if (this.mediaPickerFiles.length === 0) {
      this.mediaPickerLoading = true;
      this.mediaService.getAll('image').subscribe({
        next: (files) => { this.mediaPickerFiles = files; this.filterMediaPicker(); this.mediaPickerLoading = false; },
        error: () => { this.notificationService.error('Failed to load media.'); this.mediaPickerLoading = false; }
      });
    } else {
      this.filterMediaPicker();
    }
  }

  filterMediaPicker(): void {
    const q = this.mediaPickerSearch.toLowerCase();
    this.mediaPickerFiltered = q
      ? this.mediaPickerFiles.filter(f => f.originalFileName.toLowerCase().includes(q))
      : [...this.mediaPickerFiles];
  }

  selectFromLibrary(file: MediaFile): void {
    this.showMediaPicker = false;
    if (this.editingProduct) {
      const isPrimary = this.productImages.length === 0;
      this.productService.addImage(this.editingProduct.id, {
        imageUrl: file.url,
        altText: file.originalFileName.replace(/\.[^.]+$/, ''),
        isPrimary,
        displayOrder: this.productImages.length
      }).subscribe({
        next: (img: ProductImage) => {
          this.productImages.push(img);
          if (isPrimary && this.editingProduct) this.editingProduct.primaryImage = img;
          this.notificationService.success('Image added from library.');
          this.loadProducts();
        },
        error: () => this.notificationService.error('Failed to add image.')
      });
    } else {
      this.pendingImages.push({ type: 'url', url: file.url, alt: file.originalFileName.replace(/\.[^.]+$/, ''), preview: file.url });
    }
  }
}
